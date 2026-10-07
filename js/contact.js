// El correo es un enlace real. Copiarlo es una mejora opcional del navegador.
export function initContact() {
  const english = document.documentElement.lang === "en";
  const button = document.querySelector(".copy-email");
  const status = document.querySelector(".copy-status");
  if (!button || !navigator.clipboard) return;
  button.hidden = false;
  button.addEventListener("click", async () => {
    try {
      await navigator.clipboard.writeText("luisbravobello@gmail.com");
      status.textContent = english
        ? "Email copied. Paste it wherever you need it."
        : "Correo copiado. Puedes pegarlo donde lo necesites.";
    } catch {
      status.textContent = english
        ? "Select the email or open it using the link above."
        : "Puedes seleccionar el correo o abrirlo con el enlace de arriba.";
    }
  });
}
