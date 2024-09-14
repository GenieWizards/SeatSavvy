# SeatSavvy

## What's inside?

This SeatSavvy repo includes the following:

### Apps and Packages

- `web`: a [Next.js](https://nextjs.org/) app
- `api`: an [HonoJS](https://hono.dev/) server
- `@seatsavvy/ui`: a React component library
- `@seatsavvy/logger`: PinoJS logger
- `@seatsavvy/eslint-config`: ESLint presets
- `@seatsavvy/typescript-config`: tsconfig.json's used throughout the monorepo
- `@seatsavvy/jest-presets`: Jest configurations

Each package/app is 100% [TypeScript](https://www.typescriptlang.org/).

```bash
# set node version using nvm
nvm use

# Install dependencies
npm install

# To spin services locally (eg: db, mail, etc..,)
docker compose up

# To start all the apps in dev mode
npm run dev
```

Open <http://localhost:3000>.

To shutdown all running containers:

```bash
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
