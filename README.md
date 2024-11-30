# 🎵 Spotify Clone

## 🌐 Live Demo

Explore the live demonstration of the project: [spotify-clone](https://spotify-clone-1ezt.onrender.com/)

![Spotify Clone Preview](/frontend/public/images/demo.png)
![Spotify Clone Preview 2](/frontend/public/images/demo1.png)
![Spotify Clone Preview 3](/frontend/public/images/demo2.png)

Welcome to Spotify Clone! This project replicates the core functionalities of Spotify, allowing users to stream music, upload songs, and interact in real-time. Built using modern web technologies for a seamless and responsive experience.

## 🚀 Features

- 🎨 **Frontend**: React with Vite and TypeScript for performance and scalability.
- 🎨 **Styling**: Tailwind CSS with Shadcn/UI for a visually stunning interface.
- 🛠️ **Backend**: Node.js for handling server-side logic and APIs.
- 🌩️ **Real-Time**: Socket.IO for live messaging.
- 🖼️ **File Management**: React Dropzone for file uploads and Cloudinary for storing images and music files.
- 🐻 **State Management**: Zustand for a simple and efficient state layer.
- ✨ **Code Quality**: ESLint and Prettier for consistent and clean code.

## 📂 Project Structure

```plaintext
spotify-clone/
├── backend/                # Backend server
│   ├── src/                # Backend source code
│   │   ├── controller/     # API controllers
│   │   ├── lib/            # Libraries and utilities
│   │   ├── middleware/     # Express middlewares
│   │   ├── models/         # Data models
│   │   ├── routes/         # API routes
│   │   ├── seeds/          # Data seeding scripts
│   │   └── index.js        # Backend entry point
│   ├── tmp/                # Temporary files
│   ├── .env                # Backend environment variables
│   ├── package.json        # Backend metadata and scripts
│   └── package-lock.json   # Dependency lock file
├── frontend/               # Frontend application
│   ├── dist/               # Production build files
│   ├── public/             # Public static files
│   ├── src/                # Frontend source code
│   │   ├── components/     # Reusable UI components
│   │   ├── fonts/          # Custom fonts
│   │   ├── interfaces/     # Type definitions and interfaces
│   │   ├── layouts/        # Reusable layout components
│   │   ├── lib/            # Shared utilities
│   │   ├── pages/          # Main application pages
│   │   ├── router/         # Application routing configuration
│   │   ├── store/          # Global state management (Zustand)
│   │   ├── App.tsx         # Main React component
│   │   ├── index.css       # Global styles
│   │   ├── main.tsx        # Frontend entry point
│   │   └── vite-env.d.ts   # Custom TypeScript definitions for Vite
│   ├── .env.local          # Frontend environment variables
│   ├── .gitignore          # Git ignored files
│   ├── components.json     # Component metadata
│   ├── eslint.config.json  # ESLint configuration
│   ├── index.html          # HTML template
│   ├── package-lock.json   # Dependency lock file
│   ├── package.json        # Frontend metadata and scripts
│   ├── postcss.config.js   # PostCSS configuration
│   ├── README.md           # Project documentation
│   ├── tailwind.config.js  # Tailwind CSS configuration
│   ├── tsconfig.app.json   # TypeScript configuration for the app
│   ├── tsconfig.json       # TypeScript configuration
│   ├── tsconfig.node.json  # TypeScript configuration for Node.js
│   └── vite.config.ts      # Vite configuration

```

## 🛠️ Technologies Used

| **Technology**    | **Purpose**             |
| ----------------- | ----------------------- |
| React & Vite      | Frontend framework      |
| TypeScript        | Static typing           |
| Tailwind CSS      | Styling                 |
| Shadcn/UI         | UI component library    |
| Node.js           | Backend runtime         |
| Socket.IO         | Real-time messaging     |
| Cloudinary        | Image and music storage |
| React Dropzone    | File uploads            |
| Zustand           | State management        |
| ESLint & Prettier | Code quality tools      |

## 🛠️ Getting Started

### Prerequisites

- Node.js (v22+ recommended)
- npm

### Installation

1. Clone the repository:

   ```sh
   git clone https://github.com/crist-pereyra/spotify-clone.git
   cd spotify-clone
   ```

2. Install dependencies:
   ```sh
   cd backend
   npm install
   cd ..
   cd frontend
   npm install
   ```

### Running the App

1. Start the backend server:

   ```sh
   cd backend
   npm run dev
   ```

2. Start the frontend development server:

   ```sh
   cd ..
   cd frontend
   npm run dev
   ```

3. Open [http://localhost:5173](http://localhost:5173) in your browser.
