# Contributing Guide

Thanks for your interest to contribute to this project. Please take a moment and read through this guide:

## Repository

- We use Bun v1.0.20+ and both the JS runtime and the package manager.
- We use [Convention Commits](https://www.conventionalcommits.org/en/v1.0.0/) for our commit messages.

## Developing

### Quick Start

Here are the basic commands you'll need to get started:

```sh

# Install dependencies
bun install

# Import the necessary data from the CDN
bun make:data

# Start the dev server
bun run dev

# Build dist files
bun build

# Run tests
bun test

# Lint (formatter and linter)
bun lint

```

## Testing

We use `bun` to run tests. You can run all tests with:

```sh
bun test
```

- Tests ending with `*.test.tsx` are considered browser tests and will be run in a browser-like environment.
- Tests ending with `*.test.ts` are considered universal tests and will be run in all environments.
