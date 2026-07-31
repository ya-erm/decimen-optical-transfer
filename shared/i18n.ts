export type Language = "en" | "ru";

const STORAGE_KEY = "decimen-language";

const translations = {
  en: {
    "brand.tagline": "— Fountain QR File Transfer",
    "home.title": "Optical Transfer — fountain-coded QR file transfer",
    "home.intro": "Send a file between two devices using nothing but a screen and a camera. Choose the role of this device.",
    "home.actions": "Transfer actions",
    "home.send": "Send",
    "home.sendDetail": "Choose a file and show the QR stream",
    "home.receive": "Receive",
    "home.receiveDetail": "Scan the stream with this device's camera",
    "home.explanation": "No network path between the devices is used — the payload travels as light. Fountain coding means the receiver can drop any frames, in any order, and still reconstruct the file.",
    "home.language": "Language",
    "home.share": "Share",
    "share.text": "Transfer files directly from screen to camera with Decimen.",
    "share.shared": "Shared",
    "share.copied": "Link copied",
    "share.failed": "Could not share this page",
    "nav.back": "← Back",
    "nav.backLabel": "Back to home",
    "send.title": "Optical Transfer — send",
    "send.choose": "Choose file",
    "send.promptBefore": "Choose any file or",
    "send.demo": "use demo",
    "send.promptAfter": "to start the optical stream",
    "send.settings": "Settings",
    "send.txFps": "tx fps",
    "send.bytesFrame": "bytes / frame",
    "send.ecc": "error correction",
    "send.displaySize": "display size",
    "send.settingsHelp": "Changes restart the stream — the receiver resets automatically (new session id in the frame headers; that's the fountain protocol's gift).",
    "send.brightness": "Max screen brightness helps. The stream loops forever — stop when the receiver says done.",
    "send.loadingDemo": "Loading demo video…",
    "send.nonEmpty": "choose a non-empty file",
    "send.sizeLimit": "files are limited to 64 MB",
    "send.preparing": "Preparing {name}…",
    "send.tooLarge": "{name} is too large for this frame size (maximum {max} MB)",
    "send.frameInfo": "{fps} FPS · {bytes} bytes per frame · V{version} · ECC {ecc} · {name} · {size} · {compression} · K={blocks}",
    "send.gzip": "gzip {size}",
    "send.noCompression": "no compression",
    "receive.title": "Optical Transfer — receive",
    "receive.pointCamera": "point the camera at the sender's code",
    "receive.settings": "Settings",
    "receive.captureWidth": "capture width",
    "receive.captureFps": "capture fps",
    "receive.decodeWorkers": "decode workers",
    "receive.settingsHelp": "Set before starting the camera. 1280-wide is the widest mode iOS runs at a true 60 fps; the fps request is demanded with exact first because ideal: 60 silently delivers 30.",
    "receive.start": "Start camera",
    "receive.captureMetric": "capture fps",
    "receive.decodeMetric": "decode fps",
    "receive.goodput": "goodput",
    "receive.elapsed": "elapsed",
    "receive.frames": "frames new/dup",
    "receive.blocks": "blocks K",
    "receive.blockLen": "block len",
    "receive.payload": "payload",
    "receive.progress": "File recovery progress",
    "receive.initialProgress": "0% · 0 frames",
    "receive.estimating": "Estimating time…",
    "receive.secureContext": "camera needs a secure context — this page must be served over https to use the camera from another device (npm run dev:https).",
    "receive.cameraError": "camera: {error}",
    "receive.searching": "camera {width}×{height}@{fps} — searching for a stream…",
    "receive.blockProgress": "{percent}% · {solved}/{total} blocks",
    "receive.decoding": "{frames} frames · decoding",
    "receive.about": "About {time} · {frames} frames",
    "receive.recovered": "100% · file recovered",
    "receive.total": "{time} total",
    "receive.checksumError": "The optical stream checksum did not match.",
    "receive.shaError": "The recovered file failed SHA-256 verification.",
    "receive.successStats": "{size} in {seconds} s · {rate} KB/s · {compression}SHA-256 verified ✓",
    "receive.decompressed": "gzip decompressed · ",
    "receive.complete": "Transfer Complete!",
    "receive.download": "Download {name}",
    "receive.again": "Receive again",
    "receive.videoPreview": "Received video preview: {name}",
    "receive.failed": "Transfer failed",
  },
  ru: {
    "brand.tagline": "— Передача файлов через QR-коды",
    "home.title": "Оптическая передача файлов — фонтанные QR-коды",
    "home.intro": "Передавайте файлы между двумя устройствами, используя только экран и камеру. Выберите роль этого устройства.",
    "home.actions": "Действия с файлами",
    "home.send": "Отправить",
    "home.sendDetail": "Выбрать файл и показать поток QR-кодов",
    "home.receive": "Получить",
    "home.receiveDetail": "Сканировать поток камерой этого устройства",
    "home.explanation": "Сетевое соединение между устройствами не используется — данные передаются светом. Благодаря фонтанному кодированию приёмник может пропускать кадры и получать их в любом порядке, но всё равно восстановит файл.",
    "home.language": "Язык",
    "home.share": "Поделиться",
    "share.text": "Передавайте файлы напрямую с экрана на камеру с помощью Decimen.",
    "share.shared": "Отправлено",
    "share.copied": "Ссылка скопирована",
    "share.failed": "Не удалось поделиться страницей",
    "nav.back": "← Назад",
    "nav.backLabel": "Вернуться на главную",
    "send.title": "Оптическая передача — отправка",
    "send.choose": "Выбрать файл",
    "send.promptBefore": "Выберите любой файл или",
    "send.demo": "запустите демо",
    "send.promptAfter": "для начала оптической передачи",
    "send.settings": "Настройки",
    "send.txFps": "кадров в секунду",
    "send.bytesFrame": "байт в кадре",
    "send.ecc": "коррекция ошибок",
    "send.displaySize": "размер изображения",
    "send.settingsHelp": "Изменения перезапускают поток — приёмник сбросится автоматически благодаря новому идентификатору сеанса в заголовках кадров.",
    "send.brightness": "Максимальная яркость экрана улучшает передачу. Поток повторяется бесконечно — остановитесь, когда приёмник сообщит о завершении.",
    "send.loadingDemo": "Загружаем демонстрационное видео…",
    "send.nonEmpty": "выберите непустой файл",
    "send.sizeLimit": "размер файла ограничен 64 МБ",
    "send.preparing": "Подготавливаем {name}…",
    "send.tooLarge": "Файл {name} слишком велик для этого размера кадра (максимум {max} МБ)",
    "send.frameInfo": "{fps} кадр/с · {bytes} байт в кадре · V{version} · ECC {ecc} · {name} · {size} · {compression} · K={blocks}",
    "send.gzip": "gzip {size}",
    "send.noCompression": "без сжатия",
    "receive.title": "Оптическая передача — приём",
    "receive.pointCamera": "наведите камеру на QR-код отправителя",
    "receive.settings": "Настройки",
    "receive.captureWidth": "ширина кадра",
    "receive.captureFps": "частота съёмки",
    "receive.decodeWorkers": "потоки декодирования",
    "receive.settingsHelp": "Настройте параметры до запуска камеры. Ширина 1280 — максимальный режим, в котором iOS действительно работает при 60 кадр/с; сначала запрашивается точная частота, поскольку предпочтительные 60 кадр/с могут незаметно превратиться в 30.",
    "receive.start": "Запустить камеру",
    "receive.captureMetric": "частота съёмки",
    "receive.decodeMetric": "частота декодирования",
    "receive.goodput": "полезная скорость",
    "receive.elapsed": "прошло",
    "receive.frames": "новые/повторные кадры",
    "receive.blocks": "блоков K",
    "receive.blockLen": "размер блока",
    "receive.payload": "данные",
    "receive.progress": "Прогресс восстановления файла",
    "receive.initialProgress": "0% · 0 кадров",
    "receive.estimating": "Рассчитываем время…",
    "receive.secureContext": "для камеры требуется защищённое соединение — чтобы открыть страницу на другом устройстве, используйте https (npm run dev:https).",
    "receive.cameraError": "камера: {error}",
    "receive.searching": "камера {width}×{height}@{fps} — ищем поток…",
    "receive.blockProgress": "{percent}% · {solved}/{total} блоков",
    "receive.decoding": "{frames} кадров · декодирование",
    "receive.about": "Около {time} · {frames} кадров",
    "receive.recovered": "100% · файл восстановлен",
    "receive.total": "всего {time}",
    "receive.checksumError": "Контрольная сумма оптического потока не совпала.",
    "receive.shaError": "Полученный файл не прошёл проверку SHA-256.",
    "receive.successStats": "{size} за {seconds} с · {rate} КБ/с · {compression}SHA-256 подтверждён ✓",
    "receive.decompressed": "gzip распакован · ",
    "receive.complete": "Передача завершена!",
    "receive.download": "Скачать {name}",
    "receive.again": "Получить снова",
    "receive.videoPreview": "Предпросмотр полученного видео: {name}",
    "receive.failed": "Ошибка передачи",
  },
} as const;

