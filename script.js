// =============================
// MOBILE NAVIGATION
// =============================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

if (menuToggle && navMenu) {
  menuToggle.addEventListener("click", () => {
    navMenu.classList.toggle("open");
  });

  document.querySelectorAll("#nav-menu a").forEach((link) => {
    link.addEventListener("click", () => {
      navMenu.classList.remove("open");
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

  "merdeka-curriculum-sentiment-network-analysis": "nlp",

  "legal-judgment-information-extraction": "nlp"

};


// =============================
// CATEGORY LABELS
// =============================

const CATEGORY_LABELS = {

  analytics:
    "Data Analytics & Business Intelligence",

  mlcv:
    "Machine Learning & Computer Vision",

  nlp:
    "Natural Language Processing",

  other:
    "Data & Technology"

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
    "Real-time BISINDO alphabet recognition using MediaPipe Hands, TensorFlow, YOLOv8, and Flask."

};


// =============================
// FALLBACK PROJECTS
// =============================

const FALLBACK_PROJECTS = [

  {
    name: "service-reminder-analytics",

    description:
      "Operational service reminder analytics combining business rules, XGBoost risk scoring, automation, and Power BI.",

    html_url:
      "https://github.com/kabsyahr/service-reminder-analytics",

    language: "Python",

    topics: [
      "business-analytics",
      "power-bi",
      "xgboost"
    ]
  },


  {
    name: "customer-review-analytics",

    description:
      "Automated customer review analytics using sentiment analysis, service classification, multi-aspect analysis, and Power BI.",

    html_url:
      "https://github.com/kabsyahr/customer-review-analytics",

    language: "Python",

    topics: [
      "power-bi",
      "customer-analytics",
      "dashboard"
    ]
  },


  {
    name: "financial-buddy-data-warehouse",

    description:
      "Financial data warehouse and analytics project using MySQL, Pentaho ETL, dimensional modeling, and reporting.",

    html_url:
      "https://github.com/kabsyahr/financial-buddy-data-warehouse",

    language: "SQL",

    topics: [
      "data-warehouse",
      "etl",
      "mysql"
    ]
  },


  {
    name: "customer-retention-prediction",

    description:
      "Customer retention prediction for automotive aftersales services using Random Forest, XGBoost, CatBoost, and SHAP.",

    html_url:
      "https://github.com/kabsyahr/customer-retention-prediction",

    language: "Python",

    topics: [
      "machine-learning",
      "xgboost",
      "customer-retention"
    ]
  },


  {
    name: "bisindo-sign-language-detection",

    description:
      "Real-time BISINDO alphabet recognition using MediaPipe Hands, TensorFlow, YOLOv8, and Flask.",

    html_url:
      "https://github.com/kabsyahr/bisindo-sign-language-detection",

    language: "Python",

    topics: [
      "computer-vision",
      "mediapipe",
      "yolo",
      "tensorflow"
    ]
  },


  {
    name: "merdeka-curriculum-sentiment-network-analysis",

    description:
      "Sentiment and social network analysis of public discussion about the Merdeka Curriculum on X.",

    html_url:
      "https://github.com/kabsyahr/merdeka-curriculum-sentiment-network-analysis",

    language: "Python",

    topics: [
      "nlp",
      "sentiment-analysis",
      "social-network-analysis"
    ]
  },


  {
    name: "legal-judgment-information-extraction",

    description:
      "Legal information extraction from Indonesian court decisions using rule-based methods and transformer models.",

    html_url:
      "https://github.com/kabsyahr/legal-judgment-information-extraction",

    language: "Python",

    topics: [
      "nlp",
      "bert",
      "information-extraction"
    ]
  }

];


// =============================
// AUTO CATEGORY DETECTION
// =============================

function detectCategory(repo) {

  if (PROJECT_CATEGORY_MAP[repo.name]) {
    return PROJECT_CATEGORY_MAP[repo.name];
  }

  const topics = repo.topics || [];

  const combinedText = [
    repo.name,
    repo.description || "",
    ...topics
  ]
    .join(" ")
    .toLowerCase();


  // NATURAL LANGUAGE PROCESSING

  if (
    combinedText.includes("nlp") ||
    combinedText.includes("bert") ||
    combinedText.includes("sentiment") ||
    combinedText.includes("text-classification") ||
    combinedText.includes("information-extraction") ||
    combinedText.includes("language-model") ||
    combinedText.includes("transformer")
  ) {
    return "nlp";
  }


  // MACHINE LEARNING & COMPUTER VISION

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


  // DATA ANALYTICS & BUSINESS INTELLIGENCE

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
// PROJECT CARD
// =============================

function createProjectCard(repo) {

  const category = detectCategory(repo);

  const description =
    PROJECT_DESCRIPTIONS[repo.name] ||
    repo.description ||
    "Data and technology project available on GitHub.";

  const language =
    repo.language ||
    "Repository";

  return `
    <article
      class="repo-card"
      data-category="${category}"
    >

      <p class="repo-category">
        ${CATEGORY_LABELS[category]}
      </p>

      <h3>
        ${formatRepoName(repo.name)}
      </h3>

      <p>
        ${description}
      </p>

      <div class="repo-footer">

        <span class="repo-tech">
          ${language}
        </span>

        <a
          href="${repo.html_url}"
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

  const container =
    document.getElementById("all-projects-grid");

  if (!container) {
    return;
  }

  container.innerHTML =
    projects
      .map(createProjectCard)
      .join("");

  initializeFilters();
}


// =============================
// LOAD REPOSITORIES
// =============================

async function loadProjects() {

  const container =
    document.getElementById("all-projects-grid");

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


    const filteredRepos = repos
      .filter((repo) => {

        return (
          !EXCLUDED_REPOS.includes(repo.name) &&
          !repo.fork &&
          !repo.archived
        );

      })
      .sort((a, b) => {

        const aKnown =
          PROJECT_CATEGORY_MAP[a.name] ? 1 : 0;

        const bKnown =
          PROJECT_CATEGORY_MAP[b.name] ? 1 : 0;


        if (aKnown !== bKnown) {
          return bKnown - aKnown;
        }


        return (
          new Date(b.updated_at) -
          new Date(a.updated_at)
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

  }

  catch (error) {

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

function initializeFilters() {

  const buttons =
    document.querySelectorAll(".filter-btn");


  buttons.forEach((button) => {

    if (button.dataset.initialized === "true") {
      return;
    }

    button.dataset.initialized = "true";


    button.addEventListener("click", () => {

      buttons.forEach((btn) => {
        btn.classList.remove("active");
      });


      button.classList.add("active");


      const filter =
        button.dataset.filter;


      const cards =
        document.querySelectorAll(".repo-card");


      cards.forEach((card) => {

        if (
          filter === "all" ||
          card.dataset.category === filter
        ) {
          card.style.display = "flex";
        }

        else {
          card.style.display = "none";
        }

      });

    });

  });

}


// =============================
// UNIVERSAL DOCUMENT MODAL
// =============================

const documentModal =
  document.getElementById("document-modal");

const documentPdfViewer =
  document.getElementById("document-pdf-viewer");

const documentImageViewer =
  document.getElementById("document-image-viewer");

const documentModalTitle =
  document.getElementById("document-modal-title");

const documentModalClose =
  document.getElementById("document-modal-close");


function openDocumentModal(file, title) {

  if (
    !documentModal ||
    !documentPdfViewer ||
    !documentImageViewer ||
    !documentModalTitle
  ) {
    return;
  }


  const cleanFile =
    file.split("?")[0];

  const extension =
    cleanFile
      .split(".")
      .pop()
      .toLowerCase();


  documentPdfViewer.style.display = "none";
  documentImageViewer.style.display = "none";

  documentPdfViewer.src = "";
  documentImageViewer.src = "";


  if (extension === "pdf") {

    documentPdfViewer.src = file;

    documentPdfViewer.style.display = "block";

  }

  else if (
    extension === "png" ||
    extension === "jpg" ||
    extension === "jpeg" ||
    extension === "webp" ||
    extension === "gif"
  ) {

    documentImageViewer.src = file;

    documentImageViewer.style.display = "block";

  }

  else {

    window.open(
      file,
      "_blank",
      "noopener,noreferrer"
    );

    return;
  }


  documentModalTitle.textContent =
    title || "Document Preview";


  documentModal.classList.add("open");


  document.body.style.overflow = "hidden";
}


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
  documentImageViewer.src = "";


  documentPdfViewer.style.display = "none";
  documentImageViewer.style.display = "none";


  document.body.style.overflow = "";
}


// =============================
// DOCUMENT BUTTONS
// =============================

document
  .querySelectorAll(".document-link")
  .forEach((button) => {

    button.addEventListener("click", () => {

      const file =
        button.dataset.file;

      const title =
        button.dataset.title;


      if (!file) {
        return;
      }


      openDocumentModal(
        file,
        title
      );

    });

  });


// =============================
// CLOSE DOCUMENT MODAL
// =============================

if (documentModalClose) {

  documentModalClose.addEventListener(
    "click",
    closeDocumentModal
  );

}


if (documentModal) {

  documentModal.addEventListener(
    "click",
    (event) => {

      if (event.target === documentModal) {
        closeDocumentModal();
      }

    }
  );

}


document.addEventListener(
  "keydown",
  (event) => {

    if (
      event.key === "Escape" &&
      documentModal &&
      documentModal.classList.contains("open")
    ) {
      closeDocumentModal();
    }

  }
);


// =============================
// INITIALIZE
// =============================

loadProjects();