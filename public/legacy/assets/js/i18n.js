(() => {
  const supportedLanguages = ["es", "en", "fr", "de"];
  const languageLabels = {
    es: "ES",
    en: "EN",
    fr: "FR",
    de: "DE",
  };
  const localeMap = {
    es: "es-ES",
    en: "en-GB",
    fr: "fr-FR",
    de: "de-DE",
  };

  const translations = {
    es: {
      navHome: "Inicio",
      navActivities: "Actividades",
      navTrip: "Organiza tu viaje",
      navBook: "Reserva ahora",
      navLocalEvents: "Eventos locales",
      navAbout: "Sobre nosotros",
      navContact: "Contacto",
      navOpen: "Abrir menu",
      footerText:
        "Agencia local en Tenerife para reservar excursiones, actividades y planes a medida con acompanamiento humano.",
      footerContact: "Contacto",
      footerLocation: "Tenerife, Islas Canarias",
      footerBookings: "Reservas",
      footerBookingText:
        "Consulta disponibilidad online o agenda una llamada de 15 minutos para organizar tu estancia.",
      footerCall: "Agendar llamada",
      footerVisualSources: "Fuentes visuales",
      homeTitle: "No1 Excursiones | Actividades y excursiones en Tenerife",
      homeMeta:
        "No1 Excursiones organiza y reserva excursiones locales en Tenerife: barco, buceo, aventura, gastronomia, cultura y rutas por la isla.",
      homeEyebrow: "Tenerife con expertos locales",
      homeHeroTitle: "Reserva excursiones sin perder tiempo organizando.",
      homeHeroText:
        "Elige directamente tu actividad con disponibilidad visible o agenda una llamada de 15 minutos para construir un plan a tu medida.",
      homeBookCta: "Ver actividades",
      homeCallCta: "Agendar llamada",
      homeFeature1Title: "Disponibilidad visible",
      homeFeature1Text: "Consulta fechas y horarios antes de reservar.",
      homeFeature2Title: "Seleccion local",
      homeFeature2Text: "Actividades con partners de confianza en la isla.",
      homeFeature3Title: "Asesoramiento humano",
      homeFeature3Text: "Una llamada breve si necesitas ordenar tu viaje.",
      homeActivitiesKicker: "Actividades",
      homeActivitiesTitle: "Todo lo que puedes vivir en Tenerife",
      homeCalendarCta: "Ver actividades",
      homeWaysKicker: "Dos formas de reservar",
      homeWaysTitle: "Para viajeros decididos y para quienes quieren orientacion.",
      homeWaysText:
        "Si sabes lo que quieres hacer, reserva directamente. Si estas comparando zonas, dias o niveles, una llamada corta evita perder horas entre opciones.",
      homeDirectTitle: "Reserva directa",
      homeDirectText:
        "Escoge actividad, fecha, hora y participantes desde el calendario.",
      homeDirectCta: "Ver actividades",
      homeCallTitle: "Llamada 15 minutos",
      homeCallText:
        "Explica tus fechas y preferencias para recibir una ruta clara.",
      homeCallSmallCta: "Agendar",
      eventsTitle: "Eventos locales | No1 Excursiones",
      eventsMeta:
        "Consulta eventos locales en Tenerife: espectaculos, mercados, conciertos, fiestas y planes de temporada.",
      eventsEyebrow: "Agenda local",
      eventsHeroTitle: "Eventos locales en Tenerife.",
      eventsHeroText:
        "Un panel vivo con planes de la isla: espectaculos, mercados, musica, gastronomia y fiestas locales.",
      eventsBoardKicker: "Panel de eventos",
      eventsBoardTitle: "Que ocurre estos dias",
      eventsUpdated: "Actualizado",
      eventsFilterCategory: "Categoria",
      eventsFilterPeriod: "Fecha",
      eventsCategoryAll: "Todas las categorias",
      eventsPeriodAll: "Todas las fechas",
      eventsPeriodToday: "Hoy",
      eventsPeriodWeekend: "Este fin de semana",
      eventsPeriodWeek: "Esta semana",
      eventsNoResults: "No hay eventos para estos filtros.",
      eventsPriceFree: "Gratis",
      tripTitle: "Organiza tu viaje | No1 Excursiones",
      tripMeta:
        "Agenda una llamada de 15 minutos para organizar tus excursiones y actividades en Tenerife.",
      tripEyebrow: "Llamada uno a uno",
      tripHeroTitle: "Organiza tu estancia en 15 minutos.",
      tripHeroText:
        "Cuentalo todo: fechas, zona, ritmo, presupuesto y actividades que te interesan. Te ayudamos a priorizar.",
      tripKicker: "Asesoramiento",
      tripSectionTitle: "Ideal si no sabes por donde empezar.",
      tripSectionText:
        "La llamada sirve para decidir que actividades tienen sentido segun tu alojamiento, tus dias disponibles y el perfil del grupo.",
      tripDuration: "Duracion",
      tripDurationValue: "15 minutos",
      tripFormat: "Formato",
      tripFormatValue: "Online",
      tripResult: "Resultado",
      tripResultValue: "Plan claro de actividades",
      tripFormKicker: "Experiencia a medida",
      tripFormTitle: "Cuentanos que quieres vivir en las Islas Canarias.",
      tripFormIntro:
        "Danos algunas pistas y prepararemos una experiencia a medida para tu viaje.",
      tripFormName: "Nombre y apellidos*",
      tripFormPhone: "Telefono*",
      tripFormEmail: "Email*",
      tripFormPeople: "Cuantas personas son?*",
      tripFormAge: "Que edad tienes?*",
      tripFormStartDate: "Fecha de llegada*",
      tripFormEndDate: "Fecha de salida*",
      tripFormAccommodation: "Lugar o zona de alojamiento*",
      tripFormExperiences:
        "Tipo de experiencias que quieren: deporte, aventura, calma, SPA, masajes, etc.*",
      tripFormComments: "Otros comentarios o preguntas que quieras anadir?*",
      tripFormPrivacy: "He leido y acepto la Politica de Privacidad.",
      tripFormMarketing:
        "Acepto recibir informacion sobre noticias, productos y servicios de No1 Excursiones.",
      tripFormRecaptcha:
        "Este sitio esta protegido por reCAPTCHA y se aplican la Politica de Privacidad y los Terminos de Servicio de Google.",
      tripFormDataInfo:
        "Informacion sobre tratamiento de datos: el responsable es No1 Excursiones. Finalidad: ofrecer, prestar y facturar servicios. Derechos: acceder, rectificar y suprimir datos como se explica en la Politica de Privacidad.",
      tripFormRequired: "* Campos obligatorios",
      tripFormSubmit: "Enviar",
      tripFormResult:
        "Solicitud recibida. El equipo preparara una propuesta a medida y te contactara pronto.",
      aboutTitle: "Sobre nosotros | No1 Excursiones",
      aboutMeta:
        "Conoce No1 Excursiones, agencia local para actividades y experiencias en Tenerife.",
      aboutEyebrow: "Agencia local",
      aboutHeroTitle: "Excursiones seleccionadas con criterio local.",
      aboutHeroText:
        "Conectamos viajeros con experiencias fiables, disponibilidad clara y acompanamiento antes de reservar.",
      aboutKicker: "Nuestra forma de trabajar",
      aboutSectionTitle: "Menos busqueda, mejores decisiones.",
      aboutLead:
        "No1 Excursiones nace para simplificar la organizacion de actividades en Tenerife. Reunimos opciones por tipo de viajero, zona y fecha para que reservar sea directo cuando ya lo tienes claro.",
      aboutText:
        "Cuando el viaje necesita mas contexto, la llamada de 15 minutos permite resolver dudas sobre distancias, clima, nivel fisico, horarios y combinaciones posibles.",
      aboutDestination: "Destino",
      aboutDestinationValue: "Tenerife",
      aboutSpecialty: "Especialidad",
      aboutSpecialtyValue: "Actividades y excursiones",
      aboutFocus: "Enfoque",
      aboutFocusValue: "Reserva simple y asesoramiento",
      aboutCtaKicker: "Proximo paso",
      aboutCtaTitle: "Encuentra una actividad o habla con nosotros.",
      contactTitle: "Contacto | No1 Excursiones",
      contactMeta:
        "Contacta con No1 Excursiones para actividades, reservas y asesoramiento en Tenerife.",
      contactEyebrow: "Contacto",
      contactHeroTitle: "Hablemos de tu viaje a Tenerife.",
      contactHeroText:
        "Escribe al equipo para dudas, grupos, reservas especiales o propuestas a medida.",
      contactDetails: "Datos",
      contactSectionTitle: "Estamos en Tenerife.",
      contactEmail: "Email",
      contactPhone: "Telefono",
      contactHours: "Horario",
      contactHoursValue: "Lunes a sabado",
      formName: "Nombre",
      formPhone: "Telefono",
      formPeople: "Personas",
      formTopic: "Motivo",
      formTopicBooking: "Reserva de actividad",
      formTopicCall: "Llamada de asesoramiento",
      formTopicGroup: "Grupo privado",
      formTopicOther: "Otra consulta",
      formMessage: "Mensaje",
      formSend: "Enviar mensaje",
      formResult:
        "Mensaje preparado. En produccion se enviara al CRM o email del equipo.",
      calendarAvailability: "Disponibilidad",
      calendarChoose: "Elige fecha y hora",
      calendarActivity: "Actividad",
      calendarSelectPrompt:
        "Selecciona una fecha disponible para ver horarios.",
      calendarAvailablePlaces: "plazas",
      calendarFull: "Completo",
      calendarSelectedDate: "Fecha seleccionada",
      calendarConfirm: "Confirmar reserva",
      calendarConfirmed: "Reserva confirmada para",
      calendarOn: "el",
      calendarAt: "a las",
      calendarReference: "Referencia",
      calendarPreviousMonth: "Mes anterior",
      calendarNextMonth: "Mes siguiente",
      calendlyTitle: "Agenda una llamada de 15 minutos",
      calendlyText:
        "El enlace de Calendly se conectara aqui cuando la cuenta del cliente este lista.",
      calendlyEmail: "Solicitar por email",
      activityExperience: "Experiencia",
      activitySectionTitle:
        "Una seleccion local para reservar sin perder tiempo",
      activityPrice: "Precio orientativo",
      activityFrom: "Desde",
      activityDuration: "Duracion",
      activityConfirmation: "Confirmacion",
      activityConfirmationValue: "Instantanea en esta demo",
      activityAvailabilityCta: "Ver disponibilidad",
      activityAdviceCta: "Quiero asesoramiento",
      activityTripKicker: "Viaje a medida",
      activityCtaTitle: "No sabes si esta actividad encaja?",
      activityCtaText:
        "Reserva una llamada gratuita de 15 minutos y ordenamos tus opciones.",
      whatsappOpen: "Abrir WhatsApp",
      whatsappClose: "Cerrar WhatsApp",
      whatsappOnline: "Online",
      whatsappGreeting:
        "Bienvenido! Enviame un mensaje y te respondere lo antes posible.",
      whatsappButton: "WhatsApp",
      whatsappPrefill:
        "Hola No1 Excursiones, quiero informacion para mi viaje a Tenerife.",
    },
    en: {
      navHome: "Home",
      navActivities: "Activities",
      navTrip: "Plan your trip",
      navBook: "Book now",
      navLocalEvents: "Local Events",
      navAbout: "About us",
      navContact: "Contact",
      navOpen: "Open menu",
      footerText:
        "Local Tenerife agency for booking excursions, activities and tailored plans with real human guidance.",
      footerContact: "Contact",
      footerLocation: "Tenerife, Canary Islands",
      footerBookings: "Bookings",
      footerBookingText:
        "Check online availability or schedule a 15-minute call to plan your stay.",
      footerCall: "Schedule a call",
      footerVisualSources: "Visual sources",
      homeTitle: "No1 Excursiones | Activities and excursions in Tenerife",
      homeMeta:
        "No1 Excursiones plans and books local Tenerife excursions: boat trips, diving, adventure, gastronomy, culture and island routes.",
      homeEyebrow: "Tenerife with local experts",
      homeHeroTitle: "Book excursions without losing time planning.",
      homeHeroText:
        "Choose your activity directly with visible availability, or schedule a 15-minute call to build a tailored plan.",
      homeBookCta: "View activities",
      homeCallCta: "Schedule a call",
      homeFeature1Title: "Visible availability",
      homeFeature1Text: "Check dates and times before booking.",
      homeFeature2Title: "Local selection",
      homeFeature2Text: "Activities with trusted partners on the island.",
      homeFeature3Title: "Human guidance",
      homeFeature3Text: "A short call when you need to organize your trip.",
      homeActivitiesKicker: "Activities",
      homeActivitiesTitle: "Everything you can experience in Tenerife",
      homeCalendarCta: "View activities",
      homeWaysKicker: "Two ways to book",
      homeWaysTitle: "For decided travelers and for those who want guidance.",
      homeWaysText:
        "If you know what you want to do, book directly. If you are comparing areas, days or levels, a short call saves hours of searching.",
      homeDirectTitle: "Direct booking",
      homeDirectText:
        "Choose activity, date, time and participants from the calendar.",
      homeDirectCta: "View activities",
      homeCallTitle: "15-minute call",
      homeCallText:
        "Share your dates and preferences to receive a clear route.",
      homeCallSmallCta: "Schedule",
      eventsTitle: "Local Events | No1 Excursiones",
      eventsMeta:
        "Explore local events in Tenerife: shows, markets, concerts, festivals and seasonal plans.",
      eventsEyebrow: "Local agenda",
      eventsHeroTitle: "Local events in Tenerife.",
      eventsHeroText:
        "A live-style board with island plans: shows, markets, music, gastronomy and local festivals.",
      eventsBoardKicker: "Event board",
      eventsBoardTitle: "What is happening these days",
      eventsUpdated: "Updated",
      eventsFilterCategory: "Category",
      eventsFilterPeriod: "Date",
      eventsCategoryAll: "All categories",
      eventsPeriodAll: "All dates",
      eventsPeriodToday: "Today",
      eventsPeriodWeekend: "This weekend",
      eventsPeriodWeek: "This week",
      eventsNoResults: "No events match these filters.",
      eventsPriceFree: "Free",
      tripTitle: "Plan your trip | No1 Excursiones",
      tripMeta:
        "Schedule a 15-minute call to plan your excursions and activities in Tenerife.",
      tripEyebrow: "One-to-one call",
      tripHeroTitle: "Plan your stay in 15 minutes.",
      tripHeroText:
        "Share your dates, area, pace, budget and activities of interest. We help you prioritize.",
      tripKicker: "Guidance",
      tripSectionTitle: "Ideal if you do not know where to start.",
      tripSectionText:
        "The call helps decide which activities make sense for your accommodation, available days and group profile.",
      tripDuration: "Duration",
      tripDurationValue: "15 minutes",
      tripFormat: "Format",
      tripFormatValue: "Online",
      tripResult: "Result",
      tripResultValue: "Clear activity plan",
      tripFormKicker: "Tailor-made experience",
      tripFormTitle: "Tell us what you want to experience in the Canary Islands.",
      tripFormIntro:
        "Give us some tips, and we'll make this trip a tailor-made experience for you.",
      tripFormName: "Name and surname*",
      tripFormPhone: "Phone number*",
      tripFormEmail: "Email*",
      tripFormPeople: "How many people are there?*",
      tripFormAge: "How old are you?*",
      tripFormStartDate: "Arrival date*",
      tripFormEndDate: "Departure date*",
      tripFormAccommodation: "Place or area of accommodation*",
      tripFormExperiences:
        "Type of experiences they want: sports, adventures, calm, SPA, massages, etc.*",
      tripFormComments: "Any other comments or questions you would like to add?*",
      tripFormPrivacy: "I have read and I accept the Privacy Policy.",
      tripFormMarketing:
        "I agree to receive information about news, products and services from No1 Excursiones.",
      tripFormRecaptcha:
        "This site is protected by reCAPTCHA and the Google Privacy Policy and Terms of Service apply.",
      tripFormDataInfo:
        "Information on data processing: the data controller is No1 Excursiones. Purpose: to offer, provide and invoice services. Rights: access, rectify and delete data as explained in the Privacy Policy.",
      tripFormRequired: "* Required fields",
      tripFormSubmit: "Send",
      tripFormResult:
        "Request received. The team will prepare a tailored proposal and contact you soon.",
      aboutTitle: "About us | No1 Excursiones",
      aboutMeta:
        "Meet No1 Excursiones, a local agency for activities and experiences in Tenerife.",
      aboutEyebrow: "Local agency",
      aboutHeroTitle: "Excursions selected with local judgment.",
      aboutHeroText:
        "We connect travelers with reliable experiences, clear availability and support before booking.",
      aboutKicker: "How we work",
      aboutSectionTitle: "Less searching, better decisions.",
      aboutLead:
        "No1 Excursiones was created to simplify activity planning in Tenerife. We group options by traveler type, area and date so booking is direct when you already know what you want.",
      aboutText:
        "When the trip needs more context, the 15-minute call helps resolve questions about distances, weather, fitness level, schedules and possible combinations.",
      aboutDestination: "Destination",
      aboutDestinationValue: "Tenerife",
      aboutSpecialty: "Specialty",
      aboutSpecialtyValue: "Activities and excursions",
      aboutFocus: "Focus",
      aboutFocusValue: "Simple booking and guidance",
      aboutCtaKicker: "Next step",
      aboutCtaTitle: "Find an activity or talk to us.",
      contactTitle: "Contact | No1 Excursiones",
      contactMeta:
        "Contact No1 Excursiones for activities, bookings and guidance in Tenerife.",
      contactEyebrow: "Contact",
      contactHeroTitle: "Let us talk about your trip to Tenerife.",
      contactHeroText:
        "Write to the team for questions, groups, special bookings or tailored proposals.",
      contactDetails: "Details",
      contactSectionTitle: "We are in Tenerife.",
      contactEmail: "Email",
      contactPhone: "Phone",
      contactHours: "Hours",
      contactHoursValue: "Monday to Saturday",
      formName: "Name",
      formPhone: "Phone",
      formPeople: "People",
      formTopic: "Reason",
      formTopicBooking: "Activity booking",
      formTopicCall: "Guidance call",
      formTopicGroup: "Private group",
      formTopicOther: "Other question",
      formMessage: "Message",
      formSend: "Send message",
      formResult:
        "Message prepared. In production it will be sent to the team's CRM or email.",
      calendarAvailability: "Availability",
      calendarChoose: "Choose date and time",
      calendarActivity: "Activity",
      calendarSelectPrompt: "Select an available date to see times.",
      calendarAvailablePlaces: "places",
      calendarFull: "Full",
      calendarSelectedDate: "Selected date",
      calendarConfirm: "Confirm booking",
      calendarConfirmed: "Booking confirmed for",
      calendarOn: "on",
      calendarAt: "at",
      calendarReference: "Reference",
      calendarPreviousMonth: "Previous month",
      calendarNextMonth: "Next month",
      calendlyTitle: "Schedule a 15-minute call",
      calendlyText:
        "The Calendly link will be connected here when the client's account is ready.",
      calendlyEmail: "Request by email",
      activityExperience: "Experience",
      activitySectionTitle: "A local selection to book without losing time",
      activityPrice: "Guide price",
      activityFrom: "From",
      activityDuration: "Duration",
      activityConfirmation: "Confirmation",
      activityConfirmationValue: "Instant in this demo",
      activityAvailabilityCta: "View availability",
      activityAdviceCta: "I want guidance",
      activityTripKicker: "Tailored trip",
      activityCtaTitle: "Not sure this activity fits?",
      activityCtaText:
        "Book a free 15-minute call and we will organize your options.",
      whatsappOpen: "Open WhatsApp",
      whatsappClose: "Close WhatsApp",
      whatsappOnline: "Online",
      whatsappGreeting:
        "Welcome! Send me a message and I will get back to you right away.",
      whatsappButton: "WhatsApp",
      whatsappPrefill:
        "Hello No1 Excursiones, I would like information for my trip to Tenerife.",
    },
    fr: {
      navHome: "Accueil",
      navActivities: "Activites",
      navTrip: "Organiser mon voyage",
      navBook: "Reserver",
      navLocalEvents: "Evenements Locaux",
      navAbout: "A propos",
      navContact: "Contact",
      navOpen: "Ouvrir le menu",
      footerText:
        "Agence locale a Tenerife pour reserver excursions, activites et plans sur mesure avec un accompagnement humain.",
      footerContact: "Contact",
      footerLocation: "Tenerife, Iles Canaries",
      footerBookings: "Reservations",
      footerBookingText:
        "Consultez les disponibilites en ligne ou planifiez un appel de 15 minutes pour organiser votre sejour.",
      footerCall: "Planifier un appel",
      footerVisualSources: "Sources visuelles",
      homeTitle: "No1 Excursiones | Activites et excursions a Tenerife",
      homeMeta:
        "No1 Excursiones organise et reserve des excursions locales a Tenerife : bateau, plongee, aventure, gastronomie, culture et routes autour de l'ile.",
      homeEyebrow: "Tenerife avec des experts locaux",
      homeHeroTitle: "Reservez vos excursions sans perdre de temps a organiser.",
      homeHeroText:
        "Choisissez directement votre activite avec les disponibilites visibles, ou planifiez un appel de 15 minutes pour construire un programme sur mesure.",
      homeBookCta: "Voir les activites",
      homeCallCta: "Planifier un appel",
      homeFeature1Title: "Disponibilites visibles",
      homeFeature1Text: "Consultez dates et horaires avant de reserver.",
      homeFeature2Title: "Selection locale",
      homeFeature2Text: "Activites avec des partenaires de confiance sur l'ile.",
      homeFeature3Title: "Conseil humain",
      homeFeature3Text: "Un appel court si vous devez structurer votre voyage.",
      homeActivitiesKicker: "Activites",
      homeActivitiesTitle: "Tout ce que vous pouvez vivre a Tenerife",
      homeCalendarCta: "Voir les activites",
      homeWaysKicker: "Deux facons de reserver",
      homeWaysTitle: "Pour les voyageurs decides et ceux qui veulent etre guides.",
      homeWaysText:
        "Si vous savez quoi faire, reservez directement. Si vous comparez zones, jours ou niveaux, un appel court evite des heures de recherche.",
      homeDirectTitle: "Reservation directe",
      homeDirectText:
        "Choisissez activite, date, heure et participants depuis le calendrier.",
      homeDirectCta: "Voir les activites",
      homeCallTitle: "Appel de 15 minutes",
      homeCallText:
        "Expliquez vos dates et preferences pour recevoir un itineraire clair.",
      homeCallSmallCta: "Planifier",
      eventsTitle: "Evenements Locaux | No1 Excursiones",
      eventsMeta:
        "Consultez les evenements locaux a Tenerife : spectacles, marches, concerts, fetes et plans de saison.",
      eventsEyebrow: "Agenda local",
      eventsHeroTitle: "Evenements locaux a Tenerife.",
      eventsHeroText:
        "Un panneau vivant avec les plans de l'ile : spectacles, marches, musique, gastronomie et fetes locales.",
      eventsBoardKicker: "Panneau d'affichage",
      eventsBoardTitle: "Ce qui se passe ces jours-ci",
      eventsUpdated: "Mis a jour",
      eventsFilterCategory: "Categorie",
      eventsFilterPeriod: "Date",
      eventsCategoryAll: "Toutes les categories",
      eventsPeriodAll: "Toutes les dates",
      eventsPeriodToday: "Aujourd'hui",
      eventsPeriodWeekend: "Ce week-end",
      eventsPeriodWeek: "Cette semaine",
      eventsNoResults: "Aucun evenement pour ces filtres.",
      eventsPriceFree: "Gratuit",
      tripTitle: "Organiser mon voyage | No1 Excursiones",
      tripMeta:
        "Planifiez un appel de 15 minutes pour organiser vos excursions et activites a Tenerife.",
      tripEyebrow: "Appel individuel",
      tripHeroTitle: "Organisez votre sejour en 15 minutes.",
      tripHeroText:
        "Partagez vos dates, zone, rythme, budget et activites souhaitees. Nous vous aidons a prioriser.",
      tripKicker: "Conseil",
      tripSectionTitle: "Ideal si vous ne savez pas par ou commencer.",
      tripSectionText:
        "L'appel sert a choisir les activites adaptees a votre hebergement, vos jours disponibles et le profil du groupe.",
      tripDuration: "Duree",
      tripDurationValue: "15 minutes",
      tripFormat: "Format",
      tripFormatValue: "En ligne",
      tripResult: "Resultat",
      tripResultValue: "Plan d'activites clair",
      tripFormKicker: "Experience sur mesure",
      tripFormTitle: "Dites-nous ce que vous voulez vivre aux Canaries.",
      tripFormIntro:
        "Donnez-nous quelques indications et nous preparerons une experience sur mesure pour votre voyage.",
      tripFormName: "Nom et prenom*",
      tripFormPhone: "Telephone*",
      tripFormEmail: "Email*",
      tripFormPeople: "Combien de personnes etes-vous?*",
      tripFormAge: "Quel age avez-vous?*",
      tripFormStartDate: "Date d'arrivee*",
      tripFormEndDate: "Date de depart*",
      tripFormAccommodation: "Lieu ou zone d'hebergement*",
      tripFormExperiences:
        "Type d'experiences souhaitees: sport, aventure, calme, SPA, massages, etc.*",
      tripFormComments: "Autres commentaires ou questions a ajouter?*",
      tripFormPrivacy: "J'ai lu et j'accepte la Politique de Confidentialite.",
      tripFormMarketing:
        "J'accepte de recevoir des informations sur les nouveautes, produits et services de No1 Excursiones.",
      tripFormRecaptcha:
        "Ce site est protege par reCAPTCHA et la Politique de Confidentialite ainsi que les Conditions d'Utilisation de Google s'appliquent.",
      tripFormDataInfo:
        "Informations sur le traitement des donnees: le responsable est No1 Excursiones. Finalite: proposer, fournir et facturer les services. Droits: acceder, rectifier et supprimer les donnees comme explique dans la Politique de Confidentialite.",
      tripFormRequired: "* Champs obligatoires",
      tripFormSubmit: "Envoyer",
      tripFormResult:
        "Demande recue. L'equipe preparera une proposition sur mesure et vous contactera rapidement.",
      aboutTitle: "A propos | No1 Excursiones",
      aboutMeta:
        "Decouvrez No1 Excursiones, agence locale pour activites et experiences a Tenerife.",
      aboutEyebrow: "Agence locale",
      aboutHeroTitle: "Des excursions selectionnees avec un regard local.",
      aboutHeroText:
        "Nous connectons les voyageurs a des experiences fiables, des disponibilites claires et un accompagnement avant reservation.",
      aboutKicker: "Notre methode",
      aboutSectionTitle: "Moins de recherche, de meilleures decisions.",
      aboutLead:
        "No1 Excursiones simplifie l'organisation des activites a Tenerife. Nous regroupons les options par type de voyageur, zone et date pour reserver directement quand votre choix est clair.",
      aboutText:
        "Quand le voyage demande plus de contexte, l'appel de 15 minutes aide a resoudre les questions de distances, meteo, niveau physique, horaires et combinaisons possibles.",
      aboutDestination: "Destination",
      aboutDestinationValue: "Tenerife",
      aboutSpecialty: "Specialite",
      aboutSpecialtyValue: "Activites et excursions",
      aboutFocus: "Approche",
      aboutFocusValue: "Reservation simple et conseil",
      aboutCtaKicker: "Prochaine etape",
      aboutCtaTitle: "Trouvez une activite ou contactez-nous.",
      contactTitle: "Contact | No1 Excursiones",
      contactMeta:
        "Contactez No1 Excursiones pour activites, reservations et conseil a Tenerife.",
      contactEyebrow: "Contact",
      contactHeroTitle: "Parlons de votre voyage a Tenerife.",
      contactHeroText:
        "Ecrivez a l'equipe pour vos questions, groupes, reservations speciales ou propositions sur mesure.",
      contactDetails: "Coordonnees",
      contactSectionTitle: "Nous sommes a Tenerife.",
      contactEmail: "Email",
      contactPhone: "Telephone",
      contactHours: "Horaires",
      contactHoursValue: "Lundi a samedi",
      formName: "Nom",
      formPhone: "Telephone",
      formPeople: "Personnes",
      formTopic: "Motif",
      formTopicBooking: "Reservation d'activite",
      formTopicCall: "Appel conseil",
      formTopicGroup: "Groupe prive",
      formTopicOther: "Autre demande",
      formMessage: "Message",
      formSend: "Envoyer le message",
      formResult:
        "Message prepare. En production, il sera envoye au CRM ou a l'email de l'equipe.",
      calendarAvailability: "Disponibilites",
      calendarChoose: "Choisissez date et heure",
      calendarActivity: "Activite",
      calendarSelectPrompt:
        "Selectionnez une date disponible pour voir les horaires.",
      calendarAvailablePlaces: "places",
      calendarFull: "Complet",
      calendarSelectedDate: "Date selectionnee",
      calendarConfirm: "Confirmer la reservation",
      calendarConfirmed: "Reservation confirmee pour",
      calendarOn: "le",
      calendarAt: "a",
      calendarReference: "Reference",
      calendarPreviousMonth: "Mois precedent",
      calendarNextMonth: "Mois suivant",
      calendlyTitle: "Planifier un appel de 15 minutes",
      calendlyText:
        "Le lien Calendly sera connecte ici quand le compte du client sera pret.",
      calendlyEmail: "Demander par email",
      activityExperience: "Experience",
      activitySectionTitle: "Une selection locale pour reserver sans perdre de temps",
      activityPrice: "Prix indicatif",
      activityFrom: "A partir de",
      activityDuration: "Duree",
      activityConfirmation: "Confirmation",
      activityConfirmationValue: "Instantanee dans cette demo",
      activityAvailabilityCta: "Voir disponibilites",
      activityAdviceCta: "Je veux un conseil",
      activityTripKicker: "Voyage sur mesure",
      activityCtaTitle: "Vous ne savez pas si cette activite convient ?",
      activityCtaText:
        "Reservez un appel gratuit de 15 minutes et nous organiserons vos options.",
      whatsappOpen: "Ouvrir WhatsApp",
      whatsappClose: "Fermer WhatsApp",
      whatsappOnline: "Online",
      whatsappGreeting:
        "Bienvenue ! Envoyez-moi un message et je vous repondrai rapidement.",
      whatsappButton: "WhatsApp",
      whatsappPrefill:
        "Bonjour No1 Excursiones, je souhaite des informations pour mon voyage a Tenerife.",
    },
    de: {
      navHome: "Startseite",
      navActivities: "Aktivitaeten",
      navTrip: "Reise planen",
      navBook: "Jetzt buchen",
      navLocalEvents: "Lokale Veranstaltungen",
      navAbout: "Ueber uns",
      navContact: "Kontakt",
      navOpen: "Menue oeffnen",
      footerText:
        "Lokale Agentur auf Teneriffa fuer Ausfluege, Aktivitaeten und massgeschneiderte Plaene mit persoenlicher Beratung.",
      footerContact: "Kontakt",
      footerLocation: "Teneriffa, Kanarische Inseln",
      footerBookings: "Buchungen",
      footerBookingText:
        "Pruefen Sie Online-Verfuegbarkeit oder vereinbaren Sie einen 15-minuetigen Anruf zur Planung Ihres Aufenthalts.",
      footerCall: "Anruf planen",
      footerVisualSources: "Bildquellen",
      homeTitle: "No1 Excursiones | Aktivitaeten und Ausfluege auf Teneriffa",
      homeMeta:
        "No1 Excursiones plant und bucht lokale Ausfluege auf Teneriffa: Bootstouren, Tauchen, Abenteuer, Gastronomie, Kultur und Inselrouten.",
      homeEyebrow: "Teneriffa mit lokalen Experten",
      homeHeroTitle: "Buchen Sie Ausfluege ohne Planungsstress.",
      homeHeroText:
        "Waehlen Sie Ihre Aktivitaet direkt mit sichtbarer Verfuegbarkeit oder planen Sie einen 15-minuetigen Anruf fuer ein individuelles Programm.",
      homeBookCta: "Aktivitaeten ansehen",
      homeCallCta: "Anruf planen",
      homeFeature1Title: "Sichtbare Verfuegbarkeit",
      homeFeature1Text: "Pruefen Sie Termine und Uhrzeiten vor der Buchung.",
      homeFeature2Title: "Lokale Auswahl",
      homeFeature2Text: "Aktivitaeten mit vertrauenswuerdigen Partnern auf der Insel.",
      homeFeature3Title: "Persoenliche Beratung",
      homeFeature3Text: "Ein kurzer Anruf, wenn Sie Ihre Reise ordnen moechten.",
      homeActivitiesKicker: "Aktivitaeten",
      homeActivitiesTitle: "Alles, was Sie auf Teneriffa erleben koennen",
      homeCalendarCta: "Aktivitaeten ansehen",
      homeWaysKicker: "Zwei Buchungswege",
      homeWaysTitle: "Fuer entschlossene Reisende und fuer alle, die Beratung suchen.",
      homeWaysText:
        "Wenn Sie wissen, was Sie tun moechten, buchen Sie direkt. Wenn Sie Orte, Tage oder Niveaus vergleichen, spart ein kurzer Anruf viel Suchzeit.",
      homeDirectTitle: "Direkte Buchung",
      homeDirectText:
        "Waehlen Sie Aktivitaet, Datum, Uhrzeit und Teilnehmer im Kalender.",
      homeDirectCta: "Aktivitaeten ansehen",
      homeCallTitle: "15-Minuten-Anruf",
      homeCallText:
        "Teilen Sie Ihre Reisedaten und Wuensche, um einen klaren Plan zu erhalten.",
      homeCallSmallCta: "Planen",
      eventsTitle: "Lokale Veranstaltungen | No1 Excursiones",
      eventsMeta:
        "Entdecken Sie lokale Veranstaltungen auf Teneriffa: Shows, Maerkte, Konzerte, Feste und saisonale Plaene.",
      eventsEyebrow: "Lokaler Kalender",
      eventsHeroTitle: "Lokale Veranstaltungen auf Teneriffa.",
      eventsHeroText:
        "Eine aktuelle Pinnwand mit Inselplaenen: Shows, Maerkte, Musik, Gastronomie und lokale Feste.",
      eventsBoardKicker: "Veranstaltungstafel",
      eventsBoardTitle: "Was in diesen Tagen passiert",
      eventsUpdated: "Aktualisiert",
      eventsFilterCategory: "Kategorie",
      eventsFilterPeriod: "Datum",
      eventsCategoryAll: "Alle Kategorien",
      eventsPeriodAll: "Alle Termine",
      eventsPeriodToday: "Heute",
      eventsPeriodWeekend: "Dieses Wochenende",
      eventsPeriodWeek: "Diese Woche",
      eventsNoResults: "Keine Veranstaltungen fuer diese Filter.",
      eventsPriceFree: "Kostenlos",
      tripTitle: "Reise planen | No1 Excursiones",
      tripMeta:
        "Vereinbaren Sie einen 15-minuetigen Anruf, um Ihre Ausfluege und Aktivitaeten auf Teneriffa zu planen.",
      tripEyebrow: "Persoenlicher Anruf",
      tripHeroTitle: "Planen Sie Ihren Aufenthalt in 15 Minuten.",
      tripHeroText:
        "Teilen Sie Daten, Region, Tempo, Budget und gewuenschte Aktivitaeten. Wir helfen beim Priorisieren.",
      tripKicker: "Beratung",
      tripSectionTitle: "Ideal, wenn Sie nicht wissen, wo Sie anfangen sollen.",
      tripSectionText:
        "Der Anruf hilft zu entscheiden, welche Aktivitaeten zu Unterkunft, verfuegbaren Tagen und Gruppenprofil passen.",
      tripDuration: "Dauer",
      tripDurationValue: "15 Minuten",
      tripFormat: "Format",
      tripFormatValue: "Online",
      tripResult: "Ergebnis",
      tripResultValue: "Klarer Aktivitaetenplan",
      tripFormKicker: "Massgeschneidertes Erlebnis",
      tripFormTitle: "Sagen Sie uns, was Sie auf den Kanaren erleben moechten.",
      tripFormIntro:
        "Geben Sie uns ein paar Hinweise, und wir gestalten diese Reise passend fuer Sie.",
      tripFormName: "Name und Nachname*",
      tripFormPhone: "Telefonnummer*",
      tripFormEmail: "Email*",
      tripFormPeople: "Wie viele Personen sind dabei?*",
      tripFormAge: "Wie alt sind Sie?*",
      tripFormStartDate: "Ankunftsdatum*",
      tripFormEndDate: "Abreisedatum*",
      tripFormAccommodation: "Ort oder Gebiet der Unterkunft*",
      tripFormExperiences:
        "Gewuenschte Erlebnisse: Sport, Abenteuer, Ruhe, SPA, Massagen usw.*",
      tripFormComments: "Weitere Kommentare oder Fragen?*",
      tripFormPrivacy: "Ich habe die Datenschutzerklaerung gelesen und akzeptiere sie.",
      tripFormMarketing:
        "Ich moechte Informationen ueber Neuigkeiten, Produkte und Services von No1 Excursiones erhalten.",
      tripFormRecaptcha:
        "Diese Website ist durch reCAPTCHA geschuetzt und es gelten die Google-Datenschutzerklaerung und Nutzungsbedingungen.",
      tripFormDataInfo:
        "Informationen zur Datenverarbeitung: Verantwortlicher ist No1 Excursiones. Zweck: Services anbieten, bereitstellen und abrechnen. Rechte: Zugriff, Berichtigung und Loeschung wie in der Datenschutzerklaerung beschrieben.",
      tripFormRequired: "* Pflichtfelder",
      tripFormSubmit: "Senden",
      tripFormResult:
        "Anfrage erhalten. Das Team erstellt einen individuellen Vorschlag und meldet sich bald.",
      aboutTitle: "Ueber uns | No1 Excursiones",
      aboutMeta:
        "Lernen Sie No1 Excursiones kennen, eine lokale Agentur fuer Aktivitaeten und Erlebnisse auf Teneriffa.",
      aboutEyebrow: "Lokale Agentur",
      aboutHeroTitle: "Ausfluege mit lokalem Blick ausgewaehlt.",
      aboutHeroText:
        "Wir verbinden Reisende mit verlaesslichen Erlebnissen, klarer Verfuegbarkeit und Unterstuetzung vor der Buchung.",
      aboutKicker: "Unsere Arbeitsweise",
      aboutSectionTitle: "Weniger Suche, bessere Entscheidungen.",
      aboutLead:
        "No1 Excursiones vereinfacht die Planung von Aktivitaeten auf Teneriffa. Wir buendeln Optionen nach Reisetyp, Region und Datum, damit die Buchung direkt ist, wenn Ihre Wahl klar ist.",
      aboutText:
        "Wenn die Reise mehr Kontext braucht, klaert der 15-minuetige Anruf Fragen zu Entfernungen, Wetter, Fitnessniveau, Zeiten und moeglichen Kombinationen.",
      aboutDestination: "Reiseziel",
      aboutDestinationValue: "Teneriffa",
      aboutSpecialty: "Spezialgebiet",
      aboutSpecialtyValue: "Aktivitaeten und Ausfluege",
      aboutFocus: "Fokus",
      aboutFocusValue: "Einfache Buchung und Beratung",
      aboutCtaKicker: "Naechster Schritt",
      aboutCtaTitle: "Finden Sie eine Aktivitaet oder sprechen Sie mit uns.",
      contactTitle: "Kontakt | No1 Excursiones",
      contactMeta:
        "Kontaktieren Sie No1 Excursiones fuer Aktivitaeten, Buchungen und Beratung auf Teneriffa.",
      contactEyebrow: "Kontakt",
      contactHeroTitle: "Sprechen wir ueber Ihre Reise nach Teneriffa.",
      contactHeroText:
        "Schreiben Sie dem Team fuer Fragen, Gruppen, Sonderbuchungen oder individuelle Vorschlaege.",
      contactDetails: "Daten",
      contactSectionTitle: "Wir sind auf Teneriffa.",
      contactEmail: "Email",
      contactPhone: "Telefon",
      contactHours: "Zeiten",
      contactHoursValue: "Montag bis Samstag",
      formName: "Name",
      formPhone: "Telefon",
      formPeople: "Personen",
      formTopic: "Anliegen",
      formTopicBooking: "Aktivitaet buchen",
      formTopicCall: "Beratungsanruf",
      formTopicGroup: "Private Gruppe",
      formTopicOther: "Andere Frage",
      formMessage: "Nachricht",
      formSend: "Nachricht senden",
      formResult:
        "Nachricht vorbereitet. In Produktion wird sie an das CRM oder die Email des Teams gesendet.",
      calendarAvailability: "Verfuegbarkeit",
      calendarChoose: "Datum und Uhrzeit waehlen",
      calendarActivity: "Aktivitaet",
      calendarSelectPrompt:
        "Waehlen Sie ein verfuegbares Datum, um Uhrzeiten zu sehen.",
      calendarAvailablePlaces: "Plaetze",
      calendarFull: "Ausgebucht",
      calendarSelectedDate: "Ausgewaehltes Datum",
      calendarConfirm: "Buchung bestaetigen",
      calendarConfirmed: "Buchung bestaetigt fuer",
      calendarOn: "am",
      calendarAt: "um",
      calendarReference: "Referenz",
      calendarPreviousMonth: "Vorheriger Monat",
      calendarNextMonth: "Naechster Monat",
      calendlyTitle: "15-Minuten-Anruf planen",
      calendlyText:
        "Der Calendly-Link wird hier verbunden, sobald das Kundenkonto bereit ist.",
      calendlyEmail: "Per Email anfragen",
      activityExperience: "Erlebnis",
      activitySectionTitle: "Eine lokale Auswahl fuer schnelle Buchung",
      activityPrice: "Richtpreis",
      activityFrom: "Ab",
      activityDuration: "Dauer",
      activityConfirmation: "Bestaetigung",
      activityConfirmationValue: "Sofort in dieser Demo",
      activityAvailabilityCta: "Verfuegbarkeit ansehen",
      activityAdviceCta: "Ich moechte Beratung",
      activityTripKicker: "Massgeschneiderte Reise",
      activityCtaTitle: "Nicht sicher, ob diese Aktivitaet passt?",
      activityCtaText:
        "Buchen Sie einen kostenlosen 15-minuetigen Anruf und wir ordnen Ihre Optionen.",
      whatsappOpen: "WhatsApp oeffnen",
      whatsappClose: "WhatsApp schliessen",
      whatsappOnline: "Online",
      whatsappGreeting:
        "Willkommen! Senden Sie mir eine Nachricht und ich antworte so schnell wie moeglich.",
      whatsappButton: "WhatsApp",
      whatsappPrefill:
        "Hallo No1 Excursiones, ich moechte Informationen fuer meine Reise nach Teneriffa.",
    },
  };

  function queryLanguage() {
    const query = window.location.search.replace(/^\?/, "");
    const match = query
      .split("&")
      .map((part) => part.split("="))
      .find(([key]) => decodeURIComponent(key || "") === "lang");
    return match ? decodeURIComponent(match[1] || "") : "";
  }

  function normalizeLanguage(lang) {
    return supportedLanguages.includes(lang) ? lang : "es";
  }

  function getLanguage() {
    return normalizeLanguage(
      queryLanguage() || localStorage.getItem("no1-language") || "es",
    );
  }

  let currentLanguage = getLanguage();

  function t(key) {
    return translations[currentLanguage][key] || translations.es[key] || key;
  }

  function setLanguage(lang) {
    currentLanguage = normalizeLanguage(lang);
    localStorage.setItem("no1-language", currentLanguage);
    document.documentElement.lang = currentLanguage;
    translateStaticPage();
    window.dispatchEvent(new CustomEvent("no1:languagechange", { detail: { lang: currentLanguage } }));
  }

  function translateStaticPage() {
    document.documentElement.lang = currentLanguage;
    document.querySelectorAll("[data-i18n]").forEach((node) => {
      node.textContent = t(node.dataset.i18n);
    });
    document.querySelectorAll("[data-i18n-aria]").forEach((node) => {
      node.setAttribute("aria-label", t(node.dataset.i18nAria));
    });
    document.querySelectorAll("[data-i18n-title]").forEach((node) => {
      node.setAttribute("title", t(node.dataset.i18nTitle));
    });

    const page = document.body.dataset.page;
    if (page) {
      const title = t(`${page}Title`);
      const description = t(`${page}Meta`);
      if (title) document.title = title;
      const meta = document.querySelector('meta[name="description"]');
      if (meta && description) meta.setAttribute("content", description);
    }
  }

  window.No1I18n = {
    labels: languageLabels,
    localeMap,
    supportedLanguages,
    getLanguage: () => currentLanguage,
    getLocale: () => localeMap[currentLanguage],
    setLanguage,
    t,
    translateStaticPage,
  };

  document.addEventListener("DOMContentLoaded", translateStaticPage);
})();
