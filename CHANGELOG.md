# Changelog

## v1.3.0

[compare changes](https://github.com/supeffective/super-pokedex-tracker/compare/main...v1.3.0)

### 🚀 Enhancements

- New compact layout mode ([7ffd76f](https://github.com/supeffective/super-pokedex-tracker/commit/7ffd76f))

### 🩹 Fixes

- Add node to github CI ([a851ddc](https://github.com/supeffective/super-pokedex-tracker/commit/a851ddc))

### 💅 Refactors

- Replace Bun with PNPM due to windows incompatibility
  ([13dccce](https://github.com/supeffective/super-pokedex-tracker/commit/13dccce))

### ❤️ Contributors

- Javi Aguilar

## v1.2.0

[compare changes](https://github.com/supeffective/super-pokedex-tracker/compare/v1.0.0...v1.2.0)

### 🚀 Enhancements

- Add homepage dex progress and changelog
  ([3905aff](https://github.com/supeffective/super-pokedex-tracker/commit/3905aff))
- Add Remove Dex action and read changelog link
  ([e1c629c](https://github.com/supeffective/super-pokedex-tracker/commit/e1c629c))
- Add home nav buttons ([909d25c](https://github.com/supeffective/super-pokedex-tracker/commit/909d25c))
- Add game/dex selector on homepage ([95ef8da](https://github.com/supeffective/super-pokedex-tracker/commit/95ef8da))

### 🩹 Fixes

- Dont show settings drawer when there is no dex data
  ([6ad3f34](https://github.com/supeffective/super-pokedex-tracker/commit/6ad3f34))
- Show settings on empty state to be able to restore a backup
  ([cb543c4](https://github.com/supeffective/super-pokedex-tracker/commit/cb543c4))

### 💅 Refactors

- Use husky, and the version from package.json. other minor refactorings
  ([5c019e4](https://github.com/supeffective/super-pokedex-tracker/commit/5c019e4))
- More consistent currentDex resolution
  ([caa378c](https://github.com/supeffective/super-pokedex-tracker/commit/caa378c))
- Sticky toolbar and its actions are now more modular and reusable
  ([0786e58](https://github.com/supeffective/super-pokedex-tracker/commit/0786e58))
- Add support for file-based router ala' Nextjs
  ([d3227bf](https://github.com/supeffective/super-pokedex-tracker/commit/d3227bf))
- Improved ErrorBoundary which was not triggered, and allow showing the error layout when throwing a new
  PageNotFoundError ([36a5ed1](https://github.com/supeffective/super-pokedex-tracker/commit/36a5ed1))
- Minor ux improvements and notfound handling
  ([b3a6f75](https://github.com/supeffective/super-pokedex-tracker/commit/b3a6f75))
- Make primitives more cohesive. Btn is now polymorphic
  ([fcbe657](https://github.com/supeffective/super-pokedex-tracker/commit/fcbe657))

### 🏡 Chore

- Generate PWA assets list ([5086e31](https://github.com/supeffective/super-pokedex-tracker/commit/5086e31))

### ❤️ Contributors

- Javi Aguilar
