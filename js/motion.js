// Animación de entrada discreta. Respeta la preferencia de movimiento reducido.
export function initMotion() {
  if (
    matchMedia("(prefers-reduced-motion: reduce)").matches ||
    !("IntersectionObserver" in window)
  )
    return;
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08 },
  );
  document.querySelectorAll("[data-reveal]").forEach((element) => {
    // La parte visible al cargar no espera una animación para poder leerse.
    if (element.getBoundingClientRect().top < innerHeight) return;
    element.classList.add("reveal-ready");
    element.addEventListener("focusin", () =>
      element.classList.add("is-visible"),
    );
    observer.observe(element);
  });
}
