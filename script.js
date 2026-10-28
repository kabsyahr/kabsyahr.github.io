
"use strict";

// =============================
// MOBILE NAVIGATION
// =============================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    const isOpen = navMenu.classList.toggle("open");

    menuToggle.setAttribute("aria-expanded", String(isOpen));
    menuToggle.setAttribute(
      "aria-label",
      isOpen ? "Close navigation" : "Open navigation"
    );
  });

  document.querySelectorAll("#nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
      menuToggle.setAttribute("aria-expanded", "false");
      menuToggle.setAttribute("aria-label", "Open navigation");
    });
  });
}

// =============================
// GITHUB PROJECTS
// =============================

const GITHUB_USERNAME = "kabsyahr";

const EXCLUDED_REPOS = [
  "kabsyahr",
  "kabsyahr.github.io"
];

// =============================
// PROJECT CATEGORY MAP
// =============================

const PROJECT_CATEGORY_MAP = {
  "service-reminder-analytics": "analytics",
  "customer-review-analytics": "analytics",
  "financial-buddy-data-warehouse": "analytics",

  "customer-retention-prediction": "mlcv",
  "bisindo-sign-language-detection": "mlcv",
  "axa-customer-risk-profiling": "mlcv",

  "merdeka-curriculum-sentiment-network-analysis": "nlp",
  "legal-judgment-information-extraction": "nlp",
  "generative-ai-media-framing-analysis": "nlp"
};

// =============================
// CATEGORY LABELS
// =============================

const CATEGORY_LABELS = {
  analytics: "Data Analytics & Business Intelligence",
  mlcv: "Machine Learning & Computer Vision",
  nlp: "Natural Language Processing",
  other: "Data & Technology"
};

// =============================
// PROJECT DESCRIPTIONS
// =============================

const PROJECT_DESCRIPTIONS = {
  "service-reminder-analytics":
    "Operational service reminder analytics combining business rules, XGBoost risk scoring, automation, and Power BI.",

  "customer-retention-prediction":
    "Customer retention prediction for automotive aftersales services using Random Forest, XGBoost, CatBoost, and SHAP.",

  "customer-review-analytics":
    "Automated customer review analytics using sentiment analysis, service classification, multi-aspect analysis, and Power BI.",

  "financial-buddy-data-warehouse":
    "Financial data warehouse and analytics project using MySQL, Pentaho ETL, dimensional modeling, and reporting.",

  "merdeka-curriculum-sentiment-network-analysis":
    "Sentiment and social network analysis of public discussion about the Merdeka Curriculum on X.",

  "legal-judgment-information-extraction":
    "Legal information extraction from Indonesian court decisions using rule-based methods and transformer models.",

  "bisindo-sign-language-detection":
    "Real-time BISINDO alphabet recognition using MediaPipe Hands, TensorFlow, YOLOv8, and Flask.",

  "axa-customer-risk-profiling":
    "Academic insurance customer risk profiling case study comparing classification models and evaluating class-specific performance.",

  "generative-ai-media-framing-analysis":
    "Comparative text mining and media framing analysis of 169 Generative AI news articles across three Indonesian online news outlets."
};

// =============================
// FALLBACK PROJECTS
// =============================

const FALLBACK_PROJECTS = [
  {
    name: "service-reminder-analytics",
    description: PROJECT_DESCRIPTIONS["service-reminder-analytics"],
    html_url: "https://github.com/kabsyahr/service-reminder-analytics",
    language: "Python",
    topics: ["business-analytics", "power-bi", "xgboost"]
  },
  {
    name: "customer-review-analytics",
    description: PROJECT_DESCRIPTIONS["customer-review-analytics"],
    html_url: "https://github.com/kabsyahr/customer-review-analytics",
    language: "Python",
    topics: ["power-bi", "customer-analytics", "dashboard"]
  },
  {
    name: "financial-buddy-data-warehouse",
    description: PROJECT_DESCRIPTIONS["financial-buddy-data-warehouse"],
    html_url: "https://github.com/kabsyahr/financial-buddy-data-warehouse",
    language: "SQL",
    topics: ["data-warehouse", "etl", "mysql"]
  },
  {
    name: "customer-retention-prediction",
    description: PROJECT_DESCRIPTIONS["customer-retention-prediction"],
    html_url: "https://github.com/kabsyahr/customer-retention-prediction",
    language: "Python",
    topics: ["machine-learning", "xgboost", "customer-retention"]
  },
  {
    name: "bisindo-sign-language-detection",
    description: PROJECT_DESCRIPTIONS["bisindo-sign-language-detection"],
    html_url: "https://github.com/kabsyahr/bisindo-sign-language-detection",
    language: "Python",
    topics: ["computer-vision", "mediapipe", "yolo", "tensorflow"]
  },
  {
    name: "axa-customer-risk-profiling",
    description: PROJECT_DESCRIPTIONS["axa-customer-risk-profiling"],
    html_url: "https://github.com/kabsyahr/axa-customer-risk-profiling",
    language: "Jupyter Notebook",
    topics: ["machine-learning", "risk-profiling", "classification"]
  },
  {
    name: "merdeka-curriculum-sentiment-network-analysis",
    description:
      PROJECT_DESCRIPTIONS["merdeka-curriculum-sentiment-network-analysis"],
    html_url:
      "https://github.com/kabsyahr/merdeka-curriculum-sentiment-network-analysis",
    language: "Python",
    topics: ["nlp", "sentiment-analysis", "social-network-analysis"]
  },
  {
    name: "legal-judgment-information-extraction",
    description:
      PROJECT_DESCRIPTIONS["legal-judgment-information-extraction"],
    html_url:
      "https://github.com/kabsyahr/legal-judgment-information-extraction",
    language: "Python",
    topics: ["nlp", "bert", "information-extraction"]
  },
  {
    name: "generative-ai-media-framing-analysis",
    description:
      PROJECT_DESCRIPTIONS["generative-ai-media-framing-analysis"],
    html_url:
      "https://github.com/kabsyahr/generative-ai-media-framing-analysis",
    language: "Jupyter Notebook",
    topics: ["text-mining", "nlp", "media-analysis"]
  }
];

