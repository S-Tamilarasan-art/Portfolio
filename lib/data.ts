// Single source of truth for all portfolio copy.
// Components pull from here so no text is hardcoded in the UI.

export const profile = {
  name: "Tamilarasan Selvakumar",
  role: "Associate Software Engineer",
  tagline:
    "I engineer unbreakable systems — resilient, high-performance platforms architected to scale under pressure and stay online when it matters most.",
  location: "Thanjavur, Tamil Nadu, India",
  email: "tamilarasanselvakumar25@gmail.com",
  phone: "+91 9159412631",
  resume: "/resume",
  linkedin: "https://www.linkedin.com/in/tamilarasan-selvakumar-1b5b79260",
  github: "https://github.com/S-Tamilarasan-art",
  leetcode: "https://leetcode.com/u/S_Tamilarasan",
  devpost: "https://devpost.com/tamilarasant904",
  codewars: "https://www.codewars.com/users/S-Tamilarasan-art",
} as const

export const about = [
  "I'm a full-stack engineer who enjoys turning complex product requirements into clean, maintainable systems. Most of my day is spent shaping microservice backends in Rails and Node, and crafting polished React interfaces on top of them.",
  "I care about performance, developer ergonomics, and details that make software feel effortless. Outside of shipping features, you'll find me sharpening algorithms on LeetCode and Codewars, or prototyping ideas at hackathons.",
]

export type Skill = { name: string; logo: string }

export const skills: Skill[] = [
  { name: "Tailwind CSS", logo: "/logos/tailwindcss.svg" },
  { name: "React.js", logo: "/logos/react.svg" },
  { name: "Next.js", logo: "/logos/nextjs.svg" },
  { name: "Node.js", logo: "/logos/nodejs.svg" },
  { name: "Express.js", logo: "/logos/express.svg" },
  { name: "Git", logo: "/logos/git.svg" },
  { name: "GitHub", logo: "/logos/github.svg" },
  { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
  { name: "Python", logo: "/logos/python.svg" },
  { name: "Rails", logo: "/logos/rails.svg" },
  { name: "Elasticsearch", logo: "/logos/elasticsearch.svg" },
  { name: "Redis", logo: "/logos/redis.svg" },
  { name: "Docker", logo: "/logos/docker.svg" },
  { name: "Azure DevOps", logo: "/logos/azure-devops.svg" },
  { name: "AWS", logo: "/logos/aws.svg" },
]

export type CodingAgent = {
  name: string
  logo: string
}

export const codingAgents: CodingAgent[] = [
  { name: "v0", logo: "/logos/v0.svg" },
  { name: "Claude Code", logo: "/logos/claude-code.svg" },
  { name: "GitHub Copilot", logo: "/logos/github-copilot.svg" },
]

export type Experience = {
  period: string
  company: string
  role: string
  location: string
  type: string
  stack: string
  architecture: string
  project: string
}

export const experience: Experience[] = [
  {
    period: "Jun 2026 – Present",
    company: "Greenbotz Platform Pvt Ltd",
    role: "Associate Software Engineer",
    location: "Coimbatore",
    type: "Full-time · On-site",
    stack: "Tailwind CSS, React, Vite, Ruby on Rails, Docker, Azure DevOps, PostgreSQL, Redis, OpenSearch, Node.js, Express.js",
    architecture: "Microservice backend, monolithic UI",
    project: "Building management system (Biomex)",
  },
  {
    period: "Apr 2026 – Jun 2026",
    company: "Greenbotz Platform Pvt Ltd",
    role: "Full Stack Developer Intern",
    location: "Coimbatore",
    type: "Internship · On-site",
    stack: "Tailwind CSS, React, Vite, Ruby on Rails, Docker, Azure DevOps, PostgreSQL, Redis, OpenSearch, Node.js, Express.js",
    architecture: "Microservice backend, monolithic UI",
    project: "Building management system (Biomex)",
  },
  {
    period: "Nov 2025 – Apr 2026",
    company: "SoftMania Technologies Private Limited",
    role: "Associate Software Engineer Intern",
    location: "Coimbatore",
    type: "Internship · On-site",
    stack: "Tailwind CSS, React, Next.js, Python, AWS",
    architecture: "Cloud-native serverless backend, monolithic UI",
    project: "E-learning platform + Splunk practice environment",
  },
]

export const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "Tools", href: "#tools" },
  { label: "About", href: "#about" },
  { label: "Contact", href: "#contact" },
]
