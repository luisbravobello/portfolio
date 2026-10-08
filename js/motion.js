// Aparición al desplazarse: una vez por elemento y con retrasos cortos entre tarjetas.
export function initMotion() {
  const preference = matchMedia('(prefers-reduced-motion: reduce)');
  if (preference.matches || !('IntersectionObserver' in window)) return;
  const elements = [...document.querySelectorAll(
    '[data-reveal], .section-heading, .certificate-card, .case-story article, .next-project, .article-body > section'
  )];
  // El escalonado se limita a la fila: no acumula retrasos en listas largas.
  document.querySelectorAll('.project-grid, .skills-grid, .articles-grid, .certificates-grid').forEach(grid => {
    const columns = getComputedStyle(grid).gridTemplateColumns.split(' ').length;
    [...grid.children].forEach((card, index) => {
      card.style.setProperty('--reveal-delay', `${(index % columns) * 65}ms`);
    });
  });
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        entry.target.classList.add("is-visible");
        observer.unobserve(entry.target);
      });
    },
    { threshold: 0.08, rootMargin: '0px 0px -24px 0px' },
  );
  elements.forEach((element) => {
    // La parte visible al cargar no espera una animación para poder leerse.
    if (element.getBoundingClientRect().top < innerHeight) return;
    element.classList.add("reveal-ready");
    element.addEventListener('focusin', () => {
      element.style.setProperty('--reveal-delay', '0ms');
      element.classList.add('is-visible');
      observer.unobserve(element);
    }, { once: true });
    observer.observe(element);
  });
  // Si la persona cambia su preferencia, mostrar inmediatamente todo el contenido.
  preference.addEventListener('change', event => {
    if (!event.matches) return;
    observer.disconnect();
    elements.forEach(element => element.classList.add('is-visible'));
  });
}
