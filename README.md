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

```
# Install dependencies
npm install

# Create a network, which allows containers to communicate
# with each other, by using their container name as a hostname
docker network create seatsavvy_network

# Build prod using new BuildKit engine
COMPOSE_DOCKER_CLI_BUILD=1 DOCKER_BUILDKIT=1 docker-compose -f docker-compose.yml build

# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

Open <http://localhost:3000>.

To shutdown all running containers:

```
# Stop all running containers
docker kill $(docker ps -q) && docker rm $(docker ps -a -q)
```

### Utilities

This Turborepo has some additional tools already setup for you:

- [TypeScript](https://www.typescriptlang.org/) for static type checking
- [ESLint](https://eslint.org/) for code linting
- [Jest](https://jestjs.io) test runner for all things JavaScript
- [Prettier](https://prettier.io) for code formatting
