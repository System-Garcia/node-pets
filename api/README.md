# API Documentation

## Overview
This document provides a detailed overview of the backend architecture for the Lost Pet Finder project, including the technology stack, key dependencies, and development scripts.

## Technology Stack
- **Programming Language**: [Node.js](https://nodejs.org/) with [TypeScript](https://www.typescriptlang.org/), combining the runtime efficiency of Node.js with the type safety of TypeScript.
- **Web Framework**: [Express](https://expressjs.com/) for efficient handling of server requests and responses.
- **Database**: [PostgreSQL](https://www.postgresql.org/) for storing detailed information about lost pets, their owners, and any rewards offered.
- **ORM**: [Prisma](https://www.prisma.io/) for robust database management and migrations.
- **Email Service**: [Nodemailer](https://nodemailer.com/about/) for sending out email notifications.
- **Image Storage**: [Amazon S3](https://aws.amazon.com/s3/) for storing and retrieving images securely and efficiently.

## Key Dependencies
- **`@prisma/client` and `prisma`**: For database management and ORM functionality.
- **`aws-sdk`**: For integrating Amazon S3 storage solutions.
- **`bcryptjs`**: For hashing and securing user passwords.
- **`dotenv` and `env-var`**: For managing environment variables and ensuring configuration security.
- **`express` and related typing packages (`@types/express`)**: For building the server and API routes.
- **`jsonwebtoken` and `@types/jsonwebtoken`**: For handling JWT-based authentication.
- **Development tools like `ts-node-dev`, `typescript`, and `rimraf`** for an efficient development workflow.

## Script Descriptions

Each script in the `package.json` serves a specific purpose in the development and deployment lifecycle of the project:

- **`dev`**:
    ```bash
    "dev": "tsnd --respawn --clear src/app.ts"
    ```
    Starts the development server with TypeScript Node Dev (`tsnd`), which watches for changes and automatically restarts the server. The `--respawn` flag ensures the server restarts on file changes, and `--clear` clears the console between restarts.

- **`build`**:
    ```bash
    "build": "rimraf ./dist && tsc"
    ```
    Clears the existing `dist` directory (if any) using `rimraf` to prevent stale files, then compiles the TypeScript source files to JavaScript using the TypeScript compiler (`tsc`).

- **`start`**:
    ```bash
    "start": "npm run build && node dist/app.js"
    ```
    Runs the `build` script to compile the project, then starts the application from the compiled JavaScript files in the `dist` directory.

- **`prisma:migrate:prod`**:
    ```bash
    "prisma:migrate:prod": "prisma migrate deploy"
    ```
    Deploys Prisma migrations to the production database. This script is essential for applying database schema changes in a production environment.

- **`seed`**:
    ```bash
    "seed": "ts-node-dev ./prisma/seed/seed.ts"
    ```
    Populates the database with initial data using the seeding script located at `./prisma/seed/seed.ts`. Useful for setting up a development database with test or development data.

- **`test`**:
    ```bash
    "test": "echo \"Error: no test specified\" && exit 1"
    ```
    
## Steps for Development

1. **Install dependencies:**
    ```bash
    npm install
    ```

2. **Clone the `.env.template` file and rename it to `.env`.**

3. **Fill in the environment variables accordingly.**

4. **Construct the database with the command:**
    ```bash
    docker compose up -d
    ```

5. **To reset the database, execute the command:**
    ```bash
    npx prisma migrate reset
    ```

6. **Populate the database:**
    ```bash
    npm run seed
    ```

7. **Run for development:**
    ```bash
    npm run dev
    ```
