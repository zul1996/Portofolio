import { PortfolioData } from '../types';

/**
 * PORTFOLIO CONFIGURATION DATA — VERIFIED RESUME (MUHAMMAD ZULKARNAEN INDRANTO)
 */
export const portfolioData: PortfolioData = {
  personal: {
    name: "Muhammad Zulkarnaen Indranto",
    eyebrow: "IT PROFESSIONAL / BACKEND & INFRASTRUCTURE",
    title: "Backend Developer & IT Infrastructure Specialist",
    headline: "Building resilient enterprise backends. Powering national-scale distributed systems.",
    subheadline: "Over 4 years of proven engineering experience delivering core financing platforms, national state-owned enterprise (BUMN) architectures, and mission-critical cloud infrastructure.",
    status: {
      available: true,
      label: "Open for High-Impact Backend & Systems Engineering",
      subtext: "Q4 2026 / Remote & On-Premises Architecture"
    },
    location: "Sidoarjo, Jawa Timur, Indonesia",
    timezone: "UTC+07:00 (WIB)",
    email: "zul.indranto@gmail.com"
  },

  social: {
    github: "https://github.com/zul1996",
    linkedin: "https://www.linkedin.com/in/muhammad-zulkarnaen-indranto/",
    telegram: "https://t.me/zul1996"
  },

  projects: [
    {
      id: "jamkrindo-core",
      title: "Jamkrindo Enterprise System (PT Jaminan Kredit Indonesia)",
      category: "BUMN Core Architecture",
      summary: "National-scale core credit guarantee and cross-departmental operations system built from scratch for a major Indonesian state-owned enterprise (BUMN).",
      problem: "Enterprise credit operational management required seamless nationwide inter-departmental collaboration, real-time credit tracking, and zero downtime.",
      solution: "Engineered robust microservices from scratch using Kotlin and Spring Boot 3, orchestrated with Docker and Kubernetes, backed by Kafka event queues and Redis caches.",
      role: "Core Backend Developer",
      stack: ["Kotlin", "Spring Boot 3", "Kafka", "Redis", "Docker", "Kubernetes", "PostgreSQL"],
      metrics: "Nationwide multi-branch BUMN deployment with zero critical downtime",
      demoUrl: "https://github.com/zul1996",
      githubUrl: "https://github.com/zul1996",
      featured: true
    },
    {
      id: "nexus-fincore",
      title: "Nexus Platform (Fortress Data Services)",
      category: "Core Financing & Banking",
      summary: "High-throughput core financing and credit operational backend platform handling high-volume transactional workflows and asynchronous event messaging.",
      problem: "Credit financing workflows demand fault-tolerant transactional integrity, structured auditing, and sub-second asynchronous event delivery.",
      solution: "Implemented high-performance REST APIs and asynchronous message streams with Kafka, Redis, and PostgreSQL, deployed in enterprise Kubernetes clusters.",
      role: "Backend Systems Developer",
      stack: ["Kotlin", "Spring Boot 3", "PostgreSQL", "Kafka", "Redis", "GitLab CI/CD"],
      metrics: "Sub-second asynchronous credit stream processing with structured logging",
      githubUrl: "https://github.com/zul1996",
      featured: true
    },
    {
      id: "atharis-framework",
      title: "Atharis Modular Business Core",
      category: "Framework Architecture",
      summary: "Modular enterprise core framework with zero-property decorator metadata inference, tamper-resistant monotonic licensing, and pluggable event sinks.",
      problem: "Traditional enterprise boilerplate requires redundant decorators and rigid scaffolds that slow down domain feature velocity.",
      solution: "Architected metadata reflection with TypeORM & PostgreSQL, integrated monotonic watermark validation, and designed pluggable audit sinks.",
      role: "Framework Architect & Developer",
      stack: ["TypeScript", "Node.js", "TypeORM", "PostgreSQL", "Docker", "Linux"],
      metrics: "Sub-5ms query hydration, 60% less boilerplate code",
      githubUrl: "https://github.com/zul1996",
      featured: true
    }
  ],

  about: {
    lead: "Designing scalable, dependable digital backends with Kotlin, Spring Boot, and resilient event-driven architectures.",
    paragraphs: [
      "I am an IT professional with over 4 years of experience specializing in backend engineering and IT infrastructure. I have successfully built and deployed national-scale enterprise systems using Spring Boot for state-owned enterprises (BUMN), running across nationwide branch networks.",
      "My technical background spans core financing systems, Temenos Transact core banking modules, asynchronous processing with Kafka and Redis, and enterprise container orchestration with Docker and Kubernetes."
    ],
    principles: [
      {
        title: "Clean Architecture & Structured Reliability",
        description: "Applying structured logging, clean code principles, and defensive error handling to maximize system uptime and maintainability."
      },
      {
        title: "Resilient Asynchronous Pipelines",
        description: "Decoupling critical domain transactions through Kafka event streams and Redis caching to ensure predictable high throughput."
      },
      {
        title: "Enterprise DevOps & Infrastructure",
        description: "Containerized deployment with Docker, Kubernetes (RKE), and automated GitLab CI/CD pipelines ensuring reproducible releases."
      }
    ],
    experience: [
      {
        period: "Jul 2024 — Present",
        role: "Backend Developer",
        company: "PT Dwidasa Samasara Indonesia",
        location: "Surabaya, ID",
        description: "Engineered core financing backend (Nexus Platform) and developed the Jamkrindo BUMN core system from scratch using Kotlin, Spring Boot 3, Kafka, Redis, and Kubernetes.",
        technologies: ["Kotlin", "Spring Boot 3", "Kafka", "Redis", "PostgreSQL", "Docker", "Kubernetes", "GitLab"]
      },
      {
        period: "Apr 2024 — Jul 2024",
        role: "Core Banking Systems Training (Temenos Transact)",
        company: "PT Fortress Data Services",
        location: "Jakarta Pusat, ID",
        description: "Specialized in Temenos Transact core banking modules (Customer Management, Accounts, Teller, Loan Management, General Ledger, T24/jBASE, and FinCloud platform).",
        technologies: ["Temenos T24", "jBASE", "FinCloud", "Banking Architecture"]
      },
      {
        period: "Jul 2023 — Apr 2024",
        role: "IT Support & Infrastructure",
        company: "PT. Buana Megah Paper Mills",
        location: "Pasuruan, ID",
        description: "Maintained mission-critical server hardware, enterprise LAN network infrastructure, CCTV systems, and minimized operational downtime.",
        technologies: ["Servers", "LAN Infrastructure", "Hardware Maintenance", "Troubleshooting"]
      },
      {
        period: "Mar 2021 — Aug 2022",
        role: "IT Support & Systems",
        company: "PT. Best Profit Futures",
        location: "Surabaya, ID",
        description: "Delivered continuous network and systems support, software troubleshooting across departments, and web optimization.",
        technologies: ["Network Routing", "Systems Maintenance", "Web Optimization"]
      }
    ]
  },

  skills: [
    {
      id: "backend",
      name: "Backend Frameworks & Languages",
      items: [
        { name: "Kotlin & Spring Boot 3", description: "Core financing, BUMN enterprise applications, and REST APIs", tags: ["Kotlin", "Spring Boot"] },
        { name: "Java & C#", description: "Object-oriented architectures and enterprise server services", tags: ["Java", "C#"] },
        { name: "NodeJS, NestJS & Express", description: "High-concurrency asynchronous microservices and API gateways", tags: ["Node.js", "NestJS"] },
        { name: "PHP & Laravel", description: "Rapid domain modeling, MVC services, and web applications", tags: ["PHP", "Laravel"] }
      ]
    },
    {
      id: "architecture",
      name: "Databases & Event Streaming",
      items: [
        { name: "PostgreSQL & MySQL", description: "Complex relational schemas, transactional isolation, and query tuning", tags: ["PostgreSQL", "MySQL"] },
        { name: "Apache Kafka", description: "Event-driven asynchronous messaging and credit pipeline queues", tags: ["Kafka", "PubSub"] },
        { name: "Redis Caching", description: "In-memory caching, rate-limiting, and distributed locking", tags: ["Redis", "In-Memory"] },
        { name: "Microsoft SQL Server", description: "Enterprise relational database administration and stored procedures", tags: ["MSSQL", "RDBMS"] }
      ]
    },
    {
      id: "infrastructure",
      name: "DevOps, Infra & Banking",
      items: [
        { name: "Docker & Kubernetes (RKE)", description: "Containerized deployment in enterprise cluster environments", tags: ["Docker", "Kubernetes"] },
        { name: "GitLab CI/CD & Git", description: "Automated test pipelines, version control, and team collaboration", tags: ["GitLab", "CI/CD"] },
        { name: "Linux / Ubuntu", description: "Server administration, systemd service daemons, and bash scripting", tags: ["Linux", "OS"] },
        { name: "Temenos Transact & T24", description: "Core banking modules: Accounts, Teller, Loans, GL, and FinCloud", tags: ["Banking", "T24"] }
      ]
    },
    {
      id: "frontend",
      name: "Full-Stack, UI & Design",
      items: [
        { name: "TypeScript & JavaScript", description: "Modern full-stack web applications and client interfaces", tags: ["TypeScript", "JS"] },
        { name: "HTML5, CSS3 & Responsive UI", description: "Modern responsive web applications and terminal dashboards", tags: ["Web", "CSS"] },
        { name: "Figma, Photoshop, Illustrator", description: "UI design, wireframing, and vector graphics production", tags: ["Design", "Figma"] }
      ]
    }
  ]
};
