// Mantiene sincronizados el menú, su estado accesible y el foco del teclado.
export function initNavigation() {
  const english = document.documentElement.lang === "en";
  const button = document.querySelector(".menu-toggle");
  const menu = document.querySelector("#menu");
  if (!button || !menu) return;

  const setOpen = (open) => {
    button.setAttribute("aria-expanded", String(open));
    button.setAttribute(
      "aria-label",
      english
        ? open
          ? "Close menu"
          : "Open menu"
        : open
          ? "Cerrar menú"
          : "Abrir menú",
    );
    menu.classList.toggle("is-open", open);
  };
  button.addEventListener("click", () => {
    setOpen(button.getAttribute("aria-expanded") !== "true");
  });
  menu.addEventListener("click", (event) => {
    if (event.target.closest("a")) setOpen(false);
  });
  document.addEventListener("keydown", (event) => {
    if (
      event.key === "Escape" &&
      button.getAttribute("aria-expanded") === "true"
    ) {
      setOpen(false);
      button.focus();
    }
  });
  document.addEventListener("click", (event) => {
    if (!event.target.closest(".navigation")) setOpen(false);
  });
  matchMedia("(max-width: 1000px)").addEventListener("change", () =>
    setOpen(false),
  );
}