export type TranslationKey = keyof typeof translations.en;

function detectLanguage(): Language {
  const saved = localStorage.getItem(STORAGE_KEY);
  if (saved === "en" || saved === "ru") return saved;
  return navigator.languages.some((language) => language.toLowerCase().startsWith("ru")) ? "ru" : "en";
}

let language = detectLanguage();

export function getLanguage(): Language {
  return language;
}

export function setLanguage(next: Language): void {
  language = next;
  localStorage.setItem(STORAGE_KEY, next);
  applyTranslations();
  window.dispatchEvent(new CustomEvent("decimen:languagechange", { detail: next }));
}

export function t(key: TranslationKey, values: Record<string, string | number> = {}): string {
  return Object.entries(values).reduce(
    (text, [name, value]) => text.replaceAll(`{${name}}`, String(value)),
    translations[language][key] as string,
  );
}

export function applyTranslations(root: ParentNode = document): void {
  document.documentElement.lang = language;
  root.querySelectorAll<HTMLElement>("[data-i18n]").forEach((element) => {
    element.textContent = t(element.dataset.i18n as TranslationKey);
  });
  root.querySelectorAll<HTMLElement>("[data-i18n-aria-label]").forEach((element) => {
    element.setAttribute("aria-label", t(element.dataset.i18nAriaLabel as TranslationKey));
  });
}

