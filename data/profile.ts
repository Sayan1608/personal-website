export const profile = {
  name: "Sayan Sengupta",
  title: "Java Developer",
  location: "Bengaluru, Karnataka, India",
  email: "subhosen16@gmail.com",
  phone: "7908650179",
  phoneHref: "7908650179",
  linkedIn: "https://www.linkedin.com/in/sayan-sengupta-602b10144",
  github: "https://github.com/Sayan1608?tab=repositories",
  summary: [
    "Passionate and performance-driven Java developer with hands-on experience in building scalable backend systems using Java, Spring Boot, Hibernate, and microservices architecture.",
    "Skilled in designing and developing RESTful APIs and delivering robust, production-ready code. I thrive in collaborative environments and am always eager to take on complex backend challenges that drive business value."
  ]
} as const;

export const skillGroups = [
  { label: "Programming", skills: ["Java"] },
  { label: "Frameworks & persistence", skills: ["Spring Boot", "Hibernate"] },
  { label: "Backend & architecture", skills: ["REST APIs", "Microservices"] }
] as const;

type ExperienceEntry = {
  company: string;
  role: string;
  dateLabel: string;
  additionalRole?: string;
  current?: boolean;
  location?: string;
  description?: string;
};

type EducationEntry = {
  institution: string;
  degree: string;
  field?: string;
  dateLabel?: string;
};

export const experience: ExperienceEntry[] = [
  {
    company: "Infosys",
    role: "Senior Associate Consultant",
    dateLabel: "Apr 2025 — Present",
    current: true
  },
  {
    company: "Descartes Systems Group",
    role: "Software Developer",
    additionalRole: "Junior Software Developer · Java Developer",
    dateLabel: "Apr 2024 — Mar 2025"
  },
  {
    company: "OCR Services Inc.",
    role: "Jr. Software Engineer",
    dateLabel: "Nov 2022 — May 2024",
    location: "Gurugram, Haryana, India",
    description:
      "Software Engineer building insights and developing software solutions for global trade and supply chain management."
  },
  {
    company: "Cognizant",
    role: "Programming Analyst",
    dateLabel: "Dec 2020 — Nov 2022",
    location: "Kolkata, West Bengal, India"
  }
];

export const education: EducationEntry[] = [
  {
    institution: "Meghnad Saha Institute Of Technology (MSIT)",
    degree: "Bachelor of Technology, Electrical, Electronics and Communications Engineering",
    dateLabel: "2016 — 2020"
  },
  {
    institution: "Great Learning",
    degree: "Advanced Certification, Full Stack Web Development",
    field: "Information Technology"
  }
];
