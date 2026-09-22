export type ProjectCategory = "Full-Stack" | "Real-Time" | "AI & Automation";
export type Project = {
  slug: string;
  title: string;
  category: ProjectCategory;
  eyebrow: string;
  description: string;
  technologies: string[];
  featured: boolean;
  preview: "reporting" | "business" | "notifications" | "voice" | "commerce" | "iot";
  problem: string;
  solution: string;
  responsibilities: string[];
  architecture: { title: string; detail: string }[];
  challenges: { title: string; description: string }[];
  outcomes: string[];
};

export const projects: Project[] = [
  {
    slug: "enterprise-reporting-platform",
    title: "Enterprise Reporting Platform",
    category: "Full-Stack",
    eyebrow: "ENTERPRISE APPLICATION",
    description: "Turning complex reporting workflows into a clear, configuration-driven experience.",
    technologies: ["React", "TypeScript", "Node.js", "Azure"],
    featured: true,
    preview: "reporting",
    problem: "Enterprise reporting often spreads across rigid forms, spreadsheets, and disconnected approval workflows. Teams need a consistent way to capture complex information without losing progress when connectivity drops.",
    solution: "A configuration-driven reporting application with reusable field components, composable validation, local draft persistence, and a clear review lifecycle. A versioned API separates reporting rules from presentation, with Azure as the proposed deployment target.",
    responsibilities: ["Design the frontend architecture and typed form configuration model.", "Create reusable, accessible fields with cross-field validation.", "Implement local draft persistence and explicit synchronization states.", "Define API contracts, authorization boundaries, and an Azure deployment workflow."],
    architecture: [{ title: "React + TypeScript", detail: "Configuration-driven forms and accessible workflows" }, { title: "REST API", detail: "Versioned contracts, validation, and authorization" }, { title: "Node.js services", detail: "Report lifecycle and business rules" }, { title: "SQL", detail: "Reports, revisions, and audit events" }, { title: "Azure + CI/CD", detail: "Environment-specific builds and controlled releases" }],
    challenges: [{ title: "Complex, evolving forms", description: "Use a typed schema and shared field registry, keeping validation and rendering consistent as requirements change." }, { title: "Offline draft conflicts", description: "Track draft revisions and surface conflicts explicitly instead of silently overwriting a newer report." }, { title: "Permission-sensitive workflows", description: "Validate every transition on the server, with a clear audit trail and role-aware UI." }],
    outcomes: ["A maintainable foundation for evolving report types.", "Recoverable drafts and predictable submission workflows.", "Clear boundaries between interface, business logic, and persistence."],
  },
  {
    slug: "business-management-platform",
    title: "Business Management Platform",
    category: "Full-Stack",
    eyebrow: "FULL-STACK PRODUCT",
    description: "One connected workspace for teams, day-to-day operations, and business workflows.",
    technologies: ["React", "Node.js", "Express", "MongoDB"],
    featured: true,
    preview: "business",
    problem: "When tasks, customer records, and operational updates live in separate tools, teams spend more time reconciling information than moving work forward. Access to sensitive business records also needs to be intentional.",
    solution: "A modular business workspace with shared navigation, role-based access, and consistent CRUD flows. A Node.js and Express API centralizes business rules, while MongoDB stores the application’s document-oriented records.",
    responsibilities: ["Plan feature modules and a reusable React component system.", "Design REST APIs and a maintainable Express service layer.", "Implement authentication and server-enforced role-based access.", "Model MongoDB collections, indexes, and validation rules."],
    architecture: [{ title: "React workspace", detail: "Reusable screens, predictable state, and permission-aware navigation" }, { title: "Express API", detail: "Authenticated endpoints with shared validation" }, { title: "Service layer", detail: "Business rules independent of request handlers" }, { title: "MongoDB", detail: "Indexed documents and controlled data access" }, { title: "Docker + AWS", detail: "Repeatable environments and deployment" }],
    challenges: [{ title: "Consistent authorization", description: "Centralize permission checks on the server; hiding a button is not an authorization boundary." }, { title: "Growing feature scope", description: "Organize by business capability with shared primitives, not one large collection of loosely related screens." }, { title: "Complex list views", description: "Use server-side pagination, validated filters, and targeted indexes instead of loading every record into the browser." }],
    outcomes: ["A coherent workspace with reusable interaction patterns.", "Explicit access boundaries across roles and resources.", "An extensible service layer for future business modules."],
  },
  {
    slug: "real-time-notification-platform",
    title: "Real-Time Notification Platform",
    category: "Real-Time",
    eyebrow: "REAL-TIME SYSTEM",
    description: "Keeping people in the loop with timely updates and a thoughtfully organized inbox.",
    technologies: ["React", "Node.js", "WebSocket", "MongoDB"],
    featured: true,
    preview: "notifications",
    problem: "A notification system needs more than a live connection. People expect messages to arrive reliably, remain available after reconnecting, and keep their read state consistent across sessions.",
    solution: "A durable notification inbox backed by MongoDB, paired with a real-time transport for immediate updates. The client reconciles incoming events against a cursor-based API and treats the persisted inbox as the source of truth.",
    responsibilities: ["Model notifications, recipients, delivery events, and read state.", "Build a paginated inbox and optimistic read/unread interactions.", "Design authenticated WebSocket or SSE connections with reconnection behavior.", "Implement idempotent event handling and a catch-up API."],
    architecture: [{ title: "Backend events", detail: "Domain events trigger notification creation" }, { title: "MongoDB inbox", detail: "Durable messages and recipient state" }, { title: "WebSocket / SSE", detail: "Authenticated delivery with reconnect support" }, { title: "React application", detail: "Live inbox, unread state, and accessible announcements" }],
    challenges: [{ title: "Reconnection gaps", description: "Recover missed messages from a durable cursor rather than assuming a live connection guarantees delivery." }, { title: "Duplicate events", description: "Use stable notification IDs and idempotent updates so a retry never creates duplicate inbox entries." }, { title: "Accessible live updates", description: "Use polite announcements and preserve keyboard focus instead of interrupting the person’s current task." }],
    outcomes: ["A recoverable inbox that does not depend on a permanent connection.", "Predictable read state across reloads and sessions.", "A real-time UI designed for interruption-free use."],
  },
  {
    slug: "ai-voice-assistant",
    title: "AI Voice Assistant",
    category: "AI & Automation",
    eyebrow: "AI & AUTOMATION",
    description: "A natural voice interface connecting conversations to useful, automated actions.",
    technologies: ["Python", "Voice APIs", "LLM", "Webhooks"],
    featured: true,
    preview: "voice",
    problem: "Voice interactions involve several asynchronous systems: transcription, language understanding, action execution, and audio generation. A useful assistant needs clear state transitions and safe boundaries around the actions it can take.",
    solution: "An event-driven voice pipeline that converts speech to text, uses an LLM to interpret intent within a defined tool schema, and turns the response back into speech. Signed webhooks connect approved actions to external systems.",
    responsibilities: ["Define a voice session lifecycle and typed event contracts.", "Integrate speech-to-text, language-model, and text-to-speech providers.", "Validate tool arguments and require confirmation for consequential actions.", "Implement webhook verification, retries, and privacy-conscious logging."],
    architecture: [{ title: "Voice input", detail: "Session-aware audio capture" }, { title: "Speech-to-text", detail: "Transcription with explicit error handling" }, { title: "LLM orchestration", detail: "Constrained tools and validated arguments" }, { title: "Approved webhooks", detail: "Verified requests and idempotent actions" }, { title: "Text-to-speech", detail: "Streaming response audio" }],
    challenges: [{ title: "Unpredictable model output", description: "Validate structured responses and tool arguments against a strict schema; do not treat generated text as trusted commands." }, { title: "Conversational latency", description: "Stream intermediate stages where possible and clearly represent listening, thinking, and speaking states." }, { title: "Sensitive voice data", description: "Minimize transcript retention, redact sensitive logs, and define explicit recording consent." }],
    outcomes: ["A clear, observable conversation lifecycle.", "Controlled action execution with human confirmation where needed.", "Provider boundaries that support future integrations."],
  },
  {
    slug: "e-commerce-platform",
    title: "E-Commerce Platform",
    category: "Full-Stack",
    eyebrow: "COMMERCE EXPERIENCE",
    description: "A considered shopping experience backed by a dependable product and order engine.",
    technologies: ["Next.js", "Node.js", "Express", "MongoDB"],
    featured: false,
    preview: "commerce",
    problem: "A storefront has to balance a responsive shopping experience with accurate product information, secure authentication, and order consistency. Client-side state alone cannot guarantee correct pricing or availability.",
    solution: "A Next.js storefront with server-rendered product pages and a dedicated commerce API. Product, cart, and order responsibilities stay separate, with server-side pricing checks and explicit order-state transitions.",
    responsibilities: ["Create responsive product, collection, and cart interfaces.", "Design product and order APIs with server-side validation.", "Implement customer authentication and protected account views.", "Plan SEO, caching, and a reliable deployment workflow."],
    architecture: [{ title: "Next.js storefront", detail: "Server-rendered discovery and responsive shopping" }, { title: "Commerce API", detail: "Authoritative pricing and validated cart actions" }, { title: "Order services", detail: "Explicit order states and idempotent operations" }, { title: "MongoDB", detail: "Product catalog and durable order records" }, { title: "Cloud deployment", detail: "Cache strategy, monitoring, and repeatable releases" }],
    challenges: [{ title: "Price consistency", description: "Recalculate authoritative totals on the server before creating an order." }, { title: "Repeated submissions", description: "Use idempotency keys for consequential operations and present recoverable client states." }, { title: "Discoverability", description: "Render meaningful product content on the server with descriptive metadata and stable URLs." }],
    outcomes: ["A modular storefront with accessible shopping flows.", "Reliable order boundaries and validated data.", "Search-friendly product pages and a clear caching strategy."],
  },
  {
    slug: "real-time-iot-dashboard",
    title: "Real-Time IoT Dashboard",
    category: "Real-Time",
    eyebrow: "CONNECTED SYSTEMS",
    description: "Making a stream of device data understandable, actionable, and easy to monitor.",
    technologies: ["React", "MQTT", "WebSocket", "MongoDB"],
    featured: false,
    preview: "iot",
    problem: "Device telemetry is frequent, uneven, and sometimes incomplete. A dashboard must show what is happening now without overwhelming the browser or disguising stale data as a healthy connection.",
    solution: "An MQTT ingestion service validates incoming telemetry and stores relevant history. A WebSocket gateway publishes aggregated updates to a React dashboard with explicit connection state and stale-data indicators.",
    responsibilities: ["Design telemetry contracts and device identity boundaries.", "Create responsive charts and accessible device status views.", "Build ingestion validation, aggregation, and retention rules.", "Implement reconnect handling and explicit stale-data states."],
    architecture: [{ title: "Connected devices", detail: "Timestamped telemetry from identified devices" }, { title: "MQTT ingestion", detail: "Topic authorization and payload validation" }, { title: "Backend services", detail: "Aggregation, history, and event processing" }, { title: "WebSocket gateway", detail: "Bounded update streams and reconnect support" }, { title: "React dashboard", detail: "Live status, historical views, and clear data freshness" }],
    challenges: [{ title: "Bursty telemetry", description: "Aggregate and bound update frequency so chart rendering stays responsive as device traffic grows." }, { title: "Out-of-order data", description: "Track event time separately from ingestion time and define how late-arriving samples are displayed." }, { title: "Disconnected devices", description: "Show the last-seen timestamp and a distinct stale state rather than an ambiguous green indicator." }],
    outcomes: ["An observable path from device event to dashboard.", "A responsive interface with bounded rendering work.", "Honest connection and data-freshness indicators."],
  },
];

export const projectDisclosure = "These are illustrative project concepts and architecture studies, not verified client engagements. Interface previews are demonstrations; no client names, measured outcomes, or production results are claimed.";
