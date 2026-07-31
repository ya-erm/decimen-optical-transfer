import { applyTranslations, getLanguage, setLanguage, t, type Language } from "./i18n";

applyTranslations();

const languageSelect = document.getElementById("language-select") as HTMLSelectElement | null;
if (languageSelect) {
  languageSelect.value = getLanguage();
  languageSelect.addEventListener("change", () => setLanguage(languageSelect.value as Language));
}

const shareButton = document.getElementById("share-page") as HTMLButtonElement | null;
const shareStatus = document.getElementById("share-status");

shareButton?.addEventListener("click", async () => {
  const shareData = {
    title: document.title,
    text: t("share.text"),
    url: window.location.href,
  };
  try {
    if (navigator.share) {
      await navigator.share(shareData);
      if (shareStatus) shareStatus.textContent = t("share.shared");
    } else {
      await navigator.clipboard.writeText(shareData.url);
      if (shareStatus) shareStatus.textContent = t("share.copied");
    }
  } catch (error) {
    if (error instanceof DOMException && error.name === "AbortError") return;
    if (shareStatus) shareStatus.textContent = t("share.failed");
  }
});