// =============================
// AUTO CATEGORY DETECTION
// =============================

function detectCategory(repo) {
  if (PROJECT_CATEGORY_MAP[repo.name]) {
    return PROJECT_CATEGORY_MAP[repo.name];
  }

  const topics = Array.isArray(repo.topics) ? repo.topics : [];

  const combinedText = [
    repo.name,
    repo.description || "",
    ...topics
  ]
    .join(" ")
    .toLowerCase();

  // Natural Language Processing
  if (
    combinedText.includes("nlp") ||
    combinedText.includes("bert") ||
    combinedText.includes("sentiment") ||
    combinedText.includes("text-mining") ||
    combinedText.includes("text-classification") ||
    combinedText.includes("information-extraction") ||
    combinedText.includes("language-model") ||
    combinedText.includes("transformer")
  ) {
    return "nlp";
  }

  // Machine Learning & Computer Vision
  if (
    combinedText.includes("machine-learning") ||
    combinedText.includes("deep-learning") ||
    combinedText.includes("xgboost") ||
    combinedText.includes("catboost") ||
    combinedText.includes("random-forest") ||
    combinedText.includes("tensorflow") ||
    combinedText.includes("computer-vision") ||
    combinedText.includes("opencv") ||
    combinedText.includes("mediapipe") ||
    combinedText.includes("yolo") ||
    combinedText.includes("image-classification")
  ) {
    return "mlcv";
  }

  // Data Analytics & Business Intelligence
  if (
    combinedText.includes("power-bi") ||
    combinedText.includes("dashboard") ||
    combinedText.includes("business-intelligence") ||
    combinedText.includes("data-analysis") ||
    combinedText.includes("analytics") ||
    combinedText.includes("business-analytics") ||
    combinedText.includes("data-warehouse") ||
    combinedText.includes("etl") ||
    combinedText.includes("mysql") ||
    combinedText.includes("reporting")
  ) {
    return "analytics";
  }

  return "other";
}

// =============================
// FORMAT REPOSITORY NAME
// =============================

