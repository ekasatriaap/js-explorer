# JS Explorer - Backend

This is the backend service for the JS Explorer application. It is built using
Node.js, Express, TypeScript, and TypeORM. It connects to a MariaDB database to
manage the file and folder structures.

## Tech Stack

- **Node.js**: Runtime environment
- **Express**: Web framework
- **TypeScript**: Typed superset of JavaScript
- **TypeORM**: ORM for database operations
- **MariaDB**: Relational database

## Getting Started

### Prerequisites

- Node.js
- MariaDB

### Installation

1. Install the dependencies:
   ```bash
   npm install
   ```
2. Setup your environment variables by copying `.env.example`:
   ```bash
   cp .env.example .env
   ```
3. Ensure your MariaDB service is running and the database `js_explorer` is
   created.

### Available Scripts

- `npm run dev`: Starts the application in development mode using `nodemon` and
  `ts-node`.
- `npm run build`: Compiles the TypeScript code into the `dist` folder.
- `npm start`: Runs the compiled application from the `dist` folder.
- `npm test`: Runs test suites using Jest.
- `npm run typeorm`: CLI tool for TypeORM.
