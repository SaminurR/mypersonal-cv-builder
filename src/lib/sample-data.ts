import type { CVData } from "../types/cv";

export const sampleData: CVData = {
  sections: [
    { id: "header", title: "Header", visible: true, order: 0 },
    { id: "summary", title: "About Me", visible: true, order: 1 },
    { id: "experience", title: "Work Experience", visible: true, order: 2 },
    { id: "skills", title: "Skills", visible: true, order: 3 },
    { id: "education", title: "Education", visible: true, order: 4 },
    { id: "projects", title: "Projects", visible: true, order: 5 },
    { id: "languages", title: "Languages", visible: true, order: 6 },
    { id: "certificates", title: "Certificates", visible: true, order: 7 },
    
    { id: "references", title: "References", visible: false, order: 8 },
    { id: "hobbies", title: "Interests", visible: false, order: 9 },
    { id: "custom", title: "Awards", visible: false, order: 8 },
  ],

  header: {
    fullName: "Alex Johnson",
    title: "Senior Frontend Engineer",
    photoUrl: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    contacts: [
      {
        id: "c1",
        icon: "mail",
        label: "Email",
        value: "alex@example.com",
        url: "mailto:alex@example.com",
      },
      {
        id: "c2",
        icon: "phone",
        label: "Phone",
        value: "+1 555-0123",
        url: "tel:+15550123",
      },
      {
        id: "c3",
        icon: "map-pin",
        label: "Location",
        value: "San Francisco, CA",
        url: "",
      },
      {
        id: "c4",
        icon: "linkedin",
        label: "LinkedIn",
        value: "linkedin.com/in/alexj",
        url: "https://linkedin.com/in/alexj",
      },
      {
        id: "c5",
        icon: "github",
        label: "GitHub",
        value: "github.com/alexj",
        url: "https://github.com/alexj",
      },
    ],
  },

  summary: {
    text: "Passionate frontend engineer with 6+ years of experience building modern web applications. I specialize in React, TypeScript, and design systems. I love crafting pixel-perfect user interfaces and optimizing performance. When I'm not coding, you'll find me exploring new JavaScript frameworks or contributing to open-source projects.",
  },

  experience: {
    items: [
      {
        id: "exp1",
        company: "TechCorp Inc.",
        position: "Senior Frontend Engineer",
        location: "San Francisco, CA",
        startDate: "2022-01",
        endDate: "",
        years: "3 years",
        bullets: [
          "Led migration from legacy jQuery codebase to React + TypeScript",
          "Built a component library used across 5 product teams",
          "Improved Core Web Vitals scores by 40% through performance optimization",
        ],
      },
      {
        id: "exp2",
        company: "WebStudio",
        position: "Frontend Developer",
        location: "Austin, TX",
        startDate: "2019-06",
        endDate: "2021-12",
        years: "2.5 years",
        bullets: [
          "Developed responsive dashboards for analytics products",
          "Implemented real-time data visualization with D3.js and WebSockets",
          "Mentored 3 junior developers and led code review sessions",
        ],
      },
    ],
  },

  skills: {
    groups: [
      {
        id: "sg1",
        title: "Programming",
        levelMode: "number",
        barStyle: "thick",
        showLevelLabel: true,
        accentColorOverride: "",
        customTextLevels: [
          "Beginner",
          "Intermediate",
          "Good",
          "Closer to Expert",
          "Expert",
        ],
        items: [
          { id: "sk1", name: "TypeScript", level: 90 },
          { id: "sk2", name: "React", level: 95 },
          { id: "sk3", name: "JavaScript", level: 92 },
          { id: "sk4", name: "Node.js", level: 70 },
          { id: "sk5", name: "Python", level: 50 },
        ],
      },
      {
        id: "sg2",
        title: "Design Tools",
        levelMode: "text",
        barStyle: "segmented",
        showLevelLabel: true,
        accentColorOverride: "#8b5cf6",
        customTextLevels: [
          "Beginner",
          "Intermediate",
          "Good",
          "Closer to Expert",
          "Expert",
        ],
        items: [
          { id: "sk6", name: "Figma", level: 80 },
          { id: "sk7", name: "Adobe XD", level: 60 },
          { id: "sk8", name: "Sketch", level: 40 },
        ],
      },
    ],
  },

  education: {
    items: [
      {
        id: "edu1",
        institution: "University of California, Berkeley",
        degree: "Bachelor of Science",
        field: "Computer Science",
        startDate: "2015-09",
        endDate: "2019-05",
        description:
          "Dean's List all semesters. Focused on HCI and web technologies.",
      },
    ],
  },

  projects: {
    items: [
      {
        id: "proj1",
        name: "Component Library",
        description:
          "Open-source React component library with 50+ accessible components and full TypeScript support.",
        url: "https://github.com/alexj/component-lib",
        technologies: ["React", "TypeScript", "Storybook", "Jest"],
      },
      {
        id: "proj2",
        name: "Dashboard Builder",
        description:
          "Drag-and-drop dashboard builder with real-time data connectors and chart widgets.",
        url: "https://github.com/alexj/dash-builder",
        technologies: ["React", "D3.js", "WebSocket", "Tailwind CSS"],
      },
    ],
  },

  languages: {
    items: [
      { id: "lang1", language: "English", proficiency: "Native" },
      { id: "lang2", language: "Spanish", proficiency: "Conversational" },
      { id: "lang3", language: "Japanese", proficiency: "Basic (N4)" },
    ],
  },

  certificates: {
    items: [
      {
        id: "cert1",
        name: "AWS Certified Cloud Practitioner",
        issuer: "Amazon Web Services",
        date: "2023-03",
        url: "https://aws.amazon.com/certification",
      },
    ],
  },

  references: { items: [] },
  hobbies: { items: [] },
  custom: {
    sectionTitle: "Awards",
    items: [
      {
        id: "cust1",
        title: "Best Frontend Project",
        subtitle: "TechCorp Hackathon",
        date: "2023",
        description: "Won first place for building an AI-powered code reviewer.",
      },
    ],
  },

  settings: {
    pageBgColor: "#ffffff",
    textColor: "#334155",
    headingColor: "#0f172a",
    subheadingColor: "#334155",
    mutedColor: "#64748b",
    accentColor: "#2563eb",
    fontFamily: "Inter",
    fontSizeScale: 1,
    spacing: "normal",
    layout: "single",
    sidebarWidth: 35,
    pageMargin: 32,
    barCornerStyle: "rounded",
    barThickness: 6,
    headingStyle: "uppercase",
    dateFormat: "MMM YYYY",
    bulletStyle: "disc",
    showPhoto: false,
    photoPosition: "right",
    photoShape: "circle",
    photoSize: 80,
    borderRadius: 4,
    headerAlignment: "center",
    template: "minimal",
  },
};
