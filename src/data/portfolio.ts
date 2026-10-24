import { PortfolioData } from '../types';

/**
 * PORTFOLIO CONFIGURATION DATA
 * =============================
 * Edit this file to update your personal details, projects, skills, and links.
 * UI components automatically adapt to the content defined here.
 */
export const portfolioData: PortfolioData = {
  personal: {
    name: "Zul",
    eyebrow: "IT PROFESSIONAL / SYSTEMS & ARCHITECTURE",
    title: "Systems Engineer & Framework Architect",
    headline: "Building reliable systems. Creating useful digital experiences.",
    subheadline: "Specializing in resilient backend architecture, zero-overhead entity platforms, and mission-critical local-first systems.",
    status: {
      available: true,
      label: "Open for high-impact architecture & systems design",
      subtext: "Q4 2026 / Remote & On-Premises Consultation"
    },
    location: "Indonesia",
    timezone: "UTC+07:00 (WIB)",
    email: "zul@atharis.dev"
  },

  social: {
    github: "https://github.com",
    linkedin: "https://linkedin.com",
    telegram: "https://t.me",
    twitter: "https://x.com"
  },

  projects: [
    {
      id: "atharis-core",
      title: "Atharis Core Engine",
      category: "Enterprise Framework",
      summary: "High-throughput modular business core framework with zero-property decorator entity inference and multi-tenant RBAC.",
      problem: "Traditional enterprise boilerplate requires hundreds of redundant class/field decorators and rigid scaffold layers that slow down vertical domain development.",
      solution: "Engineered an inference-first metadata registry on top of TypeORM with automated REST/GraphQL grid reflection, dynamic lifecycle hooks, and pluggable event sinks.",
      role: "Lead Architect & Engine Developer",
      stack: ["TypeScript", "Node.js", "TypeORM", "PostgreSQL", "Docker"],
      metrics: "Sub-5ms query hydration, 60% less boilerplate code",
      githubUrl: "https://github.com",
      demoUrl: "https://atharis.dev",
      featured: true
    },
    {
      id: "monotonic-sentinel",
      title: "Monotonic Lease Sentinel",
      category: "Security & Licensing",
      summary: "Tamper-resistant on-premise licensing engine with monotonic clock watermarking and HMAC challenge-response verification.",
      problem: "Local-first on-premises software is vulnerable to client system clock rollbacks and offline license bypasses without internet connectivity.",
      solution: "Designed a multi-stage tamper detection system using encrypted write watermarks in relational storage coupled with offline challenge-response QRIS leasing.",
      role: "Security & Systems Engineer",
      stack: ["Go", "PostgreSQL", "HMAC-SHA256", "Cryptography", "Linux"],
      metrics: "100% offline clock-tamper detection with zero false lockouts",
      githubUrl: "https://github.com",
      featured: true
    },
    {
      id: "turnstile-access-iot",
      title: "Precision Gym POS & Access",
      category: "Local-First & IoT",
      summary: "Fault-tolerant turnstile access control and membership management engine built for resilient 24/7 offline operation.",
      problem: "Intermittent network failures at retail facility gates frequently cause customer check-in delays, stalled gates, and revenue leakage.",
      solution: "Implemented an offline-first distributed node sync protocol with local SQLite edge caches, millisecond RFID badge validation, and asynchronous cloud reconciliation.",
      role: "Full-Stack & Embedded IoT Integrator",
      stack: ["React", "Fastify", "SQLite", "WebSockets", "MQTT"],
      metrics: "< 120ms badge-to-gate relay latency during network outages",
      demoUrl: "https://atharis.dev/gym",
      featured: true
    }
  ],

  about: {
    lead: "Designing lean, dependable digital infrastructure that stays fast, clear, and easy to reason about.",
    paragraphs: [
      "I am an IT professional and systems engineer focused on backend foundations, distributed data integrity, and high-performance business applications. My approach favors practical simplicity, smart defaults, and zero-overhead abstractions over trendy complexity.",
      "Over years of delivering production software, I've designed core frameworks, local-first on-premise software with hardened security, and high-throughput transactional APIs that remain rock-solid under real operational stress."
    ],
    principles: [
      {
        title: "Smart Defaults over Boilerplate",
        description: "Zero-decorator schema inference and clean domain entities eliminate hundreds of lines of fragile scaffolding."
      },
      {
        title: "Local-First Resiliency",
        description: "Systems must stay operational even during severe network partition, relying on monotonic watermarks and robust edge sync."
      },
      {
        title: "Modular Extension Points",
        description: "Architecture should provide clean pluggable interfaces (like event sinks and audit channels) without premature over-engineering."
      }
    ],
    experience: [
      {
        period: "2023 — Present",
        role: "Principal Systems Architect",
        company: "Atharis Ecosystem",
        location: "Hybrid",
        description: "Spearheaded the core enterprise framework, modular entity metadata engine, and multi-tenant security architecture.",
        technologies: ["TypeScript", "PostgreSQL", "TypeORM", "Docker", "REST API"]
      },
      {
        period: "2021 — 2023",
        role: "Senior Backend & Infrastructure Engineer",
        company: "Distributed Tech Group",
        location: "Jakarta, ID",
        description: "Engineered high-concurrency payment gateways, message bus pipelines, and on-premises licensing protection systems.",
        technologies: ["Node.js", "Go", "Redis", "Kafka", "Linux"]
      },
      {
        period: "2018 — 2021",
        role: "Software Solutions Engineer",
        company: "CloudCore Systems",
        location: "Remote",
        description: "Built tailored operational platforms, database migration pipelines, and automated IoT access control networks.",
        technologies: ["TypeScript", "Python", "SQL", "MQTT", "Docker"]
      }
    ]
  },

  skills: [
    {
      id: "backend",
      name: "Core & Backend",
      items: [
        { name: "Node.js & TypeScript", description: "Strict typing, event loop optimization, and modular runtime systems", tags: ["Runtime", "Core"] },
        { name: "Go (Golang)", description: "High-throughput concurrent daemons and cryptographic utilities", tags: ["Systems", "Microservices"] },
        { name: "REST & GraphQL APIs", description: "Stateless contract-first APIs with predictable error hierarchies", tags: ["API", "Integration"] },
        { name: "Fastify & Express", description: "Low-overhead HTTP services with schema validation", tags: ["Frameworks", "HTTP"] }
      ]
    },
    {
      id: "architecture",
      name: "Architecture & Data",
      items: [
        { name: "PostgreSQL 16", description: "Complex indexing, foreign tables, JSONB queries, and partitioning", tags: ["RDBMS", "Storage"] },
        { name: "TypeORM & SQL", description: "Zero-decorator inference, migrations, and transactional isolation", tags: ["ORM", "Data Access"] },
        { name: "Redis & Caching", description: "Atomic rate-limiting, pub/sub, distributed locks, and session stores", tags: ["Cache", "Key-Value"] },
        { name: "Event-Driven & Messaging", description: "Audit sink architecture, message brokering, and outbox patterns", tags: ["PubSub", "Streaming"] }
      ]
    },
    {
      id: "infrastructure",
      name: "Infra & Security",
      items: [
        { name: "Docker & Containerization", description: "Multi-stage reproducible builds and micro-service topologies", tags: ["DevOps", "Isolation"] },
        { name: "Linux & On-Premises", description: "Systemd service daemons, network routing, and edge deployment", tags: ["OS", "Hardware"] },
        { name: "Licensing & Cryptography", description: "HMAC signatures, monotonic timestamp watermarks, and challenge-response", tags: ["Security", "Integrity"] },
        { name: "Git & CI/CD Pipelines", description: "Automated regression testing, linting, and semantic deployment", tags: ["Workflow", "Automation"] }
      ]
    },
    {
      id: "frontend",
      name: "Frontend & UI Engineering",
      items: [
        { name: "React 18 & Vite", description: "Clean declarative interfaces, hooks, state machines, and fast bundling", tags: ["SPA", "Client"] },
        { name: "Editorial & Modern CSS", description: "Viewport-bound responsive layouts, fluid clamp typography, and micro-interactions", tags: ["Styling", "Design"] },
        { name: "Accessibility & Standards", description: "Semantic HTML5, ARIA landmarks, keyboard focus flows, and contrast", tags: ["a11y", "Quality"] },
        { name: "Vitest & Playwright", description: "Automated regression testing, contract validation, and sub-100ms TTI suites", tags: ["Testing", "Speed"] }
      ]
    }
  ]
};
