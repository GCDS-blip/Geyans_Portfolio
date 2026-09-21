/* ============================================================
   PORTFOLIO SCRIPT.JS — Flight Plan theme (v4, cabin-crew focused)
   Matches the real Portfolio.HTML structure. Does not assume any
   element that isn't already in that file.
   Load this before the closing body tag of the page.
   ============================================================ */

document.addEventListener('DOMContentLoaded', () => {

  /* ---------- Boarding-pass check-in gate — now shown AFTER the
     GCDS splash finishes (see finishIntro() below), not at page
     load. Purely cosmetic: no password, nothing verified or stored
     anywhere. "Check In" and "Skip" both simply proceed onward;
     entering a name just personalizes the chatbot's opening
     greeting as a small nice-to-have. ---------- */
  function initCheckinGate(onProceed) {
    const REQUIRED_NAME = 'gian carlo d. soriano';
    const gate = document.getElementById('checkinGate');
    const card = document.getElementById('checkinCard');
    const nameInput = document.getElementById('checkinName');
    const errorMsg = document.getElementById('checkinError');
    const submitBtn = document.getElementById('checkinSubmit');
    if (!gate || !card) { if (onProceed) onProceed(); return; }

    document.body.classList.add('gate-active');

    // reveal instantly (no fade), so there's no frame where the
    // portfolio underneath is visible during the handoff
    gate.style.transition = 'none';
    gate.classList.remove('gate-hidden');
    void gate.offsetWidth;
    gate.style.transition = '';

    // replay the card's pop-in animation now that it's actually visible
    card.style.animation = 'none';
    void card.offsetWidth;
    card.style.animation = '';

    if (nameInput) {
      setTimeout(() => nameInput.focus(), 400);
      nameInput.addEventListener('keydown', (e) => {
        if (e.key === 'Enter') attemptCheckIn();
      });
      // typing again after a failed attempt clears the error state
      nameInput.addEventListener('input', () => {
        nameInput.classList.remove('checkin-input-error');
        if (errorMsg) errorMsg.classList.remove('show');
      });
    }

    function proceed(name) {
      if (name) {
        const greeting = document.getElementById('chatbotInitialMessage');
        if (greeting) {
          greeting.textContent = `👋 Welcome aboard, ${name}! How can I help you today?`;
        }
      }

      card.classList.add('checkin-exit');
      setTimeout(() => {
        gate.classList.add('gate-hidden');
        document.body.classList.remove('gate-active');
        if (onProceed) onProceed();
      }, 300);
      setTimeout(() => {
        gate.remove();
      }, 900);
    }

    function attemptCheckIn() {
      const name = nameInput ? nameInput.value.trim() : '';

      if (name.toLowerCase() !== REQUIRED_NAME) {
        if (nameInput) {
          nameInput.classList.remove('checkin-input-error');
          void nameInput.offsetWidth; // restart the shake if tried twice in a row
          nameInput.classList.add('checkin-input-error');
        }
        if (errorMsg) errorMsg.classList.add('show');
        return;
      }

      proceed(name);
    }

    if (submitBtn) submitBtn.addEventListener('click', attemptCheckIn);
  }

  /* ============================================================
     LANGUAGE / i18n ENGINE — English, Español, 한국어.
     Everything text-based (nav, hero, sections, chatbot, ticker,
     gate labels, seatbelt sign, voice greeting) is driven from this
     one dictionary. Runs FIRST, before the page switcher, so page
     titles and on-screen text are already correct on first paint.
     ============================================================ */
  const translations = {
    en: {
      portfolioPrefix: "Soriano's Portfolio",
      nav: { home: "Home", about: "About Me", skills: "Skills", education: "Education", achievements: "Achievements", contact: "Contact" },
      hero: {
        greeting: "HELLO, I'M",
        subtitle: "Bachelor of Science in Information Technology — 3rd-Year College Student",
        tagline: "\"Learning technology today, serving the skies tomorrow\"",
        cv: "Download CV",
        boardingPass: "✈ BOARDING PASS"
      },
      destinations: {
        tag: "✈ Now Boarding · Bucket List",
        title: "My Dream Destinations",
        subtitle: "Places on my flight plan — where I hope to touch down someday."
      },
      about: {
        gate: "Gate 01 · About Me",
        title: "About Me",
        text: `Hi, my name is <strong>Gian Carlo D. Soriano</strong>, a 19-year-old third-year college student at
        Philippine Christian University, pursuing a Bachelor of Science in Information Technology.
        I strive to rise above every challenge that lies ahead. While I may not pursue a career as a full-time developer,
        I remain fully open to and accepting of the path my degree prepares me for. Beyond technology, I look forward to building a
        future rooted in service and creativity — with aspirations to serve in the skies as a <strong>Flight Attendant</strong>.
        My IT foundation gives me precision, discipline, and adaptability —
        qualities I will carry with me wherever this journey leads.`,
        tagline: "Soon to be part of Philippine Airlines as a Flight Attendant."
      },
      skills: {
        gate: "Gate 02 · Skills",
        title: "Skills",
        communication: { title: "Communication", desc: "I have a voice for a reason, I can communicate ideas with respectfully to other avoid misunderstandings to make sure that we are on the some page." },
        leadership: { title: "Leadership", desc: "It mirrors that they have a trust on me, not just giving orders but to guide, help and encourage others to contribute." },
        teamwork: { title: "Teamwork", desc: "I can collaborate openly, with respect and understanding to help create a more positive in our environment and making sure no one succeeds alone." },
        initiative: { title: "Initiative", desc: "I act proactively, and making myself sure that I have seek improvements without waiting for and stay on my line towards to earger to learn and do more." }
      },
      education: {
        gate: "Gate 03 · Education",
        title: "Education",
        primary: "<strong>Primary:</strong> Epifanio Delos Santos Elementary School (2012 - 2018)",
        secondary: "<strong>Secondary:</strong> Manuel G. Araullo High School (2018 - 2022)",
        seniorHigh: "<strong>Senior High School:</strong> Philippine Christian University Manila (2022 - 2024)",
        tertiary: "<strong>Tertiary:</strong> Philippine Christian University Manila (2024 - Present)"
      },
      achievements: {
        gate: "Gate 04 · Achievements",
        title: "Achievements",
        cert: "Certificate Awardee (From Elementary to College)",
        scholarship: "Academic Scholarship Recipient",
        classRep: "Class Representative/President",
        pro: "Public Relations Officer (JPCS Org)",
        honor: "Consistent Honor (Grade 10 to Grade 12)"
      },
      contact: { gate: "Gate 05 · Contact", title: "Contact" },
      footer: { text: "© 2026 Gian Soriano. All rights reserved." },
      chatbot: {
        title: "AI Assistant 🤖",
        greeting: "👋 Hello! Welcome to my Portfolio! How can I help you today?",
        placeholder: "Type your message...",
        typing: "...typing",
        replies: {
          "hello": "Hello! ✈️ I'm Gian's assistant. Ask about his skills, education, or how to reach him.",
          "hi": "Hi there! Want to know more about Gian's skills, education, or achievements?",
          "name": "Gian Carlo D. Soriano",
          "age": "19",
          "future work": "Gian's aiming to become a Philippine Airlines flight attendant. ✈️",
          "skills": "Gian's key skills are Communication, Leadership, Teamwork, and Initiative. Also a bonus one, since he's a Flight Attendant aspirant, he can recite 50-80 international flags and some of the countries' capitals.",
          "education": "His Elementary is Epifanio Delos Santos Elementary. While for his Secondary is Manuel G. Araullo High School. And for his Senior High and also Tertiary is Philippine Christian University and taking up an IT Course.",
          "reach gian": "You can reach Gian at his phone number, 09199360292",
          "his email": "Absolutely, his personal email is sorianogiancarlo40@gmail.com",
          "social media": "Yes, one of his social media that you can message him on is his Facebook Account, <a href=\"https://www.facebook.com/gian.soriano.935081\" target=\"_blank\" rel=\"noopener\" class=\"chat-link\">Gian Soriano</a>.",
          "on-site": "Certainly, his address is San Isidro St. Singalong Malate Manila",
          "achievements": "His achievements are receiving certificates, an academic scholarship, consistent honors from Grade 10 to 12, being a class representative and part of an organization.",
          "his personal info": "Gian is a 3rd-year Bachelor of Science in Information Technology student at Philippine Christian University, aiming for a future as a Philippine Airlines flight attendant.",
          "thank you": "You're welcome! Feel free to ask anything else.",
          "default": "Sorry, I don't have an answer for that yet — try asking about Gian's skills, education, achievements, or how to contact him. ✈️"
        }
      },
      intro: { tagline: "Boarding · Flight Attendant Aspirant" },
      gate: { boarding: "Now Boarding", welcome: "Welcome Aboard" },
      ticker: [
        'DESTINATION: CABIN CREW CAREER',
        'STATUS: ON TIME',
        'NOW BOARDING: NEW OPPORTUNITIES',
        'CLASS: BS INFORMATION TECHNOLOGY',
        'GATE 3C · WELCOME ABOARD'
      ],
      seatbelt: { clear: "CLEAR SKIES", fasten: "FASTEN SEATBELT" },
      voice: {
        text: "Mabuhay! Welcome to my Portfolio, this is Gian Carlo D. Soriano from Bachelor of Science in Information Technology 3C.",
        lang: "en-GB",
        preferredVoices: ['Google UK English Male', 'Daniel', 'Oliver', 'Arthur', 'Ryan', 'Microsoft Ryan', 'Microsoft George', 'Microsoft Thomas'],
        pitch: 1.3,
        rate: 0.95
      }
    },
    es: {
      portfolioPrefix: "Portafolio de Soriano",
      nav: { home: "Inicio", about: "Sobre Mí", skills: "Habilidades", education: "Educación", achievements: "Logros", contact: "Contacto" },
      hero: {
        greeting: "HOLA, SOY",
        subtitle: "Licenciatura en Ciencias de la Información y Tecnología — Estudiante universitario de 3.er año",
        tagline: "\"Aprendiendo tecnología hoy, sirviendo en los cielos mañana\"",
        cv: "Descargar CV",
        boardingPass: "✈ TARJETA DE EMBARQUE"
      },
      destinations: {
        tag: "✈ Ahora Abordando · Lista de Deseos",
        title: "Destinos Soñados",
        subtitle: "Lugares en mi plan de vuelo — donde espero aterrizar algún día."
      },
      about: {
        gate: "Puerta 01 · Sobre Mí",
        title: "Sobre Mí",
        text: `Hola, mi nombre es <strong>Gian Carlo D. Soriano</strong>, un estudiante universitario de 19 años,
        cursando el tercer año en la Philippine Christian University, en la carrera de Licenciatura en Ciencias
        de la Información y Tecnología. Me esfuerzo por superar cada reto que se presenta en mi camino. Aunque
        quizás no me dedique de lleno al desarrollo de software, estoy totalmente abierto y dispuesto a aceptar
        el rumbo que mi carrera me prepare. Más allá de la tecnología, espero construir un futuro basado en el
        servicio y la creatividad, con la aspiración de servir en los cielos como <strong>Auxiliar de Vuelo</strong>.
        Mi formación en TI me da precisión, disciplina y adaptabilidad — cualidades que llevaré conmigo a donde
        me lleve este camino.`,
        tagline: "Pronto formaré parte de Philippine Airlines como Auxiliar de Vuelo."
      },
      skills: {
        gate: "Puerta 02 · Habilidades",
        title: "Habilidades",
        communication: { title: "Comunicación", desc: "Tengo voz por una razón: puedo comunicar ideas con respeto hacia los demás para evitar malentendidos y asegurarme de que todos estemos en la misma sintonía." },
        leadership: { title: "Liderazgo", desc: "Refleja la confianza que depositan en mí; no se trata solo de dar órdenes, sino de guiar, ayudar y motivar a los demás a aportar su parte." },
        teamwork: { title: "Trabajo en equipo", desc: "Puedo colaborar abiertamente, con respeto y comprensión, para crear un ambiente más positivo y asegurarme de que nadie tenga éxito en soledad." },
        initiative: { title: "Iniciativa", desc: "Actúo de manera proactiva, buscando siempre mejoras sin esperar a que me las pidan, manteniéndome con ganas de aprender y dar más." }
      },
      education: {
        gate: "Puerta 03 · Educación",
        title: "Educación",
        primary: "<strong>Primaria:</strong> Epifanio Delos Santos Elementary School (2012 - 2018)",
        secondary: "<strong>Secundaria:</strong> Manuel G. Araullo High School (2018 - 2022)",
        seniorHigh: "<strong>Bachillerato (Senior High):</strong> Philippine Christian University Manila (2022 - 2024)",
        tertiary: "<strong>Universidad:</strong> Philippine Christian University Manila (2024 - Presente)"
      },
      achievements: {
        gate: "Puerta 04 · Logros",
        title: "Logros",
        cert: "Premiado con certificados (desde primaria hasta la universidad)",
        scholarship: "Beneficiario de beca académica",
        classRep: "Representante/Presidente de clase",
        pro: "Oficial de Relaciones Públicas (Organización JPCS)",
        honor: "Honor constante (de 10.º a 12.º grado)"
      },
      contact: { gate: "Puerta 05 · Contacto", title: "Contacto" },
      footer: { text: "© 2026 Gian Soriano. Todos los derechos reservados." },
      chatbot: {
        title: "Asistente de IA 🤖",
        greeting: "👋 ¡Hola! Bienvenido a mi portafolio. ¿En qué puedo ayudarte hoy?",
        placeholder: "Escribe tu mensaje...",
        typing: "...escribiendo",
        replies: {
          "hola": "¡Hola! ✈️ Soy el asistente de Gian. Pregúntale sobre sus habilidades, su educación o cómo contactarlo.",
          "qué tal": "¡Qué tal! ¿Quieres saber más sobre las habilidades, la educación o los logros de Gian?",
          "nombre": "Gian Carlo D. Soriano",
          "edad": "19",
          "futuro": "El objetivo de Gian es convertirse en auxiliar de vuelo de Philippine Airlines. ✈️",
          "habilidades": "Las habilidades clave de Gian son Comunicación, Liderazgo, Trabajo en equipo e Iniciativa. Como dato extra, ya que aspira a ser Auxiliar de Vuelo, puede recitar entre 50 y 80 banderas internacionales y algunas capitales de países.",
          "educación": "Su primaria fue en Epifanio Delos Santos Elementary. Su secundaria, en Manuel G. Araullo High School. Y tanto su bachillerato como sus estudios superiores los cursa en Philippine Christian University, en la carrera de Tecnología de la Información.",
          "contactar a gian": "Puedes contactar a Gian a su número de teléfono, 09199360292",
          "su correo": "Claro, su correo personal es sorianogiancarlo40@gmail.com",
          "redes sociales": "Sí, una de sus redes sociales donde puedes escribirle es su cuenta de Facebook, <a href=\"https://www.facebook.com/gian.soriano.935081\" target=\"_blank\" rel=\"noopener\" class=\"chat-link\">Gian Soriano</a>.",
          "su dirección": "Claro, su dirección es San Isidro St. Singalong Malate Manila",
          "logros": "Sus logros incluyen certificados, una beca académica, honores constantes de 10.º a 12.º grado, haber sido representante de clase y formar parte de una organización.",
          "información personal": "Gian es estudiante de 3.er año de Tecnología de la Información en Philippine Christian University, con la aspiración de convertirse en auxiliar de vuelo de Philippine Airlines.",
          "gracias": "¡De nada! Pregúntame lo que quieras.",
          "default": "Lo siento, todavía no tengo una respuesta para eso — intenta preguntar sobre las habilidades, la educación, los logros de Gian o cómo contactarlo. ✈️"
        }
      },
      intro: { tagline: "Embarcando · Aspirante a Auxiliar de Vuelo" },
      gate: { boarding: "Ahora Embarcando", welcome: "Bienvenido a Bordo" },
      ticker: [
        'DESTINO: CARRERA DE TRIPULANTE DE CABINA',
        'ESTADO: A TIEMPO',
        'AHORA EMBARCANDO: NUEVAS OPORTUNIDADES',
        'CARRERA: TECNOLOGÍA DE LA INFORMACIÓN',
        'PUERTA 3C · BIENVENIDO A BORDO'
      ],
      seatbelt: { clear: "CIELO DESPEJADO", fasten: "ABROCHAR CINTURÓN" },
      voice: {
        text: "¡Mabuhay! Bienvenido a mi portafolio, soy Gian Carlo D. Soriano, estudiante de Ciencias de la Información y Tecnología, sección 3C.",
        lang: "es-ES",
        preferredVoices: ['Google español', 'Mónica', 'Monica', 'Paulina', 'Microsoft Helena', 'Microsoft Sabina', 'Microsoft Elvira'],
        pitch: 1.3,
        rate: 0.95
      }
    },
    fr: {
      portfolioPrefix: "Portfolio de Soriano",
      nav: { home: "Accueil", about: "À propos", skills: "Compétences", education: "Formation", achievements: "Réalisations", contact: "Contact" },
      hero: {
        greeting: "BONJOUR, JE SUIS",
        subtitle: "Licence en Technologies de l'Information — Étudiant en 3e année",
        tagline: "\"Apprendre la technologie aujourd'hui, servir dans les cieux demain\"",
        cv: "Télécharger le CV",
        boardingPass: "✈ CARTE D'EMBARQUEMENT"
      },
      destinations: {
        tag: "✈ Embarquement · Liste de Rêves",
        title: "Destinations de Rêve",
        subtitle: "Des lieux sur mon plan de vol — où j'espère atterrir un jour."
      },
      about: {
        gate: "Porte 01 · À propos de moi",
        title: "À propos de moi",
        text: `Bonjour, je m'appelle <strong>Gian Carlo D. Soriano</strong>, un étudiant de 19 ans en 3e année à la
        Philippine Christian University, où je prépare une Licence en Technologies de l'Information.
        Je m'efforce de surmonter chaque défi qui se présente à moi. Même si je ne poursuis pas nécessairement une
        carrière de développeur à temps plein, je reste pleinement ouvert à la voie que ma formation me prépare.
        Au-delà de la technologie, j'espère construire un avenir fondé sur le service et la créativité — avec
        l'ambition de servir dans les cieux en tant qu'<strong>hôtesse/steward de l'air</strong>. Ma formation en
        informatique me donne la précision, la discipline et l'adaptabilité — des qualités que je garderai avec moi
        où que ce parcours me mène.`,
        tagline: "Bientôt membre de Philippine Airlines en tant qu'hôtesse/steward de l'air."
      },
      skills: {
        gate: "Porte 02 · Compétences",
        title: "Compétences",
        communication: { title: "Communication", desc: "J'ai une voix pour une raison : je peux communiquer des idées avec respect envers les autres afin d'éviter les malentendus et de m'assurer que nous sommes tous sur la même longueur d'onde." },
        leadership: { title: "Leadership", desc: "Cela reflète la confiance qu'on me porte — il ne s'agit pas seulement de donner des ordres, mais de guider, d'aider et d'encourager les autres à contribuer." },
        teamwork: { title: "Travail d'équipe", desc: "Je peux collaborer ouvertement, avec respect et compréhension, pour aider à créer un environnement plus positif, en veillant à ce que personne ne réussisse seul." },
        initiative: { title: "Initiative", desc: "J'agis de manière proactive, en cherchant toujours des améliorations sans attendre qu'on me le demande, et en restant motivé à apprendre et à en faire davantage." }
      },
      education: {
        gate: "Porte 03 · Éducation",
        title: "Formation",
        primary: "<strong>Primaire :</strong> Epifanio Delos Santos Elementary School (2012 - 2018)",
        secondary: "<strong>Secondaire :</strong> Manuel G. Araullo High School (2018 - 2022)",
        seniorHigh: "<strong>Lycée (Senior High) :</strong> Philippine Christian University Manila (2022 - 2024)",
        tertiary: "<strong>Université :</strong> Philippine Christian University Manila (2024 - Présent)"
      },
      achievements: {
        gate: "Porte 04 · Réalisations",
        title: "Réalisations",
        cert: "Lauréat de certificats (du primaire à l'université)",
        scholarship: "Boursier au mérite académique",
        classRep: "Délégué de classe / Président",
        pro: "Chargé des relations publiques (Organisation JPCS)",
        honor: "Tableau d'honneur constant (de la 10e à la 12e année)"
      },
      contact: { gate: "Porte 05 · Contact", title: "Contact" },
      footer: { text: "© 2026 Gian Soriano. Tous droits réservés." },
      chatbot: {
        title: "Assistant IA 🤖",
        greeting: "👋 Bonjour ! Bienvenue sur mon portfolio ! Comment puis-je vous aider aujourd'hui ?",
        placeholder: "Écrivez votre message...",
        typing: "...en train d'écrire",
        replies: {
          "bonjour": "Bonjour ! ✈️ Je suis l'assistant de Gian. Posez-moi des questions sur ses compétences, sa formation ou comment le contacter.",
          "salut": "Salut ! Vous voulez en savoir plus sur les compétences, la formation ou les réalisations de Gian ?",
          "nom": "Gian Carlo D. Soriano",
          "âge": "19 ans",
          "avenir": "Gian souhaite devenir steward pour Philippine Airlines. ✈️",
          "compétences": "Les compétences clés de Gian sont la communication, le leadership, le travail d'équipe et l'initiative. En bonus, en tant que futur steward, il peut réciter 50 à 80 drapeaux internationaux et certaines capitales de pays.",
          "formation": "Son école primaire est Epifanio Delos Santos Elementary. Son collège est Manuel G. Araullo High School. Et son lycée ainsi que ses études supérieures se déroulent à Philippine Christian University, en filière informatique (IT).",
          "contacter gian": "Vous pouvez joindre Gian à son numéro de téléphone, 09199360292",
          "son email": "Bien sûr, son adresse e-mail personnelle est sorianogiancarlo40@gmail.com",
          "réseaux sociaux": "Oui, l'un de ses réseaux sociaux où vous pouvez lui écrire est son compte Facebook, <a href=\"https://www.facebook.com/gian.soriano.935081\" target=\"_blank\" rel=\"noopener\" class=\"chat-link\">Gian Soriano</a>.",
          "son adresse": "Bien sûr, son adresse est San Isidro St. Singalong Malate Manila",
          "réalisations": "Parmi ses réalisations : plusieurs certificats, une bourse académique, des tableaux d'honneur constants de la 10e à la 12e année, ainsi que représentant de classe et membre actif d'une organisation.",
          "informations personnelles": "Gian est étudiant en 3e année de Licence en Technologies de l'Information à Philippine Christian University, avec pour objectif de devenir steward pour Philippine Airlines.",
          "merci": "Avec plaisir ! N'hésitez pas à poser d'autres questions.",
          "default": "Désolé, je n'ai pas encore de réponse à cela — essayez de demander les compétences, la formation, les réalisations de Gian, ou comment le contacter. ✈️"
        }
      },
      intro: { tagline: "Embarquement · Aspirant hôtesse/steward de l'air" },
      gate: { boarding: "Embarquement en cours", welcome: "Bienvenue à bord" },
      ticker: [
        'DESTINATION : CARRIÈRE DE PERSONNEL DE CABINE',
        "STATUT : À L'HEURE",
        'EMBARQUEMENT : NOUVELLES OPPORTUNITÉS',
        'FILIÈRE : TECHNOLOGIES DE L\'INFORMATION',
        'PORTE 3C · BIENVENUE À BORD'
      ],
      seatbelt: { clear: "CIEL DÉGAGÉ", fasten: "ATTACHEZ VOTRE CEINTURE" },
      voice: {
        text: "Mabuhay ! Bienvenue sur mon portfolio, je suis Gian Carlo D. Soriano, étudiant en Technologies de l'Information, section 3C.",
        lang: "fr-FR",
        preferredVoices: ['Google français', 'Amélie', 'Thomas', 'Microsoft Denise', 'Microsoft Henri', 'Microsoft Julie'],
        pitch: 1.3,
        rate: 0.95
      }
    },
    ko: {
      portfolioPrefix: "소리아노의 포트폴리오",
      nav: { home: "홈", about: "소개", skills: "기술", education: "학력", achievements: "성과", contact: "연락처" },
      hero: {
        greeting: "안녕하세요, 저는",
        subtitle: "정보기술학 학사 과정 — 대학교 3학년 재학 중",
        tagline: "\"오늘은 기술을 배우고, 내일은 하늘에서 봉사합니다\"",
        cv: "이력서 다운로드",
        boardingPass: "✈ 탑승권"
      },
      destinations: {
        tag: "✈ 탑승 중 · 버킷리스트",
        title: "꿈의 여행지",
        subtitle: "언젠가 꼭 가보고 싶은 나의 비행 계획 속 장소들."
      },
      about: {
        gate: "게이트 01 · 소개",
        title: "소개",
        text: `안녕하세요, 제 이름은 <strong>지안 카를로 D. 소리아노</strong>입니다. 필리핀 크리스천 대학교에서
        정보기술학(BS Information Technology)을 전공하는 19세 대학교 3학년 학생입니다. 저는 앞으로 마주할
        모든 도전을 이겨내기 위해 노력합니다. 전업 개발자로서의 길을 가지 않더라도, 제 전공이 이끄는 길을
        온전히 받아들일 준비가 되어 있습니다. 기술을 넘어서, 저는 서비스와 창의성을 바탕으로 한 미래를
        만들어가고 싶으며, <strong>승무원(Flight Attendant)</strong>으로서 하늘에서 봉사하는 꿈을 꾸고
        있습니다. IT 전공에서 얻은 정확성, 성실함, 적응력은 이 여정이 어디로 이어지든 제가 지니고 갈
        소중한 자질입니다.`,
        tagline: "곧 필리핀항공(Philippine Airlines)의 승무원이 될 예정입니다."
      },
      skills: {
        gate: "게이트 02 · 기술",
        title: "기술",
        communication: { title: "커뮤니케이션", desc: "저에게는 목소리가 있는 이유가 있습니다. 오해를 피하고 모두가 같은 방향을 보도록, 상대방을 존중하며 생각을 전달할 수 있습니다." },
        leadership: { title: "리더십", desc: "이는 저에 대한 신뢰를 보여주는 것이라 생각합니다. 단순히 지시하는 것이 아니라, 다른 사람들을 이끌고 돕고 격려하여 함께 기여하도록 만듭니다." },
        teamwork: { title: "팀워크", desc: "저는 존중과 이해를 바탕으로 열린 자세로 협력하며, 더 긍정적인 환경을 만들고 그 누구도 혼자 성공하지 않도록 돕습니다." },
        initiative: { title: "주도성", desc: "저는 능동적으로 행동하며, 요청받기 전에 스스로 개선점을 찾고, 배우고 더 많은 것을 이루고자 하는 열정을 유지합니다." }
      },
      education: {
        gate: "게이트 03 · 학력",
        title: "학력",
        primary: "<strong>초등학교:</strong> Epifanio Delos Santos Elementary School (2012 - 2018)",
        secondary: "<strong>중학교:</strong> Manuel G. Araullo High School (2018 - 2022)",
        seniorHigh: "<strong>고등학교:</strong> Philippine Christian University Manila (2022 - 2024)",
        tertiary: "<strong>대학교:</strong> Philippine Christian University Manila (2024 - 현재)"
      },
      achievements: {
        gate: "게이트 04 · 성과",
        title: "성과",
        cert: "초등학교부터 대학교까지 각종 상장 수상",
        scholarship: "학업 장학금 수혜자",
        classRep: "학급 대표/반장",
        pro: "홍보 담당관 (JPCS 동아리)",
        honor: "10학년부터 12학년까지 우등생 유지"
      },
      contact: { gate: "게이트 05 · 연락처", title: "연락처" },
      footer: { text: "© 2026 Gian Soriano. 모든 권리 보유." },
      chatbot: {
        title: "AI 어시스턴트 🤖",
        greeting: "👋 안녕하세요! 제 포트폴리오에 오신 것을 환영합니다! 무엇을 도와드릴까요?",
        placeholder: "메시지를 입력하세요...",
        typing: "...입력 중",
        replies: {
          "안녕하세요": "안녕하세요! ✈️ 저는 지안의 어시스턴트예요. 지안의 능력, 학력, 혹은 연락 방법에 대해 물어보세요.",
          "안녕": "안녕하세요! 지안의 능력, 학력, 또는 성과에 대해 더 알고 싶으신가요?",
          "이름": "지안 카를로 D. 소리아노 (Gian Carlo D. Soriano)",
          "나이": "19세",
          "미래": "지안의 목표는 필리핀항공(Philippine Airlines)의 승무원이 되는 것입니다. ✈️",
          "기술": "지안의 핵심 기술은 커뮤니케이션, 리더십, 팀워크, 그리고 주도성입니다. 추가로, 승무원을 꿈꾸는 만큼 50~80개국의 국기와 일부 국가의 수도도 외울 수 있어요.",
          "학력": "초등학교는 Epifanio Delos Santos Elementary, 중고등학교는 Manuel G. Araullo High School을 졸업했어요. 그리고 시니어 하이스쿨과 대학교 과정 모두 Philippine Christian University에서 정보기술(IT)을 전공하고 있습니다.",
          "연락": "지안에게는 전화번호 09199360292 로 연락하실 수 있어요.",
          "이메일": "네, 지안의 개인 이메일은 sorianogiancarlo40@gmail.com 이에요.",
          "sns": "네, 메시지를 보낼 수 있는 SNS 중 하나는 지안의 페이스북 계정이에요, <a href=\"https://www.facebook.com/gian.soriano.935081\" target=\"_blank\" rel=\"noopener\" class=\"chat-link\">Gian Soriano</a>.",
          "주소": "네, 지안의 주소는 San Isidro St. Singalong Malate Manila 이에요.",
          "성과": "지안의 성과로는 각종 수료증 수상, 학업 장학금 수혜, 10학년부터 12학년까지의 꾸준한 우등생 기록, 학급 대표 활동, 그리고 한 단체의 일원으로 활동한 경험이 있습니다.",
          "개인 정보": "지안은 Philippine Christian University에서 정보기술(IT)을 전공하는 3학년 학생이며, 필리핀항공 승무원을 목표로 하고 있습니다.",
          "감사": "천만에요! 다른 궁금한 점이 있으면 언제든지 물어보세요.",
          "default": "죄송해요, 아직 그 질문에 대한 답을 준비하지 못했어요 — 지안의 기술, 학력, 성과, 연락 방법에 대해 물어보세요. ✈️"
        }
      },
      intro: { tagline: "탑승 중 · 승무원 지망생" },
      gate: { boarding: "탑승 중", welcome: "탑승을 환영합니다" },
      ticker: [
        '목적지: 승무원 커리어',
        '상태: 정시 운항',
        '탑승 중: 새로운 기회',
        '전공: 정보기술학',
        '3C 게이트 · 탑승을 환영합니다'
      ],
      seatbelt: { clear: "맑은 하늘", fasten: "안전벨트 착용" },
      voice: {
        text: "마부하이! 제 포트폴리오에 오신 것을 환영합니다. 저는 정보기술학 3C반의 지안 카를로 D. 소리아노입니다.",
        lang: "ko-KR",
        // More Korean voice names covered here (Windows/macOS/Chrome/Android
        // all label these differently), so we're less likely to fall back
        // to a generic default voice.
        preferredVoices: [
          'Google 한국의', 'Google Korean',
          'Yuna', 'Suhyeon', 'Narae',
          'Microsoft Heami', 'Microsoft SunHi', 'Microsoft InJoon',
          'Microsoft SunHi Online (Natural)', 'Microsoft InJoon Online (Natural)'
        ],
        // Lower pitch / normal rate than EN & ES: pitch-shifting an
        // older or non-native Korean voice (e.g. the Windows "Heami"
        // fallback) makes it sound compressed/muffled, so we keep this
        // one closer to the voice's natural settings.
        pitch: 1.05,
        rate: 1.0
      }
    },
    tl: {
      portfolioPrefix: "Portfolio ni Soriano",
      nav: { home: "Home", about: "Tungkol sa Akin", skills: "Mga Kasanayan", education: "Edukasyon", achievements: "Mga Tagumpay", contact: "Makipag-ugnayan" },
      hero: {
        greeting: "KUMUSTA, AKO SI",
        subtitle: "Batsilyer ng Agham sa Teknolohiya ng Impormasyon — Ikatlong Taong Mag-aaral sa Kolehiyo",
        tagline: "\"Natututo ng teknolohiya ngayon, maglilingkod sa himpapawid bukas\"",
        cv: "I-download ang CV",
        boardingPass: "✈ BOARDING PASS"
      },
      destinations: {
        tag: "✈ Nagbo-boarding Na · Bucket List",
        title: "Mga Pangarap na Destinasyon",
        subtitle: "Mga lugar sa flight plan ko — sana marating ko rin balang araw."
      },
      about: {
        gate: "Gate 01 · Tungkol sa Akin",
        title: "Tungkol sa Akin",
        text: `Kumusta, ang pangalan ko ay <strong>Gian Carlo D. Soriano</strong>, 19 taong gulang na ikatlong taong
        mag-aaral sa Philippine Christian University, kumukuha ng Batsilyer ng Agham sa Teknolohiya ng Impormasyon.
        Sinisikap kong lagpasan ang bawat hamong kaharap ko. Bagama't maaaring hindi ako maging full-time na developer,
        bukas ako at tinatanggap ang landas na inihahanda sa akin ng aking kurso. Higit pa sa teknolohiya, umaasa akong
        makabuo ng kinabukasang nakaugat sa paglilingkod at pagkamalikhain — na may pangarap na maglingkod sa
        himpapawid bilang <strong>Flight Attendant</strong>. Ang pundasyon kong IT ay nagbibigay sa akin ng
        kawastuhan, disiplina, at kakayahang umangkop — mga katangiang dadalhin ko saan man ako dalhin ng
        paglalakbay na ito.`,
        tagline: "Malapit nang maging bahagi ng Philippine Airlines bilang isang Flight Attendant."
      },
      skills: {
        gate: "Gate 02 · Kasanayan",
        title: "Mga Kasanayan",
        communication: { title: "Komunikasyon", desc: "May tinig ako para sa isang dahilan — kaya kong ipahayag ang mga ideya nang may paggalang sa iba upang maiwasan ang di-pagkakaunawaan at masiguradong pare-pareho tayo ng nakikita." },
        leadership: { title: "Pamumuno", desc: "Ito'y sumasalamin sa tiwalang ibinibigay nila sa akin — hindi lang basta pag-uutos, kundi paggabay, pagtulong, at paghikayat sa iba upang makilahok." },
        teamwork: { title: "Pagtutulungan", desc: "Kaya kong makipagtulungan nang bukas, may paggalang at pang-unawa upang makatulong lumikha ng mas positibong kapaligiran, tinitiyak na walang nag-iisang nagtatagumpay." },
        initiative: { title: "Inisyatiba", desc: "Kumikilos ako nang maagap, tinitiyak na naghahanap ako ng mga paraan para umunlad nang hindi na inaantay pa, at nananatiling sabik matuto at gumawa pa." }
      },
      education: {
        gate: "Gate 03 · Edukasyon",
        title: "Edukasyon",
        primary: "<strong>Elementarya:</strong> Epifanio Delos Santos Elementary School (2012 - 2018)",
        secondary: "<strong>Hayskul:</strong> Manuel G. Araullo High School (2018 - 2022)",
        seniorHigh: "<strong>Senior High School:</strong> Philippine Christian University Manila (2022 - 2024)",
        tertiary: "<strong>Kolehiyo:</strong> Philippine Christian University Manila (2024 - Kasalukuyan)"
      },
      achievements: {
        gate: "Gate 04 · Mga Tagumpay",
        title: "Mga Tagumpay",
        cert: "Tumanggap ng Sertipiko (Mula Elementarya hanggang Kolehiyo)",
        scholarship: "Tumanggap ng Iskolarsip Pang-akademiko",
        classRep: "Kinatawan/Pangulo ng Klase",
        pro: "Public Relations Officer (JPCS Org)",
        honor: "Palaging May Karangalan (Grade 10 hanggang Grade 12)"
      },
      contact: { gate: "Gate 05 · Makipag-ugnayan", title: "Makipag-ugnayan" },
      footer: { text: "© 2026 Gian Soriano. Nakalaan ang lahat ng karapatan." },
      chatbot: {
        title: "AI Assistant 🤖",
        greeting: "👋 Kumusta! Maligayang pagdating sa aking Portfolio! Paano kita matutulungan ngayon?",
        placeholder: "I-type ang iyong mensahe...",
        typing: "...nagta-type",
        replies: {
          "kumusta": "Kumusta! ✈️ Ako ang assistant ni Gian. Tanungin mo ako tungkol sa kanyang kasanayan, edukasyon, o kung paano siya makontak.",
          "musta": "Musta! Gusto mo bang malaman pa ang tungkol sa mga kasanayan, edukasyon, o tagumpay ni Gian?",
          "pangalan": "Gian Carlo D. Soriano",
          "edad": "19",
          "trabaho sa hinaharap": "Layunin ni Gian na maging Flight Attendant ng Philippine Airlines. ✈️",
          "kasanayan": "Ang mga pangunahing kasanayan ni Gian ay Komunikasyon, Pamumuno, Pagtutulungan, at Inisyatiba. May bonus pa — dahil aspiring Flight Attendant siya, kaya niyang bigkasin ang 50-80 na bandila ng iba't ibang bansa pati na rin ang ilan sa mga kabisera nito.",
          "edukasyon": "Ang kanyang Elementarya ay sa Epifanio Delos Santos Elementary. Para naman sa Sekondarya, sa Manuel G. Araullo High School. At para sa kanyang Senior High pati na rin College, sa Philippine Christian University siya, kumukuha ng kursong IT.",
          "makontak": "Maaari mong kontakin si Gian sa kanyang numero, 09199360292",
          "email": "Oo naman, ang personal na email niya ay sorianogiancarlo40@gmail.com",
          "social media": "Oo, isa sa mga social media na maaari mong padalhan ng mensahe sa kanya ay ang kanyang Facebook Account, <a href=\"https://www.facebook.com/gian.soriano.935081\" target=\"_blank\" rel=\"noopener\" class=\"chat-link\">Gian Soriano</a>.",
          "tirahan": "Opo, ang kanyang tirahan ay sa San Isidro St. Singalong Malate Manila",
          "tagumpay": "Kabilang sa mga tagumpay niya ang pagtanggap ng mga sertipiko, akademikong iskolarsip, tuluy-tuloy na parangal mula Grade 10 hanggang 12, pagiging class representative, at pagiging bahagi ng isang organisasyon.",
          "personal na impormasyon": "Si Gian ay 3rd-year college student na kumukuha ng Bachelor of Science in Information Technology sa Philippine Christian University, na naglalayong maging Flight Attendant ng Philippine Airlines.",
          "salamat": "Walang anuman! Huwag mag-atubiling magtanong pa ng iba.",
          "default": "Paumanhin, wala pa akong sagot diyan — subukan mong itanong ang tungkol sa kasanayan, edukasyon, tagumpay ni Gian, o kung paano siya makontak. ✈️"
        }
      },
      intro: { tagline: "Nag-boboarding · Flight Attendant Aspirant" },
      gate: { boarding: "Nag-boboarding Na", welcome: "Maligayang Pagdating" },
      ticker: [
        'PATUTUNGUHAN: KARERA BILANG CABIN CREW',
        'ESTADO: NASA ORAS',
        'NAG-BOBOARDING: MGA BAGONG PAGKAKATAON',
        'KURSO: BS INFORMATION TECHNOLOGY',
        'GATE 3C · MALIGAYANG PAGDATING'
      ],
      seatbelt: { clear: "MALINAW NA LANGIT", fasten: "ISUOT ANG SEATBELT" },
      voice: {
        text: "Mabuhay! Maligayang pagdating sa aking Portfolio, ako si Gian Carlo D. Soriano mula sa Bachelor of Science in Information Technology 3C.",
        lang: "fil-PH",
        // Uses Google Translate's read-aloud audio for an actually-native
        // Tagalog accent, since most OSes don't ship a real Filipino
        // voice for speechSynthesis. Falls back to the browser voice
        // settings below automatically if that request ever fails.
        googleTranslateTTS: true,
        googleTranslateLang: 'tl',
        // Different OS/browsers label this voice differently, and some
        // only expose it under "tl-PH" instead of "fil-PH" — so we try
        // several possible names AND several possible lang codes.
        preferredVoices: [
          'Google Pilipino', 'Google Filipino', 'Google Tagalog',
          'Google fil-PH', 'Google tl-PH',
          'Filipino', 'Tagalog',
          'Rosa', 'Angelo'
        ],
        altLangCodes: ['fil-PH', 'fil', 'tl-PH', 'tl'],
        pitch: 1.2,
        rate: 1.0
      }
    },
    ja: {
      portfolioPrefix: "ソリアーノのポートフォリオ",
      nav: { home: "ホーム", about: "自己紹介", skills: "スキル", education: "学歴", achievements: "実績", contact: "連絡先" },
      hero: {
        greeting: "こんにちは、",
        subtitle: "情報技術学士課程 — 大学3年生",
        tagline: "「今日は技術を学び、明日は空で奉仕する」",
        cv: "履歴書をダウンロード",
        boardingPass: "✈ 搭乗券"
      },
      destinations: {
        tag: "✈ 搭乗中 · 憧れの場所リスト",
        title: "夢の旅行先",
        subtitle: "いつか降り立ちたい、私のフライトプランにある場所たち。"
      },
      about: {
        gate: "ゲート01・自己紹介",
        title: "自己紹介",
        text: `はじめまして、私の名前は<strong>ジャン・カルロ D. ソリアーノ</strong>です。フィリピン・クリスチャン大学で
        情報技術学を専攻する19歳の大学3年生です。私はどんな困難にも立ち向かう努力を惜しみません。
        フルタイムの開発者としての道を選ばなくても、この学位が導く道を素直に受け入れる覚悟があります。
        技術だけでなく、奉仕と創造性に根ざした未来を築きたいと考えており、<strong>客室乗務員</strong>として
        空で人々に尽くすことを目指しています。IT分野で培った正確さ、規律、そして適応力は、この道が
        どこへ続こうとも、私が持ち続ける財産です。`,
        tagline: "近いうちにフィリピン航空の客室乗務員になる予定です。"
      },
      skills: {
        gate: "ゲート02・スキル",
        title: "スキル",
        communication: { title: "コミュニケーション", desc: "声には理由があります。誤解を避け、皆が同じ認識を持てるよう、相手を尊重しながら考えを伝えることができます。" },
        leadership: { title: "リーダーシップ", desc: "それは私への信頼の表れだと思います。ただ指示するのではなく、周囲を導き、助け、励まして共に貢献できるようにしています。" },
        teamwork: { title: "チームワーク", desc: "私は敬意と理解を持って率直に協力し、より前向きな環境をつくり、誰も一人で成功を目指さなくてよいようにしています。" },
        initiative: { title: "主体性", desc: "私は指示を待たずに自ら行動し、改善点を探しながら、学び続けてより多くを成し遂げようとする意欲を保っています。" }
      },
      education: {
        gate: "ゲート03・学歴",
        title: "学歴",
        primary: "<strong>小学校:</strong> Epifanio Delos Santos Elementary School (2012 - 2018)",
        secondary: "<strong>中学校:</strong> Manuel G. Araullo High School (2018 - 2022)",
        seniorHigh: "<strong>高等学校:</strong> Philippine Christian University Manila (2022 - 2024)",
        tertiary: "<strong>大学:</strong> Philippine Christian University Manila (2024 - 現在)"
      },
      achievements: {
        gate: "ゲート04・実績",
        title: "実績",
        cert: "小学校から大学までの表彰状受賞",
        scholarship: "学業奨学金受給者",
        classRep: "学級代表・委員長",
        pro: "広報担当役員（JPCS団体）",
        honor: "10年生から12年生まで優等生を継続"
      },
      contact: { gate: "ゲート05・連絡先", title: "連絡先" },
      footer: { text: "© 2026 Gian Soriano. 無断複写・転載を禁じます。" },
      chatbot: {
        title: "AIアシスタント 🤖",
        greeting: "👋 こんにちは！私のポートフォリオへようこそ！何かお手伝いできますか？",
        placeholder: "メッセージを入力...",
        typing: "...入力中",
        replies: {
          "こんにちは": "こんにちは！✈️ 私はジャンのアシスタントです。彼のスキルや学歴、連絡方法について聞いてください。",
          "はじめまして": "はじめまして！ジャンのスキルや学歴、実績についてもっと知りたいですか？",
          "名前": "ジャン・カルロ D. ソリアーノ",
          "年齢": "19歳",
          "将来": "ジャンの目標はフィリピン航空の客室乗務員になることです。✈️",
          "スキル": "ジャンの主なスキルはコミュニケーション、リーダーシップ、チームワーク、そして主体性です。さらに、客室乗務員を目指しているので、50〜80か国の国旗といくつかの国の首都も覚えています。",
          "学歴": "小学校はEpifanio Delos Santos Elementary、中学・高校はManuel G. Araullo High Schoolを卒業しました。そして高等学校と大学はどちらもPhilippine Christian Universityで、情報技術（IT）を専攻しています。",
          "連絡": "ジャンへは電話番号 09199360292 からご連絡いただけます。",
          "メール": "はい、ジャンの個人メールアドレスは sorianogiancarlo40@gmail.com です。",
          "sns": "はい、メッセージを送れるSNSの一つは彼のFacebookアカウントです、<a href=\"https://www.facebook.com/gian.soriano.935081\" target=\"_blank\" rel=\"noopener\" class=\"chat-link\">Gian Soriano</a>。",
          "住所": "はい、彼の住所は San Isidro St. Singalong Malate Manila です。",
          "実績": "ジャンの実績には、各種証明書の受賞、学業奨学金の受給、10年生から12年生までの継続的な優等生表彰、クラス代表の経験、そして団体活動への参加があります。",
          "個人情報": "ジャンはPhilippine Christian Universityで情報技術（IT）を専攻する3年生で、将来はフィリピン航空の客室乗務員になることを目指しています。",
          "ありがとう": "どういたしまして！他に何か聞きたいことがあれば、お気軽にどうぞ。",
          "default": "申し訳ございません、その質問にはまだお答えできません — ジャンのスキル、学歴、実績、連絡方法について聞いてみてください。✈️"
        }
      },
      intro: { tagline: "搭乗中・客室乗務員志望" },
      gate: { boarding: "搭乗案内中", welcome: "ご搭乗ありがとうございます" },
      ticker: [
        '目的地：客室乗務員のキャリア',
        '状況：定刻通り',
        '搭乗案内：新たなチャンス',
        '専攻：情報技術学',
        'ゲート3C・ご搭乗ありがとうございます'
      ],
      seatbelt: { clear: "揺れなし", fasten: "シートベルト着用" },
      voice: {
        text: "マブハイ！私のポートフォリオへようこそ。情報技術学科3Cのジャン・カルロ D. ソリアーノです。",
        lang: "ja-JP",
        preferredVoices: [
          'Google 日本語', 'Google Japanese',
          'Kyoko', 'Otoya',
          'Microsoft Nanami', 'Microsoft Keita', 'Microsoft Ayumi',
          'Microsoft Nanami Online (Natural)', 'Microsoft Keita Online (Natural)'
        ],
        pitch: 1.05,
        rate: 1.0
      }
    }
  };

  const SUPPORTED_LANGS = ['en', 'es', 'fr', 'ko', 'tl', 'ja'];
  const LANG_META = {
    en: { flag: 'us', code: 'EN' },
    es: { flag: 'es', code: 'ES' },
    fr: { flag: 'fr', code: 'FR' },
    ko: { flag: 'kr', code: 'KO' },
    tl: { flag: 'ph', code: 'TL' },
    ja: { flag: 'jp', code: 'JA' }
  };
  let currentLang = (localStorage.getItem('siteLang') || navigator.language.slice(0, 2) || 'en').toLowerCase();
  if (!SUPPORTED_LANGS.includes(currentLang)) currentLang = 'en';

  function t(path) {
    const parts = path.split('.');
    let node = translations[currentLang];
    for (const p of parts) { node = node && node[p]; }
    return node;
  }

  function pageTitleFor(pageId, lang) {
    const navKeyByPage = { 'page-home': 'home', 'about-me': 'about', 'Skills': 'skills', 'Education': 'education', 'Achievements': 'achievements', 'Contact': 'contact' };
    const dict = translations[lang];
    const key = navKeyByPage[pageId];
    return `${dict.portfolioPrefix} | ${dict.nav[key]}`;
  }

  function applyStaticTranslations() {
    document.documentElement.lang = currentLang;

    document.querySelectorAll('[data-i18n]').forEach((el) => {
      const value = t(el.getAttribute('data-i18n'));
      if (typeof value === 'string') el.textContent = value;
    });

    document.querySelectorAll('[data-i18n-html]').forEach((el) => {
      const value = t(el.getAttribute('data-i18n-html'));
      if (typeof value === 'string') el.innerHTML = value;
    });

    document.querySelectorAll('[data-i18n-placeholder]').forEach((el) => {
      const value = t(el.getAttribute('data-i18n-placeholder'));
      if (typeof value === 'string') el.setAttribute('placeholder', value);
    });

    document.querySelectorAll('.lang-option').forEach((opt) => {
      opt.classList.toggle('active', opt.getAttribute('data-lang') === currentLang);
    });

    const flagEl = document.getElementById('langDropdownFlag');
    const codeEl = document.getElementById('langDropdownCode');
    if (flagEl) {
      flagEl.src = `https://flagcdn.com/24x18/${LANG_META[currentLang].flag}.png`;
      flagEl.alt = `${LANG_META[currentLang].code} flag`;
    }
    if (codeEl) codeEl.textContent = LANG_META[currentLang].code;

    // Reset the chatbot's first bubble text without touching any
    // messages the visitor has already sent in this session.
    const initialBubble = document.getElementById('chatbotInitialMessage');
    if (initialBubble) initialBubble.textContent = t('chatbot.greeting');
  }

  function setLanguage(lang) {
    if (!SUPPORTED_LANGS.includes(lang)) return;

    // Re-clicking the already-active language stays a harmless no-op —
    // no need to re-apply translations or replay the voiceline.
    const languageChanged = lang !== currentLang;
    if (!languageChanged) return;

    currentLang = lang;
    localStorage.setItem('siteLang', currentLang);
    applyStaticTranslations();
    if (typeof refreshPageTitle === 'function') refreshPageTitle();
    if (typeof refreshTickerNow === 'function') refreshTickerNow();
    if (typeof refreshSeatbeltNow === 'function') refreshSeatbeltNow();
    if (typeof showCountryTransition === 'function') showCountryTransition(currentLang);

    // Auto-play the voice greeting in the language the visitor just
    // picked from the dropdown. This click is itself a user gesture,
    // so the browser won't block speechSynthesis here.
    if (typeof speakVoiceGreeting === 'function') speakVoiceGreeting(currentLang);
  }

  /* ---------- Fullscreen tourist-spot transition on language switch ----------
     Each supported language maps to a landmark in a country where that
     language is spoken. The photo is pulled live from Wikipedia's public
     summary API (no key needed, CORS-enabled) so the image is never a
     dead/hotlinked file — it just fades away quietly if the fetch fails. */
  const COUNTRY_SPOTS = {
    en: { wiki: 'Golden_Gate_Bridge', place: 'San Francisco, USA', flag: 'us' },
    // 'img' is an optional direct hotlink that skips the Wikipedia summary
    // fetch entirely. Wikipedia's auto-picked "page image" is unpredictable
    // (locator maps, portrait crops, etc.), so Spain is pinned to a verified
    // LANDSCAPE Wikimedia Commons photo of Park Güell to guarantee a full
    // edge-to-edge "cover" background instead of a letterboxed one.
    es: { wiki: 'Park_Güell', img: 'https://commons.wikimedia.org/wiki/Special:FilePath/Park_G%C3%BCell_02.jpg', place: 'Barcelona, Spain', flag: 'es' },
    fr: { wiki: 'Palace_of_Versailles', place: 'Versailles, France', flag: 'fr' },
    ko: { wiki: 'Gyeongbokgung', place: 'Seoul, South Korea', flag: 'kr' },
    tl: { wiki: 'Chocolate_Hills', place: 'Bohol, Philippines', flag: 'ph' },
    ja: { wiki: 'Mount_Fuji', place: 'Mount Fuji, Japan', flag: 'jp' }
  };
  const countrySpotCache = {};
  let countryTransitionHideTimer = null;

  // The HUD corners / divider / flight-path line are plain visual chrome
  // (no data), so they're built once on first use and reused on every
  // language switch rather than re-created each time.
  let ctExtrasReady = false;

  function ensureCountryTransitionExtras(overlay) {
    if (ctExtrasReady) return;
    const content = overlay.querySelector('.country-transition-content');
    const flagEl = document.getElementById('countryTransitionFlag');

    const hud = document.createElement('div');
    hud.className = 'ct-hud-frame';
    hud.setAttribute('aria-hidden', 'true');
    ['tl', 'tr', 'bl', 'br'].forEach((pos) => {
      const corner = document.createElement('div');
      corner.className = `ct-corner ct-corner-${pos}`;
      hud.appendChild(corner);
    });
    overlay.appendChild(hud);

    const divider = document.createElement('div');
    divider.className = 'ct-divider';
    divider.setAttribute('aria-hidden', 'true');
    if (flagEl && flagEl.parentNode) {
      flagEl.insertAdjacentElement('afterend', divider);
    } else if (content) {
      content.appendChild(divider);
    }

    ctExtrasReady = true;
  }

  // Renders the place name as one <span> per character so it can flap in
  // airport-board style (reuses the existing @keyframes flapIn). Spaces
  // are rendered as plain, unanimated characters so word gaps stay put.
  function setAnimatedPlaceText(el, text) {
    el.setAttribute('aria-label', text);
    el.innerHTML = '';
    let shownCount = 0;
    text.split('').forEach((ch) => {
      const span = document.createElement('span');
      if (ch === ' ') {
        span.innerHTML = '&nbsp;';
        span.style.animation = 'none';
      } else {
        span.className = 'ct-char';
        span.textContent = ch;
        span.style.animationDelay = `${0.5 + shownCount * 0.035}s`;
        shownCount++;
      }
      el.appendChild(span);
    });
  }

  async function fetchCountrySpotImage(langKey) {
    if (Object.prototype.hasOwnProperty.call(countrySpotCache, langKey)) {
      return countrySpotCache[langKey];
    }
    const spot = COUNTRY_SPOTS[langKey];
    if (!spot) return null;
    if (spot.img) {
      countrySpotCache[langKey] = spot.img;
      return spot.img;
    }
    try {
      const res = await fetch(`https://en.wikipedia.org/api/rest_v1/page/summary/${encodeURIComponent(spot.wiki)}`);
      if (!res.ok) throw new Error('Wikipedia summary fetch failed');
      const data = await res.json();
      const src = (data.originalimage && data.originalimage.source)
        || (data.thumbnail && data.thumbnail.source)
        || null;
      countrySpotCache[langKey] = src;
      return src;
    } catch (err) {
      countrySpotCache[langKey] = null;
      return null;
    }
  }

  async function showCountryTransition(langKey) {
    // Respects the same reduced-motion preference used everywhere else on
    // the site — a fullscreen photo flash is squarely "non-essential motion".
    if (reducedMotion) return;

    const spot = COUNTRY_SPOTS[langKey];
    const overlay = document.getElementById('countryTransition');
    const bg = document.getElementById('countryTransitionBg');
    const flagEl = document.getElementById('countryTransitionFlag');
    const placeEl = document.getElementById('countryTransitionPlace');
    if (!spot || !overlay || !bg || !flagEl || !placeEl) return;

    ensureCountryTransitionExtras(overlay);

    bg.style.backgroundImage = 'none';
    setAnimatedPlaceText(placeEl, spot.place);
    flagEl.innerHTML = `<img src="https://flagcdn.com/48x36/${spot.flag}.png" alt="${spot.place} flag">`;

    // Force every CSS animation keyed off .active to restart from scratch,
    // even if the visitor flips languages again mid-sequence: remove the
    // class, force a reflow, then re-add it.
    overlay.classList.remove('active');
    void overlay.offsetWidth;
    overlay.classList.add('active');

    const imgUrl = await fetchCountrySpotImage(langKey);
    // If the visitor already flipped to another language while the fetch
    // was in flight, don't slap a stale photo onto the current overlay.
    if (imgUrl && currentLang === langKey) {
      // Check the photo's real shape before committing to a fill mode.
      // Landscape photos (wider than tall) can safely fill the whole
      // screen edge-to-edge. Portrait photos would get their top/bottom
      // sliced off if forced to "cover", so those fall back to "contain"
      // (letterboxed on navy) so nothing important gets cropped out.
      const probe = new Image();
      probe.onload = () => {
        if (currentLang !== langKey) return; // stale by the time it loaded
        const isLandscape = probe.naturalWidth >= probe.naturalHeight;
        bg.style.backgroundSize = isLandscape ? 'cover' : 'contain';
        bg.style.backgroundRepeat = isLandscape ? '' : 'no-repeat';
        bg.style.backgroundImage = `url("${imgUrl}")`;
      };
      probe.onerror = () => {
        if (currentLang === langKey) bg.style.backgroundImage = `url("${imgUrl}")`;
      };
      probe.src = imgUrl;
    }

    clearTimeout(countryTransitionHideTimer);
    countryTransitionHideTimer = setTimeout(() => {
      overlay.classList.remove('active');
    }, 2200);
  }

  // Assigned later by initDepartureTicker() / initSeatbeltSign() once
  // those UI pieces exist; setLanguage() calls them if/when they're set.
  let refreshTickerNow = null;
  let refreshSeatbeltNow = null;

  applyStaticTranslations();

  /* ---------- Language dropdown — toggle button beside "Home" opens a
     small menu of the 3 languages. Closes on selection, outside click,
     or Escape, and never depends on the page-switcher code below. ---------- */
  (function initLangDropdown() {
    const dropdown = document.getElementById('langDropdown');
    const toggle = document.getElementById('langDropdownToggle');
    if (!dropdown || !toggle) return;

    function closeDropdown() {
      dropdown.classList.remove('open');
      toggle.setAttribute('aria-expanded', 'false');
    }
    function openDropdown() {
      dropdown.classList.add('open');
      toggle.setAttribute('aria-expanded', 'true');
    }

    toggle.addEventListener('click', (e) => {
      e.stopPropagation();
      dropdown.classList.contains('open') ? closeDropdown() : openDropdown();
    });

    document.querySelectorAll('.lang-option').forEach((opt) => {
      opt.addEventListener('click', () => {
        setLanguage(opt.getAttribute('data-lang'));
        closeDropdown();
      });
    });

    document.addEventListener('click', (e) => {
      if (!dropdown.contains(e.target)) closeDropdown();
    });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') closeDropdown();
    });
  })();

  /* ---------- Page switcher — runs FIRST, on its own, before anything
     else below. One HTML file, but only one "page" section is shown at
     a time (Home / About Me / Skills / Education / Achievements /
     Contact). The base CSS hides every page section by default, so
     this just has to reveal the right one — it never depends on any
     later code in this file to already have run. ---------- */
  let refreshPageTitle = null;
  try {
    const PAGE_IDS = ['page-home', 'about-me', 'Skills', 'Education', 'Achievements', 'Contact'];
    const PAGE_DISPLAY = { 'page-home': 'flex' }; // everything else defaults to 'block'
    const navLinks = document.querySelectorAll('.navbar a[href^="#"]');

    function getPageFromHash() {
      const id = window.location.hash.slice(1);
      return PAGE_IDS.includes(id) ? id : 'page-home';
    }

    refreshPageTitle = () => { document.title = pageTitleFor(getPageFromHash(), currentLang); };

    function showPage(id) {
      PAGE_IDS.forEach((pid) => {
        const el = document.getElementById(pid);
        if (!el) return;
        el.style.display = (pid === id) ? (PAGE_DISPLAY[pid] || 'block') : 'none';
      });

      // Dream Destinations is its own <section> now (no longer nested inside
      // About Me), so it isn't one of PAGE_IDS — show it only while About is active.
      const destinationsEl = document.getElementById('Destinations');
      if (destinationsEl) destinationsEl.style.display = (id === 'about-me') ? 'block' : 'none';

      navLinks.forEach((link) => {
        link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
      });

      document.title = pageTitleFor(id, currentLang);
      window.scrollTo(0, 0);
    }

    navLinks.forEach((link) => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const targetId = link.getAttribute('href').slice(1);
        if (window.location.hash.slice(1) !== targetId) {
          history.pushState(null, '', '#' + targetId);
        }
        showPage(targetId);
      });
    });

    window.addEventListener('popstate', () => showPage(getPageFromHash()));
    showPage(getPageFromHash());
  } catch (err) {
    console.error('Page switcher failed:', err);
  }

  const reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const isCoarsePointer = window.matchMedia('(pointer: coarse)').matches;

  /* ---------- Intro / preloader — "GCDS" splash before the portfolio ---------- */
  initIntro(initNameTypewriter);

  function initIntro(onDone) {
    // Plays on every reload — no "seen it already" flag is kept.
    // Only skipped for people with reduced-motion enabled, since the
    // splash is a pure animation with no essential content.
    if (reducedMotion) { document.body.classList.add('boot-ready'); if (onDone) onDone(); return; }

    document.documentElement.classList.add('intro-locked');

    const intro = document.createElement('div');
    intro.className = 'intro-screen';
    intro.id = 'introScreen';
    intro.setAttribute('aria-hidden', 'true');
    intro.innerHTML = `
      <div class="intro-sky"></div>
      <div class="intro-content">
        <div class="intro-logo"><span class="intro-g">GC</span><span class="intro-s">DS</span></div>
        <p class="intro-tagline">${t('intro.tagline')}</p>
        <div class="intro-loader"><div class="intro-loader-bar" id="introBar"></div></div>
        <p class="intro-percent" id="introPercent">0%</p>
      </div>
      <div class="intro-plane-track"><span class="intro-plane">✈️</span></div>
    `;
    document.body.prepend(intro);

    const bar = intro.querySelector('#introBar');
    const percentEl = intro.querySelector('#introPercent');

    let progress = 0;
    const timer = setInterval(() => {
      progress += Math.random() * 16 + 6;
      if (progress >= 100) {
        progress = 100;
        clearInterval(timer);
        setTimeout(finishIntro, 350);
      }
      bar.style.width = progress + '%';
      percentEl.textContent = Math.floor(progress) + '%';
    }, 170);

    function finishIntro() {
      // Order is now: GCDS splash -> check-in card -> 2-door airport
      // gate -> portfolio. Each stage is fully covering the screen
      // before the previous one is removed, so there's never a frame
      // where the homepage underneath flashes through.
      intro.remove();
      document.documentElement.classList.remove('intro-locked');
      initCheckinGate(() => openAirportGate(onDone));
    }
  }

  /* ---------- Airport main gate — takes over the instant the GCDS
     boarding splash finishes. Two gate doors cover the screen, then
     slide open (like an arrival gate) to reveal the portfolio
     underneath. Once open, a boarding chime + the spoken greeting
     repeat a few times like a real gate announcement, then settle
     down once the visitor starts interacting with the page. ---------- */
  function injectGateStyles() {
    if (document.getElementById('airportGateStyles')) return;
    const style = document.createElement('style');
    style.id = 'airportGateStyles';
    style.textContent = `
      .airport-gate-overlay { position: fixed; inset: 0; z-index: 99999; }
      .gate-door {
        position: fixed; top: 0; bottom: 0; width: 50%;
        background:
          repeating-linear-gradient(180deg, rgba(255,255,255,0.03) 0px, rgba(255,255,255,0.03) 2px, transparent 2px, transparent 42px),
          linear-gradient(160deg, #0c1c2e 0%, #14314d 55%, #0a1826 100%);
        display: flex; align-items: center; justify-content: center;
        box-shadow: 0 0 80px rgba(0,0,0,0.65);
        transition: transform 0.8s cubic-bezier(.77,0,.16,1);
        will-change: transform;
      }
      .gate-door-left { left: 0; border-right: 1px solid rgba(94,224,196,0.35); }
      .gate-door-right { right: 0; border-left: 1px solid rgba(94,224,196,0.35); }
      .airport-gate-overlay.gate-opening .gate-door-left { transform: translateX(-100%); }
      .airport-gate-overlay.gate-opening .gate-door-right { transform: translateX(100%); }
      .gate-door-inner { text-align: center; font-family: Georgia, 'Times New Roman', serif; }
      .gate-door-left .gate-door-inner { transform: translateX(30px); }
      .gate-door-right .gate-door-inner { transform: translateX(-30px); }
      .gate-number { font-size: 2.6rem; font-weight: 700; color: #eafffa; letter-spacing: 2px; text-shadow: 0 0 18px rgba(94,224,196,0.5); }
      .gate-label { margin-top: 8px; font-size: 0.78rem; letter-spacing: 5px; text-transform: uppercase; color: #5ee0c4; }
      .gate-strip { position: fixed; top: 0; left: 0; right: 0; height: 5px; z-index: 100000;
        background: linear-gradient(90deg, #f4b942, #e8703a, #5ee0c4); opacity: 0.9; }
      @media (prefers-reduced-motion: reduce) {
        .gate-door { transition: none; }
      }
    `;
    document.head.appendChild(style);
  }

  function openAirportGate(onDone) {
    if (reducedMotion) { document.body.classList.add('boot-ready'); if (onDone) onDone(); startBoardingAnnouncements(); return; }

    injectGateStyles();
    document.documentElement.classList.add('intro-locked');

    const gate = document.createElement('div');
    gate.className = 'airport-gate-overlay';
    gate.id = 'airportGate';
    gate.setAttribute('aria-hidden', 'true');
    gate.innerHTML = `
      <div class="gate-strip"></div>
      <div class="gate-door gate-door-left">
        <div class="gate-door-inner">
          <div class="gate-number">GATE 3C</div>
          <div class="gate-label">${t('gate.boarding')}</div>
        </div>
      </div>
      <div class="gate-door gate-door-right">
        <div class="gate-door-inner">
          <div class="gate-number">✈</div>
          <div class="gate-label">${t('gate.welcome')}</div>
        </div>
      </div>
    `;
    document.body.appendChild(gate);

    // Force a layout pass so the closed state is painted before the
    // "opening" class kicks off the slide transition.
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        gate.classList.add('gate-opening');
        document.body.classList.add('boot-ready');
        playIntroChime();
      });
    });

    setTimeout(() => {
      gate.remove();
      document.documentElement.classList.remove('intro-locked');
      if (onDone) onDone();
      startBoardingAnnouncements();
    }, 950);
  }

  /* ---------- Boarding announcements — once the gate is open, the
     chime rings and the spoken greeting is read out ONE time only,
     like a real gate making a single boarding call instead of
     looping. The greeting is spoken in whichever of the 6 languages
     (EN/ES/FR/KO/TL/JA) is active at load time — see the per-language
     "voice" blocks in `translations` above and speakVoiceGreeting().
     playIntroChime()/playIntroVoiceGreeting() already guard themselves
     against playing more than once per page load, so this just calls
     each a single time instead of repeating them on an interval. ---------- */
  function startBoardingAnnouncements() {
    if (window.__announcementsStarted) return;
    window.__announcementsStarted = true;

    playIntroChime();
    playIntroVoiceGreeting();
  }

  /* ---------- Intro voice greeting — spoken once the airport gate has
     fully opened (the chime already rang as the doors slid apart).
     Uses the browser's built-in Speech Synthesis (no audio file needed).
     Voice choice depends on what's installed on the visitor's device/OS,
     so we pick the closest available English voice and soften the
     pitch/rate to sound warmer and less deep. ---------- */
  // Speaks the voice greeting in whatever language code is passed in.
  // Reused by playIntroVoiceGreeting() on first load AND by setLanguage()
  // every time the visitor picks a different language from the dropdown,
  // so the voiceline always matches whichever language is on screen.
  function speakVoiceGreeting(lang) {
    const voiceConfig = (translations[lang] || translations[currentLang]).voice;

    // Tagalog is routed through Google Translate's TTS audio instead of
    // the browser's built-in speechSynthesis, since most OSes don't ship
    // a proper Filipino voice at all — see speakViaGoogleTranslateTTS().
    if (voiceConfig.googleTranslateTTS) {
      speakViaGoogleTranslateTTS(voiceConfig);
    } else {
      speakViaBrowserTTS(voiceConfig);
    }
  }

  // Streams the greeting from Google Translate's read-aloud voice
  // (the same audio you'd hear clicking the speaker icon on
  // translate.google.com). This is an unofficial, undocumented endpoint —
  // not a real public API — so it can be slow, rate-limited, or blocked
  // outright with no warning. If it fails for any reason we fall straight
  // back to the normal browser voice so the greeting still plays.
  function speakViaGoogleTranslateTTS(voiceConfig) {
    try {
      const ttsLang = voiceConfig.googleTranslateLang || voiceConfig.lang.split('-')[0];
      const url = 'https://translate.google.com/translate_tts?ie=UTF-8&client=tw-ob&tl=' +
        encodeURIComponent(ttsLang) + '&q=' + encodeURIComponent(voiceConfig.text);

      const audio = new Audio(url);
      audio.volume = typeof voiceConfig.volume === 'number' ? voiceConfig.volume : 1;

      let fellBack = false;
      const fallback = () => {
        if (fellBack) return;
        fellBack = true;
        speakViaBrowserTTS(voiceConfig);
      };

      audio.addEventListener('error', fallback);
      audio.addEventListener('playing', () => { window.__introVoiceSpoke = true; });

      audio.play().catch(fallback);
    } catch (err) {
      console.error('Google Translate TTS failed, falling back to browser voice:', err);
      speakViaBrowserTTS(voiceConfig);
    }
  }

  // Original approach: the browser's built-in Speech Synthesis (no audio
  // file/network request needed). Voice choice depends on what's
  // installed on the visitor's device/OS, so we pick the closest
  // available voice for the language and soften the pitch/rate to sound
  // warmer and less deep.
  function speakViaBrowserTTS(voiceConfig) {
    if (!('speechSynthesis' in window)) return;

    const greetingText = voiceConfig.text;
    const greetingLangCode = voiceConfig.lang;
    // Most languages just have one lang code, but some (like Filipino)
    // get exposed under different codes depending on OS/browser — so we
    // check every candidate, not just the primary one.
    const langCandidates = voiceConfig.altLangCodes && voiceConfig.altLangCodes.length
      ? voiceConfig.altLangCodes
      : [greetingLangCode];

    function pickVoice() {
      const voices = window.speechSynthesis.getVoices();
      if (!voices.length) return null;

      // 1) Softer, warmer voices for the active language first — matched
      // by name, since that's the most reliable identifier across OSes.
      const preferredNames = voiceConfig.preferredVoices || [];
      let voice = voices.find((v) =>
        preferredNames.some((name) => v.name.includes(name))
      );
      if (voice) return voice;

      // 2) Exact lang-code match against every candidate code.
      for (const code of langCandidates) {
        voice = voices.find((v) => v.lang === code);
        if (voice) return voice;
      }

      // 3) Loose prefix match (e.g. "fil" matches "fil-PH") against
      // every candidate code's prefix.
      for (const code of langCandidates) {
        const prefix = code.split('-')[0];
        voice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith(prefix.toLowerCase()));
        if (voice) return voice;
      }

      // 4) Last resort: no voice for this language exists on this device
      // at all. Reading Tagalog/Filipino text in a totally unrelated
      // voice (say, a Japanese or Chinese engine) sounds far worse than
      // reading it in an English voice, so we land on English here
      // rather than grabbing whatever voices[0] happens to be.
      voice = voices.find((v) => v.lang && v.lang.toLowerCase().startsWith('en'));
      return voice || voices[0];
    }

    function doSpeak() {
      try {
        const utter = new SpeechSynthesisUtterance(greetingText);
        const voice = pickVoice();
        if (voice) utter.voice = voice;
        utter.lang = (voice && voice.lang) || greetingLangCode;
        // Per-language pitch/rate (falls back to the old defaults if a
        // language config doesn't set its own — every language here does).
        utter.pitch = typeof voiceConfig.pitch === 'number' ? voiceConfig.pitch : 1.3;
        utter.rate = typeof voiceConfig.rate === 'number' ? voiceConfig.rate : 0.95;
        utter.volume = typeof voiceConfig.volume === 'number' ? voiceConfig.volume : 1;

        utter.onstart = () => { window.__introVoiceSpoke = true; };

        window.speechSynthesis.cancel(); // stop whatever's currently queued/speaking
        window.speechSynthesis.speak(utter);
      } catch (err) {
        console.error('Voice greeting failed:', err);
      }
    }

    if (window.speechSynthesis.getVoices().length) {
      doSpeak();
    } else {
      // Voice list loads asynchronously in some browsers
      window.speechSynthesis.addEventListener('voiceschanged', doSpeak, { once: true });
    }
  }

  function playIntroVoiceGreeting() {
    if (window.__introVoicePlayed) return; // only once per page load
    window.__introVoicePlayed = true;

    // Uses whichever language is active at load time.
    speakVoiceGreeting(currentLang);

    // Fallback: many browsers (esp. Chrome) silently block audio/speech
    // that isn't triggered by a user gesture. If nothing actually spoke
    // within a second, retry on the visitor's very first interaction.
    setTimeout(() => {
      if (!window.__introVoiceSpoke) {
        const retry = () => {
          window.__introVoiceSpoke = false; // allow it to run again
          window.__introVoicePlayed = false;
          playIntroVoiceGreeting();
        };
        ['pointerdown', 'keydown', 'touchstart'].forEach((evt) =>
          window.addEventListener(evt, retry, { once: true })
        );
      }
    }, 1000);
  }

  function playIntroChime() {
    const AudioCtx = window.AudioContext || window.webkitAudioContext;
    if (!AudioCtx) return;

    // Reuse one AudioContext for the whole page instead of creating a new
    // one each call.
    const ctx = window.__introAudioCtx || (window.__introAudioCtx = new AudioCtx());

    let scheduled = false;
    function scheduleChime() {
      if (scheduled || window.__introChimePlayed) return;
      scheduled = true;
      window.__introChimePlayed = true;
      try {
        // Plays one bell-like tone: a fundamental + a couple of soft
        // overtones, so it rings like a real chime bar instead of a flat beep.
        function ringNote(freq, startTime, duration, peakGain) {
          const overtones = [
            { mult: 1, gain: 1 },
            { mult: 2.01, gain: 0.35 },
            { mult: 3.0, gain: 0.15 },
          ];
          overtones.forEach(({ mult, gain: gMul }) => {
            const osc = ctx.createOscillator();
            const gain = ctx.createGain();
            osc.type = 'sine';
            osc.frequency.value = freq * mult;

            gain.gain.setValueAtTime(0, startTime);
            gain.gain.linearRampToValueAtTime(peakGain * gMul, startTime + 0.02);
            gain.gain.exponentialRampToValueAtTime(0.0001, startTime + duration);

            osc.connect(gain).connect(ctx.destination);
            osc.start(startTime);
            osc.stop(startTime + duration + 0.05);
          });
        }

        // Classic gate / entrance "ding‑dong": a higher note, then a lower
        // note a fourth below, each ringing out with a long bell-like tail.
        const now = ctx.currentTime;
        ringNote(783.99, now, 1.4, 0.22);         // "ding" — G5
        ringNote(587.33, now + 0.32, 1.7, 0.22);  // "dong" — D5
      } catch (err) {
        console.error('Intro chime failed:', err);
      }
    }

    if (ctx.state === 'suspended') {
      // Browsers block audio playback until a user gesture. Try to resume
      // right now (works if this call is already inside a gesture), and
      // also arm a one-time fallback on the visitor's first interaction.
      ctx.resume().then(() => { if (ctx.state === 'running') scheduleChime(); });

      const retry = () => { ctx.resume().then(scheduleChime); };
      ['pointerdown', 'keydown', 'touchstart'].forEach((evt) =>
        window.addEventListener(evt, retry, { once: true })
      );
    } else {
      scheduleChime();
    }
  }

  /* ---------- Type out the full name in the hero, right after the intro clears ---------- */
  function initNameTypewriter() {
    const nameEl = document.querySelector('.hero-info h1');
    if (!nameEl || nameEl.dataset.typed === 'yes') return;
    nameEl.dataset.typed = 'yes';

    const fullText = nameEl.textContent.trim();
    if (reducedMotion) return; // keep the name static and fully visible

    nameEl.textContent = '';
    nameEl.setAttribute('aria-label', fullText);
    nameEl.classList.add('typing-name');

    const cursor = document.createElement('span');
    cursor.className = 'typing-cursor';
    cursor.setAttribute('aria-hidden', 'true');
    nameEl.appendChild(cursor);

    let i = 0;
    (function typeChar() {
      if (i < fullText.length) {
        cursor.insertAdjacentText('beforebegin', fullText[i]);
        i++;
        setTimeout(typeChar, 55 + Math.random() * 55);
      } else {
        setTimeout(() => cursor.classList.add('typing-done'), 1000);
      }
    })();
  }

  /* ---------- Inject a fleet of PAL-style planes into .network-glow ----------
     Planes 1-5 climb away toward the top right; planes 6-10 are mirrored
     (via the nested .plane-flip wrapper) and descend toward the terminal,
     heading down and left to where the passengers are waiting.
     Each of the 10 planes represents a different country: a livery class
     recolors the stripe/tail to evoke that country's flagship airline
     (colors only, never a logo), and a small national-flag decal sits
     near the tail. Plane 1 (Philippines/PAL) keeps the file's original
     default colors, so it has no livery class. ---------- */
  const fleetCountries = {
    2: { livery: 'usa',       flag: 'usa',       label: 'American Airlines (USA)' },
    3: { livery: 'japan',     flag: 'japan',     label: 'Japan Airlines (Japan)' },
    4: { livery: 'uk',        flag: 'uk',        label: 'British Airways (UK)' },
    5: { livery: 'france',    flag: 'france',    label: 'Air France (France)' },
    6: { livery: 'germany',   flag: 'germany',   label: 'Lufthansa (Germany)' },
    7: { livery: 'australia', flag: 'australia', label: 'Qantas (Australia)' },
    8: { livery: 'singapore', flag: 'singapore', label: 'Singapore Airlines (Singapore)' },
    9: { livery: 'korea',     flag: 'korea',     label: 'Korean Air (South Korea)' },
    10: { livery: 'uae',      flag: 'uae',       label: 'Emirates (UAE)' },
  };

  const glow = document.querySelector('.network-glow');
  if (glow) {
    for (let i = 1; i <= 5; i++) {
      const country = fleetCountries[i];
      const plane = document.createElement('div');
      plane.className = `pal-plane plane-${i}${country ? ' livery-' + country.livery : ''}`;
      plane.setAttribute('aria-hidden', 'true');
      if (country) plane.title = country.label;
      plane.innerHTML = `
        <div class="contrail"></div>
        <div class="tail"></div>
        <div class="wing"></div>
        <div class="fuselage"></div>
        <div class="stripe"></div>
        ${country ? `<div class="mini-flag ${country.flag}"></div>` : ''}
      `;
      glow.appendChild(plane);
    }

    for (let i = 6; i <= 10; i++) {
      const country = fleetCountries[i];
      const plane = document.createElement('div');
      plane.className = `pal-plane plane-${i} flight-down${country ? ' livery-' + country.livery : ''}`;
      plane.setAttribute('aria-hidden', 'true');
      if (country) plane.title = country.label;
      plane.innerHTML = `
        <div class="plane-flip">
          <div class="contrail"></div>
          <div class="tail"></div>
          <div class="wing"></div>
          <div class="fuselage"></div>
          <div class="stripe"></div>
          ${country ? `<div class="mini-flag ${country.flag}"></div>` : ''}
        </div>
      `;
      glow.appendChild(plane);
    }

    /* ---------- Airport skyline on the horizon (control tower + terminal) ---------- */
    const airport = document.createElement('div');
    airport.className = 'airport-scene';
    airport.setAttribute('aria-hidden', 'true');
    airport.innerHTML = `
      <div class="airport-terminal"><div class="window-row"></div></div>
      <div class="control-tower"></div>
    `;
    glow.appendChild(airport);

    /* ---------- Passengers — a small queue waiting near the terminal ---------- */
    const queue = document.createElement('div');
    queue.className = 'passengers-queue';
    queue.setAttribute('aria-hidden', 'true');
    for (let i = 0; i < 6; i++) {
      const passenger = document.createElement('div');
      passenger.className = 'queue-passenger';
      passenger.style.left = (8 + i * 27) + 'px';
      const scale = 0.82 + Math.random() * 0.36;
      passenger.style.transform = `scale(${scale.toFixed(2)})`;
      passenger.style.animationDelay = (i * 0.4).toFixed(2) + 's';
      queue.appendChild(passenger);
    }
    airport.appendChild(queue);

    /* ---------- Extra starfield — a scattered handful of individually
       twinkling stars (a few brighter gold ones mixed in), layered on
       top of the base twinkle-stars gradient for extra depth. ---------- */
    const starfield = document.createElement('div');
    starfield.className = 'starfield-layer';
    starfield.setAttribute('aria-hidden', 'true');
    starfield.innerHTML = `
      <svg viewBox="0 0 1000 560" preserveAspectRatio="xMidYMid slice">
        <circle class="star-point" cx="330.9" cy="74.3" r="1.9" style="animation-delay:0.2s"></circle>
        <circle class="star-point" cx="371.1" cy="40.9" r="1.7" style="animation-delay:0.1s"></circle>
        <circle class="star-point bright" cx="87.1" cy="52.7" r="1.6" style="animation-delay:2.6s"></circle>
        <circle class="star-point" cx="234.3" cy="245.9" r="2.2" style="animation-delay:1.8s"></circle>
        <circle class="star-point bright" cx="957.2" cy="36.8" r="2.1" style="animation-delay:0.9s"></circle>
        <circle class="star-point" cx="133.1" cy="131.1" r="2.1" style="animation-delay:0.6s"></circle>
        <circle class="star-point bright" cx="633.4" cy="154.1" r="1.8" style="animation-delay:0.2s"></circle>
        <circle class="star-point" cx="217.7" cy="264.9" r="1.6" style="animation-delay:1.0s"></circle>
        <circle class="star-point" cx="455.1" cy="127.9" r="2.1" style="animation-delay:2.2s"></circle>
        <circle class="star-point" cx="571.4" cy="209.1" r="2.2" style="animation-delay:2.3s"></circle>
        <circle class="star-point bright" cx="961.0" cy="62.5" r="1.6" style="animation-delay:2.4s"></circle>
        <circle class="star-point" cx="489.4" cy="34.1" r="1.9" style="animation-delay:2.4s"></circle>
        <circle class="star-point" cx="860.5" cy="132.9" r="1.9" style="animation-delay:1.9s"></circle>
        <circle class="star-point" cx="458.0" cy="322.4" r="2.2" style="animation-delay:1.5s"></circle>
        <circle class="star-point" cx="78.2" cy="272.5" r="1.9" style="animation-delay:3.2s"></circle>
        <circle class="star-point" cx="293.2" cy="158.9" r="1.9" style="animation-delay:0.1s"></circle>
        <circle class="star-point bright" cx="181.3" cy="62.2" r="1.2" style="animation-delay:2.5s"></circle>
        <circle class="star-point" cx="257.7" cy="160.7" r="2.1" style="animation-delay:0.3s"></circle>
        <circle class="star-point" cx="547.5" cy="338.0" r="2.1" style="animation-delay:2.8s"></circle>
        <circle class="star-point bright" cx="418.7" cy="149.2" r="2.2" style="animation-delay:3.1s"></circle>
        <circle class="star-point" cx="189.2" cy="103.5" r="1.4" style="animation-delay:1.6s"></circle>
        <circle class="star-point" cx="272.2" cy="21.5" r="1.6" style="animation-delay:1.2s"></circle>
        <circle class="star-point" cx="935.0" cy="268.6" r="1.7" style="animation-delay:2.0s"></circle>
        <circle class="star-point" cx="71.8" cy="343.8" r="2.0" style="animation-delay:2.8s"></circle>
        <circle class="star-point bright" cx="396.7" cy="163.6" r="1.2" style="animation-delay:2.0s"></circle>
        <circle class="star-point bright" cx="84.7" cy="95.2" r="1.3" style="animation-delay:1.1s"></circle>
        <circle class="star-point bright" cx="20.2" cy="74.5" r="1.2" style="animation-delay:1.2s"></circle>
        <circle class="star-point" cx="859.4" cy="241.1" r="1.3" style="animation-delay:0.8s"></circle>
        <circle class="star-point" cx="369.6" cy="64.2" r="2.1" style="animation-delay:3.2s"></circle>
        <circle class="star-point" cx="484.5" cy="50.9" r="1.2" style="animation-delay:1.1s"></circle>
        <circle class="star-point" cx="815.7" cy="78.1" r="1.1" style="animation-delay:3.0s"></circle>
        <circle class="star-point" cx="160.7" cy="215.5" r="1.1" style="animation-delay:1.7s"></circle>
        <circle class="star-point bright" cx="848.8" cy="270.6" r="1.4" style="animation-delay:1.2s"></circle>
        <circle class="star-point" cx="761.1" cy="211.7" r="2.0" style="animation-delay:1.1s"></circle>
      </svg>
    `;
    glow.insertBefore(starfield, glow.firstChild);
  }

  /* ---------- Mode switch — dark / light ---------- */
  const modeSwitch = document.getElementById('modeSwitch');
  const body = document.body;

  if (localStorage.getItem('lightMode') === 'on') {
    body.classList.add('light-mode');
  }

  function syncCheckinGateVideos() {
    const darkVid = document.getElementById('checkinGateVideoDark');
    const lightVid = document.getElementById('checkinGateVideoLight');
    if (!darkVid || !lightVid) return;
    const isLight = body.classList.contains('light-mode');
    const toPlay = isLight ? lightVid : darkVid;
    const toPause = isLight ? darkVid : lightVid;
    toPause.pause();
    toPlay.play().catch(() => {});
  }
  syncCheckinGateVideos();

  function toggleMode() {
    body.classList.toggle('light-mode');
    localStorage.setItem('lightMode', body.classList.contains('light-mode') ? 'on' : 'off');
    syncCheckinGateVideos();
  }

  if (modeSwitch) {
    modeSwitch.addEventListener('click', toggleMode);
    modeSwitch.setAttribute('tabindex', '0');
    modeSwitch.setAttribute('role', 'button');
    modeSwitch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMode(); }
    });
  }

  /* Light switch on the boarding pass check-in card */
  const checkinModeSwitch = document.getElementById('checkinModeSwitch');
  if (checkinModeSwitch) {
    checkinModeSwitch.addEventListener('click', toggleMode);
    checkinModeSwitch.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); toggleMode(); }
    });
  }

  /* ---------- AI chatbot — control & replies ---------- */
  const toggleBtn = document.getElementById('chatbotToggle');
  const container = document.getElementById('chatbotContainer');
  const closeBtn = document.getElementById('chatbotClose');
  const form = document.getElementById('chatbotForm');
  const messages = document.getElementById('chatbotMessages');
  const input = document.getElementById('chatbotText');

  if (toggleBtn && container) {
    toggleBtn.addEventListener('click', () => {
      container.classList.toggle('active');
      toggleBtn.classList.remove('attention-wiggle');
    });
    // The toggle is a <div role="button">, not a real <button>, so
    // Enter/Space don't activate it natively — wire that up manually.
    toggleBtn.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ' || e.key === 'Spacebar') {
        e.preventDefault();
        toggleBtn.click();
      }
    });
  }
  if (closeBtn && container) {
    closeBtn.addEventListener('click', () => container.classList.remove('active'));
  }

  // One gentle wiggle to draw the eye if the chat hasn't been opened yet
  if (toggleBtn && container && !reducedMotion) {
    setTimeout(() => {
      if (!container.classList.contains('active')) {
        toggleBtn.classList.add('attention-wiggle');
        setTimeout(() => toggleBtn.classList.remove('attention-wiggle'), 700);
      }
    }, 6000);
  }

  // Pulls from the active language's reply set, so switching languages
  // also switches which trigger words/phrases the chatbot understands.
  function currentAiReplies() {
    return translations[currentLang].chatbot.replies;
  }

  if (form) {
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      const text = input.value.trim();
      if (!text) return;

      addMessage(text, 'user');
      input.value = '';
      showTypingIndicator();

      setTimeout(() => {
        removeTypingIndicator();
        const reply = getReply(text.toLowerCase());
        addMessage(reply, 'bot');
      }, 600);
    });
  }

  function addMessage(text, type) {
    const div = document.createElement('div');
    div.className = `message ${type}-message`;
    // Bot replies come from our own translations object (trusted, hardcoded)
    // so they may contain safe markup like the Facebook link. User-typed
    // text stays as textContent so nothing they type can inject HTML.
    if (type === 'bot') {
      div.innerHTML = text;
    } else {
      div.textContent = text;
    }
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function showTypingIndicator() {
    const div = document.createElement('div');
    div.className = 'message bot-message';
    div.id = 'typingIndicator';
    div.textContent = t('chatbot.typing');
    messages.appendChild(div);
    messages.scrollTop = messages.scrollHeight;
  }

  function removeTypingIndicator() {
    const el = document.getElementById('typingIndicator');
    if (el) el.remove();
  }

  function getReply(text) {
    // `text` arrives already lowercased (see the submit handler above).
    // Longer/more specific keys are checked first so e.g. "his personal
    // info" wins over the shorter "name" when both would otherwise match.
    const aiReplies = currentAiReplies();
    const sortedEntries = Object.entries(aiReplies)
      .filter(([key]) => key !== 'default')
      .sort((a, b) => b[0].length - a[0].length);

    for (const [key, reply] of sortedEntries) {
      if (text.includes(key.toLowerCase())) return reply;
    }
    return aiReplies.default;
  }

  /* ---------- Scroll reveal — sections & list items fade/slide in ---------- */
  initScrollReveal();

  function initScrollReveal() {
    const sectionTargets = document.querySelectorAll(
      '#Destinations, #about-me, #Skills, #Education, #Achievements, #Contact'
    );
    const itemTargets = document.querySelectorAll(
      '.destination-card, .skills-list li, .education-list li, .achievements-list li, #Contact p'
    );

    sectionTargets.forEach((el) => el.classList.add('reveal'));
    itemTargets.forEach((el, i) => {
      el.classList.add('reveal-item');
      el.style.setProperty('--d', (i % 6) * 0.08 + 's');
    });

    const allTargets = [...sectionTargets, ...itemTargets];

    if (!('IntersectionObserver' in window) || reducedMotion) {
      allTargets.forEach((el) => el.classList.add('in-view'));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -60px 0px' }
    );

    allTargets.forEach((el) => io.observe(el));
  }

  /* ---------- Hero photo tilt — follows the cursor slightly ---------- */
  initHeroTilt();

  function initHeroTilt() {
    const wrap = document.querySelector('.hero-image-container');
    const img = wrap ? wrap.querySelector('img') : null;
    if (!wrap || !img || reducedMotion || isCoarsePointer) return;

    wrap.addEventListener('mousemove', (e) => {
      const rect = wrap.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      img.style.transition = 'transform 0.1s ease';
      img.style.transform = `translateY(-6px) scale(1.02) rotateY(${x * 14}deg) rotateX(${-y * 14}deg)`;
    });
    wrap.addEventListener('mouseleave', () => {
      img.style.transition = 'transform 0.5s ease';
      img.style.transform = '';
    });
  }

  /* ---------- Headline mask-reveal — each section's <h1> is split
     into a masked wrapper and slides up into view from behind it,
     timed with the section's own fade-in. Falls back to plain text
     (no wrapper) when reduced-motion is on. ---------- */
  initHeadlineReveal();

  function initHeadlineReveal() {
    const headings = document.querySelectorAll(
      '#about-me header h1, #Skills header h1, #Education header h1, #Achievements header h1, #Contact header h1'
    );
    if (!headings.length || reducedMotion) return;

    headings.forEach((h) => {
      const text = h.textContent;
      h.textContent = '';
      h.style.overflow = 'hidden';

      const inner = document.createElement('span');
      inner.textContent = text;
      inner.style.display = 'inline-block';
      inner.style.transform = 'translateY(115%)';
      inner.style.transition = 'transform 0.8s var(--ease-premium, cubic-bezier(.16,1,.3,1))';
      h.appendChild(inner);
      h.dataset.revealed = 'false';
      h._revealInner = inner;
    });

    if (!('IntersectionObserver' in window)) {
      headings.forEach((h) => { if (h._revealInner) h._revealInner.style.transform = 'translateY(0)'; });
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const inner = entry.target._revealInner;
            if (inner) inner.style.transform = 'translateY(0)';
            io.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.4, rootMargin: '0px 0px -40px 0px' }
    );
    headings.forEach((h) => io.observe(h));
  }

  /* ---------- Skill cards — subtle 3D tilt + a spotlight glow that
     follows the cursor on mouse/trackpad. On touch devices (where
     mousemove never fires), tapping a card plays a quick tilt-pop
     instead so the effect is still visible there. ---------- */
  initSkillTilt();

  function initSkillTilt() {
    const cards = document.querySelectorAll('.skill-card');
    if (!cards.length || reducedMotion) return;

    if (isCoarsePointer) {
      cards.forEach((card) => {
        card.addEventListener(
          'touchstart',
          () => {
            if (!card.animate) return;
            card.style.setProperty('--mx', '50%');
            card.style.setProperty('--my', '35%');
            card.animate(
              [
                { transform: 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)' },
                { transform: 'perspective(700px) rotateX(-6deg) rotateY(8deg) translateY(-6px) scale(1.03)', offset: 0.5 },
                { transform: 'perspective(700px) rotateX(0deg) rotateY(0deg) translateY(0) scale(1)' },
              ],
              { duration: 550, easing: 'ease-out' }
            );
          },
          { passive: true }
        );
      });
      return;
    }

    cards.forEach((card) => {
      card.addEventListener('mousemove', (e) => {
        const rect = card.getBoundingClientRect();
        const px = (e.clientX - rect.left) / rect.width;
        const py = (e.clientY - rect.top) / rect.height;
        const rotateY = (px - 0.5) * 14;
        const rotateX = (0.5 - py) * 14;
        card.style.transition = 'transform 0.1s ease-out';
        card.style.transform =
          'perspective(700px) rotateX(' + rotateX.toFixed(2) + 'deg) rotateY(' + rotateY.toFixed(2) + 'deg) translateY(-6px) scale(1.02)';
        card.style.setProperty('--mx', (px * 100) + '%');
        card.style.setProperty('--my', (py * 100) + '%');
      });
      card.addEventListener('mouseleave', () => {
        card.style.transition = 'transform 0.5s var(--ease-premium, ease)';
        card.style.transform = '';
      });
    });
  }

  /* ---------- Cursor glow trail ---------- */
  initCursorGlow();

  function initCursorGlow() {
    if (reducedMotion || isCoarsePointer) return;

    const glow = document.createElement('div');
    glow.className = 'cursor-glow';
    glow.setAttribute('aria-hidden', 'true');
    document.body.appendChild(glow);

    let mouseX = window.innerWidth / 2;
    let mouseY = window.innerHeight / 2;
    let glowX = mouseX;
    let glowY = mouseY;

    window.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      glow.style.opacity = '1';
    });
    window.addEventListener('mouseleave', () => { glow.style.opacity = '0'; });

    (function raf() {
      glowX += (mouseX - glowX) * 0.12;
      glowY += (mouseY - glowY) * 0.12;
      glow.style.transform = `translate(${glowX}px, ${glowY}px)`;
      requestAnimationFrame(raf);
    })();
  }

  /* ---------- Ambient floating sky-spark particles ---------- */
  initSkySparks();

  /* ---------- Ambient traveler crossing the tarmac now and then ---------- */
  initWalkingPassengers();

  function initWalkingPassengers() {
    const glowLayer = document.querySelector('.network-glow');
    if (!glowLayer || reducedMotion) return;

    function spawnPassenger(delay) {
      setTimeout(() => {
        const passenger = document.createElement('div');
        passenger.className = 'walking-passenger';
        passenger.setAttribute('aria-hidden', 'true');
        const duration = 14 + Math.random() * 8;
        passenger.style.animationDuration = duration.toFixed(1) + 's';
        passenger.style.bottom = (2 + Math.random() * 3).toFixed(1) + 'px';
        glowLayer.appendChild(passenger);
        passenger.addEventListener('animationend', () => passenger.remove());
      }, delay);
    }

    setInterval(() => {
      spawnPassenger(0);
      // sometimes a second traveler follows a little behind, so the
      // tarmac occasionally has a couple of passengers at once
      if (Math.random() > 0.45) spawnPassenger(1200 + Math.random() * 1800);
    }, 4500);
  }

  function initSkySparks() {
    const glowLayer = document.querySelector('.network-glow');
    if (!glowLayer || reducedMotion) return;

    setInterval(() => {
      const spark = document.createElement('span');
      spark.className = 'sky-spark';
      spark.style.left = Math.random() * 100 + '%';
      spark.style.setProperty('--drift', (Math.random() * 60 - 30) + 'px');
      spark.style.animationDuration = (5 + Math.random() * 4) + 's';
      glowLayer.appendChild(spark);
      spark.addEventListener('animationend', () => spark.remove());
    }, 900);
  }

  /* ---------- v5 additions ---------- */

  /* ---------- Flight progress bar — fills as the visitor scrolls
     the current "page". Since this is a single-file site with a
     page switcher, it recalculates on hash change too, because the
     scrollable height changes whenever a different section shows. */
  initFlightProgress();

  function initFlightProgress() {
    const bar = document.createElement('div');
    bar.className = 'flight-progress';
    bar.setAttribute('aria-hidden', 'true');
    bar.innerHTML = `<div class="flight-progress-fill" id="flightProgressFill"><span class="flight-progress-plane">✈️</span></div>`;
    document.body.appendChild(bar);

    const fill = bar.querySelector('#flightProgressFill');

    function updateProgress() {
      const scrollTop = window.scrollY || document.documentElement.scrollTop;
      const scrollable = document.documentElement.scrollHeight - window.innerHeight;
      const pct = scrollable > 0 ? Math.min(100, Math.max(0, (scrollTop / scrollable) * 100)) : 0;
      fill.style.width = pct + '%';
    }

    window.addEventListener('scroll', updateProgress, { passive: true });
    window.addEventListener('resize', updateProgress);
    window.addEventListener('hashchange', () => setTimeout(updateProgress, 60));
    updateProgress();
  }

  /* ---------- Departure ticker — split-flap status strip that
     lives right under the navbar and cycles through a few lines,
     like an airport departures board. ---------- */
  initDepartureTicker();

  function initDepartureTicker() {
    const navbar = document.querySelector('.navbar');
    if (!navbar || document.querySelector('.departure-ticker')) return;

    const ticker = document.createElement('div');
    ticker.className = 'departure-ticker';
    ticker.setAttribute('aria-hidden', 'true');
    ticker.innerHTML = `
      <span class="departure-ticker-label">FLIGHT INFO</span>
      <span class="departure-ticker-flap" id="departureFlap"></span>
    `;
    navbar.insertAdjacentElement('afterend', ticker);

    const flapEl = ticker.querySelector('#departureFlap');
    let msgIndex = 0;

    function renderFlap(text) {
      flapEl.innerHTML = '';
      text.split('').forEach((ch, i) => {
        const span = document.createElement('span');
        span.className = 'flap-char';
        span.textContent = ch === ' ' ? '\u00A0' : ch;
        if (!reducedMotion) span.style.animationDelay = (i * 0.025) + 's';
        flapEl.appendChild(span);
      });
    }

    // Re-renders the flap on whatever message index it's currently on,
    // in the (possibly new) active language — called by setLanguage().
    refreshTickerNow = () => renderFlap(t('ticker')[msgIndex]);

    renderFlap(t('ticker')[0]);
    if (reducedMotion) return; // keep the first line static, no cycling

    setInterval(() => {
      const msgs = t('ticker');
      msgIndex = (msgIndex + 1) % msgs.length;
      renderFlap(msgs[msgIndex]);
    }, 4200);
  }

  /* ---------- Seatbelt-sign indicator — sits beside the mode
     switch in the navbar and reflects the current livery
     (dark/night vs light/day). ---------- */
  initSeatbeltSign();

  function initSeatbeltSign() {
    if (!modeSwitch || document.querySelector('.seatbelt-sign')) return;

    const sign = document.createElement('li');
    sign.className = 'seatbelt-sign';
    sign.setAttribute('aria-hidden', 'true');
    sign.innerHTML = `<span class="seatbelt-icon"></span><span class="seatbelt-text"></span>`;
    modeSwitch.insertAdjacentElement('afterend', sign);

    const textEl = sign.querySelector('.seatbelt-text');
    function updateSignText() {
      textEl.textContent = body.classList.contains('light-mode') ? t('seatbelt.clear') : t('seatbelt.fasten');
    }
    updateSignText();
    modeSwitch.addEventListener('click', () => setTimeout(updateSignText, 50));

    // Called by setLanguage() so the sign's wording updates immediately
    // if the visitor switches language without also toggling the mode.
    refreshSeatbeltNow = updateSignText;
  }

  /* ---------- Destination lightbox — click any Dream Destinations
     photo to view it enlarged in a fullscreen overlay. ---------- */
  initDestinationLightbox();

  function initDestinationLightbox() {
    const grid = document.querySelector('.destinations-grid');
    const lightbox = document.getElementById('destinationLightbox');
    if (!grid || !lightbox) return;

    const cards = Array.from(grid.querySelectorAll('.destination-card'));
    if (!cards.length) return;

    const lightboxImg = document.getElementById('destinationLightboxImg');
    const lightboxCaption = document.getElementById('destinationLightboxCaption');
    const closeBtn = document.getElementById('destinationLightboxClose');
    const prevBtn = document.getElementById('destinationLightboxPrev');
    const nextBtn = document.getElementById('destinationLightboxNext');
    const stamp = document.getElementById('destinationLightboxStamp');
    let lastFocusedCard = null;
    let currentIndex = 0;

    function renderSlide(index) {
      const card = cards[index];
      const img = card.querySelector('img');
      const captionEl = card.querySelector('.destination-caption');
      if (!img) return;

      lightboxImg.src = img.currentSrc || img.src;
      lightboxImg.alt = img.alt || '';
      lightboxCaption.innerHTML = captionEl ? captionEl.innerHTML : '';

      // Restart the customs-stamp animation on every slide (not just the
      // first open) so stepping prev/next re-triggers the stamping motion.
      if (stamp) {
        stamp.classList.remove('stamp-play');
        void stamp.offsetWidth; // force reflow so the removal registers
        stamp.classList.add('stamp-play');
      }
    }

    function openLightbox(index) {
      currentIndex = index;
      lastFocusedCard = cards[index];
      renderSlide(index);
      lightbox.classList.add('is-open');
      lightbox.setAttribute('aria-hidden', 'false');
      body.style.overflow = 'hidden';
      closeBtn.focus();
    }

    function closeLightbox() {
      lightbox.classList.remove('is-open');
      lightbox.setAttribute('aria-hidden', 'true');
      body.style.overflow = '';
      lightboxImg.src = '';
      if (lastFocusedCard) lastFocusedCard.focus();
    }

    function step(delta) {
      currentIndex = (currentIndex + delta + cards.length) % cards.length;
      renderSlide(currentIndex);
    }

    grid.addEventListener('click', (e) => {
      const card = e.target.closest('.destination-card');
      if (card) openLightbox(cards.indexOf(card));
    });

    closeBtn.addEventListener('click', closeLightbox);
    if (prevBtn) prevBtn.addEventListener('click', () => step(-1));
    if (nextBtn) nextBtn.addEventListener('click', () => step(1));

    lightbox.addEventListener('click', (e) => {
      if (e.target === lightbox) closeLightbox();
    });

    document.addEventListener('keydown', (e) => {
      if (!lightbox.classList.contains('is-open')) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') step(-1);
      if (e.key === 'ArrowRight') step(1);
    });
  }

  /* ---------- Decorative departure/arrival boards — two independent,
     both-real pieces of data per row:
     1) TIME shown is the destination country's actual current local
        time right now (data-tz, an IANA zone — e.g. "Asia/Manila"),
        computed live off the visitor's real clock. Genuinely accurate,
        not a simulation.
     2) STATUS (SCHEDULED/ON TIME/BOARDING) stays on the fixed daily
        schedule logic (data-time, e.g. "05:12"): computed from the
        genuine distance between now and the NEXT upcoming occurrence
        of that flight's fixed slot, rolling to tomorrow once today's
        has passed — so it still drifts differently depending on when
        you open the site. The two are deliberately unrelated, same as
        a real board's local destination clock has nothing to do with
        that flight's own boarding countdown. ---------- */
  initDepartureBoards();

  function initDepartureBoards() {
    // Duplicate each scrolling list once so the 0% -> -50% loop is seamless.
    document.querySelectorAll('.departure-board-list').forEach((list) => {
      list.insertAdjacentHTML('beforeend', list.innerHTML);
    });

    const rows = document.querySelectorAll('.departure-board-row[data-time]');
    const clocks = document.querySelectorAll('.departure-board-clock');
    if (!rows.length && !clocks.length) return;

    const pad = (n) => n.toString().padStart(2, '0');

    // Next real occurrence of a fixed HH:MM time-of-day, relative to `now`.
    // If that time already passed today, it rolls over to tomorrow.
    function nextOccurrence(now, hh, mm) {
      const target = new Date(now);
      target.setHours(hh, mm, 0, 0);
      if (target <= now) target.setDate(target.getDate() + 1);
      return target;
    }

    // Cache one Intl formatter per timezone instead of building one every tick.
    const tzFormatters = new Map();
    function localTimeFor(tz, now) {
      let fmt = tzFormatters.get(tz);
      if (!fmt) {
        fmt = new Intl.DateTimeFormat('en-GB', {
          hour: '2-digit',
          minute: '2-digit',
          hour12: false,
          timeZone: tz,
        });
        tzFormatters.set(tz, fmt);
      }
      return fmt.format(now); // already "HH:MM"
    }

    // Status is assigned by RANK within each board, not by a fixed minute
    // threshold. The flight times all sit inside a narrow window, so any
    // fixed cutoff left whole stretches of the day reading one single
    // status across every row. Ranking guarantees each board always shows
    // a realistic mix, and it still rotates naturally through the day as
    // each flight's slot passes and rolls to tomorrow.
    const BOARDING_COUNT = 2;
    const ONTIME_COUNT = 3;
    const lists = document.querySelectorAll('.departure-board-list');

    function tick() {
      const now = new Date();
      const clockStr = `${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
      clocks.forEach((el) => { el.textContent = clockStr; });

      // Rank each board (NOW BOARDING, ARRIVALS) on its own, so a board
      // with more or fewer destinations always gets its own proportional
      // BOARDING / ON TIME / SCHEDULED mix instead of the two boards
      // competing for a single shared ranking.
      lists.forEach((list) => {
        const listRows = list.querySelectorAll('.departure-board-row[data-time]');
        if (!listRows.length) return;

        const pending = [];
        listRows.forEach((row) => {
          const timeEl = row.querySelector('.db-time');
          if (timeEl && row.dataset.tz) {
            timeEl.textContent = localTimeFor(row.dataset.tz, now);
          }

          const statusEl = row.querySelector('.db-status');
          if (!statusEl) return;

          const [hh, mm] = row.dataset.time.split(':').map(Number);
          const scheduledSlot = nextOccurrence(now, hh, mm);
          pending.push({
            statusEl,
            minutesUntil: (scheduledSlot.getTime() - now.getTime()) / 60000,
          });
        });

        // Rank by DISTINCT minute values, not array position. This list is
        // duplicated for the seamless scroll loop, so a flight's original
        // row and its clone always share the exact same minutesUntil.
        // Looking the rank up by value (instead of by position in the
        // sorted array) guarantees both copies always land on the same
        // rank, and therefore always show the same status.
        const distinctTimes = Array.from(new Set(pending.map((p) => p.minutesUntil))).sort((a, b) => a - b);
        const rankOf = new Map(distinctTimes.map((v, i) => [v, i]));

        pending.forEach(({ statusEl, minutesUntil }) => {
          const rank = rankOf.get(minutesUntil);
          statusEl.classList.remove('db-boarding', 'db-ontime', 'db-scheduled');
          if (rank < BOARDING_COUNT) {
            statusEl.textContent = 'BOARDING';
            statusEl.classList.add('db-boarding');
          } else if (rank < BOARDING_COUNT + ONTIME_COUNT) {
            statusEl.textContent = 'ON TIME';
            statusEl.classList.add('db-ontime');
          } else {
            statusEl.textContent = 'SCHEDULED';
            statusEl.classList.add('db-scheduled');
          }
        });
      });
    }

    tick();
    setInterval(tick, 1000);
  }

  /* =============================================================
     CABIN ANNOUNCEMENT TOAST — a small PA-style pill that slides
     down from under the navbar every time the visitor switches to
     a different page, e.g. "NOW SERVING: ABOUT ME". Purely visual,
     mirrors the seatbelt-sign/departure-ticker cosmetic touches
     already in this file. Auto-dismisses itself after ~2.6s.
     ============================================================= */
  initCabinAnnouncements();

  function initCabinAnnouncements() {
    if (document.querySelector('.cabin-announcement')) return;

    const PAGE_LABEL_KEYS = {
      'page-home': 'nav.home',
      'about-me': 'nav.about',
      'Skills': 'nav.skills',
      'Education': 'nav.education',
      'Achievements': 'nav.achievements',
      'Contact': 'nav.contact'
    };

    const toast = document.createElement('div');
    toast.className = 'cabin-announcement';
    toast.setAttribute('aria-live', 'polite');
    toast.innerHTML = `<span class="cabin-announcement-icon">✈️</span><span class="cabin-announcement-label">NOW SERVING</span><span class="cabin-announcement-text"></span>`;
    document.body.appendChild(toast);

    const textEl = toast.querySelector('.cabin-announcement-text');
    let hideTimer = null;

    function currentPageId() {
      const id = window.location.hash.slice(1);
      return PAGE_LABEL_KEYS[id] ? id : 'page-home';
    }

    function announce(id) {
      const key = PAGE_LABEL_KEYS[id];
      if (!key) return;
      const label = t(key);
      if (!label) return;
      textEl.textContent = label.toUpperCase();
      toast.classList.add('show');
      clearTimeout(hideTimer);
      hideTimer = setTimeout(() => toast.classList.remove('show'), 2600);
    }

    // Only announces on an actual switch (hash change or nav click) —
    // deliberately doesn't fire on first load, so it never competes
    // with the boot sequence (splash / airport gate) for attention.
    window.addEventListener('hashchange', () => announce(currentPageId()));
    document.querySelectorAll('.navbar a[href^="#"]').forEach((link) => {
      link.addEventListener('click', () => setTimeout(() => announce(currentPageId()), 40));
    });
  }

  /* =============================================================
     DOWNLOADABLE BOARDING PASS — a floating ticket-icon button that
     opens a modal where the visitor can type their own name and
     download a personalized "boarding pass" as a PNG. Drawn entirely
     with the Canvas 2D API (no external library, no image assets),
     styled after the same PAL-inspired tri-color livery used on the
     check-in card elsewhere in this file.
     ============================================================= */
  initBoardingPassGenerator();

  function initBoardingPassGenerator() {
    if (document.getElementById('boardingPassFab')) return;

    const fab = document.createElement('button');
    fab.id = 'boardingPassFab';
    fab.className = 'secondary-fab';
    fab.type = 'button';
    fab.setAttribute('aria-label', 'Get your boarding pass');
    fab.innerHTML = `🎫<span class="fab-tooltip">Get Your Boarding Pass</span>`;
    document.body.appendChild(fab);

    const modal = document.createElement('div');
    modal.className = 'boardingpass-modal';
    modal.id = 'boardingPassModal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-modal', 'true');
    modal.setAttribute('aria-labelledby', 'boardingPassTitle');
    modal.innerHTML = `
      <div class="boardingpass-panel">
        <button type="button" class="boardingpass-close" aria-label="Close">×</button>
        <h3 id="boardingPassTitle">✈️ Your Boarding Pass</h3>
        <div class="boardingpass-name-row">
          <input type="text" id="boardingPassNameInput" maxlength="24" placeholder="Enter your name" aria-label="Your name" />
          <button type="button" id="boardingPassRender">Generate</button>
        </div>
        <canvas id="boardingPassCanvas" width="900" height="360" role="img" aria-label="Preview of your generated boarding pass"></canvas>
        <div class="boardingpass-actions">
          <button type="button" class="boardingpass-download" id="boardingPassDownload">Download PNG</button>
          <button type="button" class="boardingpass-cancel" id="boardingPassCancelBtn">Close</button>
        </div>
      </div>
    `;
    document.body.appendChild(modal);

    const canvas = modal.querySelector('#boardingPassCanvas');
    const ctx = canvas.getContext('2d');
    const nameInput = modal.querySelector('#boardingPassNameInput');

    // Seat, flight number, and gate are all derived from the same
    // name-seeded rand() sequence passed in from drawPass() — same
    // name always produces the same seat/flight/gate/route, every
    // single time "Generate" is clicked, instead of re-rolling.
    function randomSeat(rand) {
      const row = 8 + Math.floor(rand() * 22);
      const letter = 'ABCDEF'[Math.floor(rand() * 6)];
      return row + letter;
    }

    function randomFlightNumber(rand) {
      return 'GC-' + (100 + Math.floor(rand() * 900));
    }
    function randomGate(rand) {
      const letter = 'ABCDEFGH'[Math.floor(rand() * 8)];
      const number = 1 + Math.floor(rand() * 24);
      return number + letter;
    }

    // FROM/TO route — picked from a small pool of destinations, but
    // seeded off the typed name itself, so the same name always maps
    // to the same "random" route instead of reshuffling on every draw.
    const ROUTE_CITIES = [
      'MANILA, PH', 'TOKYO, JP', 'SEOUL, KR', 'PARIS, FR', 'LONDON, UK',
      'DUBAI, UAE', 'SYDNEY, AU', 'NEW YORK, USA', 'SINGAPORE, SG',
      'ROME, IT', 'MADRID, ES', 'BANGKOK, TH', 'TORONTO, CA',
      'AMSTERDAM, NL', 'HONG KONG, HK', 'ZURICH, CH'
    ];
    // djb2 string hash — turns the name into a stable numeric seed.
    function hashString(str) {
      let hash = 5381;
      for (let i = 0; i < str.length; i++) {
        hash = (((hash << 5) + hash) + str.charCodeAt(i)) >>> 0;
      }
      return hash;
    }
    // Mulberry32 — a tiny seeded PRNG, so the same seed always produces
    // the same sequence of "random" numbers.
    function seededRandom(seed) {
      let t = seed;
      return function () {
        t |= 0; t = (t + 0x6D2B79F5) | 0;
        let r = Math.imul(t ^ (t >>> 15), 1 | t);
        r = (r + Math.imul(r ^ (r >>> 7), 61 | r)) ^ r;
        return ((r ^ (r >>> 14)) >>> 0) / 4294967296;
      };
    }
    function pickRoute(rand) {
      const fromIndex = Math.floor(rand() * ROUTE_CITIES.length);
      let toIndex = Math.floor(rand() * ROUTE_CITIES.length);
      if (toIndex === fromIndex) toIndex = (toIndex + 1) % ROUTE_CITIES.length;
      return { from: ROUTE_CITIES[fromIndex], to: ROUTE_CITIES[toIndex] };
    }

    function roundRect(c, x, y, w, h, r) {
      c.beginPath();
      c.moveTo(x + r, y);
      c.arcTo(x + w, y, x + w, y + h, r);
      c.arcTo(x + w, y + h, x, y + h, r);
      c.arcTo(x, y + h, x, y, r);
      c.arcTo(x, y, x + w, y, r);
      c.closePath();
    }

    function drawPass(name) {
      const w = canvas.width, h = canvas.height;
      ctx.clearRect(0, 0, w, h);

      const grad = ctx.createLinearGradient(0, 0, w, h);
      grad.addColorStop(0, '#13293d');
      grad.addColorStop(1, '#0b1c2c');
      ctx.fillStyle = grad;
      roundRect(ctx, 0, 0, w, h, 18);
      ctx.fill();

      // PAL-inspired tri-color stripe across the top
      ctx.fillStyle = '#d21034'; ctx.fillRect(0, 0, w / 3, 8);
      ctx.fillStyle = '#0039a6'; ctx.fillRect(w / 3, 0, w / 3, 8);
      ctx.fillStyle = '#e4c04f'; ctx.fillRect((w / 3) * 2, 0, w / 3, 8);

      ctx.fillStyle = '#e4c04f';
      ctx.font = '700 22px "Space Grotesk", sans-serif';
      ctx.fillText('PORTFOLIO AIRLINES', 36, 48);
      ctx.fillStyle = '#9fb0bd';
      ctx.font = '600 12px "Space Grotesk", sans-serif';
      ctx.fillText('BOARDING PASS', 36, 68);

      const label = (text, x, y) => {
        ctx.fillStyle = '#9fb0bd';
        ctx.font = '600 11px "Space Grotesk", sans-serif';
        ctx.fillText(text, x, y);
      };
      const value = (text, x, y, size) => {
        ctx.fillStyle = '#eae3d3';
        ctx.font = `700 ${size}px "Space Grotesk", sans-serif`;
        ctx.fillText(text, x, y);
      };

      // Nothing else gets drawn — no route, flight, gate, seat, date,
      // stub, or barcode — until an actual name has been typed in.
      // This is the whole point of the change: the rest of the pass
      // only "exists" once there's a passenger to put it on.
      if (!name) {
        ctx.fillStyle = 'rgba(159,176,189,0.7)';
        ctx.font = '600 14px "Space Grotesk", sans-serif';
        ctx.fillText('Enter your name above to generate your boarding pass ✈', 36, 150);
        return;
      }

      // fresh route + flight + gate + seat every time the pass is
      // (re)drawn — route is seeded by name, the rest is plain random
      const rand = seededRandom(hashString(name.toUpperCase()));
      const route = pickRoute(rand);
      const flightNumber = randomFlightNumber(rand);
      const gate = randomGate(rand);
      const seat = randomSeat(rand);

      // perforated stub divider
      const stubX = w * 0.72;
      ctx.strokeStyle = 'rgba(201,162,39,0.5)';
      ctx.setLineDash([6, 6]);
      ctx.beginPath();
      ctx.moveTo(stubX, 20); ctx.lineTo(stubX, h - 20);
      ctx.stroke();
      ctx.setLineDash([]);

      label('PASSENGER', 36, 118);
      value(name.toUpperCase(), 36, 146, 26);

      label('FROM', 36, 190);
      value(route.from, 36, 214, 18);
      label('TO', 300, 190);
      value(route.to, 300, 214, 18);

      label('FLIGHT', 36, 258);
      value(flightNumber, 36, 280, 16);
      label('GATE', 200, 258);
      value(gate, 200, 280, 16);
      label('SEAT', 340, 258);
      value(seat, 340, 280, 16);

      const today = new Date();
      label('DATE', 36, 320);
      value(today.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' }), 36, 342, 14);

      ctx.save();
      ctx.translate(stubX, 0);
      ctx.fillStyle = '#e4c04f';
      ctx.font = '700 16px "Space Grotesk", sans-serif';
      ctx.fillText('✈', 30, 60);
      ctx.font = '700 13px "Space Grotesk", sans-serif';
      ctx.fillStyle = '#eae3d3';
      ctx.fillText('GATE ' + gate, 30, 100);
      ctx.fillText('SEAT ' + seat, 30, 122);
      ctx.restore();

      // decorative barcode
      let bx = 36;
      const by = h - 44;
      while (bx < stubX - 30) {
        const bw = 1 + Math.random() * 3;
        ctx.fillStyle = 'rgba(228,192,79,0.75)';
        ctx.fillRect(bx, by, bw, 28);
        bx += bw + 2 + Math.random() * 3;
      }
    }

    function openModal() {
      lastFocusedEl = document.activeElement;
      modal.classList.add('is-open');
      drawPass(nameInput.value.trim());
      setTimeout(() => nameInput.focus(), 200);
    }
    function closeModal() {
      modal.classList.remove('is-open');
      // Return focus to whatever opened the modal (usually the FAB),
      // so keyboard/screen-reader users aren't left stranded.
      if (lastFocusedEl && typeof lastFocusedEl.focus === 'function') {
        lastFocusedEl.focus();
      }
    }
    let lastFocusedEl = null;

    // Simple focus trap: while the modal is open, Tab/Shift+Tab cycle
    // only through its own focusable elements instead of escaping
    // into the page content behind it.
    function trapFocus(e) {
      if (e.key !== 'Tab' || !modal.classList.contains('is-open')) return;
      const focusable = modal.querySelectorAll(
        'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
      );
      if (!focusable.length) return;
      const first = focusable[0];
      const last = focusable[focusable.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }

    fab.addEventListener('click', openModal);
    modal.querySelector('.boardingpass-close').addEventListener('click', closeModal);
    modal.querySelector('#boardingPassCancelBtn').addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => { if (e.target === modal) closeModal(); });
    modal.querySelector('#boardingPassRender').addEventListener('click', () => drawPass(nameInput.value.trim()));
    nameInput.addEventListener('keydown', (e) => { if (e.key === 'Enter') drawPass(nameInput.value.trim()); });
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && modal.classList.contains('is-open')) closeModal();
      trapFocus(e);
    });

    modal.querySelector('#boardingPassDownload').addEventListener('click', () => {
      const link = document.createElement('a');
      link.download = 'my-boarding-pass.png';
      link.href = canvas.toDataURL('image/png');
      link.click();
    });
  }

});

/* =================================================================
   FX BOARD — FOREIGN EXCHANGE RATE (self-contained, standalone)
   Kept OUTSIDE the big DOMContentLoaded block above, in its own
   try/catch, so it always initializes even if something earlier in
   this file throws. Two independent parts:
     1) A live clock — plain JS Date, updates every second, always
        works with zero network dependency.
     2) The rate rows — tries a live fetch (Frankfurter.app, free,
        no API key) but immediately falls back to the static
        FALLBACK_RATES below on any failure or timeout, so the board
        always shows numbers instead of an empty/error state.
   ================================================================= */
function initFxBoard() {
  try {
    const timeEl = document.getElementById('fxboardTime');
    const dateEl = document.getElementById('fxboardDate');
    const colA = document.getElementById('fxboardColA');
    const colB = document.getElementById('fxboardColB');
    if (!colA || !colB) return;

    /* ---------- 1) Live clock — no network involved at all ---------- */
    function tickClock() {
      if (!timeEl || !dateEl) return;
      const now = new Date();
      timeEl.textContent = now.toLocaleTimeString(undefined, {
        hour: '2-digit', minute: '2-digit', second: '2-digit'
      });
      dateEl.textContent = now.toLocaleDateString(undefined, {
        weekday: 'long', month: 'long', day: 'numeric', year: 'numeric'
      });
    }
    tickClock();
    setInterval(tickClock, 1000);

    /* ---------- 2) Rate rows ---------- */
    // code: null means Frankfurter/ECB doesn't cover it — always
    // shown from the static fallback list below, same as a real
    // money-changer board that simply doesn't trade every currency.
    const CURRENCIES = [
      { iso: 'us', country: 'USA',           currency: 'US Dollar',        code: 'USD' },
      { iso: 'jp', country: 'Japan',         currency: 'Japanese Yen',     code: 'JPY' },
      { iso: 'au', country: 'Australia',     currency: 'Australian Dollar',code: 'AUD' },
      { iso: 'gb', country: 'United Kingdom',currency: 'British Pound',    code: 'GBP' },
      { iso: 'ca', country: 'Canada',        currency: 'Canadian Dollar',  code: 'CAD' },
      { iso: 'cn', country: 'China',         currency: 'Chinese Yuan',     code: 'CNY' },
      { iso: 'eu', country: 'Eurozone',      currency: 'Euro',             code: 'EUR' },
      { iso: 'hk', country: 'Hong Kong',     currency: 'Hong Kong Dollar', code: 'HKD' },
      { iso: 'in', country: 'India',         currency: 'Indian Rupee',     code: 'INR' },
      { iso: 'id', country: 'Indonesia',     currency: 'Indonesian Rupiah',code: 'IDR' },
      { iso: 'kr', country: 'South Korea',   currency: 'Korean Won',       code: 'KRW' },
      { iso: 'th', country: 'Thailand',      currency: 'Thai Baht',        code: 'THB' },
      { iso: 'sg', country: 'Singapore',     currency: 'Singapore Dollar', code: 'SGD' },
      { iso: 'ch', country: 'Switzerland',   currency: 'Swiss Franc',      code: 'CHF' },
      { iso: 'nz', country: 'New Zealand',   currency: 'NZ Dollar',        code: 'NZD' },
      { iso: 'ae', country: 'UAE',           currency: 'UAE Dirham',       code: null, fallbackKey: 'AED' },
      { iso: 'sa', country: 'Saudi Arabia',  currency: 'Saudi Riyal',      code: null, fallbackKey: 'SAR' },
      { iso: 'no', country: 'Norway',        currency: 'Norwegian Krone',  code: 'NOK' },
      { iso: 'mx', country: 'Mexico',        currency: 'Mexican Peso',     code: 'MXN' },
      { iso: 'my', country: 'Malaysia',      currency: 'Malaysian Ringgit',code: 'MYR' },
      { iso: 'se', country: 'Sweden',        currency: 'Swedish Krona',    code: 'SEK' },
      { iso: 'dk', country: 'Denmark',       currency: 'Danish Krone',     code: 'DKK' },
      { iso: 'pl', country: 'Poland',        currency: 'Polish Zloty',     code: 'PLN' },
      { iso: 'cz', country: 'Czechia',       currency: 'Czech Koruna',     code: 'CZK' },
      { iso: 'hu', country: 'Hungary',       currency: 'Hungarian Forint', code: 'HUF' },
      { iso: 'tr', country: 'Turkey',        currency: 'Turkish Lira',     code: 'TRY' },
      { iso: 'za', country: 'South Africa',  currency: 'South African Rand',code: 'ZAR' },
      { iso: 'br', country: 'Brazil',        currency: 'Brazilian Real',   code: 'BRL' },
      { iso: 'il', country: 'Israel',        currency: 'Israeli Shekel',   code: 'ILS' },
      { iso: 'is', country: 'Iceland',       currency: 'Icelandic Krona',  code: 'ISK' }
    ];

    // Static reference numbers (₱ per 1 unit of foreign currency) —
    // approximate, used only as a guaranteed fallback so the board is
    // never empty. Overwritten in place by real numbers if the live
    // fetch below succeeds.
    const FALLBACK_RATES = {
      USD: 58.50, JPY: 0.385, AUD: 37.80, GBP: 74.20, CAD: 42.30,
      CNY: 8.10,  EUR: 62.90, HKD: 7.48,  INR: 0.70,  IDR: 0.0036,
      KRW: 0.0425,THB: 1.65,  SGD: 43.60, CHF: 66.10, NZD: 34.90,
      NOK: 5.45,  AED: 15.93, SAR: 15.60,
      MXN: 3.10,  MYR: 13.20, SEK: 5.60,  DKK: 8.45,  PLN: 14.70,
      CZK: 2.55,  HUF: 0.165, TRY: 1.75,  ZAR: 3.25,  BRL: 10.80,
      ILS: 15.85, ISK: 0.43
    };

    function formatRate(value) {
      const decimals = value < 1 ? 4 : 2;
      return value.toFixed(decimals);
    }

    function renderRows(rates) {
      colA.querySelectorAll('.fxboard-row').forEach((r) => r.remove());
      colB.querySelectorAll('.fxboard-row').forEach((r) => r.remove());

      const half = Math.ceil(CURRENCIES.length / 2);
      CURRENCIES.forEach((c, i) => {
        const target = i < half ? colA : colB;
        const key = c.code || c.fallbackKey;
        const value = (c.code && rates[c.code]) || FALLBACK_RATES[key];

        const row = document.createElement('div');
        row.className = 'fxboard-row';
        row.setAttribute('role', 'row');
        row.innerHTML = `
          <span class="fxboard-country" role="cell"><img class="fxboard-flag" src="https://flagcdn.com/24x18/${c.iso}.png" srcset="https://flagcdn.com/48x36/${c.iso}.png 2x" width="24" height="18" alt="" loading="lazy">${c.country}</span>
          <span class="fxboard-currency" role="cell">${c.currency}</span>
          <span class="fxboard-rate" role="cell">${formatRate(value)}</span>
        `;
        target.appendChild(row);
      });

      // Also refresh the small teaser card on the Home page, if it's
      // present — same data, just a single headline currency (USD).
      const teaserValueEl = document.getElementById('fxTeaserValue');
      if (teaserValueEl) {
        const usdValue = (rates.USD) || FALLBACK_RATES.USD;
        const usdFormatted = formatRate(usdValue);
        teaserValueEl.innerHTML = `<img class="fx-teaser-flag" src="https://flagcdn.com/24x18/us.png" srcset="https://flagcdn.com/48x36/us.png 2x" width="24" height="18" alt=""> 1 USD ≈ ₱${usdFormatted}`;
        // Keep the link's aria-label in sync too, since it duplicates
        // this value as plain text for screen readers.
        const teaserLinkEl = document.getElementById('fxTeaser');
        if (teaserLinkEl) {
          teaserLinkEl.setAttribute('aria-label', `Live exchange rate preview: 1 US Dollar is about ${usdFormatted} pesos. Activate to see the full Currency Guide.`);
        }
      }
    }

    // Paint the static fallback immediately, so the board is populated
    // the instant it loads — a slow or failed fetch never leaves it
    // looking empty or broken.
    renderRows({});

    // Then try to quietly upgrade to live numbers. Frankfurter's
    // rates are "foreign units per 1 PHP", so each is inverted to get
    // "₱ per 1 foreign unit" to match the board's format. Re-run on a
    // timer too — ECB itself only updates once a day, but this keeps
    // the board attempting a fresh pull for as long as the tab stays
    // open, in case the first attempt happened to miss.
    const codes = Array.from(new Set(CURRENCIES.map((c) => c.code).filter(Boolean)));

    function attemptLiveRefresh() {
      const controller = new AbortController();
      const timeout = setTimeout(() => controller.abort(), 4000);

      fetch(`https://api.frankfurter.app/latest?from=PHP&to=${codes.join(',')}`, { signal: controller.signal })
        .then((res) => { if (!res.ok) throw new Error('bad response'); return res.json(); })
        .then((data) => {
          clearTimeout(timeout);
          if (!data || !data.rates) throw new Error('no rates');
          const phpPerUnit = {};
          Object.keys(data.rates).forEach((code) => {
            phpPerUnit[code] = 1 / data.rates[code];
          });
          renderRows(phpPerUnit);
        })
        .catch((err) => {
          clearTimeout(timeout);
          // Fallback/previous numbers stay on screen either way — just
          // log for troubleshooting, don't disturb what's showing.
          console.warn('FX Board: live rates unavailable this attempt.', err);
        });
    }

    attemptLiveRefresh();
    setInterval(attemptLiveRefresh, 5 * 60 * 1000); // retry every 5 minutes while the tab is open

    /* ---------- Teaser link (Home -> Currency Guide) ----------
       The main page switcher only wires clicks on `.navbar a` and
       listens for `popstate` (back/forward), not a generic
       `hashchange` — so a plain <a href="#about-me"> elsewhere on
       the page wouldn't actually switch pages on its own. Pushing
       the hash and then dispatching a synthetic `popstate` re-uses
       that existing listener instead of duplicating its logic.
       After the page switch, scroll straight down to the fxboard
       itself (Currency Guide is at the bottom of that page now)
       instead of leaving the visitor at the top of About Me. */
    const teaserLink = document.getElementById('fxTeaser');
    if (teaserLink) {
      teaserLink.addEventListener('click', (e) => {
        e.preventDefault();
        if (window.location.hash.slice(1) !== 'about-me') {
          history.pushState(null, '', '#about-me');
        }
        window.dispatchEvent(new PopStateEvent('popstate'));

        // Wait a beat for the page-switch animation/layout to settle,
        // then scroll the board itself into view.
        setTimeout(() => {
          const target = document.getElementById('fxboard');
          if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 220);
      });
    }
  } catch (err) {
    console.error('FX Board init failed:', err);
  }
}
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initFxBoard);
} else {
  initFxBoard();
}