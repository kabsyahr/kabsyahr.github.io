// =============================
// MOBILE NAVIGATION
// =============================

const menuToggle = document.getElementById("menu-toggle");
const navMenu = document.getElementById("nav-menu");

menuToggle.addEventListener("click", () => {
  navMenu.classList.toggle("open");
});

document.querySelectorAll("#nav-menu a").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("open");
  });
});


// =============================
// GITHUB PROJECTS
// =============================

const GITHUB_USERNAME = "kabsyahr";

const EXCLUDED_REPOS = [
  "kabsyahr",
  "kabsyahr.github.io"
];


// Manual category mapping for known projects.
// New repositories can still appear automatically.

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
// LOAD REPOSITORIES
// =============================

async function loadProjects() {

  const container =
    document.getElementById("all-projects-grid");


  try {

    const response = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}/repos?per_page=100&sort=updated`
    );


    if (!response.ok) {
      throw new Error("GitHub API request failed.");
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

        // Keep known portfolio projects higher.

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

      container.innerHTML = `
        <p class="loading-text">
          No public projects found.
        </p>
      `;

      return;
    }


    container.innerHTML =
      filteredRepos
        .map(createProjectCard)
        .join("");


    initializeFilters();

  }

  catch (error) {

    console.error(error);


    container.innerHTML = `
      <p class="loading-text">
        Projects could not be loaded automatically.
        Visit my
        <a
          href="https://github.com/${GITHUB_USERNAME}"
          target="_blank"
          style="color:#4fd1e5;"
        >
          GitHub profile
        </a>
        to explore my repositories.
      </p>
    `;

  }

}


// =============================
// PROJECT FILTERS
// =============================

function initializeFilters() {

  const buttons =
    document.querySelectorAll(".filter-btn");


  buttons.forEach((button) => {

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
// INITIALIZE
// =============================

loadProjects();