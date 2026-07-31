// Frame protocol: every QR frame is fully self-describing, so there is NO
// handshake — the receiver locks onto a stream mid-flight, and a new session
// id on any frame simply starts a fresh transfer.
//
// Layout (little-endian), 20 bytes, followed by `blockLen` payload bytes:
//   0  u8   magic 0xD1
//   1  u8   magic 0x0C
//   2  u16  sessionId   random per sender start
//   4  u32  seq         drives the fountain PRNG (see fountain.ts)
//   8  u16  k           source block count
//  10  u16  blockLen    payload bytes per frame
//  12  u32  totalLen    file length in bytes
//  16  u32  payloadFnv  FNV-1a of the whole file — verified on completion

export const HEADER_LEN = 20;
const MAGIC0 = 0xd1;
const MAGIC1 = 0x0c;
const FILE_MAGIC = new Uint8Array([0x44, 0x45, 0x43, 0x46]); // "DECF"
const FILE_HEADER_LEN = 8;

export interface FrameHeader {
  sessionId: number;
  seq: number;
  k: number;
  blockLen: number;
  totalLen: number;
  payloadFnv: number;
}

export function packFrame(h: FrameHeader, block: Uint8Array): Uint8Array {
  const out = new Uint8Array(HEADER_LEN + block.length);
  const dv = new DataView(out.buffer);
  dv.setUint8(0, MAGIC0);
  dv.setUint8(1, MAGIC1);
  dv.setUint16(2, h.sessionId, true);
  dv.setUint32(4, h.seq, true);
  dv.setUint16(8, h.k, true);
  dv.setUint16(10, h.blockLen, true);
  dv.setUint32(12, h.totalLen, true);
  dv.setUint32(16, h.payloadFnv, true);
  out.set(block, HEADER_LEN);
  return out;
}

export function parseFrame(
  bytes: Uint8Array,
): { header: FrameHeader; block: Uint8Array } | null {
  if (bytes.length <= HEADER_LEN) return null;
  if (bytes[0] !== MAGIC0 || bytes[1] !== MAGIC1) return null;
  const dv = new DataView(bytes.buffer, bytes.byteOffset, bytes.byteLength);
  const header: FrameHeader = {
    sessionId: dv.getUint16(2, true),
    seq: dv.getUint32(4, true),
    k: dv.getUint16(8, true),
    blockLen: dv.getUint16(10, true),
    totalLen: dv.getUint32(12, true),
    payloadFnv: dv.getUint32(16, true),
  };
  if (header.k === 0 || header.blockLen === 0 || header.totalLen === 0) return null;
  if (bytes.length !== HEADER_LEN + header.blockLen) return null;
  return { header, block: bytes.subarray(HEADER_LEN) };
}

export function fnv1a(bytes: Uint8Array): number {
  let h = 0x811c9dc5;
  for (let i = 0; i < bytes.length; i++) {
    h ^= bytes[i]!;
    h = Math.imul(h, 0x01000193);
  }
  return h >>> 0;
}

export interface TransferredFile {
  name: string;
  type: string;
  bytes: Uint8Array;
}

/** Wrap file bytes with UTF-8 metadata before fountain encoding. */
export function packFile(file: TransferredFile): Uint8Array {
  const metadata = new TextEncoder().encode(
    JSON.stringify({ name: file.name, type: file.type, size: file.bytes.length }),
  );
  const out = new Uint8Array(FILE_HEADER_LEN + metadata.length + file.bytes.length);
  out.set(FILE_MAGIC, 0);
  new DataView(out.buffer).setUint32(4, metadata.length, true);
  out.set(metadata, FILE_HEADER_LEN);
  out.set(file.bytes, FILE_HEADER_LEN + metadata.length);
  return out;
}

/** Read the file envelope. Older image-only streams get safe fallback metadata. */
export function unpackFile(payload: Uint8Array): TransferredFile {
  const isEnvelope = FILE_MAGIC.every((byte, index) => payload[index] === byte);
  if (!isEnvelope || payload.length < FILE_HEADER_LEN) {
    return { name: "received-file.bin", type: "application/octet-stream", bytes: payload };
  }
  const metadataLen = new DataView(
    payload.buffer,
    payload.byteOffset,
    payload.byteLength,
  ).getUint32(4, true);
  const dataOffset = FILE_HEADER_LEN + metadataLen;
  if (metadataLen === 0 || dataOffset > payload.length) {
    return { name: "received-file.bin", type: "application/octet-stream", bytes: payload };
  }
  try {
    const metadata = JSON.parse(
      new TextDecoder().decode(payload.subarray(FILE_HEADER_LEN, dataOffset)),
    ) as { name?: unknown; type?: unknown; size?: unknown };
    const bytes = payload.subarray(dataOffset);
    if (typeof metadata.name !== "string" || Number(metadata.size) !== bytes.length) {
      throw new Error("invalid file metadata");
    }
    return {
      name: metadata.name || "received-file.bin",
      type: typeof metadata.type === "string" ? metadata.type : "application/octet-stream",
      bytes,
    };
  } catch {
    return { name: "received-file.bin", type: "application/octet-stream", bytes: payload };
  }
}

/** splitmix32 — deterministic across JS engines (integer ops only). */
export function splitmix32(seed: number): () => number {
  let s = seed | 0;
  return () => {
    s = (s + 0x9e3779b9) | 0;
    let t = s ^ (s >>> 16);
    t = Math.imul(t, 0x21f0aaad);
    t ^= t >>> 15;
    t = Math.imul(t, 0x735a2d97);
    t ^= t >>> 15;
    return t >>> 0;
  };
}
