if ("serviceWorker" in navigator && import.meta.env.PROD) {
  window.addEventListener("load", () => {
    void navigator.serviceWorker.register(new URL(/* @vite-ignore */ "../sw.js", import.meta.url), {
      scope: new URL(/* @vite-ignore */ "../", import.meta.url).pathname,
    });
  });
}
