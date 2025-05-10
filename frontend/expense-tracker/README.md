# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript and enable type-aware lint rules. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
# Expense Tracker

An Expense Tracker application built with a **React (Vite)** frontend and a **Node.js/Express** backend. This application allows users to manage their income and expenses, visualize financial data, and download reports.

---

## Features

### Frontend
- Built with **React** and **Vite** for fast development and performance.
- **TailwindCSS** for responsive and modern UI design.
- **Recharts** for data visualization (bar charts, line charts, pie charts).
- **React Router** for navigation.
- **Axios** for API requests.
- **Moment.js** for date formatting.
- **React Toastify** for notifications.

### Backend
- Built with **Node.js** and **Express**.
- **MongoDB** for database storage.
- **Mongoose** for database modeling.
- **JWT Authentication** for secure user access.
- **Multer** for file handling.
- **XLSX** for generating downloadable Excel reports.
- **dotenv** for environment variable management.

---

## Installation

### Prerequisites
- **Node.js** (v16 or later)
- **npm** or **yarn**
- **MongoDB** (local or cloud instance)

---

### Frontend Setup

1. Navigate to the frontend directory:
   ```bash
   cd frontend/expense-tracker

Install dependencies:

npm install

Start the development server:

npm run dev

PORT=5000
MONGO_URI=<your-mongodb-connection-string>
JWT_SECRET=<your-jwt-secret>

npm run devnpm start

frontend/
├── src/
│   ├── components/       # Reusable React components
│   ├── pages/            # Page components
│   ├── utils/            # Utility functions (e.g., API paths, helpers)
│   ├── App.jsx           # Main app component
│   ├── main.jsx          # Entry point
│   └── styles/           # TailwindCSS styles
├── public/               # Static assets
├── [package.json](http://_vscodecontentref_/1)          # Frontend dependencies and scripts
└── vite.config.js        # Vite configuration

backend/
├── controllers/          # Route handlers
├── middleware/           # Authentication and other middleware
├── models/               # Mongoose models
├── routes/               # API routes
├── server.js             # Entry point for the backend
├── [package.json](http://_vscodecontentref_/2)          # Backend dependencies and scripts
└── .env                  # Environment variables