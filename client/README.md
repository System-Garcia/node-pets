# 🌐 PIS-Frontend

This is the repository for the frontend of the Project Information System (PIS). It's a web application 🌟 developed with React, using Vite as the build tool and Yarn 🧶 for package management.

## 📋 Prerequisites

This project requires Node.js 🟢 and Yarn 🧶. Make sure you have them installed before proceeding:

- Node.js: [Download Node.js](https://nodejs.org/)

## 🛠️ Installation

To install the project's dependencies, run the following command at the project's root:

```sh
yarn install
```

## ⚙️ Local Configuration

You will need to configure local environment variables before starting the application. Create a `.env.local` file at the root of the project and configure it following the example provided in `.env.example`.

## 🚀 Development

To start the development server, run:

```sh
yarn dev
```

The development server will start, and you can access the application at http://localhost:3000.

## 📘 Storybook

Storybook is an open-source tool for developing UI components in isolation for React, Vue, and Angular. It makes building stunning UIs organized and efficient.

### Starting Storybook

To start the Storybook for component development, run the following command:

```sh
yarn storybook
```

To build a static version of Storybook, which can be deployed to a static hosting service, run:

```sh
yarn build-storybook
```

This will generate a storybook-static directory containing your Storybook as a static web application.

## 🏗️ Building for Production

To build the project for the production environment, run:

```sh
yarn build
```

This command will generate the `dist` directory with the files optimized for production.

## 🧹 Linting

To lint your code with ESLint, run:

```sh
yarn lint
```

This command will help maintain code quality by checking for errors and style issues.

## 🔍 Production Preview

After building your application for production, you can locally preview it before deploying by running:

```sh
yarn preview
```

This will start a local server serving your application from the `dist` directory, allowing you to test the production version in your own environment.
