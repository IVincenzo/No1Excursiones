(() => {
  const categoryTranslations = {
    market: { es: "Mercado", en: "Market", fr: "Marche", de: "Markt" },
    show: { es: "Espectaculo", en: "Show", fr: "Spectacle", de: "Show" },
    music: { es: "Musica", en: "Music", fr: "Musique", de: "Musik" },
    festival: { es: "Fiesta local", en: "Local festival", fr: "Fete locale", de: "Lokales Fest" },
    gastronomy: { es: "Gastronomia", en: "Gastronomy", fr: "Gastronomie", de: "Gastronomie" },
    family: { es: "Familia", en: "Family", fr: "Famille", de: "Familie" },
  };

  const eventDefinitions = [
    {
      id: "laguna-market",
      category: "market",
      period: "today",
      dateOffset: 0,
      time: "09:00",
      location: "San Cristobal de La Laguna",
      price: "free",
      translations: {
        es: { title: "Mercado de productores de La Laguna", description: "Puestos locales, quesos, frutas, flores y productos artesanos en el centro historico." },
        en: { title: "La Laguna farmers market", description: "Local stalls, cheese, fruit, flowers and handmade products in the historic center." },
        fr: { title: "Marche de producteurs de La Laguna", description: "Stands locaux, fromages, fruits, fleurs et produits artisanaux dans le centre historique." },
        de: { title: "Bauernmarkt in La Laguna", description: "Lokale Staende, Kaese, Obst, Blumen und Handwerk im historischen Zentrum." },
      },
    },
    {
      id: "adeje-show",
      category: "show",
      period: "week",
      dateOffset: 2,
      time: "20:30",
      location: "Costa Adeje",
      price: "Desde 18 EUR",
      translations: {
        es: { title: "Noche de espectaculo en Costa Adeje", description: "Cena opcional, musica en vivo y puesta en escena para una noche facil cerca del sur." },
        en: { title: "Show night in Costa Adeje", description: "Optional dinner, live music and stage performance for an easy evening in the south." },
        fr: { title: "Soiree spectacle a Costa Adeje", description: "Diner optionnel, musique live et mise en scene pour une soiree simple dans le sud." },
        de: { title: "Showabend in Costa Adeje", description: "Optionales Abendessen, Live-Musik und Buehne fuer einen entspannten Abend im Sueden." },
      },
    },
    {
      id: "santa-cruz-concert",
      category: "music",
      period: "weekend",
      dateOffset: 5,
      time: "21:00",
      location: "Santa Cruz de Tenerife",
      price: "12 EUR",
      translations: {
        es: { title: "Concierto al aire libre", description: "Programacion local con bandas de la isla y ambiente nocturno en Santa Cruz." },
        en: { title: "Open-air concert", description: "Local program with island bands and an evening atmosphere in Santa Cruz." },
        fr: { title: "Concert en plein air", description: "Programmation locale avec groupes de l'ile et ambiance du soir a Santa Cruz." },
        de: { title: "Open-Air-Konzert", description: "Lokales Programm mit Inselbands und Abendstimmung in Santa Cruz." },
      },
    },
    {
      id: "garachico-festival",
      category: "festival",
      period: "weekend",
      dateOffset: 6,
      time: "18:00",
      location: "Garachico",
      price: "free",
      translations: {
        es: { title: "Fiesta local en Garachico", description: "Musica, puestos, tradicion y ambiente de pueblo junto a la costa norte." },
        en: { title: "Local festival in Garachico", description: "Music, stalls, tradition and village atmosphere by the north coast." },
        fr: { title: "Fete locale a Garachico", description: "Musique, stands, tradition et ambiance de village sur la cote nord." },
        de: { title: "Lokales Fest in Garachico", description: "Musik, Staende, Tradition und Dorfatmosphaere an der Nordkueste." },
      },
    },
    {
      id: "wine-tasting",
      category: "gastronomy",
      period: "week",
      dateOffset: 3,
      time: "17:30",
      location: "Valle de La Orotava",
      price: "Desde 25 EUR",
      translations: {
        es: { title: "Cata de vinos volcanicos", description: "Degustacion guiada con vinos locales y pequenos bocados canarios." },
        en: { title: "Volcanic wine tasting", description: "Guided tasting with local wines and small Canarian bites." },
        fr: { title: "Degustation de vins volcaniques", description: "Degustation guidee avec vins locaux et petites bouchees canariennes." },
        de: { title: "Verkostung vulkanischer Weine", description: "Gefuehrte Verkostung mit lokalen Weinen und kleinen kanarischen Happen." },
      },
    },
    {
      id: "family-workshop",
      category: "family",
      period: "week",
      dateOffset: 4,
      time: "11:00",
      location: "Puerto de la Cruz",
      price: "8 EUR",
      translations: {
        es: { title: "Taller familiar de artesania", description: "Actividad tranquila para ninos y adultos con materiales incluidos." },
        en: { title: "Family craft workshop", description: "A calm activity for children and adults with materials included." },
        fr: { title: "Atelier creatif en famille", description: "Activite calme pour enfants et adultes avec materiel inclus." },
        de: { title: "Familien-Workshop fuer Handwerk", description: "Ruhige Aktivitaet fuer Kinder und Erwachsene mit Material inklusive." },
      },
    },
  ];

  function t(key) {
    return window.No1I18n.t(key);
  }

  function lang() {
    return window.No1I18n.getLanguage();
  }

  function dateFromOffset(offset) {
    const date = new Date();
    date.setHours(12, 0, 0, 0);
    date.setDate(date.getDate() + offset);
    return date;
  }

  function dateKey(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }

  function formatDate(date) {
    return new Intl.DateTimeFormat(window.No1I18n.getLocale(), {
      weekday: "short",
      day: "numeric",
      month: "short",
    }).format(date);
  }

  function localizeEvent(event) {
    const text = event.translations[lang()] || event.translations.es;
    const date = dateFromOffset(event.dateOffset);
    return {
      ...event,
      ...text,
      date,
      dateKey: dateKey(date),
      categoryLabel: categoryTranslations[event.category][lang()] || categoryTranslations[event.category].es,
      priceLabel: event.price === "free" ? t("eventsPriceFree") : event.price,
    };
  }

  function getEvents() {
    return eventDefinitions.map(localizeEvent);
  }

  function renderOptions(select, options) {
    select.innerHTML = options
      .map((option) => `<option value="${option.value}">${option.label}</option>`)
      .join("");
  }

  function renderEvent(event) {
    const periodLabel = {
      today: t("eventsPeriodToday"),
      weekend: t("eventsPeriodWeekend"),
      week: t("eventsPeriodWeek"),
    }[event.period];

    return `
      <article class="event-card">
        <div class="event-date">
          <strong>${formatDate(event.date)}</strong>
          <span>${event.time}</span>
        </div>
        <div class="event-content">
          <div class="event-tags">
            <span class="event-badge">${periodLabel}</span>
            <span class="event-category">${event.categoryLabel}</span>
          </div>
          <h3>${event.title}</h3>
          <p>${event.description}</p>
          <div class="event-meta">
            <span>${event.location}</span>
            <strong>${event.priceLabel}</strong>
          </div>
        </div>
      </article>
    `;
  }

  function renderEventsBoard() {
    const list = document.querySelector("[data-events-list]");
    const empty = document.querySelector("[data-events-empty]");
    const categorySelect = document.querySelector("[data-events-category]");
    const periodSelect = document.querySelector("[data-events-period]");
    const updated = document.querySelector("[data-events-updated]");
    if (!list || !empty || !categorySelect || !periodSelect) return;

    const categories = Object.entries(categoryTranslations).map(([value, labels]) => ({
      value,
      label: labels[lang()] || labels.es,
    }));

    const currentCategory = categorySelect.value || "all";
    const currentPeriod = periodSelect.value || "all";
    renderOptions(categorySelect, [{ value: "all", label: t("eventsCategoryAll") }, ...categories]);
    renderOptions(periodSelect, [
      { value: "all", label: t("eventsPeriodAll") },
      { value: "today", label: t("eventsPeriodToday") },
      { value: "weekend", label: t("eventsPeriodWeekend") },
      { value: "week", label: t("eventsPeriodWeek") },
    ]);
    categorySelect.value = currentCategory;
    periodSelect.value = currentPeriod;

    const events = getEvents().filter((event) => {
      const categoryMatch = categorySelect.value === "all" || event.category === categorySelect.value;
      const periodMatch = periodSelect.value === "all" || event.period === periodSelect.value;
      return categoryMatch && periodMatch;
    });

    list.innerHTML = events.map(renderEvent).join("");
    empty.hidden = events.length > 0;
    empty.textContent = t("eventsNoResults");
    if (updated) {
      updated.textContent = new Intl.DateTimeFormat(window.No1I18n.getLocale(), {
        day: "numeric",
        month: "short",
        hour: "2-digit",
        minute: "2-digit",
      }).format(new Date());
    }
  }

  function initEventsBoard() {
    const categorySelect = document.querySelector("[data-events-category]");
    const periodSelect = document.querySelector("[data-events-period]");
    if (!categorySelect || !periodSelect) return;

    renderEventsBoard();
    categorySelect.addEventListener("change", renderEventsBoard);
    periodSelect.addEventListener("change", renderEventsBoard);
  }

  document.addEventListener("DOMContentLoaded", initEventsBoard);
  window.addEventListener("no1:languagechange", renderEventsBoard);
})();
