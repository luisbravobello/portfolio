// El enlace y el QR viven en HTML. El diálogo es una mejora opcional.
export function initProfileSharing() {
  const dialog = document.querySelector(".qr-dialog");
  if (dialog && typeof dialog.showModal === "function") {
    document.querySelectorAll("[data-linkedin-qr]").forEach((link) => {
      link.addEventListener("click", (event) => {
        // Conservar abrir en otra pestaña o ventana mediante el navegador.
        if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey)
          return;
        event.preventDefault();
        dialog.showModal();
      });
    });
    dialog
      .querySelector("[data-close-qr]")
      .addEventListener("click", () => dialog.close());
    dialog.addEventListener("click", (event) => {
      const bounds = dialog.getBoundingClientRect();
      if (
        event.clientX < bounds.left ||
        event.clientX > bounds.right ||
        event.clientY < bounds.top ||
        event.clientY > bounds.bottom
      )
        dialog.close();
    });
  }
  if (!navigator.clipboard) return;
  const english = document.documentElement.lang === "en";
  document.querySelectorAll("[data-copy-linkedin]").forEach((button) => {
    button.hidden = false;
    button.addEventListener("click", async () => {
      const card = button.closest(".qr-card");
      const profile = card.querySelector('a[href*="linkedin.com/in/"]').href;
      try {
        await navigator.clipboard.writeText(profile);
        card.querySelector(".qr-status").textContent = english
          ? "LinkedIn link copied."
          : "Enlace de LinkedIn copiado.";
      } catch {
        card.querySelector(".qr-status").textContent = english
          ? "Use the LinkedIn link or download the QR."
          : "Puedes usar el enlace a LinkedIn o descargar el QR.";
      }
    });
  });
}
