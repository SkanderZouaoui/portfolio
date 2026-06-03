export const t = {
  en: {
    nav: {
      available: 'Available for work',
      links: ['Projects', 'Stack', 'About', 'Contact'],
      hire: 'Hire me',
    },
    hero: {
      label: 'Full-Stack Developer — Tunis',
      title: ['CRAFTING', 'DIGITAL', 'EXPERIENCES'],
      sub: 'React · Node.js · Spring Boot · Three.js',
      sub2: 'Based in Tunis — Available worldwide',
      scroll: 'scroll to explore ↓',
      stats: [
        { num: '8+', label: 'Projects' },
        { num: '4', label: 'Internships' },
        { num: 'Eng.', label: 'Software' },
      ],
    },
    projects: {
      tag: 'Selected work',
      title: 'PROJECTS',
      desc: 'A selection of recent builds —',
      desc2: 'from enterprise tools to civic tech.',
      items: [
        {
          id: '01',
          title: 'TNR Automation',
          category: 'QA Tool · Enterprise',
          year: '2024',
          color: '#C8FF00',
          description: 'End-to-end test automation platform for SINORFI synced with Azure DevOps — auto-fetches test plans, executes via Selenium, generates PDF reports. Reduced regression time by 70%.',
          details: {
            overview: 'Built during a 6-month internship at SINORFI, this tool completely replaced a manual regression testing process that previously took days. The system integrates directly with Azure DevOps APIs to pull test plans and cases, orchestrates Selenium WebDriver test execution, and produces structured HTML/PDF reports with pass/fail metrics, screenshots of failures, and trend charts over time.',
            challenges: 'Synchronizing live Azure DevOps test metadata with local execution state without rate-limiting issues. Handling flaky tests with an automatic retry mechanism and confidence scoring.',
            results: ['70% reduction in regression test cycle time', 'Zero manual report writing', 'Integrated into CI/CD pipeline — triggers on every PR merge', '100% test traceability from Azure DevOps story to execution result'],
            role: 'Full-stack developer — sole engineer on the project',
          },
          stack: ['Spring Boot', 'Angular', 'Selenium', 'Azure DevOps', 'PostgreSQL', 'JUnit'],
        },
        {
          id: '02',
          title: 'EduSpace',
          category: 'SaaS · EdTech',
          year: '2023',
          color: '#FF4D4D',
          description: 'Full-stack intranet for INFOplus managing training programs, grades, schedules and absences. Real-time dashboard with role-based access for students, teachers and admins.',
          details: {
            overview: 'A comprehensive educational management platform built for INFOplus during a summer internship. The system handles the full student lifecycle — enrollment, course scheduling, grade entry by instructors, absence tracking with automated alerts, and an admin dashboard with analytics on cohort performance.',
            challenges: 'Designing a clean role-based permission system where students, teachers and admins each see a radically different interface from the same codebase. Real-time absence notifications via WebSocket.',
            results: ['3 user roles with distinct UX flows from a single React codebase', 'Real-time notifications on absences and grade updates', 'Mobile-responsive design adopted by 200+ students'],
            role: 'Full-stack developer (internship)',
          },
          stack: ['React.js', 'Node.js', 'Express.js', 'MongoDB', 'Socket.io', 'JWT'],
        },
        {
          id: '03',
          title: 'AssocNet',
          category: 'Social Platform · MERN',
          year: '2023',
          color: '#8B5CF6',
          description: 'Social network for non-profit associations — event creation, member management, cause-driven feeds and real-time messaging. Full MERN stack with JWT auth and media uploads.',
          details: {
            overview: 'Academic project built in a team of 4. AssocNet is a dedicated social platform for non-profit and student associations to publish causes, recruit volunteers, organize events, and communicate with members. The feed algorithm surfaces content based on user interest tags.',
            challenges: 'Building a scalable media upload pipeline with Cloudinary integration and handling real-time chat at scale with Socket.io rooms per association.',
            results: ['Real-time chat with per-association rooms', 'Event creation with attendance tracking and QR-code check-in', 'Interest-based feed filtering', 'Media uploads with automatic compression'],
            role: 'Frontend lead + backend API (team of 4)',
          },
          stack: ['MongoDB', 'Express.js', 'React.js', 'Node.js', 'Socket.io', 'Cloudinary', 'JWT'],
        },
        {
          id: '04',
          title: 'City in Your Pocket',
          category: 'Civic Tech · Web App',
          year: '2021',
          color: '#C8FF00',
          description: 'Local web platform designed to help residents and newcomers discover the best places, services, and activities available in a city.',
          details: {
            overview: 'A civic web application that centralizes essential city information in one accessible platform. The app helps users explore restaurants, leisure activities, daily services such as plumbers and carpenters, as well as entertainment and sports facilities like football fields, tennis courts, and other local venues.',
            challenges: 'Building a user-friendly platform that organizes different types of city services and places in a clear and accessible way. The main challenge was designing an intuitive experience for newcomers who need quick access to reliable local information.',
            results: [
              'Centralized access to restaurants, leisure activities, and local services',
              'Easy discovery of daily services such as plumbers, carpenters, and other professionals',
              'Listing of entertainment and sports facilities including football fields and tennis courts',
              'Responsive interface accessible on desktop and mobile devices'
            ],
            role: 'Full-stack developer',
          },
          stack: ['Symfony', 'PHP', 'MySQL', 'REST API', 'Bootstrap'],
        },

        {
          id: '05',
          title: 'DevFolio',
          category: 'Portfolio · Three.js',
          year: '2026',
          color: '#FF4D4D',
          description: 'This very portfolio — built with React, Three.js (DNA helix + noise blob + particle field), GSAP scroll animations, smooth scroll via Lenis, dark/light theme and full FR/EN i18n.',
          details: {
            overview: 'A production-grade developer portfolio built as a showcase of frontend engineering skills. Features a custom Three.js scene with 4 simultaneous animated objects (DNA double helix with crossbars, noise-distorted GLSL sphere, 1400-particle field, floating torus rings), GSAP ScrollTrigger reveal animations, a magnetic cursor with 4 interaction states, and an EmailJS contact form with mobile mailto fallback.',
            challenges: 'Orchestrating 4 independent Three.js objects running at 60fps without frame drops. Implementing smooth Lenis scroll alongside GSAP ScrollTrigger without conflicts. Supporting dark/light theme transitions without flickering the Three.js canvas.',
            results: ['60fps Three.js scene with 4 animated objects', 'Full i18n (EN/FR) with localStorage persistence', 'Dark/light theme with CSS variable system', 'EmailJS contact form + mobile mailto fallback', 'Lighthouse score 95+'],
            role: 'Sole developer — design & engineering',
          },
          stack: ['React', 'Three.js', 'GSAP', 'Lenis', 'EmailJS', 'Vite', 'CSS Modules'],
        },
        {
          id: '06',
          title: 'ITECH E-Commerce',
          category: 'Multiplatform · E-Commerce',
          year: '2022',
          color: '#8B5CF6',
          description: 'Cross-platform e-commerce app for ITECH products — single shared database powering a Symfony web store, JavaFX desktop client and CodenameOne mobile app simultaneously.',
          details: {
            overview: 'Academic project demonstrating multiplatform development skills. A single REST API backend powers three distinct frontends: a Symfony-based responsive web store, a JavaFX rich desktop application for store management, and a CodenameOne mobile app for customers. All three share the same MySQL database with real-time inventory sync.',
            challenges: 'Designing a REST API abstract enough to serve 3 radically different client types. Keeping JavaFX and web UIs in sync on inventory changes without polling overhead.',
            results: ['Single REST API serving 3 platforms simultaneously', 'Real-time inventory sync across web, desktop, mobile', 'Admin panel in JavaFX with product/order management', 'Mobile checkout flow with order history'],
            role: 'Full-stack developer (academic team project)',
          },
          stack: ['Symfony', 'JavaFX', 'CodenameOne', 'Java', 'MySQL', 'REST API'],
        },
        {
          id: '07',
          title: 'TaskFlow API',
          category: 'Backend · REST API',
          year: '2024',
          color: '#C8FF00',
          description: 'Production-grade task management REST API with Spring Boot — JWT auth, role-based access, real-time notifications via WebSocket, Swagger docs, containerised with Docker.',
          details: {
            overview: 'A personal project built to deepen Spring Boot expertise and demonstrate backend engineering best practices. TaskFlow is a full-featured project management API supporting workspaces, projects, tasks with priority/due dates, team members with role permissions, and real-time update broadcasts via WebSocket.',
            challenges: 'Implementing a clean hierarchical permission model (workspace owner > project manager > contributor > viewer) that scales without N+1 query problems. Designing WebSocket push that works behind a load balancer.',
            results: ['JWT auth + refresh token rotation', 'Role-based permission system with 4 levels', 'Real-time task updates via WebSocket', 'Full Swagger/OpenAPI 3 documentation', 'Dockerised — runs with docker-compose up'],
            role: 'Sole developer — personal project',
          },
          stack: ['Spring Boot', 'Java', 'PostgreSQL', 'WebSocket', 'JWT', 'Docker', 'Swagger'],
        },
        {
          id: '08',
          title: 'UI Component Kit',
          category: 'Frontend · Design System',
          year: '2024',
          color: '#FF4D4D',
          description: 'Reusable React component library — 30+ components with dark/light variants, Storybook docs, fully typed with TypeScript, tested with Jest + React Testing Library.',
          details: {
            overview: 'A side project to build and document a personal React component library from scratch, following atomic design principles. Includes primitive components (Button, Input, Badge, Avatar), compound components (Modal, Dropdown, Toast), and layout components (Grid, Stack, Divider). All with dark/light theme support via CSS variables.',
            challenges: 'Designing a theming system flexible enough for both dark and light mode without runtime JS. Writing comprehensive unit tests for interactive components like modals and dropdowns.',
            results: ['30+ components following Atomic Design', 'Storybook documentation with live examples', 'Full TypeScript types and prop validation', 'Jest + RTL test suite with 85% coverage', 'Published to npm'],
            role: 'Sole developer — personal open-source project',
          },
          stack: ['React', 'TypeScript', 'Storybook', 'Jest', 'React Testing Library', 'CSS Modules', 'npm'],
        },
      ],
    },
    stack: {
      tag: 'Expertise',
      title: 'STACK',
      also: 'Also working with',
      categories: ['All', 'Frontend', 'Backend', 'QA'],
      skills: [
        { name: 'React.js / Next.js', level: 90, cat: 'Frontend' },
        { name: 'Angular', level: 82, cat: 'Frontend' },
        { name: 'Three.js / WebGL', level: 72, cat: 'Frontend' },
        { name: 'Node.js / Express.js', level: 88, cat: 'Backend' },
        { name: 'Spring Boot', level: 85, cat: 'Backend' },
        { name: 'Symfony / PHP', level: 78, cat: 'Backend' },
        { name: 'MongoDB / MySQL', level: 84, cat: 'Backend' },
        { name: 'Selenium / Test Automation', level: 88, cat: 'QA' },
        { name: 'Azure DevOps', level: 80, cat: 'QA' },
      ],
      tools: ['Figma', 'Git / GitHub', 'Docker', 'Postman', 'Jira', 'Azure DevOps', 'REST APIs', 'JWT Auth', 'MERN Stack'],
    },
    experience: {
      tag: 'Journey',
      title: 'EXPERIENCE',
      items: [
        {
          year: '2021 (1 mo.)',
          title: 'Web Developer Intern',
          company: 'Bizerte Smart City',
          desc: 'Developed City in Your Pocket, a local web application helping residents and newcomers easily discover restaurants, leisure activities, daily services, and entertainment spots in their city.'
        },
        {
          year: '2023 (3 mos.)',
          title: 'Full-Stack Developer Intern',
          company: 'VERMEG',
          desc: 'Contributed to the full-stack development of a web project during an internship, working within a team of 4 people. Built user interfaces, developed backend APIs, integrated Cloudinary for media management, and implemented real-time chat with Socket.io.'
        },
        {
          year: '2022 (4 mos.)',
          title: 'Full-Stack Developer Intern',
          company: 'INFOplus',
          desc: 'Developed the EduSpace SaaS intranet portal, a complete system for managing grades, schedules, and real-time absences with student and admin role-based access using React, Node.js, and MongoDB.'
        },
        {
          year: '2024 (6 mos.)',
          title: 'QA Automation Engineer Intern',
          company: 'SINORFI',
          desc: 'Designed and developed the TNR Automation platform. Integrated Azure DevOps synchronization, Selenium test orchestration, automatic PDF report generation, and reduced regression testing time by 70%.'
        },
        {
          year: 'January 2025',
          title: 'Software Engineering Degree',
          company: 'ESPRIT',
          desc: 'Completed a 5-year engineering curriculum focused on distributed application development, enterprise architectures, and advanced testing methodologies.'
        },
        {
          year: '2025 — Present',
          title: 'Software Engineer',
          company: 'SINORFI',
          desc: 'Started working at SINORFI as a Software Engineer, contributing to the development of internal tools, automation solutions, and web applications focused on improving technical workflows and delivery quality.'
        }
      ]
    },
    about: {
      tag: 'About',
      bio: [
        'Software engineer, I build fast, scalable web applications and automation systems that solve real problems.',
        'My work spans full-stack development, QA automation, and data-driven interfaces. I\'ve shipped projects across civic tech, edtech, and enterprise tooling.',
        'Currently open to freelance missions and remote contracts. I bring engineering rigor, strong communication, and a bias for shipping.',
      ],
      highlight: 'full-stack development',
      facts: [
        { label: 'Location', value: 'Tunis, Tunisia' },
        { label: 'Availability', value: 'Open to missions' },
        { label: 'Stack', value: 'React · Node.js · Spring Boot' },
        { label: 'Languages', value: 'French · English · Arabic' },
        { label: 'Education', value: 'Software Engineer' },
      ],
      social: [
        { label: 'LinkedIn', href: 'https://linkedin.com/in/skander-zouaouii' },
        { label: 'GitHub', href: 'https://github.com/SkanderZouaoui' },
        { label: 'Email', href: 'mailto:zouaoui.mohamedskander@gmail.com' },
      ],
    },
    contact: {
      tag: "Let's work together",
      title: ['GOT A', 'PROJECT?'],
      sub: "I'm open to freelance missions, long-term contracts, and technical consulting. Let's build something great.",
      cta: 'zouaoui.mohamedskander@gmail.com',
      cv: 'Download CV ↓',
      built: 'Built with React + Three.js',
      form: {
        name: 'Your name',
        email: 'Your email',
        subject: 'Subject',
        message: 'Tell me about your project...',
        send: 'Send message',
        sending: 'Sending...',
        successTitle: 'Message sent!',
        successMsg: "I'll get back to you within 24h.",
        errorMsg: 'Something went wrong. Try emailing me directly.',
        another: 'Send another',
        orEmail: 'or email directly',
        subjectOptions: ['Freelance mission', 'Technical consulting', 'Long-term contract', 'Other'],
      },
    },
  },

  fr: {
    nav: {
      available: 'Disponible pour missions',
      links: ['Projets', 'Stack', 'À propos', 'Contact'],
      hire: 'Me contacter',
    },
    hero: {
      label: 'Développeur Full-Stack — Tunis',
      title: ['CRÉER DES', 'EXPÉRIENCES', 'DIGITALES'],
      sub: 'React · Node.js · Spring Boot · Three.js',
      sub2: 'Basé à Tunis — Disponible en remote',
      scroll: 'défiler pour explorer ↓',
      stats: [
        { num: '8+', label: 'Projets' },
        { num: '4', label: 'Stages' },
        { num: 'Ing.', label: 'Informatique' },
      ],
    },
    projects: {
      tag: 'Travaux sélectionnés',
      title: 'PROJETS',
      desc: 'Une sélection de réalisations récentes —',
      desc2: 'des outils enterprise à la civic tech.',
      items: [
        {
          id: "01",
          title: "Automatisation TNR",
          category: "Outil QA · Entreprise",
          year: "2024",
          color: "#C8FF00",
          description:
            "Solution d’automatisation des tests de non-régression développée pour SINORFI et connectée à Azure DevOps. Elle récupère automatiquement les plans de test, exécute les scénarios avec Selenium et génère des rapports PDF, avec une réduction du temps de test de 70%.",
          details: {
            overview:
              "Développé pendant un stage de 6 mois chez SINORFI, cet outil a permis de remplacer un processus manuel de tests de régression qui nécessitait plusieurs jours. La plateforme s’intègre aux API Azure DevOps pour récupérer les plans et cas de test, pilote l’exécution via Selenium WebDriver et génère des rapports HTML/PDF détaillés incluant les métriques de réussite, les échecs, les captures d’écran et les tendances.",
            challenges:
              "Assurer la synchronisation en temps réel des données Azure DevOps tout en évitant les limites d’appel API. Il fallait aussi gérer les tests instables grâce à un système de relance automatique et un score de fiabilité.",
            results: [
              "Réduction de 70% du cycle de tests",
              "Suppression de la rédaction manuelle des rapports",
              "Intégration au pipeline CI/CD avec déclenchement à chaque merge request",
              "Traçabilité complète entre Azure DevOps et les résultats d’exécution"
            ],
            role: "Développeur full-stack — seul ingénieur sur le projet"
          },
          stack: [
            "Spring Boot",
            "Angular",
            "Selenium",
            "Azure DevOps",
            "PostgreSQL",
            "JUnit"
          ]
        },

        {
          id: "02",
          title: "Espace Éducatif",
          category: "SaaS · Technologie éducative",
          year: "2023",
          color: "#FF4D4D",
          description:
            "Plateforme intranet full-stack conçue pour INFOplus, permettant de gérer les formations, les notes, les emplois du temps et les absences, avec un tableau de bord en temps réel adapté à chaque type d’utilisateur.",
          details: {
            overview:
              "Plateforme complète de gestion éducative développée pour INFOplus durant un stage. Elle couvre tout le parcours étudiant, de l’inscription à la planification des cours, en passant par la saisie des notes, le suivi des absences avec alertes automatiques et un tableau de bord administratif avec des indicateurs de performance.",
            challenges:
              "Mettre en place un système de permissions clair permettant aux étudiants, enseignants et administrateurs d’accéder à des interfaces différentes depuis une seule base de code. Le projet intègre aussi des notifications en temps réel grâce à WebSocket.",
            results: [
              "Trois rôles utilisateurs avec des expériences distinctes depuis une seule application React",
              "Notifications instantanées pour les absences et les notes",
              "Interface responsive utilisée par plus de 200 étudiants"
            ],
            role: "Développeur full-stack — stage"
          },
          stack: [
            "React.js",
            "Node.js",
            "Express.js",
            "MongoDB",
            "Socket.io",
            "JWT"
          ]
        },

        {
          id: "03",
          title: "Réseau Associatif",
          category: "Plateforme sociale · MERN",
          year: "2023",
          color: "#8B5CF6",
          description:
            "Plateforme sociale dédiée aux associations, permettant de publier des actualités, organiser des événements, gérer les membres et communiquer en temps réel grâce à une messagerie intégrée.",
          details: {
            overview:
              "Projet académique réalisé en équipe de 4 personnes. Cette plateforme permet aux associations de partager leurs causes, recruter des bénévoles, organiser des événements et échanger avec leurs membres. Le fil d’actualité met en avant le contenu selon les centres d’intérêt des utilisateurs.",
            challenges:
              "Créer un système d’upload média évolutif avec Cloudinary et gérer une messagerie temps réel avec des salons Socket.io propres à chaque association.",
            results: [
              "Messagerie instantanée avec salons dédiés par association",
              "Création d’événements avec suivi des présences et check-in par QR code",
              "Fil d’actualité filtré selon les centres d’intérêt",
              "Upload média avec compression automatique"
            ],
            role: "Lead frontend et contribution API backend — équipe de 4"
          },
          stack: [
            "MongoDB",
            "Express.js",
            "React.js",
            "Node.js",
            "Socket.io",
            "Cloudinary",
            "JWT"
          ]
        },

        {
          id: "04",
          title: "Ma Ville en Poche",
          category: "Technologie citoyenne · Application web",
          year: "2021",
          color: "#C8FF00",
          description:
            "Application web locale pensée pour aider les habitants et les nouveaux arrivants à découvrir facilement les lieux, services, activités et infrastructures disponibles dans leur ville.",
          details: {
            overview:
              "Application citoyenne centralisant les informations utiles d’une ville dans une interface simple et accessible. Elle permet de trouver des restaurants, des loisirs, des services du quotidien comme les plombiers ou menuisiers, ainsi que des espaces sportifs et de divertissement tels que les terrains de football et les courts de tennis.",
            challenges:
              "Concevoir une plateforme intuitive capable de regrouper plusieurs catégories de lieux et de services. L’objectif principal était d’offrir aux nouveaux arrivants un accès rapide à des informations locales fiables.",
            results: [
              "Accès centralisé aux restaurants, loisirs et services locaux",
              "Découverte simplifiée des professionnels du quotidien",
              "Mise en avant des espaces de divertissement et des infrastructures sportives",
              "Interface responsive adaptée aux ordinateurs, tablettes et mobiles"
            ],
            role: "Développeur full-stack"
          },
          stack: [
            "Symfony",
            "PHP",
            "MySQL",
            "REST API",
            "Bootstrap"
          ]
        },

        {
          id: "05",
          title: "Portfolio Développeur",
          category: "Portfolio · Three.js",
          year: "2026",
          color: "#FF4D4D",
          description:
            "Portfolio interactif développé avec React et Three.js, intégrant des animations 3D avancées, GSAP ScrollTrigger, Lenis pour le scroll fluide, un thème clair/sombre et une prise en charge complète du français et de l’anglais.",
          details: {
            overview:
              "Portfolio professionnel conçu comme une vitrine technique frontend. Il intègre une scène Three.js personnalisée composée de plusieurs éléments animés, dont une double hélice ADN, une sphère GLSL, un champ de particules et des anneaux flottants. Le projet comprend aussi des animations GSAP, un curseur magnétique interactif et un formulaire de contact EmailJS avec fallback mobile.",
            challenges:
              "Maintenir une scène Three.js fluide à 60fps tout en animant plusieurs objets indépendants. Il fallait aussi synchroniser Lenis avec GSAP ScrollTrigger et gérer les transitions de thème clair/sombre sans clignotement du canvas.",
            results: [
              "Scène Three.js fluide avec plusieurs objets animés",
              "Internationalisation complète français/anglais avec sauvegarde locale",
              "Thème clair/sombre basé sur des variables CSS",
              "Formulaire EmailJS avec fallback mailto sur mobile",
              "Score Lighthouse supérieur à 95"
            ],
            role: "Développeur seul — design et développement"
          },
          stack: [
            "React",
            "Three.js",
            "GSAP",
            "Lenis",
            "EmailJS",
            "Vite",
            "CSS Modules"
          ]
        },

        {
          id: "06",
          title: "Boutique en Ligne ITECH",
          category: "Multiplateforme · E-commerce",
          year: "2022",
          color: "#8B5CF6",
          description:
            "Solution e-commerce multiplateforme pour les produits ITECH, reposant sur une base de données partagée entre un site web Symfony, une application desktop JavaFX et une application mobile CodenameOne.",
          details: {
            overview:
              "Projet académique démontrant la conception d’une architecture multiplateforme. Une seule API REST alimente trois interfaces différentes : un site web Symfony responsive, une application desktop JavaFX pour la gestion du magasin et une application mobile CodenameOne destinée aux clients. Les trois plateformes partagent une base MySQL commune avec synchronisation de l’inventaire.",
            challenges:
              "Concevoir une API REST suffisamment flexible pour répondre aux besoins de trois clients très différents. Le projet nécessitait aussi une synchronisation fiable des interfaces web et desktop lors des changements d’inventaire.",
            results: [
              "API REST unique utilisée par trois plateformes",
              "Synchronisation de l’inventaire en temps réel",
              "Interface admin JavaFX pour la gestion des produits et commandes",
              "Parcours de commande mobile avec historique"
            ],
            role: "Développeur full-stack — projet académique en équipe"
          },
          stack: [
            "Symfony",
            "JavaFX",
            "CodenameOne",
            "Java",
            "MySQL",
            "REST API"
          ]
        },

        {
          id: "07",
          title: "API Flux de Tâches",
          category: "Backend · API REST",
          year: "2024",
          color: "#C8FF00",
          description:
            "API REST robuste dédiée à la gestion de tâches et de projets, développée avec Spring Boot. Elle intègre l’authentification JWT, la gestion des rôles, les notifications WebSocket, la documentation Swagger et la containerisation Docker.",
          details: {
            overview:
              "Projet personnel créé pour approfondir Spring Boot et appliquer les bonnes pratiques backend. L’API permet de gérer des espaces de travail, des projets, des tâches avec priorités et échéances, ainsi que des membres d’équipe avec différents niveaux de permissions. Les mises à jour sont diffusées en temps réel via WebSocket.",
            challenges:
              "Mettre en place un modèle de permissions hiérarchique efficace, allant du propriétaire au lecteur, sans générer de problèmes de performance. Le projet demandait aussi une architecture WebSocket compatible avec un environnement derrière load balancer.",
            results: [
              "Authentification JWT avec rotation des refresh tokens",
              "Système de permissions basé sur quatre niveaux de rôles",
              "Mises à jour de tâches en temps réel via WebSocket",
              "Documentation complète avec Swagger/OpenAPI 3",
              "Projet dockerisé et exécutable avec docker-compose"
            ],
            role: "Développeur seul — projet personnel"
          },
          stack: [
            "Spring Boot",
            "Java",
            "PostgreSQL",
            "WebSocket",
            "JWT",
            "Docker",
            "Swagger"
          ]
        },

        {
          id: "08",
          title: "Kit de Composants d’Interface",
          category: "Frontend · Système de design",
          year: "2024",
          color: "#FF4D4D",
          description:
            "Bibliothèque de composants React réutilisables comprenant plus de 30 composants, avec variantes clair/sombre, documentation Storybook, typage TypeScript complet et tests automatisés avec Jest et React Testing Library.",
          details: {
            overview:
              "Projet personnel visant à concevoir et documenter une bibliothèque de composants React depuis zéro, en suivant les principes du design atomique. Elle regroupe des composants de base comme Button, Input, Badge et Avatar, des composants composés comme Modal, Dropdown et Toast, ainsi que des éléments de layout comme Grid, Stack et Divider.",
            challenges:
              "Créer un système de thème flexible compatible avec les modes clair et sombre sans dépendre d’un runtime JavaScript. Il fallait aussi écrire des tests unitaires solides pour les composants interactifs comme les modales et menus déroulants.",
            results: [
              "Plus de 30 composants construits selon l’Atomic Design",
              "Documentation Storybook avec exemples interactifs",
              "Typage TypeScript complet et validation des props",
              "Suite de tests Jest et React Testing Library avec 85% de couverture",
              "Publication du package sur npm"
            ],
            role: "Développeur seul — projet open-source personnel"
          },
          stack: [
            "React",
            "TypeScript",
            "Storybook",
            "Jest",
            "React Testing Library",
            "CSS Modules",
            "npm"
          ]
        }
      ],
    },
    stack: {
      tag: 'Expertise',
      title: 'STACK',
      also: 'Également maîtrisé',
      categories: ['Tout', 'Frontend', 'Backend', 'QA'],
      skills: [
        { name: 'React.js / Next.js', level: 90, cat: 'Frontend' },
        { name: 'Angular', level: 82, cat: 'Frontend' },
        { name: 'Three.js / WebGL', level: 72, cat: 'Frontend' },
        { name: 'Node.js / Express.js', level: 88, cat: 'Backend' },
        { name: 'Spring Boot', level: 85, cat: 'Backend' },
        { name: 'Symfony / PHP', level: 78, cat: 'Backend' },
        { name: 'MongoDB / MySQL', level: 84, cat: 'Backend' },
        { name: 'Selenium / Automatisation', level: 88, cat: 'QA' },
        { name: 'Azure DevOps', level: 80, cat: 'QA' },
      ],
      tools: ['Figma', 'Git / GitHub', 'Docker', 'Postman', 'Jira', 'Azure DevOps', 'REST APIs', 'JWT Auth', 'Stack MERN'],
    },
    experience: {
      tag: 'Parcours',
      title: 'EXPÉRIENCE',
      items: [
        {
          year: '2021 (1 mois)',
          title: 'Stage Développeur Web',
          company: 'Bizerte Smart City',
          desc: 'Développement de Ma Ville en Poche, une application web locale permettant aux habitants et aux nouveaux arrivants de découvrir facilement les restaurants, activités de loisirs, services du quotidien et lieux de divertissement de leur ville.'
        },
        {
          year: '2023 ( 3 mois)',
          title: 'Stage Développeur Full-Stack',
          company: 'VERMEG',
          desc: 'Contribué au développement full-stack d’un projet web réalisé en équipe de 4 personnes dans le cadre d’un stage. Réalisation d’interfaces utilisateur, développement d’API backend, intégration de Cloudinary et mise en place d’un chat temps réel avec Socket.io.'
        },
        {
          year: '2022 (4 mois)',
          title: 'Stage Développeur Full-Stack',
          company: 'INFOplus',
          desc: 'Développé le portail intranet SaaS EduSpace. Système complet de gestion de notes, plannings et absences temps réel par rôle étudiant/admin avec React, Node.js, et MongoDB.'
        },
        {
          year: '2024 (6 mois)',
          title: 'Stage Ingénieur Automatisation QA',
          company: 'SINORFI',
          desc: 'Conçu et réalisé la plateforme de TNR Automation. Synchronisation Azure DevOps, orchestration de tests Selenium, génération de rapports PDF auto, réduction du temps de test de 70%.'
        },
        {
          year: 'Janvier 2025',
          title: 'Diplôme d\'Ingénieur Informatique',
          company: 'ESPRIT',
          desc: 'Validé un cursus complet de 5 ans spécialisé dans le développement d\'applications distribuées, architectures d\'entreprise et méthodologies de test avancées.'
        },
        {
          year: 'Depuis 2025',
          title: 'Ingénieur Informatique',
          company: 'SINORFI',
          desc: 'Début de mon parcours professionnel chez SINORFI en tant qu’ingénieur informatique, avec des missions autour du développement d’outils internes, de solutions d’automatisation et d’applications web visant à améliorer les processus techniques et la qualité des livrables.'
        }
      ]
    },
    about: {
      tag: 'À propos',
      bio: [
        "Ingénieur en informatique, je développe des applications web modernes, performantes et pensées pour répondre à des besoins concrets.",
        "J’ai une expérience en développement full-stack, en automatisation des tests et en création d’interfaces orientées données. Mes projets couvrent l’éducation, la civic tech et les outils d’entreprise.",
        "Aujourd’hui, je suis ouvert aux missions freelance et aux opportunités à distance. J’aime travailler avec sérieux, communiquer clairement et livrer des solutions propres et fiables."
      ],
      highlight: 'développement full-stack',
      facts: [
        { label: 'Localisation', value: 'Tunis, Tunisie' },
        { label: 'Disponibilité', value: 'Ouvert aux missions' },
        { label: 'Stack', value: 'React · Node.js · Spring Boot' },
        { label: 'Langues', value: 'Français · Anglais · Arabe' },
        { label: 'Formation', value: 'Ingénieur en informatique' },
      ],
      social: [
        { label: 'LinkedIn', href: 'https://linkedin.com/in/skander-zouaoui' },
        { label: 'GitHub', href: 'https://github.com/SkanderZouaoui' },
        { label: 'Email', href: 'mailto:zouaoui.mohamedskander@gmail.com' },
      ],
    },
    contact: {
      tag: 'Travaillons ensemble',
      title: ['UN PROJET', 'EN TÊTE ?'],
      sub: 'Je suis ouvert aux missions freelance, contrats long terme et consulting technique. Construisons quelque chose de grand.',
      cta: 'zouaoui.mohamedskander@gmail.com',
      cv: 'Télécharger CV ↓',
      built: 'Construit avec React + Three.js',
      form: {
        name: 'Votre nom',
        email: 'Votre email',
        subject: 'Sujet',
        message: 'Parlez-moi de votre projet...',
        send: 'Envoyer le message',
        sending: 'Envoi en cours...',
        successTitle: 'Message envoyé !',
        successMsg: 'Je vous réponds sous 24h.',
        errorMsg: 'Une erreur est survenue. Écrivez-moi directement.',
        another: 'Envoyer un autre',
        orEmail: 'ou écrire directement',
        subjectOptions: ['Mission freelance', 'Consulting technique', 'Contrat long terme', 'Autre'],
      },
    },
  },
}
