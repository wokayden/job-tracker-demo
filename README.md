# Job Tracker

A desktop application built with **Electron** and **React** to help you track, organize, and analyze your job search.

![Electron](https://img.shields.io/badge/Electron-40-47848F?logo=electron&logoColor=white)
![React](https://img.shields.io/badge/React-19-61DAFB?logo=react&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-5.9-3178C6?logo=typescript&logoColor=white)
![SQLite](https://img.shields.io/badge/SQLite-3-003B57?logo=sqlite&logoColor=white)

---

## Features

### Add Applications

Create new job application entries with details like job title, company name, posting URL, source, and personal notes. Sources include LinkedIn, BuiltIn, Levels.fyi, Indeed, or any custom source you define.

### Track Application Status

Every application flows through a clear pipeline:

```
Applied  ──>  Lead  ──>  Archived
   │                        ▲
   └────────────────────────┘
```

- **Applied** — newly submitted applications
- **Lead** — promising opportunities worth following up on
- **Archived** — closed, rejected, or otherwise concluded applications

All status transitions are recorded with timestamps, giving you a complete history of each application's journey.

### Metrics Dashboard

Get a bird's-eye view of your job search with computed analytics:

| Metric | Description |
|---|---|
| **Total Applications** | Overall count of applications submitted |
| **Current Leads** | Active opportunities in your pipeline |
| **Archived Rate** | Percentage of applications that have been archived |
| **All-Time Lead Rate** | Percentage of applications that became leads at any point |
| **Avg. Days to Status Change** | How quickly applications move through your pipeline |

### Filtered Views

Dedicated pages for each status let you focus on what matters — review your active leads, check recently applied roles, or browse your archive.

---

## Tech Stack

| Layer | Technology |
|---|---|
| **Desktop Shell** | Electron |
| **Frontend** | React, React Router, CSS Modules |
| **Language** | TypeScript |
| **Database** | SQLite (via better-sqlite3) |
| **Build Tool** | Vite + electron-vite |
| **Date Handling** | date-fns |
| **Testing** | Vitest |

---

## Getting Started

### Prerequisites

- **Node.js** (v18 or later recommended)
- **npm**

### Install & Run

```bash
# Install dependencies
npm install

# Start the app in development mode
npm run dev
```

### Build for Production

```bash
npm run build
```

---

## Project Structure

```
src/
├── main/            # Electron main process, IPC handlers, SQLite database
├── preload/         # Secure bridge between main and renderer
├── renderer/        # React app (pages, components, context)
│   └── src/
│       ├── pages/           # ApplicationForm, AppliedList, LeadsList,
│       │                    #   ArchivedList, MetricsDashboard
│       ├── components/      # Sidebar, ApplicationCard, ApplicationList
│       └── context/         # Global application state (React Context)
└── shared/          # Domain models, business logic, IPC channel definitions
```

---

## License

This project is for demonstration purposes.