function formatRepoName(name) {
  return name
    .split("-")
    .map((word) => {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

// =============================
// HTML ESCAPING
// =============================

function escapeHTML(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => {
    const replacements = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;"
    };

    return replacements[character];
  });
}

// =============================
// PROJECT CARD
// =============================

function createProjectCard(repo) {
  const category = detectCategory(repo);

  const description =
    PROJECT_DESCRIPTIONS[repo.name] ||
    repo.description ||
    "Data and technology project available on GitHub.";

  const language = repo.language || "Repository";

  const repositoryURL =
    typeof repo.html_url === "string" &&
    /^https:\/\/github\.com\//i.test(repo.html_url)
      ? repo.html_url
      : `https://github.com/${GITHUB_USERNAME}`;

  return `
    <article
      class="repo-card"
      data-category="${escapeHTML(category)}"
    >

      <p class="repo-category">
        ${escapeHTML(CATEGORY_LABELS[category])}
      </p>

      <h3>
        ${escapeHTML(formatRepoName(repo.name))}
      </h3>

      <p>
        ${escapeHTML(description)}
      </p>

      <div class="repo-footer">

        <span class="repo-tech">
          ${escapeHTML(language)}
        </span>

        <a
          href="${escapeHTML(repositoryURL)}"
          target="_blank"
          rel="noopener noreferrer"
          class="repo-link"
        >
          View Project →
        </a>

      </div>

    </article>
  `;
}

// =============================
// RENDER PROJECTS
// =============================

function renderProjects(projects) {
  const container = document.getElementById("all-projects-grid");

  if (!container) {
    return;
  }

  container.innerHTML = projects.map(createProjectCard).join("");

  applyProjectFilter();
}

// =============================
// LOAD REPOSITORIES
// =============================

async function loadProjects() {
  const container = document.getElementById("all-projects-grid");

  if (!container) {
    return;
  }

  try {
    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    );

    if (!response.ok) {
      throw new Error(
        `GitHub API request failed with status ${response.status}.`
      );
    }

    const repos = await response.json();

    if (!Array.isArray(repos)) {
      throw new Error("Unexpected GitHub API response.");
    }

    const filteredRepos = repos
      .filter((repo) => {
        return (
          !EXCLUDED_REPOS.includes(repo.name) &&
          !repo.fork &&
          !repo.archived
        );
      })
      .sort((a, b) => {
        const aKnown = PROJECT_CATEGORY_MAP[a.name] ? 1 : 0;
        const bKnown = PROJECT_CATEGORY_MAP[b.name] ? 1 : 0;

        if (aKnown !== bKnown) {
          return bKnown - aKnown;
        }

        return (
          new Date(b.updated_at || 0) -
          new Date(a.updated_at || 0)
        );
      });

    if (filteredRepos.length === 0) {
      console.warn(
        "GitHub returned no public projects. Using fallback projects."
      );

      renderProjects(FALLBACK_PROJECTS);
      return;
    }

    renderProjects(filteredRepos);

  } catch (error) {
    console.error(
      "GitHub API failed. Showing fallback projects.",
      error
    );

    renderProjects(FALLBACK_PROJECTS);
  }
}

// =============================
// PROJECT FILTERS
// =============================

function applyProjectFilter() {
  const activeButton = document.querySelector(
    ".filter-btn.active"
  );

  const filter = activeButton
    ? activeButton.dataset.filter
    : "all";

  document.querySelectorAll(".repo-card").forEach((card) => {
    card.style.display =
      filter === "all" || card.dataset.category === filter
        ? "flex"
        : "none";
  });
}

function initializeFilters() {
  const buttons = document.querySelectorAll(".filter-btn");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });

      button.classList.add("active");
      applyProjectFilter();
    });
  });

  applyProjectFilter();
}

// =============================
// UNIVERSAL DOCUMENT MODAL
// =============================

const documentModal = document.getElementById("document-modal");
const documentPdfViewer =
  document.getElementById("document-pdf-viewer");
const documentImageViewer =
  document.getElementById("document-image-viewer");
const documentModalTitle =
  document.getElementById("document-modal-title");
const documentModalClose =
  document.getElementById("document-modal-close");

let activeGalleryItems = [];
let activeGalleryIndex = -1;
let previousFocusedElement = null;
let previousBodyOverflow = "";

// =============================
// OPEN DOCUMENT / IMAGE
// =============================

function openDocumentModal(file, title, galleryItems = [], galleryIndex = -1) {
  if (
    !documentModal ||
    !documentPdfViewer ||
    !documentImageViewer ||
    !documentModalTitle
  ) {
    return;
  }

  if (!file) {
    return;
  }

  const cleanFile = file.split("?")[0].split("#")[0];
  const extension = cleanFile.split(".").pop().toLowerCase();

  const isPdf = extension === "pdf";

  const isImage = [
    "png",
    "jpg",
    "jpeg",
    "webp",
    "gif",
    "avif"
  ].includes(extension);

  if (!isPdf && !isImage) {
    window.open(file, "_blank", "noopener,noreferrer");
    return;
  }

  if (!documentModal.classList.contains("open")) {
    previousFocusedElement = document.activeElement;
    previousBodyOverflow = document.body.style.overflow;
  }

  documentPdfViewer.style.display = "none";
  documentImageViewer.style.display = "none";

  documentPdfViewer.src = "";
  documentImageViewer.removeAttribute("src");

  activeGalleryItems = galleryItems;
  activeGalleryIndex = galleryIndex;

  if (isPdf) {
    documentPdfViewer.src = file;
    documentPdfViewer.style.display = "block";
  }

  if (isImage) {
    documentImageViewer.src = file;
    documentImageViewer.alt = title || "Image preview";
    documentImageViewer.style.display = "block";
  }

  documentModalTitle.textContent = title || "Document Preview";

  documentModal.classList.add("open");
  documentModal.setAttribute("role", "dialog");
  documentModal.setAttribute("aria-modal", "true");
  documentModal.setAttribute(
    "aria-label",
    title || "Document Preview"
  );

  document.body.style.overflow = "hidden";

  if (documentModalClose) {
    documentModalClose.focus();
  }
}

// =============================
// CLOSE DOCUMENT MODAL
// =============================

