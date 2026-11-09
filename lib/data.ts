// Single source of truth for all portfolio copy.
// Components pull from here so no text is hardcoded in the UI.

export const profile = {
  name: "Tamilarasan Selvakumar",
  shortName: "Tamilarasan S.",
  role: "Associate Software Engineer",
  status: "Open to full-stack roles",
  intro:
    "I build Rails and Node services and the React interfaces on top of them. Right now that means Biomex, a building management system at Greenbotz.",
  location: "Thanjavur, Tamil Nadu, India",
  email: "tamilarasanselvakumar25@gmail.com",
  phone: "+91 9159412631",
  resume: "/resume.pdf",
  linkedin: "https://www.linkedin.com/in/tamilarasan-selvakumar-1b5b79260",
  github: "https://github.com/S-Tamilarasan-art",
  leetcode: "https://leetcode.com/u/S_Tamilarasan",
  devpost: "https://devpost.com/tamilarasant904",
  codewars: "https://www.codewars.com/users/S-Tamilarasan-art",
} as const

export const about = [
  "I'm a full-stack engineer who enjoys turning complex product requirements into clean, maintainable systems. Most of my day is spent shaping microservice backends in Rails and Node, and building React interfaces on top of them.",
  "I care about performance, developer ergonomics and the details that make software easy to use. Outside of shipping features, you'll find me working through algorithms on LeetCode and Codewars, or prototyping ideas at hackathons.",
]

// `mono` logos are single-color artwork; they are drawn in the current
// text color through a CSS mask so they stay visible in both themes.
export type Skill = { name: string; logo: string; mono?: boolean }

export const skills: Skill[] = [
  { name: "Ruby on Rails", logo: "/logos/rails.svg" },
  { name: "Node.js", logo: "/logos/nodejs.svg" },
  { name: "Express", logo: "/logos/express.svg", mono: true },
  { name: "React", logo: "/logos/react.svg" },
  { name: "Next.js", logo: "/logos/nextjs.svg" },
  { name: "Tailwind CSS", logo: "/logos/tailwindcss.svg" },
  { name: "PostgreSQL", logo: "/logos/postgresql.svg" },
  { name: "Redis", logo: "/logos/redis.svg" },
  { name: "Elasticsearch", logo: "/logos/elasticsearch.svg" },
  { name: "Python", logo: "/logos/python.svg" },
  { name: "Docker", logo: "/logos/docker.svg" },
  { name: "AWS", logo: "/logos/aws.svg", mono: true },
  { name: "Azure DevOps", logo: "/logos/azure-devops.svg" },
  { name: "Git", logo: "/logos/git.svg" },
  { name: "GitHub", logo: "/logos/github.svg" },
]

export const codingAgents: Skill[] = [
  { name: "Claude Code", logo: "/logos/claude-code.svg" },
  { name: "GitHub Copilot", logo: "/logos/github-copilot.svg", mono: true },
  { name: "v0", logo: "/logos/v0.svg" },
]

export type Experience = {
  start: string
  end: string
  company: string
  role: string
  location: string
  type: string
  stack: string[]
  architecture: string
  project: string
}

const greenbotzStack = [
  "React",
  "Vite",
  "Tailwind CSS",
  "Ruby on Rails",
  "Node.js",
  "Express",
  "PostgreSQL",
  "Redis",
  "OpenSearch",
  "Docker",
  "Azure DevOps",
]

export const experience: Experience[] = [
  {
    start: "Jun 2026",
    end: "Present",
    company: "Greenbotz Platform Pvt Ltd",
    role: "Associate Software Engineer",
    location: "Coimbatore",
    type: "Full-time, on-site",
    stack: greenbotzStack,
    architecture: "Microservice backend, monolithic UI",
    project: "Biomex, a building management system",
  },
  {
    start: "Apr 2026",
    end: "Jun 2026",
    company: "Greenbotz Platform Pvt Ltd",
    role: "Full Stack Developer Intern",
    location: "Coimbatore",
    type: "Internship, on-site",
    stack: greenbotzStack,
    architecture: "Microservice backend, monolithic UI",
    project: "Biomex, a building management system",
  },
  {
    start: "Nov 2025",
    end: "Apr 2026",
    company: "SoftMania Technologies Private Limited",
    role: "Associate Software Engineer Intern",
    location: "Coimbatore",
    type: "Internship, on-site",
    stack: ["React", "Next.js", "Tailwind CSS", "Python", "AWS"],
    architecture: "Cloud-native serverless backend, monolithic UI",
    project: "E-learning platform and a Splunk practice environment",
  },
]

export type Platform = {
  label: string
  handle: string
  blurb: string
  href: string
}

export const platforms: Platform[] = [
  { label: "GitHub", handle: "S-Tamilarasan-art", blurb: "Source code and projects", href: profile.github },
  { label: "LinkedIn", handle: "Tamilarasan Selvakumar", blurb: "Career and professional network", href: profile.linkedin },
  { label: "LeetCode", handle: "S_Tamilarasan", blurb: "Data structures and algorithms", href: profile.leetcode },
  { label: "Devpost", handle: "tamilarasant904", blurb: "Hackathon builds", href: profile.devpost },
  { label: "Codewars", handle: "S-Tamilarasan-art", blurb: "Kata practice and ranks", href: profile.codewars },
]

export const navLinks = [
  { label: "Experience", href: "#experience" },
  { label: "Skills", href: "#skills" },
  { label: "About", href: "#about" },
  { label: "Profiles", href: "#profiles" },
  { label: "Contact", href: "#contact" },
]
