/* Native, accessible interactions. No frameworks, analytics, cookies, or external requests. */
(() => {
  'use strict';
  const $ = (sel, root = document) => root.querySelector(sel);
  const $$ = (sel, root = document) => [...root.querySelectorAll(sel)];
  const navToggle = $('#nav-toggle');
  const nav = $('#main-nav');
  const closeNav = () => { nav.classList.remove('is-open'); navToggle.setAttribute('aria-expanded', 'false'); navToggle.setAttribute('aria-label', 'Open navigation'); };
  navToggle.addEventListener('click', () => {
    const isOpen = navToggle.getAttribute('aria-expanded') !== 'true';
    nav.classList.toggle('is-open', isOpen);
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.setAttribute('aria-label', isOpen ? 'Close navigation' : 'Open navigation');
  });
  $$('.main-nav a').forEach(link => link.addEventListener('click', closeNav));
  window.addEventListener('resize', () => { if (window.innerWidth > 850) closeNav(); });
  document.addEventListener('keydown', event => { if (event.key === 'Escape') closeNav(); });
  $('#copyright-year').textContent = new Date().getFullYear();

  const tabs = $$('.course-tab');
  function activateCourseTab(tab, focus = false) {
    for (const item of tabs) {
      const active = item === tab;
      item.classList.toggle('is-active', active);
      item.setAttribute('aria-selected', String(active));
      item.tabIndex = active ? 0 : -1;
      $(`#${item.getAttribute('aria-controls')}`).hidden = !active;
    }
    if (focus) tab.focus();
  }
  tabs.forEach((tab, i) => {
    tab.addEventListener('click', () => activateCourseTab(tab));
    tab.addEventListener('keydown', e => {
      if (['ArrowLeft','ArrowRight','Home','End'].includes(e.key)) {
        e.preventDefault();
        const next = e.key === 'Home' ? 0 : e.key === 'End' ? tabs.length - 1 : (i + (e.key === 'ArrowRight' ? 1 : tabs.length - 1)) % tabs.length;
        activateCourseTab(tabs[next], true);
      }
    });
  });

  const records = {
    'paper-pbft': {
      type: 'RESEARCH MANUSCRIPT / IN PROGRESS',
      title: 'A Proposed Method for Adaptive Leader Selection and Replacement in PBFT Based on Behavioral Trust and Network Conditions',
      subtitle: 'A. HosseinpurBarzegar · S. PashaZade',
      summary: 'This proposed research examines how to select and replace PBFT leaders without confusing network instability with malicious node behavior.',
      method: 'The approach explicitly separates long-term Behavioral Trust from short-term Network Suitability. Behavior-derived evidence determines whether a node is eligible, while current quality-of-service characteristics determine whether it is presently suitable for leadership. Leader replacement can be driven by sustained network underperformance without automatically penalizing trust, whereas evidence of Byzantine misbehavior triggers different treatment.',
      points: ['Behavioral eligibility and network suitability are assessed independently.', 'Network indicators include delay, jitter, packet loss and timeouts; these are not by themselves evidence of malicious behavior.', 'Candidate selection combines the two assessments, and the reason for replacement determines whether a trust penalty is warranted.'],
      note: 'Status: In progress. This is a proposed research method, not a claim of externally verified experimental performance.'
    },
    'paper-adversarial': {
      type: 'RESEARCH MANUSCRIPT / IN PROGRESS',
      title: 'Artificial Intelligence Under Threat: An Analysis of Adversarial Attacks',
      subtitle: 'A. HosseinpurBarzegar · E. Tashkhisi',
      summary: 'A research review of vulnerabilities in modern AI and machine-learning systems, and the consequences of adversarial manipulation.',
      method: 'The accompanying Persian draft examines attacks throughout the machine-learning life cycle and compares them by attack phase, attacker knowledge and objective. The paper surveys technical, economic and security consequences across multiple application domains, along with defense strategies and the practical difficulty of making models robust.',
      points: ['Covers poisoning and evasion attacks, including white-box, gray-box and black-box threat models.', 'Reviews case studies and implications for security-critical intelligent systems.', 'Discusses adversarial training, anomaly detection, federated approaches, adaptive learning and layered defenses.'],
      note: 'Status: In progress. The English title follows the supplied CV; the accompanying working manuscript is in Persian.'
    },
    'paper-ransomware': {
      type: 'CONFERENCE PAPER / ACCEPTED 2024',
      title: 'Early Detection and Defense Against Ransomware Attacks',
      subtitle: 'A. HosseinpurBarzegar · E. Tashkhisi · International Conference on Engineering and Information Technology, London, UK',
      summary: 'This paper investigates detecting ransomware before files are encrypted and examines defense and mitigation mechanisms.',
      method: 'The supplied manuscript describes a two-stage detection approach: SHA-256 file-signature comparison followed by machine-learning analysis of application programming interface (API) calls. It also discusses complementary defenses such as distributed storage and strategies that improve resilience and recovery.',
      points: ['Emphasizes early detection at the pre-encryption stage.', 'Studies signature-based recognition alongside behavior-based API analysis, including a set of fourteen informative API calls mentioned in the manuscript.', 'Surveys defensive measures, impact on organizations, and future work such as federated learning and distributed defenses.'],
      note: 'Status per CV: Accepted, 2024. No DOI or publisher-hosted full text was provided, so this page does not imply an online publication.'
    },
    'paper-recommender': {
      type: 'CONFERENCE PAPER / ACCEPTED 2024',
      title: 'The Importance of Using User Data in Building Intelligent Recommender Systems for Providing Personalized Services',
      subtitle: 'M. Zakizadeh · A. HosseinpurBarzegar · National Conference on New Technologies in Electrical, Computer, and Mechanical Engineering of Iran',
      summary: 'An examination of how user information and behavioral data can help recommender systems deliver more relevant digital experiences.',
      method: 'The paper compares collaborative filtering, content-based filtering and hybrid filtering as ways to create personalized recommendations from behavioral and preference data. It also considers machine-learning and neural-network approaches, and discusses the broader opportunities and limitations associated with individualized digital services.',
      points: ['Explores user profiles, interaction histories, ratings and other relevant signals.', 'Reviews privacy, data quality, scalability and changing preferences as core design challenges.', 'The attached English file is an AI-assisted translation of an original Persian manuscript.'],
      note: 'Status per CV: Accepted, 2024. The supplied text describes proposed approaches; no independent deployment or measured uplift is asserted here.'
    },
    'project-digits': {
      type: 'ACADEMIC PROJECT / 2026',
      title: 'Multi-Digit Handwritten Number Recognition Using CNN',
      subtitle: 'Computer Vision · Python · TensorFlow · Keras · MNIST',
      summary: 'A convolutional model for recognizing complete five-digit handwritten numbers, rather than classifying individual digits in isolation.',
      method: 'The project synthesizes five-digit samples by combining individual MNIST digits into 22×90 grayscale images, with a nonzero first digit. Disjoint source splits are used before creating training and validation composites. The network predicts a class for each of five digit positions and is trained with categorical targets and early stopping.',
      points: ['Uses two convolutional layers, LeakyReLU activations, dropout and a five-position output.', 'Reports the evaluation design for per-digit accuracy and strict exact-sequence accuracy.', 'The accompanying description does not provide a verified numeric performance score; none is claimed on this site.'],
      note: 'Project description follows the provided Markdown documentation.'
    },
    'project-sentiment': {
      type: 'ACADEMIC PROJECT / 2026',
      title: 'Text Sentiment Analysis with TF-IDF and SGD Classifier',
      subtitle: 'NLP · Python · Scikit-learn · TF-IDF',
      summary: 'A reproducible pipeline for labeling English-language text as positive, neutral or negative.',
      method: 'The workflow validates and cleans text, removes duplicates, splits samples into stratified train/validation/test sets (70/15/15), applies English-language token preprocessing and Porter stemming, and builds training-only TF-IDF unigram/bigram features. A regularized SGDClassifier with logistic loss is selected using validation log loss.',
      points: ['Designed to evaluate held-out accuracy, macro F1, precision, recall, confusion matrices and ROC/AUC.', 'Serializes the fitted preprocessing and classifier pipeline for later inference.', 'The project documentation explicitly notes that the original dataset is not included and does not claim a reproduced measured score.'],
      note: 'Predicted probabilities should not be treated as calibrated confidence. Dataset licensing and provenance should be documented before any public sharing.'
    },
    'project-pattern': {
      type: 'ACADEMIC PROJECT / 2025',
      title: 'Pattern Miner for Art Knowledge Graphs',
      subtitle: 'Knowledge Graphs · Python · RDFLib · NetworkX · SPARQL',
      summary: 'An ontology-enrichment workflow that finds recurring semantic relationships in artwork data.',
      method: 'The workflow converts artwork XML into RDF, builds a graph of entities and relationships, finds frequent RDF patterns, and uses SPARQL macros to enrich the ontology with inferred relationship hints.',
      points: ['Detects relationships such as Artwork → createdBy → Artist, Artwork → hasStyle → Style, and Artwork → fromCountry → Country.', 'Defines two helper macros: style-country hints and artist-nationality hints.', 'The supplied report records four added triples per macro, helping reduce manual editing of the target ontology.'],
      note: 'Details follow the attached Pattern Miner project summary; results are limited to the examples documented there.'
    },
    'project-bookstore': {
      type: 'ACADEMIC PROJECT / 2024',
      title: 'Online Bookstore System — Requirements & UML Design',
      subtitle: 'Team Lead · Software Engineering · Requirements Analysis · UML',
      summary: 'Systems analysis and design for an online bookstore, with attention to customer workflows, inventory, orders and stakeholder requirements.',
      method: 'The supplied PDF describes the product vision and stakeholders and documents the system through use-case, activity, class, object, statechart, sequence and collaboration diagrams. Intended product functions include book search and filtering, account management, shopping and payments, inventory management and administrative workflows.',
      points: ['Developed requirements and interaction scenarios for customers, administrators and other system stakeholders.', 'Documented multiple UML perspectives on bookstore behavior, structure and interactions.', 'The attached material is a design specification; this portfolio does not claim that every proposed feature was deployed in a working production service.'],
      note: 'Leadership role and 2024 date follow the supplied CV; technical scope follows the attached design PDF.'
    },
    'project-health': {
      type: 'ACADEMIC PROJECT / 2024',
      title: 'Health Monitoring System with Fuzzy Logic',
      subtitle: 'Team Lead · Python · Tkinter · Fuzzy Logic · Go · Rust',
      summary: 'A multi-component health-assessment demonstrator that interprets vital signs through fuzzy logic.',
      method: 'A Tkinter interface accepts temperature, pulse and blood oxygen saturation (SpO₂), validates inputs and applies fuzzy rules to derive severity categories. The attached project description also outlines Go and Rust backend services that can request AI-generated suggestions from external providers.',
      points: ['Visualizes fuzzy membership functions and provides severity-oriented feedback.', 'Uses modular Python code for validation, inference and plotting, with supporting backend APIs described in the documentation.', 'This is an academic demonstration, not a medical device or a substitute for professional clinical assessment.'],
      note: 'Leadership role and 2024 date follow the CV. AI API integration requires external services and credentials when running the separate original project—not this static portfolio.'
    }
  };

  const dialog = $('#detail-dialog');
  const closeDialog = $('#dialog-close');
  let lastFocus = null;
  $$('[data-detail]').forEach(button => button.addEventListener('click', () => {
    const data = records[button.dataset.detail];
    if (!data) return;
    lastFocus = button;
    $('#dialog-tag').textContent = data.type;
    $('#dialog-title').textContent = data.title;
    $('#dialog-subtitle').textContent = data.subtitle;
    $('#dialog-summary').textContent = data.summary;
    $('#dialog-method').textContent = data.method;
    $('#dialog-note').textContent = data.note;
    const list = $('#dialog-points');
    list.replaceChildren(...data.points.map(point => { const li = document.createElement('li'); li.textContent = point; return li; }));
    dialog.showModal();
    closeDialog.focus();
  }));
  closeDialog.addEventListener('click', () => dialog.close());
  dialog.addEventListener('click', event => {
    if (event.target === dialog) {
      const rect = dialog.getBoundingClientRect();
      if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close();
    }
  });
  dialog.addEventListener('close', () => { lastFocus?.focus(); });

  // Header navigation highlights the current reading section without changing the URL.
  if ('IntersectionObserver' in window) {
    const links = $$('.main-nav a');
    const sections = links.map(link => $(link.getAttribute('href'))).filter(Boolean);
    const activeObserver = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          links.forEach(link => link.classList.toggle('is-current', link.getAttribute('href') === `#${entry.target.id}`));
        }
      });
    }, { rootMargin: '-18% 0px -65% 0px', threshold: 0 });
    sections.forEach(section => activeObserver.observe(section));
  }
})();
