// Entrada visual breve. El contenido permanece disponible y no espera recursos.
export function initIntro() {
  const intro = document.querySelector('.brand-intro');
  if (!intro || matchMedia('(prefers-reduced-motion: reduce)').matches) return;
  // Mostrar una vez por pestaña, evitando repetirla al volver a la portada.
  try {
    if (sessionStorage.getItem('portfolio-intro-seen')) return;
    sessionStorage.setItem('portfolio-intro-seen', 'true');
  } catch {
    // La animación también funciona si el navegador bloquea el almacenamiento.
  }
  intro.hidden = false;
  let timer;
  const finish = () => {
    intro.hidden = true;
    clearTimeout(timer);
    document.removeEventListener('keydown', finish);
    document.removeEventListener('pointerdown', finish);
    document.removeEventListener('wheel', finish);
  };
  document.addEventListener('keydown', finish, { once: true });
  document.addEventListener('pointerdown', finish, { once: true });
  document.addEventListener('wheel', finish, { once: true });
  timer = setTimeout(finish, 1400);
}
