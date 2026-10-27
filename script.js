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


// Manual category mapping for known projects.
// New public repositories can still appear automatically.

const PROJECT_CATEGORY_MAP = {
  "service-reminder-analytics": "business",
  "customer-retention-prediction": "business",
  "customer-review-analytics": "analytics",
  "financial-buddy-data-warehouse": "engineering",
  "merdeka-curriculum-sentiment-network-analysis": "ml",
  "legal-judgment-information-extraction": "ml",
  "bisindo-sign-language-detection": "cv"
};


// Friendly category labels

const CATEGORY_LABELS = {
  analytics: "Analytics & BI",
  business: "Business Analytics",
  ml: "Machine Learning & NLP",
  engineering: "Data Engineering",
  cv: "Computer Vision",
  other: "Data & Technology"
};


// Better descriptions for known repositories

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
    name: "customer-retention-prediction",

    description:
      "Customer retention prediction for automotive aftersales services using Random Forest, XGBoost, CatBoost, and SHAP.",

    html_url:
      "https://github.com/kabsyahr/customer-retention-prediction",

    language: "Python",

    topics: [
      "customer-analytics",
      "machine-learning",
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
      "nlp",
      "customer-analytics"
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
    name: "merdeka-curriculum-sentiment-network-analysis",

    description:
      "Sentiment and social network analysis of public discussion about the Merdeka Curriculum on X.",

    html_url:
      "https://github.com/kabsyahr/merdeka-curriculum-sentiment-network-analysis",

    language: "Python",

    topics: [
      "nlp",
      "sentiment-analysis",
      "machine-learning"
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
      "machine-learning"
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
      "yolo"
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


  if (
    combinedText.includes("power-bi") ||
    combinedText.includes("dashboard") ||
    combinedText.includes("business-intelligence") ||
    combinedText.includes("data-analysis")
  ) {
    return "analytics";
  }


  if (
    combinedText.includes("customer") ||
    combinedText.includes("business-analytics") ||
    combinedText.includes("risk")
  ) {
    return "business";
  }


  if (
    combinedText.includes("nlp") ||
    combinedText.includes("machine-learning") ||
    combinedText.includes("xgboost") ||
    combinedText.includes("bert") ||
    combinedText.includes("sentiment")
  ) {
    return "ml";
  }


  if (
    combinedText.includes("etl") ||
    combinedText.includes("data-warehouse") ||
    combinedText.includes("mysql") ||
    combinedText.includes("data-engineering")
  ) {
    return "engineering";
  }


  if (
    combinedText.includes("computer-vision") ||
    combinedText.includes("opencv") ||
    combinedText.includes("mediapipe") ||
    combinedText.includes("yolo")
  ) {
    return "cv";
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

        // Keep manually mapped portfolio projects higher.

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

    // Prevent duplicate listeners if projects
    // are rendered more than once.

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

    // Unsupported file type:
    // open directly in a new tab.

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

// Close using X button

if (documentModalClose) {

  documentModalClose.addEventListener(
    "click",
    closeDocumentModal
  );

}


// Close by clicking dark background

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


// Close with Escape key

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