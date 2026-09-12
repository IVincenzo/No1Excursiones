(() => {
  function i18n() {
    return window.No1I18n;
  }

  function t(key) {
    return i18n().t(key);
  }

  function rootPath() {
    return document.body.dataset.siteRoot || ".";
  }

  function withRoot(markup) {
    return markup.split("{{root}}").join(rootPath());
  }

  function renderActivityLinks() {
    return window.No1Excursiones.getActivities()
      .map(
        (activity) =>
          `<li><a class="dropdown-item" href="{{root}}/activities/${activity.slug}.html">${activity.navTitle}</a></li>`,
      )
      .join("");
  }

  function renderLanguageSelector() {
    return `
      <li class="nav-item dropdown language-switcher">
        <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
          ${i18n().labels[i18n().getLanguage()]}
        </a>
        <ul class="dropdown-menu dropdown-menu-end">
          ${i18n()
            .supportedLanguages.map(
              (lang) => `
                <li>
                  <button class="dropdown-item ${lang === i18n().getLanguage() ? "active" : ""}" type="button" data-language-option="${lang}">
                    ${i18n().labels[lang]}
                  </button>
                </li>
              `,
            )
            .join("")}
        </ul>
      </li>
    `;
  }

  function renderHeader() {
    const header = document.querySelector("[data-site-header]");
    if (!header) return;

    header.innerHTML = withRoot(`
      <nav class="navbar navbar-expand-lg fixed-top site-navbar">
        <div class="container">
          <a class="navbar-brand" href="{{root}}/index.html" aria-label="No1 Excursiones">
            <span class="brand-mark">N1</span>
            <span>No1 Excursiones</span>
          </a>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#mainNav" aria-controls="mainNav" aria-expanded="false" aria-label="${t("navOpen")}">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="mainNav">
            <ul class="navbar-nav ms-auto align-items-lg-center">
              <li class="nav-item"><a class="nav-link" href="{{root}}/index.html">${t("navHome")}</a></li>
              <li class="nav-item dropdown">
                <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">${t("navActivities")}</a>
                <ul class="dropdown-menu">${renderActivityLinks()}</ul>
              </li>
              <li class="nav-item"><a class="nav-link" href="{{root}}/local-events.html">${t("navLocalEvents")}</a></li>
              <li class="nav-item"><a class="nav-link" href="{{root}}/about.html">${t("navAbout")}</a></li>
              <li class="nav-item"><a class="nav-link" href="{{root}}/contact.html">${t("navContact")}</a></li>
              <li class="nav-item"><a class="nav-link nav-cta-trip" href="{{root}}/plan-your-trip.html">${t("navTrip")}</a></li>
              ${renderLanguageSelector()}
            </ul>
          </div>
        </div>
      </nav>
    `);

    header.querySelectorAll("[data-language-option]").forEach((button) => {
      button.addEventListener("click", () => i18n().setLanguage(button.dataset.languageOption));
    });
  }

  function renderFooter() {
    const footer = document.querySelector("[data-site-footer]");
    if (!footer) return;
    footer.innerHTML = withRoot(`
      <footer class="site-footer">
        <div class="container">
          <div class="row g-4 align-items-start">
            <div class="col-lg-5">
              <a class="footer-brand" href="{{root}}/index.html">
                <span class="brand-mark">N1</span>
                <span>No1 Excursiones</span>
              </a>
              <p class="mt-3 mb-0">${t("footerText")}</p>
            </div>
            <div class="col-sm-6 col-lg-3">
              <h2 class="footer-title">${t("footerContact")}</h2>
              <p class="mb-1">${t("footerLocation")}</p>
              <p class="mb-1"><a href="tel:+34000000000">+34 000 000 000</a></p>
              <p class="mb-0"><a href="mailto:hola@no1excursiones.com">hola@no1excursiones.com</a></p>
            </div>
            <div class="col-sm-6 col-lg-4">
              <h2 class="footer-title">${t("footerBookings")}</h2>
              <p class="mb-3">${t("footerBookingText")}</p>
              <a class="btn btn-primary btn-sm" href="{{root}}/plan-your-trip.html">${t("footerCall")}</a>
            </div>
          </div>
          <div class="footer-bottom">
            <span>&copy; <span data-year></span> No1 Excursiones</span>
            <a href="{{root}}/assets/img/README.md">${t("footerVisualSources")}</a>
          </div>
        </div>
      </footer>
    `);
    setYear();
  }

  function renderActivityCards() {
    document.querySelectorAll("[data-activity-cards]").forEach((node) => {
      const limit = Number(node.dataset.limit || window.No1Excursiones.activities.length);
      node.innerHTML = window.No1Excursiones.getActivities()
        .slice(0, limit)
        .map(
          (activity) => `
            <article class="col-md-6 col-xl-4">
              <a class="activity-card" href="${rootPath()}/activities/${activity.slug}.html">
                <img src="${activity.image}" alt="${activity.title}" loading="lazy">
                <span class="activity-card-body">
                  <span class="badge text-bg-light">${activity.badge}</span>
                  <strong>${activity.title}</strong>
                  <span>${activity.summary}</span>
                  <span class="activity-meta">${t("activityFrom")} ${activity.priceFrom} EUR &middot; ${activity.duration}</span>
                </span>
              </a>
            </article>
          `,
        )
        .join("");
    });
  }

  function renderActivityPage() {
    const page = document.querySelector("[data-activity-page]");
    if (!page) return;
    const activity = window.No1Excursiones.getActivity(page.dataset.activitySlug);
    if (!activity) return;

    document.title = `${activity.title} | No1 Excursiones`;
    const meta = document.querySelector('meta[name="description"]');
    if (meta) meta.setAttribute("content", activity.summary);

    page.innerHTML = `
      <section class="page-hero compact-hero" style="--hero-image: url('${activity.image}')">
        <div class="hero-overlay"></div>
        <div class="container hero-content">
          <p class="eyebrow">${activity.badge}</p>
          <h1>${activity.title}</h1>
          <p>${activity.summary}</p>
          <div class="hero-actions">
            <a class="btn btn-primary btn-lg" href="#disponibilidad">${t("activityAvailabilityCta")}</a>
            <a class="btn btn-outline-light btn-lg" href="../plan-your-trip.html">${t("activityAdviceCta")}</a>
          </div>
        </div>
      </section>
      <section class="section">
        <div class="container">
          <div class="row g-4 align-items-start">
            <div class="col-lg-7">
              <p class="section-kicker">${t("activityExperience")}</p>
              <h2>${t("activitySectionTitle")}</h2>
              <p class="lead">${activity.intro}</p>
            </div>
            <div class="col-lg-5">
              <div class="info-panel">
                <div><span>${t("activityPrice")}</span><strong>${t("activityFrom")} ${activity.priceFrom} EUR</strong></div>
                <div><span>${t("activityDuration")}</span><strong>${activity.duration}</strong></div>
                <div><span>${t("activityConfirmation")}</span><strong>${t("activityConfirmationValue")}</strong></div>
              </div>
            </div>
          </div>
          <div class="row g-3 mt-4">
            ${activity.highlights
              .map(
                (highlight) => `
                  <div class="col-md-4">
                    <div class="highlight-item">${highlight}</div>
                  </div>
                `,
              )
              .join("")}
          </div>
        </div>
      </section>
      <section class="section section-muted" id="disponibilidad">
        <div class="container">
          <div data-calendar="activity" data-activity-slug="${activity.slug}"></div>
        </div>
      </section>
      <section class="cta-band">
        <div class="container d-lg-flex align-items-center justify-content-between gap-4">
          <div>
            <p class="eyebrow mb-1">${t("activityTripKicker")}</p>
            <h2 class="mb-2">${t("activityCtaTitle")}</h2>
            <p class="mb-lg-0">${t("activityCtaText")}</p>
          </div>
          <a class="btn btn-primary btn-lg" href="../plan-your-trip.html">${t("footerCall")}</a>
        </div>
      </section>
    `;
  }

  function initCalendlyBlocks() {
    document.querySelectorAll("[data-calendly]").forEach((node) => {
      const url = node.dataset.calendlyUrl;
      if (url) {
        node.innerHTML = `<iframe title="${t("calendlyTitle")}" src="${url}" loading="lazy"></iframe>`;
        return;
      }

      node.innerHTML = `
        <div class="calendly-placeholder">
          <p class="eyebrow">Calendly</p>
          <h2>${t("calendlyTitle")}</h2>
          <p>${t("calendlyText")}</p>
          <a class="btn btn-primary" href="mailto:hola@no1excursiones.com?subject=Llamada%20de%2015%20minutos">${t("calendlyEmail")}</a>
        </div>
      `;
    });
  }

  function initContactForms() {
    document.querySelectorAll("[data-demo-form]").forEach((form) => {
      form.addEventListener("submit", (event) => {
        event.preventDefault();
        const result = form.querySelector("[data-form-result]");
        if (result) {
          result.innerHTML = `<div class="alert alert-success mb-0" role="status">${t(form.dataset.resultKey || "formResult")}</div>`;
        }
        form.reset();
      });
    });
  }

  function whatsappIcon() {
    return `
      <svg viewBox="0 0 32 32" aria-hidden="true" focusable="false">
        <path d="M16.02 3.2A12.65 12.65 0 0 0 5.18 22.37L3.6 28.8l6.58-1.54A12.63 12.63 0 1 0 16.02 3.2Zm0 2.5a10.14 10.14 0 1 1-5.16 18.88l-.38-.22-3.42.8.82-3.3-.25-.4A10.14 10.14 0 0 1 16.02 5.7Zm-4.28 4.78c-.24 0-.62.09-.94.45-.32.35-1.23 1.2-1.23 2.93 0 1.73 1.26 3.4 1.43 3.64.18.24 2.44 3.9 6.04 5.32 2.99 1.18 3.6.95 4.25.89.65-.06 2.1-.86 2.4-1.69.3-.83.3-1.54.21-1.69-.09-.15-.33-.24-.7-.42-.35-.18-2.1-1.04-2.43-1.15-.33-.12-.57-.18-.81.18-.24.35-.93 1.15-1.14 1.39-.21.24-.42.27-.78.09-.36-.18-1.5-.55-2.86-1.76-1.06-.94-1.77-2.1-1.98-2.46-.21-.36-.02-.55.16-.73.16-.16.36-.42.54-.63.18-.21.24-.36.36-.6.12-.24.06-.45-.03-.63-.09-.18-.81-1.95-1.11-2.67-.29-.7-.59-.6-.81-.61l-.67-.01Z"/>
      </svg>
    `;
  }

  function renderWhatsAppWidget() {
    let widget = document.querySelector("[data-whatsapp-widget]");
    const wasOpen = widget ? widget.classList.contains("is-open") : false;
    const phone = "34000000000";
    const message = encodeURIComponent(t("whatsappPrefill"));
    const whatsappUrl = `https://wa.me/${phone}?text=${message}`;

    if (!widget) {
      widget = document.createElement("aside");
      widget.className = "whatsapp-widget";
      widget.dataset.whatsappWidget = "";
      document.body.appendChild(widget);
    }

    widget.classList.toggle("is-open", wasOpen);
    widget.innerHTML = `
      <div class="whatsapp-panel" id="whatsappPanel" aria-hidden="${wasOpen ? "false" : "true"}">
        <div class="whatsapp-panel-header">
          <div class="whatsapp-avatar-wrap">
            <div class="whatsapp-avatar">N1</div>
            <span class="whatsapp-online-dot"></span>
          </div>
          <div>
            <strong>No1 Excursiones</strong>
            <span>${t("whatsappOnline")}</span>
          </div>
          <button class="whatsapp-close" type="button" data-whatsapp-close aria-label="${t("whatsappClose")}">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="whatsapp-chat">
          <div class="whatsapp-message">
            <strong>No1 Excursiones</strong>
            <p>${t("whatsappGreeting")}</p>
            <span>10:54</span>
          </div>
        </div>
        <div class="whatsapp-panel-footer">
          <a class="whatsapp-cta" href="${whatsappUrl}" target="_blank" rel="noopener">
            ${whatsappIcon()}
            <span>${t("whatsappButton")}</span>
          </a>
        </div>
      </div>
      <button class="whatsapp-fab" type="button" data-whatsapp-toggle aria-controls="whatsappPanel" aria-expanded="${wasOpen ? "true" : "false"}" aria-label="${t("whatsappOpen")}">
        ${whatsappIcon()}
        <span class="whatsapp-alert-dot"></span>
      </button>
    `;

    const toggle = widget.querySelector("[data-whatsapp-toggle]");
    const close = widget.querySelector("[data-whatsapp-close]");
    const panel = widget.querySelector("#whatsappPanel");

    toggle.addEventListener("click", () => {
      const open = !widget.classList.contains("is-open");
      widget.classList.toggle("is-open", open);
      toggle.setAttribute("aria-expanded", String(open));
      panel.setAttribute("aria-hidden", String(!open));
    });

    close.addEventListener("click", () => {
      widget.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
      panel.setAttribute("aria-hidden", "true");
    });
  }

  function setYear() {
    document.querySelectorAll("[data-year]").forEach((node) => {
      node.textContent = new Date().getFullYear();
    });
  }

  function renderDynamicContent() {
    renderHeader();
    renderFooter();
    renderActivityCards();
    renderActivityPage();
    initCalendlyBlocks();
    renderWhatsAppWidget();
    setYear();
  }

  document.addEventListener("DOMContentLoaded", () => {
    renderDynamicContent();
    initContactForms();
  });

  window.addEventListener("no1:languagechange", () => {
    renderDynamicContent();
    if (window.No1Calendar) window.No1Calendar.renderAll();
  });
})();
