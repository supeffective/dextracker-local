# Contributing Guide

Thanks for your interest to contribute to this project. Please take a moment and read through this guide:

## Repository

- We use Node JS 20+ LTS and PNPM 8+
- We use [Convention Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages.

## Developing

### Quick Start

Here are the basic commands you'll need to get started:

```sh

# Install dependencies
pnpm install

# Import the necessary data from the CDN
pnpm make:data

# Start the dev server
pnpm run dev

# Build dist files
pnpm build

# Run tests
pnpm test

# Lint (formatter and linter)
pnpm lint

```

## Testing

We use `jest` to run tests. You can run all tests with:

```sh
pnpm test
```

- Tests ending with `*.test.tsx` are considered browser tests and will be run in a browser-like environment.
- Tests ending with `*.test.ts` are considered universal tests and will be run in all environments.
