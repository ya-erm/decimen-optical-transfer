const shareButton = document.getElementById("share-page") as HTMLButtonElement | null;
const shareStatus = document.getElementById("share-status");

shareButton?.addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: "Transfer files directly from screen to camera with Decimen.",
    url: window.location.href,
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      if (shareStatus) shareStatus.textContent = "Shared";
    } else {
      await navigator.clipboard.writeText(shareData.url);
      if (shareStatus) shareStatus.textContent = "Link copied";
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    if (shareStatus) shareStatus.textContent = "Could not share this page";
  }
});
