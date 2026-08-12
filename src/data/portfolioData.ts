/**
 * SINGLE SOURCE OF TRUTH FOR ALL PORTFOLIO CONTENT.
 * Edit this file only — every component reads from here.
 * Place PDFs in `public/certificates/` and the resume in `public/`.
 */

const RESUME_URL = "/resume.pdf";

export type SocialLink = {
  label: string;
  href: string;
  icon: "github" | "linkedin" | "mail" | "twitter" | "globe";
};

export type Experience = {
  role: string;
  company: string;
  location?: string;
  period: string;
  category: "software" | "it";
  summary?: string;
  achievements: string[];
  stack: string[];
};

export type Education = {
  degree: string;
  institution: string;
  period: string;
  highlights: string[];
};

export type Project = {
  name: string;
  role: string;
  period: string;
  category: "software" | "it" | "assistant";
  summary: string;
  highlights: string[];
  stack: string[];
  href?: string;
};

export type Certification = {
  name: string;
  issuer: string;
  date: string;
  credentialId?: string;
  pdfUrl?: string;
  verifyUrl?: string;
};

export type SkillGroup = {
  id: string;
  label: string;
  blurb: string;
  skills: string[];
};

export const portfolioData = {
  profile: {
    name: "Zakaria Al-Mokri",
    role: "Software Engineer | IT Consultant | Systems Engineer | Support Engineer",
    headline: "Building software that scales. Running the systems that support it.",
    bio: "Versatile Software Engineer and IT Consultant designing technology solutions that align technical innovation with business objectives. A balanced background across full-stack development, systems engineering and IT consulting — combining analytical thinking with a solution-oriented approach to complex challenges, secure architecture and user-focused delivery.",
    location: "Berlin, Germany",
    email: "almokrizakaria@gmail.com",
    phone: "+49 000 0000000",
    resumeUrl: RESUME_URL,
    availability: "Open to Software Engineering, IT Management & Support Engineering roles",
  },

  degrees: [
    {
      short: "BSc (Hons) Software Engineering",
      long: "Bachelor of Computer Science (Hons) in Software Engineering",
    },
    {
      short: "MSc IT Management",
      long: "MSc Information Technology Management — University for the Creative Arts",
    },
  ],

  socials: [
    { label: "GitHub", href: "https://github.com/****", icon: "github" },
    { label: "LinkedIn", href: "https://www.linkedin.com/in/zakaria-al-mokri/", icon: "linkedin" },
    { label: "Email", href: "mailto:almokrizakaria@gmail.com", icon: "mail" },
  ] as SocialLink[],

  techMarquee: [
    "Laravel",
    "PHP",
    "JavaScript",
    "Alpine.js",
    "Java",
    "Python",
    "SQL",
    "MySQL",
    "Firebase",
    "HTML5",
    "CSS3",
    "Git & GitHub",
    "Linux",
    "Windows Server",
    "Networking",
    "WordPress",
  ],

  experience: [
    {
      role: "Software Engineer / Web Developer",
      company: "Pertubuhan Peduli Insan",
      location: "Shah Alam, Malaysia",
      period: "Oct 2022 — Mar 2024",
      category: "software",
      summary:
        "Full-stack delivery of secure, scalable Laravel web applications aligned to evolving business objectives.",
      achievements: [
        "Engineered and maintained scalable full-stack web applications in Laravel, delivering secure, high-performance solutions.",
        "Designed responsive, reusable, mobile-first UI components that improved usability and accessibility.",
        "Built and integrated RESTful APIs for seamless front-end to back-end data exchange and system interoperability.",
        "Applied clean coding standards and MVC principles to improve maintainability, scalability and performance.",
        "Investigated and resolved defects, production incidents and bottlenecks, keeping systems stable.",
        "Used AI-assisted development tools to accelerate debugging and evaluate implementation approaches without sacrificing code quality.",
      ],
      stack: ["Laravel", "PHP", "JavaScript", "Alpine.js", "MySQL", "REST APIs"],
    },
    {
      role: "IT Consultant / Systems Engineer",
      company: "Peduli Insan Malaysia",
      location: "Shah Alam, Malaysia",
      period: "Nov 2022 — Oct 2023",
      category: "it",
      summary:
        "IT support, systems administration and process improvement for an organisation of 50+ internal users.",
      achievements: [
        "Delivered responsive IT support to 50+ internal users, resolving most issues on first contact.",
        "Diagnosed hardware, software, network and system issues, reducing downtime across daily operations.",
        "Installed, configured and maintained desktops, laptops, printers and peripheral devices.",
        "Managed Windows and Linux installations, software deployments and user account configuration to speed up provisioning and onboarding.",
        "Performed routine maintenance, updates and preventive troubleshooting to strengthen infrastructure stability.",
      ],
      stack: ["Windows", "Linux", "Microsoft 365", "Networking", "Endpoint Security", "Hardware"],
    },
    {
      role: "IT Assistant (Work-Study) — Computer Science Department",
      company: "City University Malaysia",
      location: "Selangor, Malaysia",
      period: "Feb 2021 — Jul 2022",
      category: "it",
      summary:
        "Frontline technical support and workstation deployment for faculty, staff and students.",
      achievements: [
        "Resolved hardware, software, network and printer issues for faculty, staff and students.",
        "Built, configured and deployed desktop workstations supporting teaching and research.",
        "Managed support requests through the department ticketing system, prioritising incidents and tracking resolutions.",
        "Collaborated with departmental leadership and vendors on technology requirements and IT procurement.",
        "Produced technical documentation, user guides and SOPs that improved support consistency.",
      ],
      stack: ["IT Support", "Ticketing", "PC Assembly", "Drivers & OS", "Documentation"],
    },
  ] as Experience[],

  projects: [
    {
      name: "Dynamic Donation Campaign Engine",
      role: "Software Engineer / Full-Stack Developer",
      period: "2022 — 2024",
      category: "software",
      summary: "Engineered and maintained a dynamic CRUD system for fundraising initiatives to manage campaign targets and real-time funding metrics.",
      highlights: [
        "Developed a robust database architecture to track campaign goals along with initiation and conclusion dates.",
        "Built backend controllers and configured validation management using Laravel Eloquent ORM for security.",
        "Designed interactive administrative dashboards enabling full campaign management.",
        "Set up a progress calculation tool that dynamically computes the funding rate.",
      ],
      stack: ["Laravel", "MySQL", "Tailwind CSS", "CRUD Management", "Eloquent ORM"],
    },
    {
      name: "Real-time Progress Tracking Dashboard",
      role: "Software Engineer / Full-Stack Developer",
      period: "2022 — 2024",
      category: "software",
      summary: "Built responsive front-end visual components and statistical displays that update dynamically as incoming donations are processed.",
      highlights: [
        "Employed Alpine.js for lightweight reactive frontend state management without page reloads.",
        "Created a clean mobile design for progress bars and data visualisation with Tailwind CSS.",
        "Synced JSON data from the backend with client-side components for instant data updates.",
        "Improved rendering performance so the UI stays smooth on all devices.",
      ],
      stack: ["Alpine.js", "Tailwind CSS", "Laravel", "State Management", "Real-time UI"],
    },
    {
      name: "Automated Emergency Case Management System",
      role: "Software Engineer / Full-Stack Developer",
      period: "2022 — 2024",
      category: "software",
      summary: "Developed a specialised platform module for publishing critical medical and humanitarian hardship cases with live status tracking.",
      highlights: [
        "Created complex back-end procedures for managing beneficiary cases.",
        "Developed dynamic filtering and classification allowing switching between active emergencies and fully funded statuses.",
        "Employed TypeScript for strict typing of complex frontend submission forms.",
        "Designed automated status triggers that update case visibility once goals are fulfilled.",
      ],
      stack: ["Laravel", "TypeScript", "MySQL", "Workflow Automation", "Data Filtering"],
    },
    {
      name: "Sponsor & Orphan Profile Management Portal",
      role: "Software Engineer / Full-Stack Developer",
      period: "2022 — 2024",
      category: "software",
      summary: "Implemented relational data structures and user interfaces to link donors with specific orphan profiles and long-term sponsorships.",
      highlights: [
        "Structured relational databases in MySQL connecting donor data, sponsorships and beneficiary records.",
        "Planned the end-user flow from choosing and sponsoring through to ongoing beneficiary management.",
        "Developed automated availability toggles so profiles update the moment agreements are reached.",
        "Created administrative panels to review, approve and browse beneficiary records easily.",
      ],
      stack: ["Laravel", "MySQL", "Tailwind CSS", "Relational Database", "Profile Management"],
    },
    {
      name: "Multi-Language Content Localization Layer",
      role: "Software Engineer / Full-Stack Developer",
      period: "2022 — 2024",
      category: "software",
      summary: "Integrated an internationalization (i18n) framework supporting seamless language switching between Malay and English across the platform.",
      highlights: [
        "Designed Laravel localization routing and translation files for all core views and dynamic data.",
        "Added continuous language-state handling on the front-end with Alpine.js.",
        "Translated all copy, including donation form text, to guarantee complete accessibility.",
        "Maintained clean fallback rules to eliminate missing-string cases in localized layouts.",
      ],
      stack: ["Laravel Localization", "Alpine.js", "i18n", "UI Localization", "State Persistence"],
    },
    {
      name: "Secure Payment Gateway Integration",
      role: "Software Engineer / Full-Stack Developer",
      period: "2022 — 2024",
      category: "software",
      summary: "Integrated third-party payment processing pipelines and automated webhook listeners to confirm financial transactions safely.",
      highlights: [
        "Connected reliable payment processing APIs so users can donate securely.",
        "Built strong webhook handlers in Laravel for transaction signature and payload verification.",
        "Persisted successful payment confirmations to immediately update campaign totals.",
        "Logged all payment operations including errors and unsuccessful transactions.",
      ],
      stack: ["Laravel", "TypeScript", "Payment Gateways", "Webhooks", "API Integration"],
    },
    {
      name: "Responsive News & Blog Content Manager",
      role: "Software Engineer / Full-Stack Developer",
      period: "2022 — 2024",
      category: "software",
      summary: "Created a full-stack content management system enabling non-technical staff to publish organizational updates, news and audit reports.",
      highlights: [
        "Developed full CRUD tooling for publishing articles and campaign announcements.",
        "Created flexible Blade templates with Tailwind CSS that read well on both mobile and desktop.",
        "Built image-upload processing and planned storage for blog media.",
        "Designed meta-title management and content organisation for SEO.",
      ],
      stack: ["Laravel", "Blade Templates", "Tailwind CSS", "CMS Development", "File Management"],
    },
    {
      name: "Interactive Multi-Step Donation Forms",
      role: "Software Engineer / Full-Stack Developer",
      period: "2022 — 2024",
      category: "software",
      summary: "Designed and optimized user-facing donation workflows featuring client-side validation and responsive step-by-step navigation.",
      highlights: [
        "Created dynamic multi-step checkout flows with Alpine.js to guide users through donating.",
        "Built real-time client-side validation to catch input issues before submission.",
        "Designed accessible payment selection components with Tailwind CSS and TypeScript.",
        "Enhanced frontend form interactions to maximise conversion.",
      ],
      stack: ["Alpine.js", "Tailwind CSS", "TypeScript", "Form Validation", "UX Optimization"],
    },
    {
      name: "Automated Donor Reporting & Audit Logs",
      role: "Software Engineer / Full-Stack Developer",
      period: "2022 — 2024",
      category: "software",
      summary: "Engineered backend reporting services to aggregate fund distribution data and generate transparent documentation for audits.",
      highlights: [
        "Developed Eloquent queries to collect transaction logs across several filters.",
        "Built automated export features for financial report generation.",
        "Created reliable access management measures to protect audit logs.",
        "Scheduled background tasks to prune outdated transaction metrics.",
      ],
      stack: ["Laravel", "MySQL", "Eloquent ORM", "Data Reporting", "Audit Logging"],
    },
    {
      name: "Asset Optimization & Performance Refactoring",
      role: "Software Engineer / Full-Stack Developer",
      period: "2022 — 2024",
      category: "software",
      summary: "Refactored legacy application code and optimized front-end asset pipelines to enhance page loading speeds and mobile performance.",
      highlights: [
        "Optimized the Tailwind CSS production build to strip unused utility classes.",
        "Configured Vite/Laravel asset compilation for effective script bundling.",
        "Rewrote legacy database query loops to remove N+1 performance issues.",
        "Improved web vitals and mobile responsiveness on high-traffic landing pages.",
      ],
      stack: ["Tailwind CSS", "Vite", "Performance Optimization", "Code Refactoring", "Asset Management"],
    },
    {
      name: "Automated Endpoint Provisioning & Deployment",
      role: "IT Consultant / Systems Engineer",
      period: "2022 — 2023",
      category: "it",
      summary: "Transitioned manual machine setups to zero-touch, automated provisioning pipelines for enterprise endpoints.",
      highlights: [
        "Developed and maintained golden images for standard Windows and macOS builds.",
        "Ran major operating system migrations and hardware refreshes across departments.",
        "Deployed Intune, Workspace ONE and Jamf MDM for seamless vendor-to-employee delivery.",
      ],
      stack: ["Microsoft Intune", "Jamf", "Windows 11", "macOS", "Deployment"],
    },
    {
      name: "Enterprise Software Packaging & Patch Management",
      role: "IT Consultant / Systems Engineer",
      period: "2022 — 2023",
      category: "it",
      summary: "Streamlined software delivery, application updates and vulnerability compliance across all corporate endpoints.",
      highlights: [
        "Built silent application packages using PowerShell and SCCM/MECM wrapper scripting.",
        "Automated update cycles for the operating system and third-party software.",
        "Monitored compliance and generated reports on devices missing updates or exposed to vulnerabilities.",
      ],
      stack: ["SCCM / MECM", "PowerShell", "Patch Management", "Software Packaging", "Endpoint Security"],
    },
    {
      name: "Identity & Access Management Infrastructure",
      role: "IT Consultant / Systems Engineer",
      period: "2022 — 2023",
      category: "it",
      summary: "Modernized user identity synchronization, security access policies and directory structural controls.",
      highlights: [
        "Cleaned up Active Directory and Microsoft Entra ID and reorganised organizational units.",
        "Used Group Policy Objects for thorough security management of desktops and users.",
        "Implemented Multi-Factor Authentication company-wide.",
      ],
      stack: ["Active Directory", "Entra ID", "GPOs", "MFA", "IAM"],
    },
    {
      name: "Office Infrastructure & Asset Management Rollout",
      role: "IT Consultant / Systems Engineer",
      period: "2022 — 2023",
      category: "it",
      summary: "Deployed robust physical workspace hardware, core networking elements and comprehensive asset tracking frameworks.",
      highlights: [
        "Designed structured cabling systems and deployed network switches and AV installations.",
        "Implemented IT Asset Management for lifecycle tracking and barcode auditing.",
        "Ran electronic waste recycling and secure device decommissioning.",
      ],
      stack: ["Network Switches", "AV Systems", "ITAM", "Hardware Deployment", "Asset Tracking"],
    },
    {
      name: "Endpoint Security & Threat Hardening",
      role: "IT Consultant / Systems Engineer",
      period: "2022 — 2023",
      category: "it",
      summary: "Hardened enterprise endpoints against modern cyber threats with advanced detection and disk encryption frameworks.",
      highlights: [
        "Deployed and monitored Endpoint Detection and Response (EDR) tooling.",
        "Created guidelines for BitLocker and FileVault disk encryption and key recovery.",
        "Provisioned security rules for full compliance with company policy.",
      ],
      stack: ["EDR", "BitLocker", "FileVault", "Endpoint Security", "Compliance"],
    },
    {
      name: "IT Process Automation & Workflow Scripting",
      role: "IT Consultant / Systems Engineer",
      period: "2022 — 2023",
      category: "it",
      summary: "Replaced manual administrative bottlenecks with efficient background script automation and tooling.",
      highlights: [
        "Wrote PowerShell and Bash scripts to automate onboarding reports.",
        "Automated collection of hardware inventory and performance data.",
        "Scheduled user profile cache cleanup and password rotation processes.",
      ],
      stack: ["PowerShell", "Bash", "Automation", "Scripting", "Workflow Optimization"],
    },
    {
      name: "IT Service Desk Migration & Ticketing Optimization",
      role: "IT Consultant / Systems Engineer",
      period: "2022 — 2023",
      category: "it",
      summary: "Redesigned IT service management workflows and migrated helpdesk operations to improve request resolution times.",
      highlights: [
        "Set up ticketing, automated request routing and a self-service centre in Jira Service Management and ServiceNow.",
        "Analysed historical ticket logs to identify recurring issues and their root causes.",
        "Drafted customer-facing guidelines and standard operating procedures for staff.",
      ],
      stack: ["ServiceNow", "Jira Service Management", "ITSM", "Process Optimization", "Documentation"],
    },
    {
      name: "Cloud Workspace Migration & Identity Onboarding",
      role: "IT Consultant / Systems Engineer",
      period: "2022 — 2023",
      category: "it",
      summary: "Assisted small-to-medium business clients in transitioning local file shares and user directories to cloud ecosystems.",
      highlights: [
        "Migrated on-premise file servers to Microsoft SharePoint and OneDrive with correct permissions.",
        "Provisioned users in Microsoft 365 and Google Workspace with licensing and protection requirements.",
        "Ran training sessions to prepare non-technical users for the new platforms.",
      ],
      stack: ["Microsoft 365", "Google Workspace", "SharePoint", "Cloud Migration", "Identity Management"],
    },
    {
      name: "IT Infrastructure Assessment & Compliance Audit",
      role: "IT Consultant / Systems Engineer",
      period: "2022 — 2023",
      category: "it",
      summary: "Executed comprehensive hardware, software and network audits to evaluate client security posture and asset compliance.",
      highlights: [
        "Used network discovery tooling to map infrastructure and record hardware inventory.",
        "Identified unsupported software and unpatched operating systems.",
        "Produced detailed technical audit reports with prioritised remediation lists for stakeholders.",
      ],
      stack: ["IT Auditing", "Network Discovery", "Vulnerability Assessment", "Asset Management", "Reporting"],
    },
    {
      name: "Small Office Network Setup & Wi-Fi Deployment",
      role: "IT Consultant / Systems Engineer",
      period: "2022 — 2023",
      category: "it",
      summary: "Engineered and deployed reliable, secure local area networks and wireless structures for newly established business sites.",
      highlights: [
        "Configured routers, managed switches and wireless access points for uninterrupted service.",
        "Created guest access and secure corporate SSIDs using Cisco Meraki and Ubiquiti UniFi.",
        "Ran speed and coverage testing to guarantee ideal working conditions for clients.",
      ],
      stack: ["UniFi", "Meraki", "Networking", "VLANs", "Wi-Fi Deployment"],
    },
    {
      name: "Endpoint Backup & Disaster Recovery Implementation",
      role: "IT Consultant / Systems Engineer",
      period: "2022 — 2023",
      category: "it",
      summary: "Deployed automated backup solutions and business continuity protocols to safeguard critical client data against ransomware or loss.",
      highlights: [
        "Rolled out endpoint backup agents with Veeam and Acronis.",
        "Arranged daily and weekly backup schedules with failure notifications.",
        "Performed full data verification and validated recovery time objectives.",
      ],
      stack: ["Veeam", "Acronis", "Backup & Recovery", "Data Protection", "Disaster Recovery"],
    },
    {
      name: "Academic Laboratory Workstation Deployment & Standardization",
      role: "IT Assistant (Computer Science Department)",
      period: "2021 — 2022",
      category: "assistant",
      summary: "Configured, imaged and deployed laboratory computer systems to ensure reliable hardware access for students and faculty.",
      highlights: [
        "Created and maintained standard OS images for faster multi-machine installs.",
        "Installed key educational software, programming platforms and compiler toolchains.",
        "Ran thorough hardware testing and upgraded lab units.",
        "Shortened new machine preparation time using automated scripts.",
      ],
      stack: ["Windows OS", "Hardware Deployment", "Ghost Imaging", "System Configuration"],
    },
    {
      name: "Academic Helpdesk Ticketing & Issue Resolution",
      role: "IT Assistant (Computer Science Department)",
      period: "2021 — 2022",
      category: "assistant",
      summary: "Managed daily technical support requests and provided hands-on troubleshooting for faculty, staff and students.",
      highlights: [
        "Triaged and resolved support requests covering hardware, software and network issues.",
        "Diagnosed OS failures, driver incompatibilities and application crashes on user machines.",
        "Helped students and lecturers set up technical equipment in the labs.",
        "Documented recurring equipment problems and their fixes.",
      ],
      stack: ["ITSM", "Helpdesk Support", "Troubleshooting", "Customer Service"],
    },
    {
      name: "Departmental Network Connectivity & Wi-Fi Management",
      role: "IT Assistant (Computer Science Department)",
      period: "2021 — 2022",
      category: "assistant",
      summary: "Troubleshot and maintained local area network connections and wireless access points across departmental facilities.",
      highlights: [
        "Set up wired network ports, cabling and sockets for offices and laboratories.",
        "Resolved IP configuration, DNS lookup failures and gateway problems.",
        "Assisted with wireless access point placement and signal testing.",
        "Coordinated with the campus network supply units.",
      ],
      stack: ["TCP/IP", "DNS & DHCP", "Wired/Wireless LAN", "Network Troubleshooting"],
    },
    {
      name: "Computer Lab Hardware Maintenance & Inventory Audit",
      role: "IT Assistant (Computer Science Department)",
      period: "2021 — 2022",
      category: "assistant",
      summary: "Conducted comprehensive physical hardware inventories and executed routine preventive maintenance schedules.",
      highlights: [
        "Performed preventive cleaning and servicing of laboratory machines.",
        "Tracked equipment, asset numbers and component replacements.",
        "Controlled the disposal process for retired technical equipment.",
        "Replaced faulty components in departmental computers.",
      ],
      stack: ["Hardware Maintenance", "Asset Tracking", "Inventory Audit", "Component Repair"],
    },
    {
      name: "Departmental Software Licensing & Patch Management",
      role: "IT Assistant (Computer Science Department)",
      period: "2021 — 2022",
      category: "assistant",
      summary: "Ensured software compliance and applied security updates across all departmental computers and laboratory endpoints.",
      highlights: [
        "Installed monthly security updates and required application upgrades.",
        "Audited installed software against university licence agreements.",
        "Installed specialist IDEs and database tools on student lab machines.",
        "Monitored endpoint security client status to confirm threat protection.",
      ],
      stack: ["Patch Management", "Software Licensing", "Endpoint Security", "Compliance"],
    },
    {
      name: "Academic AV & Lecture Hall Technology Support",
      role: "IT Assistant (Computer Science Department)",
      period: "2021 — 2022",
      category: "assistant",
      summary: "Supported multimedia systems, projector displays and conference hardware for lectures and academic presentations.",
      highlights: [
        "Installed and repaired projectors, interactive displays and smart podium equipment.",
        "Configured audio routing and microphones for lecture recording.",
        "Assisted professors with technical setup during academic presentations.",
        "Maintained an inventory of presentation cables, devices and remote controls.",
      ],
      stack: ["AV Systems", "Projector Setup", "Hardware Support", "Event Tech"],
    },
    {
      name: "IT Documentation & Standard Operating Procedures",
      role: "IT Assistant (Computer Science Department)",
      period: "2021 — 2022",
      category: "assistant",
      summary: "Authored clear technical documentation and step-by-step troubleshooting guides for departmental staff and students.",
      highlights: [
        "Wrote user guides covering printer, network and account issues.",
        "Documented the onboarding process for new lecturers and assistants.",
        "Built a knowledge repository of common hardware faults and solutions.",
        "Created rules and procedures for equipment borrowing.",
      ],
      stack: ["Technical Writing", "SOP Documentation", "Knowledge Base", "Process Optimization"],
    },
    {
      name: "Active Directory User Account & Access Management",
      role: "IT Assistant (Computer Science Department)",
      period: "2021 — 2022",
      category: "assistant",
      summary: "Assisted in managing local directory accounts, permission groups and resource access for academic users.",
      highlights: [
        "Created user and student accounts in Active Directory.",
        "Handled password resets and account unlocks.",
        "Configured access rights for departmental shared folders.",
        "Ensured accounts of departed users were promptly disabled.",
      ],
      stack: ["Active Directory", "Access Control", "User Management", "Identity Management"],
    },
    {
      name: "Technology Procurement & Vendor Collaboration",
      role: "IT Assistant (Computer Science Department)",
      period: "2021 — 2022",
      category: "assistant",
      summary: "Assisted departmental leadership in evaluating, procuring and receiving new hardware infrastructure assets.",
      highlights: [
        "Produced hardware specifications and pricing estimates for upcoming lab upgrades.",
        "Worked with external suppliers on delivery arrangements and warranty repairs.",
        "Inspected new shipments for shipping damage and specification conformance.",
        "Recorded received assets in the university asset tracking system before deployment.",
      ],
      stack: ["IT Procurement", "Vendor Management", "Asset Management", "Hardware Evaluation"],
    },
    {
      name: "Peripheral Hardware & Printing Infrastructure Support",
      role: "IT Assistant (Computer Science Department)",
      period: "2021 — 2022",
      category: "assistant",
      summary: "Maintained multi-function office printers, scanners and peripheral hardware across departmental floors.",
      highlights: [
        "Configured network printing queues and installed print drivers on faculty workstations.",
        "Cleared paper jams, replaced toner and coordinated routine printer maintenance with vendors.",
        "Troubleshot scanner connectivity, driver errors and document feeder issues.",
        "Managed departmental stocks of printer consumables, paper and replacement parts.",
      ],
      stack: ["Printer Administration", "Peripheral Support", "Hardware Troubleshooting", "Vendor Coordination"],
    },
  ] as Project[],

  education: [
    {
      degree: "MSc Information Technology Management",
      institution: "University for the Creative Arts — delivered at Berlin School of Business and Innovation, Berlin, Germany",
      period: "Oct 2023 — Apr 2026",
      highlights: [
        "Focus on IT strategy, digital transformation and technology management",
        "Studying in Berlin, Germany",
      ],
    },
    {
      degree: "Bachelor of Computer Science (Hons) in Software Engineering",
      institution: "City University of Science and Technology, Selangor, Malaysia",
      period: "Jan 2020 — Mar 2023",
      highlights: [
        "Software engineering, databases, algorithms and systems fundamentals",
        "Work-study IT assistant role alongside the degree",
      ],
    },
  ] as Education[],

  certifications: [
    {
      name: "Introduction to Cybersecurity",
      issuer: "Cisco Networking Academy",
      date: "Sep 2021",
      credentialId: "2a200d16-edd0-4cf5-8388-13927ef1b8da",
      pdfUrl: "/certificates/Introduction_to_Cybersecurity_certificate.pdf",
    },
    {
      name: "IT Customer Support Basics",
      issuer: "Cisco Networking Academy",
      date: "Jul 2026",
      credentialId: "848147bb-a230-46c8-b04d-d1c9218555dd",
      pdfUrl: "/certificates/IT_Customer_Support_Basics_certificate.pdf",
    },
    {
      name: "Introduction to Cybersecurity Awareness",
      issuer: "HP LIFE — HP Foundation",
      date: "Jul 2026",
      credentialId: "171112ea-d932-4793-b3d4-d04d5f483e9d",
      pdfUrl: "/certificates/Introduction_to_Cybersecurity_Awareness.pdf",
    },
    {
      name: "Agile Project Management",
      issuer: "HP LIFE — HP Foundation",
      date: "Jul 2026",
      credentialId: "48a12cb3-5d12-45a6-b459-acca84d36ef3",
      pdfUrl: "/certificates/Agile_Project_Management.pdf",
    },
    {
      name: "AI for Beginners",
      issuer: "HP LIFE — HP Foundation",
      date: "Jul 2026",
      credentialId: "15dd8ab7-db57-4ed4-a951-c14f4c77f146",
      pdfUrl: "/certificates/AI_for_Beginners.pdf",
    },
    {
      name: "Customer Experience (CX) for Business Success",
      issuer: "HP LIFE — HP Foundation",
      date: "Jul 2026",
      credentialId: "246a808c-8453-450f-a565-9604a5920a91",
      pdfUrl: "/certificates/Customer_Experience_CX_for_Business_Success.pdf",
    },
    {
      name: "Data Science & Analytics",
      issuer: "HP LIFE — HP Foundation",
      date: "Jun 2026",
      credentialId: "35f8befc-2229-40d7-b47a-a44588d34378",
      pdfUrl: "/certificates/Data_Science_Analytics.pdf",
    },
    {
      name: "Curriculum Vitae — Zakaria Al-Mokri",
      issuer: "Full resume (PDF)",
      date: "Latest",
      pdfUrl: RESUME_URL,
    },
  ] as Certification[],


  skills: [
    {
      id: "software-web",
      label: "Software & Web Development",
      blurb: "Core programming, full-stack delivery, web technologies and API integration.",
      skills: [
        "Laravel",
        "PHP",
        "JavaScript",
        "Alpine.js",
        "Java",
        "Python",
        "HTML5",
        "CSS3",
        "SQL",
        "REST APIs",
        "MVC Architecture",
        "Responsive UI",
        "Full-Stack Development",
        "Web Development",
        "Front-End Development",
        "Back-End Development",
        "Software Development Lifecycle (SDLC)",
        "API Integration",
        "Application Development",
        "System Integration",
        "Performance Optimization",
      ],
    },
    {
      id: "it-infrastructure",
      label: "IT Infrastructure & Support",
      blurb: "Systems administration, networking, hardware, troubleshooting and service platforms.",
      skills: [
        "Jira",
        "ServiceNow",
        "Systems Engineering",
        "IT Consulting",
        "Systems Administration",
        "Windows Administration",
        "Linux Administration",
        "IT Infrastructure",
        "Network Troubleshooting",
        "Technical Support",
        "TCP/IP",
        "LAN/WLAN Setup",
        "Router & Switch Configuration",
        "IP Addressing",
        "DNS",
        "DHCP",
        "PC Assembly",
        "Hardware Diagnostics",
        "RAM/HDD/SSD/PSU Troubleshooting",
        "Motherboard Issues",
        "OS Upgrades & Recovery",
        "User Account Management",
        "Microsoft 365",
        "Access Permissions",
        "Malware Removal",
        "Endpoint Protection",
        "Backup & Data Restoration",
      ],
    },
    {
      id: "data-tools",
      label: "Data & Technical Tools",
      blurb: "Databases, version control, project tools, design tools and productivity suites.",
      skills: [
        "Database Management",
        "Probability & Statistics",
        "DBMS",
        "Firebase",
        "Microsoft Access",
        "MySQL",
        "WordPress",
        "Microsoft Project Management",
        "Git and GitHub",
        "Technical Writer",
        "Microsoft Office (Word, Excel, PowerPoint)",
        "Adobe",
        "Figma",
        "Prompt Engineering",
      ],
    },
    {
      id: "business-management",
      label: "Business & Management Skills",
      blurb: "Business analysis, strategy, agile delivery, leadership and professional soft skills.",
      skills: [
        "Business Analysis",
        "Solution Design",
        "Strategic Planning",
        "Process Improvement",
        "Agile Methodologies",
        "Requirements Gathering",
        "Cross-Functional Collaboration",
        "Stakeholder Management",
        "Change Management",
        "Continuous Improvement",
        "Problem Solving",
        "Leadership",
        "Communication",
        "Analytical Thinking",
        "Teamwork",
        "Time Management",
        "Adaptability",
        "Critical Thinking",
      ],
    },
  ] as SkillGroup[],

  sections: [
    { id: "overview", label: "Overview" },
    { id: "experience", label: "Experience" },
    { id: "projects", label: "Projects" },
    { id: "education", label: "Education" },
    { id: "certifications", label: "Certifications" },
    { id: "skills", label: "Skills" },
    { id: "contact", label: "Contact" },
  ],
};

export type PortfolioData = typeof portfolioData;
