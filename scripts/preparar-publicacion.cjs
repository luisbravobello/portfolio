const fs = require("node:fs");
const path = require("node:path");
const root = path.resolve(__dirname, "..");
const input = process.argv[2];
if (!input)
  throw new Error(
    "Indica la URL pública: node scripts/preparar-publicacion.cjs https://tu-proyecto.pages.dev",
  );
const url = new URL(input);
if (
  url.protocol !== "https:" ||
  url.pathname !== "/" ||
  url.search ||
  url.hash ||
  url.username ||
  url.password ||
  /^(localhost|127\.|0\.)/.test(url.hostname)
)
  throw new Error(
    "Usa una URL HTTPS pública sin rutas, parámetros ni credenciales.",
  );
const origin = url.origin;
const files = [];
function scan(folder) {
  for (const entry of fs.readdirSync(folder, { withFileTypes: true })) {
    const file = path.join(folder, entry.name);
    if (entry.isDirectory()) scan(file);
    else if (entry.name.endsWith(".html"))
      files.push(path.relative(root, file).split(path.sep).join("/"));
  }
}
scan(root);
const publicUrl = (file) =>
  origin +
  "/" +
  file.replace(/(^|\/)index\.html$/, "$1").replace(/\.html$/, "");
const routes = [];
for (const file of files) {
  const english = file.startsWith("en/");
  const spanish = english ? file.slice(3) : file;
  const counterpart = "en/" + spanish;
  const target = path.join(root, file);
  const canonical = publicUrl(file);
  let html = fs
    .readFileSync(target, "utf8")
    .replace(/\s*<(?:link|meta)[^>]*data-publication="true"[^>]*>/g, "");
  const cover = english ? "social-cover-en.jpg" : "social-cover.jpg";
  const tags = [
    `<link data-publication="true" rel="canonical" href="${canonical}">`,
    `<meta data-publication="true" property="og:url" content="${canonical}">`,
    `<meta data-publication="true" property="og:image" content="${origin}/images/${cover}">`,
    '<meta data-publication="true" property="og:image:width" content="1200">',
    '<meta data-publication="true" property="og:image:height" content="630">',
    `<meta data-publication="true" property="og:image:alt" content="Luis Bravo - ${english ? "Full Stack Developer. Web project portfolio." : "Desarrollador Full Stack. Portafolio de proyectos web."}">`,
    `<meta data-publication="true" name="twitter:image" content="${origin}/images/${cover}">`,
  ];
  if (files.includes(spanish) && files.includes(counterpart)) {
    for (const [language, route] of [
      ["es", spanish],
      ["en", counterpart],
      ["x-default", spanish],
    ])
      tags.push(
        `<link data-publication="true" rel="alternate" hreflang="${language}" href="${publicUrl(route)}">`,
      );
  }
  html = html.replace("</head>", tags.join("\n") + "\n</head>");
  html = html.replace(
    /(<script type="application\/ld\+json">)([\s\S]*?)(<\/script>)/g,
    (_, open, json, close) => {
      const data = JSON.parse(json);
      if (data["@type"] === "Person") {
        data.url = publicUrl(english ? "en/index.html" : "index.html");
        data.image = origin + "/images/luis-bravo.webp";
      } else if (data["@type"] === "TechArticle") {
        data.url = canonical;
        data.mainEntityOfPage = canonical;
        data.author.url = publicUrl(english ? "en/index.html" : "index.html");
      }
      return open + JSON.stringify(data) + close;
    },
  );
  fs.writeFileSync(target, html);
  routes.push(canonical);
}
fs.writeFileSync(
  path.join(root, "sitemap.xml"),
  `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${routes.map((route) => `<url><loc>${route}</loc></url>`).join("\n")}\n</urlset>\n`,
);
fs.writeFileSync(
  path.join(root, "robots.txt"),
  `User-agent: *\nAllow: /\nSitemap: ${origin}/sitemap.xml\n`,
);
console.log(
  `SEO preparado: ${files.length} páginas, ES/EN hreflang, canonical, sitemap y portadas sociales.`,
);
