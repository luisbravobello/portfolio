# Luis Bravo · Portafolio profesional

Portafolio de **Luis Alejandro Bravo Bello**, desarrollador Full Stack y estudiante de Ingeniería de Software en la Universidad Central del Este. Presenta tres proyectos publicados, su fotografía, tecnologías y enlaces de contacto.

## Proyectos

| Proyecto | Sitio | Código |
| --- | --- | --- |
| FULL TIME | [Visitar](https://full-time-edb.pages.dev/) | [Repositorio](https://github.com/luisbravobello/full-time) |
| Costa Clara | [Visitar](https://costa-clara.pages.dev/) | [Repositorio](https://github.com/luisbravobello/costa-clara) |
| PokéAtlas | [Visitar](https://pokeatlas.pages.dev/) | [Repositorio](https://github.com/luisbravobello/pokeatlas) |

Los sitios respondieron HTTP 200 al capturar sus portadas. Los repositorios se consultaron en la API pública de GitHub. Costa Clara es una propuesta con marca e inventario de ejemplo.

## Estructura

Ahora incluye **22 páginas HTML**: once en español y once en inglés. Cada idioma tiene la portada, tres proyectos, CV, certificados, índice de artículos, tres artículos y una página para compartir LinkedIn mediante QR.

Los siete documentos de formación se conservan como PDF originales en `downloads/certificados/`. Se distingue certificado de finalización, constancia de participación y certificado de asistencia según el documento. Los títulos ingleses son traducciones descriptivas; los originales siguen en español.

```text
portfolio/
├── index.html
├── pages/                      # Un caso de estudio por proyecto
│   ├── full-time.html
│   ├── costa-clara.html
│   └── pokeatlas.html
│   # También: cv.html, certificados.html, articulos.html y articulos/*.html
├── en/                         # Versiones completas en inglés
├── downloads/
│   ├── luis-bravo-cv-es.pdf
│   ├── luis-bravo-cv-en.pdf
│   └── certificados/           # 7 PDF originales
├── assets/
│   └── style.css               # Estilos segmentados por componente
├── images/                     # Foto, capturas, favicon y portada social
├── js/
│   ├── app.js                  # Inicializa los módulos
│   ├── navigation.js           # Menú móvil y teclado
│   ├── projects.js             # Filtros sobre tarjetas HTML
│   ├── contact.js              # Copiar el correo
│   └── motion.js               # Aparición al desplazarse
│   # También: languages.js, comportamiento del selector de idioma
├── scripts/
│   └── preparar-publicacion.cjs
├── docs/
│   └── FUENTES.md
├── robots.txt
├── _headers
└── _redirects
```

## Abrir localmente

Abre esta carpeta con VS Code y sirve `index.html` mediante Live Server. Usa un servidor HTTP: los módulos de JavaScript necesitan ese entorno. No requiere frameworks, instalación de dependencias ni compilación.

## Cómo está construido

1. **HTML:** contenido, navegación, proyectos, enlaces y jerarquía de títulos. Las páginas y tarjetas están escritas en HTML y se pueden consultar sin JavaScript.
2. **CSS:** retícula con Grid, colores, tipografía, escala de espaciado y adaptación al móvil. Los estilos están comentados por sección.
3. **JavaScript:** módulos pequeños para menú, filtros, copia del correo y animaciones. Se respeta `prefers-reduced-motion`.

Las imágenes son locales y se sirven en WebP. La foto original del autor se conserva en su ubicación original; aquí se incluye una copia optimizada. Las fuentes Manrope y DM Sans se cargan desde Google Fonts.

## Publicar en Cloudflare Pages

La carpeta de salida es `portfolio` si publicas este contenido en la raíz de un repositorio. En una carga directa, sube **el contenido de esta carpeta**. El sitio es estático y no necesita comando de compilación.

Cuando Cloudflare asigne la URL real, ejecuta desde esta carpeta:

```sh
node scripts/preparar-publicacion.cjs https://tu-proyecto.pages.dev
```

Sustituye la URL de ejemplo por la asignada al portafolio. Vuelve a publicar para incluir canonical, hreflang ES/EN y x-default, imágenes sociales por idioma, sitemap de 22 páginas y robots actualizado. El script descubre los HTML y se puede ejecutar de nuevo al cambiar de dominio.

Antes de conocer esa URL no se declara un dominio supuesto. La imagen para compartir ya está creada en `images/social-cover.jpg`.

Después de publicar, verifica ambos idiomas, las descargas y las portadas sociales. Puedes añadir la propiedad a Google Search Console y enviar `sitemap.xml`. Las buenas prácticas facilitan la comprensión del sitio; no garantizan una posición en Google.

## Editar el contenido

- Actualiza los textos y enlaces en sus HTML españoles e ingleses.
- Modifica colores y tipografías en las variables de `assets/style.css`.
- Para añadir un proyecto o artículo, crea las tarjetas y sus páginas en ambos idiomas. El script de publicación descubre las nuevas rutas automáticamente.
- El contacto utiliza el correo real del autor. No hay formulario que simule un envío.

## CV, idiomas y artículos

El CV se descarga desde la portada, el menú o su página web. Ambos PDF están organizados en dos columnas y una sola página, con fotografía, texto seleccionable, contacto, formación, experiencia práctica en proyectos, tecnologías, certificados, competencias personales, español nativo y referencias personales. No se han añadido puestos laborales ni fechas de estudios no proporcionadas. La experiencia corresponde a los proyectos del estudiante.

El selector con globo usa enlaces reales a la misma página en el otro idioma. JavaScript conserva el fragmento y parámetros de la URL; no traduce contenido en tiempo de ejecución ni redirige automáticamente.

Los artículos explican HTML semántico, módulos JavaScript y estados de consultas con `fetch`. Incluyen ejemplos estáticos, fuentes oficiales y enlace al proyecto relacionado. La consulta de Pikachu usada como ejemplo se verificó en PokéAPI. Los ejemplos no se ejecutan automáticamente en el navegador del visitante.

## QR de LinkedIn

El enlace «Mi QR de LinkedIn» aparece en la presentación, el contacto y el footer. Con JavaScript abre un diálogo nativo que se cierra con Escape; sin JavaScript navega a `pages/compartir.html` o su versión inglesa.

El QR apunta exclusivamente a `https://www.linkedin.com/in/luis-alejandro-bravo-bello-94606535a/`. Los archivos `images/linkedin-qr.svg` y `images/linkedin-qr.png` son locales: no se envía el enlace a un servicio externo para generar la imagen. Incluyen margen blanco y contraste negro/blanco para facilitar la lectura.

La página permite abrir LinkedIn, copiar el enlace y descargar el QR como PNG o SVG. El código se verificó mediante un decodificador en tres tamaños. No cambia según el idioma y no requiere tener publicado el portafolio para poder escanearlo.

## Referencias

Consulta [la documentación y las fuentes](docs/FUENTES.md) para las decisiones de estructura, accesibilidad y SEO.
