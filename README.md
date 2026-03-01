# JS Explorer

JS Explorer is a web-based file explorer application (a Windows Explorer Clone).
It features a full-stack architecture with a Node.js/Express backend, a Vue 3
frontend, and a MariaDB database. The application provides a split-pane layout
with a recursive folder tree and a content panel to manage and visualize file
structures.

## Installation

You can run this project with or without Docker.

### 1. Installation using Docker (Recommended)

Make sure you have [Docker](https://docs.docker.com/get-docker/) and
[Docker Compose](https://docs.docker.com/compose/install/) installed on your
machine.

1. Clone or download this repository.
2. Open a terminal in the root directory of the project.
3. Run the following command to start all services (Backend, Frontend, and
   MariaDB):
   ```bash
   docker-compose up -d --build
   ```
4. Once the containers are up and running:
   - Frontend is accessible at: `http://localhost:5173`
   - Backend API is accessible at: `http://localhost:3000`
   - MariaDB is accessible on port `3306`

To stop the application, run:

```bash
docker-compose down
```

### 2. Installation without Docker (Manual)

If you prefer to run the project locally without Docker, follow these steps:

#### Prerequisites

- [Node.js](https://nodejs.org/) (v18 or higher recommended)
- [MariaDB](https://mariadb.org/) or MySQL Server

#### Database Setup

1. Create a database named `js_explorer` in your MariaDB/MySQL server.
2. Ensure you have the user `root` with the password `root` (or adjust the
   `.env` file in the backend to match your database credentials).

#### Backend Setup

1. Navigate to the `backend` directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Copy the `.env.example` file to `.env` and adjust the database credentials if
   necessary:
   ```bash
   cp .env.example .env
   ```
4. Run the backend development server:
   ```bash
   npm run dev
   ```
   _The backend will run on `http://localhost:3000`_

#### Frontend Setup

1. Open a new terminal and navigate to the `frontend` directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run the frontend development server:
   ```bash
   npm run dev
   ```
   _The frontend will be accessible at `http://localhost:5173`_

---

For more specific details, please refer to the
[Backend README](./backend/README.md) and
[Frontend README](./frontend/README.md).
