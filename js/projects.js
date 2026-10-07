// Filtra las tarjetas existentes: no construye contenido ni consulta una API.
export function initProjects() {
  const filters = document.querySelector(".project-filters");
  if (!filters) return;
  const cards = [...document.querySelectorAll(".project-card")];
  const status = document.querySelector("#filter-status");
  filters.hidden = false;
  filters.addEventListener("click", (event) => {
    const button = event.target.closest("[data-filter]");
    if (!button) return;
    filters.querySelectorAll("button").forEach((item) => {
      item.setAttribute("aria-pressed", String(item === button));
    });
    let visible = 0;
    cards.forEach((card) => {
      card.hidden =
        button.dataset.filter !== "all" &&
        card.dataset.category !== button.dataset.filter;
      if (!card.hidden) {
        card.classList.add("is-visible");
        visible++;
      }
    });
    status.textContent =
      document.documentElement.lang === "en"
        ? `${visible} ${visible === 1 ? "project shown" : "projects shown"}.`
        : `${visible} ${visible === 1 ? "proyecto mostrado" : "proyectos mostrados"}.`;
  });
}
