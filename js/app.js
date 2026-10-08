// Cada módulo mejora una parte de la página; el contenido vive en HTML.
import { initNavigation } from "./navigation.js";
import { initProjects } from "./projects.js";
import { initContact } from "./contact.js";
import { initMotion } from "./motion.js";
import { initLanguages } from "./languages.js";
import { initProfileSharing } from "./share-profile.js";

document.documentElement.classList.add("js");
initNavigation();
initProjects();
initContact();
initMotion();
initLanguages();
initProfileSharing();
