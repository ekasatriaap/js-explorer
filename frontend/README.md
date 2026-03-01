# JS Explorer - Frontend

This is the frontend application for JS Explorer, a web-based file explorer
interface. It is built with Vue 3, Vite, Tailwind CSS, and Pinia.

## Tech Stack

- **Vue 3**: Progressive JavaScript framework
- **Vite**: Next-generation frontend tooling
- **Tailwind CSS**: Utility-first CSS framework for styling
- **Pinia**: State management pattern and library for Vue
- **TypeScript**: Static typing for robust code

## Getting Started

### Prerequisites

- Node.js
- Backend API running (either via Docker or manually)

### Installation

1. Install dependencies:
   ```bash
   npm install
   ```

### Available Scripts

- `npm run dev`: Starts the Vite development server. By default, it runs on
  `http://localhost:5173`.
- `npm run build`: Type-checks and builds the app for production.
- `npm run preview`: Locally previews the production build.

## Environment Variables

The application uses the `VITE_API_URL` variable to connect to the backend API.
If you are running locally without Docker, Vite will proxy or you can define it
in a `.env` file:

```env
VITE_API_URL=http://localhost:3000/api/v1
```
