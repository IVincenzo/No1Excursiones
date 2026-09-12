(() => {
  function i18n() {
    return window.No1I18n;
  }

  function t(key) {
    return i18n().t(key);
  }

  function formatDate(dateKey, options) {
    return new Intl.DateTimeFormat(i18n().getLocale(), options).format(
      new Date(`${dateKey}T12:00:00`),
    );
  }

  function buildDayButton(day) {
    const isAvailable = day.status === "available" && day.slots.length > 0;
    return `
      <button class="calendar-day ${isAvailable ? "is-available" : "is-unavailable"}"
        type="button"
        data-date="${day.date}"
        ${isAvailable ? "" : "disabled"}
        aria-label="${formatDate(day.date, { dateStyle: "full" })}">
        ${isAvailable ? '<span class="calendar-available-dot" aria-hidden="true"></span>' : ""}
        <span class="calendar-day-heading">
          <span class="calendar-day-number">${formatDate(day.date, { day: "numeric" })}</span>
          <span class="calendar-day-week">${formatDate(day.date, { weekday: "short" })}</span>
        </span>
        <span class="calendar-day-status">${isAvailable ? `${day.remaining} ${t("calendarAvailablePlaces")}` : t("calendarFull")}</span>
      </button>
    `;
  }

  function groupMonths(days) {
    const groups = days.reduce((months, day) => {
      const monthKey = day.date.slice(0, 7);
      if (!months.has(monthKey)) months.set(monthKey, []);
      months.get(monthKey).push(day);
      return months;
    }, new Map());

    return Array.from(groups.entries()).map(([monthKey, monthDays]) => ({
      key: monthKey,
      label: formatDate(`${monthKey}-01`, { month: "long", year: "numeric" }),
      days: monthDays,
    }));
  }

  function buildMonthSection(month, monthIndex, monthCount) {
    return `
      <section class="calendar-month" aria-label="${month.label}">
        <div class="calendar-month-nav">
          <button class="calendar-month-arrow" type="button" data-calendar-prev ${monthIndex === 0 ? "disabled" : ""} aria-label="${t("calendarPreviousMonth")}">
            <span aria-hidden="true">&lsaquo;</span>
          </button>
          <h3 class="calendar-month-title">${month.label}</h3>
          <button class="calendar-month-arrow" type="button" data-calendar-next ${monthIndex === monthCount - 1 ? "disabled" : ""} aria-label="${t("calendarNextMonth")}">
            <span aria-hidden="true">&rsaquo;</span>
          </button>
        </div>
        <div class="calendar-grid">
          ${month.days.map(buildDayButton).join("")}
        </div>
      </section>
    `;
  }

  function renderActivityOptions(selectedSlug) {
    return window.No1Excursiones.getActivities()
      .map(
        (activity) =>
          `<option value="${activity.slug}" ${activity.slug === selectedSlug ? "selected" : ""}>${activity.title}</option>`,
      )
      .join("");
  }

  function calendarShell(activity, includeSelect) {
    return `
      <div class="booking-widget">
        <div class="booking-toolbar">
          <div>
            <p class="eyebrow mb-1">${t("calendarAvailability")}</p>
            <h2 class="h4 mb-0">${t("calendarChoose")}</h2>
          </div>
          ${
            includeSelect
              ? `<label class="form-label mb-0 booking-select-label">
                  ${t("calendarActivity")}
                  <select class="form-select" data-booking-activity>
                    ${renderActivityOptions(activity.slug)}
                  </select>
                </label>`
              : `<span class="badge text-bg-light">${activity.title}</span>`
          }
        </div>
        <div class="calendar-months" data-calendar-days></div>
        <div class="booking-panel" data-booking-panel>
          <p class="text-secondary mb-0">${t("calendarSelectPrompt")}</p>
        </div>
      </div>
    `;
  }

  async function renderCalendar(root, activitySlug, includeSelect) {
    const activity = window.No1Excursiones.getActivity(activitySlug);
    if (!activity) return;

    root.innerHTML = calendarShell(activity, includeSelect);
    const availability = await window.No1Excursiones.getAvailability(activity.slug);
    const daysNode = root.querySelector("[data-calendar-days]");
    const panelNode = root.querySelector("[data-booking-panel]");
    const months = groupMonths(availability);
    let monthIndex = Math.min(Number(root.dataset.monthIndex || 0), months.length - 1);

    function renderVisibleMonth() {
      root.dataset.monthIndex = String(monthIndex);
      daysNode.innerHTML = buildMonthSection(months[monthIndex], monthIndex, months.length);

      root.querySelectorAll(".calendar-day.is-available").forEach((button) => {
        button.addEventListener("click", () => {
          root.querySelectorAll(".calendar-day").forEach((item) => item.classList.remove("is-selected"));
          button.classList.add("is-selected");
          const day = availability.find((item) => item.date === button.dataset.date);
          renderBookingPanel(panelNode, activity, day);
        });
      });

      const prev = root.querySelector("[data-calendar-prev]");
      const next = root.querySelector("[data-calendar-next]");
      prev.addEventListener("click", () => {
        if (monthIndex === 0) return;
        monthIndex -= 1;
        panelNode.innerHTML = `<p class="text-secondary mb-0">${t("calendarSelectPrompt")}</p>`;
        renderVisibleMonth();
      });
      next.addEventListener("click", () => {
        if (monthIndex === months.length - 1) return;
        monthIndex += 1;
        panelNode.innerHTML = `<p class="text-secondary mb-0">${t("calendarSelectPrompt")}</p>`;
        renderVisibleMonth();
      });
    }

    renderVisibleMonth();

    const select = root.querySelector("[data-booking-activity]");
    if (select) {
      select.addEventListener("change", () => {
        root.dataset.monthIndex = "0";
        renderCalendar(root, select.value, includeSelect);
      });
    }
  }

  function renderBookingPanel(panelNode, activity, day) {
    panelNode.innerHTML = `
      <div class="row g-3 align-items-end">
        <div class="col-12 col-lg-4">
          <p class="eyebrow mb-1">${t("calendarSelectedDate")}</p>
          <h3 class="h5 mb-0">${formatDate(day.date, { weekday: "long", day: "numeric", month: "long" })}</h3>
        </div>
        <div class="col-12 col-lg-8">
          <div class="slot-list" data-slot-list>
            ${day.slots
              .map(
                (slot) =>
                  `<button class="slot-button" type="button" data-time="${slot.time}">${slot.time}<span>${slot.places} ${t("calendarAvailablePlaces")}</span></button>`,
              )
              .join("")}
          </div>
        </div>
      </div>
      <form class="booking-form mt-4" data-booking-form>
        <input type="hidden" name="activity" value="${activity.title}">
        <input type="hidden" name="date" value="${day.date}">
        <input type="hidden" name="time" data-selected-time>
        <div class="row g-3">
          <div class="col-md-6">
            <label class="form-label">${t("formName")}</label>
            <input class="form-control" name="name" required autocomplete="name">
          </div>
          <div class="col-md-6">
            <label class="form-label">Email</label>
            <input class="form-control" type="email" name="email" required autocomplete="email">
          </div>
          <div class="col-md-6">
            <label class="form-label">${t("formPhone")}</label>
            <input class="form-control" type="tel" name="phone" autocomplete="tel">
          </div>
          <div class="col-md-3">
            <label class="form-label">${t("formPeople")}</label>
            <input class="form-control" type="number" name="participants" min="1" max="12" value="2" required>
          </div>
          <div class="col-md-3 d-grid">
            <button class="btn btn-primary" type="submit" disabled data-confirm-booking>${t("calendarConfirm")}</button>
          </div>
        </div>
      </form>
      <div class="booking-result mt-3" data-booking-result></div>
    `;

    const timeInput = panelNode.querySelector("[data-selected-time]");
    const confirmButton = panelNode.querySelector("[data-confirm-booking]");
    panelNode.querySelectorAll(".slot-button").forEach((button) => {
      button.addEventListener("click", () => {
        panelNode.querySelectorAll(".slot-button").forEach((item) => item.classList.remove("is-selected"));
        button.classList.add("is-selected");
        timeInput.value = button.dataset.time;
        confirmButton.disabled = false;
      });
    });

    panelNode.querySelector("[data-booking-form]").addEventListener("submit", async (event) => {
      event.preventDefault();
      const form = event.currentTarget;
      const payload = Object.fromEntries(new FormData(form).entries());
      const result = await window.No1Excursiones.createBooking(payload);
      panelNode.querySelector("[data-booking-result]").innerHTML = `
        <div class="alert alert-success mb-0" role="status">
          ${t("calendarConfirmed")} <strong>${result.activity}</strong> ${t("calendarOn")} ${formatDate(result.date, {
            day: "numeric",
            month: "long",
          })} ${t("calendarAt")} ${result.time}. ${t("calendarReference")}: <strong>${result.reference}</strong>.
        </div>
      `;
      form.reset();
      confirmButton.disabled = true;
    });
  }

  function renderAll() {
    document.querySelectorAll("[data-calendar]").forEach((root) => {
      const isAll = root.dataset.calendar === "all";
      const activitySlug =
        root.dataset.activitySlug || window.No1Excursiones.activities[0].slug;
      renderCalendar(root, activitySlug, isAll);
    });
  }

  window.No1Calendar = { renderAll };

  document.addEventListener("DOMContentLoaded", renderAll);
})();