function closeDocumentModal() {
  if (
    !documentModal ||
    !documentPdfViewer ||
    !documentImageViewer
  ) {
    return;
  }

  documentModal.classList.remove("open");

  documentPdfViewer.src = "";
  documentImageViewer.removeAttribute("src");

  documentPdfViewer.style.display = "none";
  documentImageViewer.style.display = "none";

  activeGalleryItems = [];
  activeGalleryIndex = -1;

  document.body.style.overflow = previousBodyOverflow;

  if (
    previousFocusedElement &&
    typeof previousFocusedElement.focus === "function"
  ) {
    previousFocusedElement.focus();
  }

  previousFocusedElement = null;
}

// =============================
// ORGANIZATION GALLERY
// =============================

function getGalleryItems(gallery) {
  return Array.from(
    gallery.querySelectorAll(".organization-photo[data-file]")
  ).map((button) => {
    return {
      file: button.dataset.file,
      title: button.dataset.title || "Activity Documentation"
    };
  });
}

function openGalleryPhoto(button) {
  const gallery = button.closest(".organization-gallery");

  if (!gallery) {
    openDocumentModal(
      button.dataset.file,
      button.dataset.title
    );

    return;
  }

  const buttons = Array.from(
    gallery.querySelectorAll(".organization-photo[data-file]")
  );

  const galleryItems = getGalleryItems(gallery);
  const clickedIndex = buttons.indexOf(button);

  if (clickedIndex < 0) {
    return;
  }

  const selectedPhoto = galleryItems[clickedIndex];

  openDocumentModal(
    selectedPhoto.file,
    selectedPhoto.title,
    galleryItems,
    clickedIndex
  );
}

// =============================
// GALLERY NAVIGATION
// =============================

function navigateGallery(direction) {
  if (
    !documentModal ||
    !documentModal.classList.contains("open") ||
    activeGalleryItems.length < 2 ||
    activeGalleryIndex < 0
  ) {
    return;
  }

  const nextIndex =
    (
      activeGalleryIndex +
      direction +
      activeGalleryItems.length
    ) % activeGalleryItems.length;

  const nextPhoto = activeGalleryItems[nextIndex];

  // Preserve the gallery array before updating modal state.
  const galleryItems = activeGalleryItems;

  openDocumentModal(
    nextPhoto.file,
    nextPhoto.title,
    galleryItems,
    nextIndex
  );
}

// =============================
// DOCUMENT BUTTONS & THUMBNAILS
// =============================

function initializeDocumentLinks() {
  document.querySelectorAll(".document-link").forEach((button) => {
    button.addEventListener("click", () => {
      const file = button.dataset.file;
      const title = button.dataset.title;

      if (!file) {
        return;
      }

      if (button.classList.contains("organization-photo")) {
        openGalleryPhoto(button);
      } else {
        openDocumentModal(file, title);
      }
    });
  });
}

// =============================
// MODAL CLOSE EVENTS
// =============================

if (documentModalClose) {
  documentModalClose.addEventListener(
    "click",
    closeDocumentModal
  );
}

if (documentModal) {
  documentModal.addEventListener("click", (event) => {
    if (event.target === documentModal) {
      closeDocumentModal();
    }
  });
}

// =============================
// KEYBOARD CONTROLS
// =============================

document.addEventListener("keydown", (event) => {
  if (
    !documentModal ||
    !documentModal.classList.contains("open")
  ) {
    return;
  }

  if (event.key === "Escape") {
    event.preventDefault();
    closeDocumentModal();
    return;
  }

  if (event.key === "ArrowRight") {
    // Do not hijack arrow keys from an embedded PDF viewer.
    if (activeGalleryItems.length > 1) {
      event.preventDefault();
      navigateGallery(1);
    }
    return;
  }

  if (event.key === "ArrowLeft") {
    if (activeGalleryItems.length > 1) {
      event.preventDefault();
      navigateGallery(-1);
    }
    return;
  }

  // Keep keyboard focus inside the modal.
  if (event.key === "Tab" && documentModalClose) {
    const focusableElements = Array.from(
      documentModal.querySelectorAll(
        'button:not([disabled]), a[href], [tabindex]:not([tabindex="-1"])'
      )
    ).filter((element) => element.getClientRects().length > 0);

    if (focusableElements.length === 0) {
      return;
    }

    const firstElement = focusableElements[0];
    const lastElement = focusableElements[
      focusableElements.length - 1
    ];

    if (event.shiftKey && document.activeElement === firstElement) {
      event.preventDefault();
      lastElement.focus();
    } else if (
      !event.shiftKey &&
      document.activeElement === lastElement
    ) {
      event.preventDefault();
      firstElement.focus();
    }
  }
});

// =============================
// INITIALIZE
// =============================

initializeFilters();
initializeDocumentLinks();
loadProjects();
