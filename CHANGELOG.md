# Changelog

## v1.4.0

[compare changes](https://github.com/supeffective/supeffective.com/compare/v1.3.1...v1.4.0)

### 🚀 Enhancements

- Added on/off toggle to track cosmetic forms ([05d93d2](https://github.com/supeffective/supeffective.com/commit/05d93d2))

### 💅 Refactors

- Simplify PWA setup ([4cd55aa](https://github.com/supeffective/supeffective.com/commit/4cd55aa))
- **shiny-mode:** Now, when toggling 'Track Shinies', the shiny mark button will be toggled as well for every pokemon ([16572b0](https://github.com/supeffective/supeffective.com/commit/16572b0))
- **ui:** Improved compact mode styles. caught pokemon are now more visible marked in yellow ([93d0bea](https://github.com/supeffective/supeffective.com/commit/93d0bea))

### 🏡 Chore

- Upgrade deps ([a546e0b](https://github.com/supeffective/supeffective.com/commit/a546e0b))

### ❤️ Contributors

- Javi Aguilar

## v1.3.1

[compare changes](https://github.com/supeffective/supeffective.com/compare/v1.3.0...v1.3.1)

### 🩹 Fixes

- Discord release notification workflow ([33be923](https://github.com/supeffective/supeffective.com/commit/33be923))

### 🏡 Chore

- Add discord webhook to publish a message on release new version ([4fce945](https://github.com/supeffective/supeffective.com/commit/4fce945))
- Upgrade deps ([fdc3fea](https://github.com/supeffective/supeffective.com/commit/fdc3fea))

### ❤️ Contributors

- Javi Aguilar

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
