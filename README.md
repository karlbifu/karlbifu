# 👨‍💻 Karl BATUNGUNI BIFU | Professional Portfolio

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-B73BFE?style=for-the-badge&logo=vite&logoColor=FFD62E)
![Framer Motion](https://img.shields.io/badge/Framer_Motion-0055FF?style=for-the-badge&logo=framer&logoColor=white)

> A modern, responsive, and engineering-focused portfolio website built with the MERN ecosystem in mind. Designed to showcase technical expertise in Full Stack Development, System Design, and Computer Engineering.

---

## 🚀 Overview

This project is a single-page application (SPA) built to serve as a digital resume and project showcase. Unlike standard template portfolios, this application emphasizes **engineering best practices**, **scalable architecture**, and **performance**.

It features a custom "Dark Engineering" aesthetic with glassmorphism effects, strict TypeScript-ready folder structures, and robust routing logic.

### ✨ Key Features

- **🎨 Modern UI/UX:** Dark mode default, glassmorphism components, and technical typography (JetBrains Mono + Outfit).
- **📱 Fully Responsive:** Adaptive layout handling mobile, tablet, and ultra-wide desktops.
- **⚡ High Performance:** Powered by Vite for instant HMR and optimized production builds.
- **🧩 Component Architecture:** Atomic design principles with reusable `Button`, `Card`, and `Layout` components.
- **🔍 Filterable Projects:** State-based filtering system for "Frontend", "Backend", and "Full Stack" projects with animations.
- **📊 Tech Stack Dashboard:** A visual representation of technical skills categorized by domain.
- **📧 Serverless Contact Form:** Integrated with **Formspree** for handling emails without a dedicated backend server.
- **🛑 Custom 404 Page:** Graceful error handling for undefined routes.
- **📄 Dynamic Metadata:** Custom hook `usePageTitle` for SEO-friendly dynamic document titles.

---

## 🛠️ Technology Stack

| Category           | Technologies                                            |
| :----------------- | :------------------------------------------------------ |
| **Core Framework** | React 18 (Functional Components + Hooks)                |
| **Build Tool**     | Vite                                                    |
| **Styling**        | Tailwind CSS v3                                         |
| **Animations**     | Framer Motion                                           |
| **Routing**        | React Router DOM v6                                     |
| **Icons**          | React Icons (FontAwesome, SimpleIcons)                  |
| **Forms**          | @formspree/react                                        |
| **Assets**         | Cloudinary (Favicon/Images), Public Folder (Resume PDF) |

---

## 📂 Engineering Architecture

The folder structure follows industry standards for scalability and maintainability:

```text
src/
├── assets/             # Static assets (images handled via imports)
├── components/         # Reusable UI building blocks
│   ├── common/         # Atomic components (Buttons, Inputs)
│   ├── layout/         # Global layout (Navbar, Footer)
│   └── project/        # Feature-specific components (ProjectCard)
├── data/               # Static data layer (JSON/JS objects)
│   ├── projects.jsx    # Project list & metadata
│   └── skills.jsx      # Skill categories & icons
├── hooks/              # Custom React Hooks
│   └── usePageTitle.js # Logic for dynamic document titles
├── pages/              # View/Route components
│   ├── Home.jsx        # Landing page with Hero section
│   ├── About.jsx       # Bio, Education & Resume Download
│   ├── Projects.jsx    # Filterable showcase
│   ├── Skills.jsx      # Tech stack dashboard
│   ├── Contact.jsx     # Formspree integration
│   └── NotFound.jsx    # 404 Error handling
├── App.jsx             # Main Router configuration
└── main.jsx            # Entry point & Global Styles
```

## 👨‍💻 Author

### Karl BIFU

- **Role**: Computer Engineer | Full Stack Developer | AI & ML Engineer | DATA SCIENTIST

- **Focus**: MERN Stack, System Design, Open Source

- **Location**: Kinshasa, Democratic Republic of Congo

- **GitHub**: [@kbbifu](https://github.com/kbbifu "Visit my GitHub profile")

- **LinkedIn**: [Karl BIFU](linkedin.com/in/karlbifu "Visit my GitHub profile")
