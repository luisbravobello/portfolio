// Las traducciones viven en HTML. El selector solo conserva la sección actual.
export function initLanguages() {
  const menu = document.querySelector(".language-menu");
  if (!menu) return;
  const links = [...menu.querySelectorAll("a")];
  const updateLinks = () =>
    links.forEach((link) => {
      const url = new URL(link.href);
      url.hash = location.hash;
      url.search = location.search;
      link.href = url.href;
    });
  updateLinks();
  window.addEventListener("hashchange", updateLinks);
  document.addEventListener("click", (event) => {
    if (!menu.contains(event.target)) menu.open = false;
  });
  document.addEventListener("keydown", (event) => {
    if (event.key === "Escape" && menu.open) {
      menu.open = false;
      menu.querySelector("summary").focus();
    }
  });
}
