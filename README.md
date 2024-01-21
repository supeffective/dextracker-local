# SuperEffective Pokédex Tracker

A simple, lightweight, and client-based Pokédex Tracker.

Brought to you by the [SuperEffective](https://supereffective.gg/) team.

![Demo](public/images/twitter-card.jpg)

## Features

- [ ] Add a search guide modal, and (?) icon to the search bar
- [x] Last game's Pokédex as the default
- [ ] Mark all games that you own
- [x] Track all regional Pokédexes, for all main series games
- [x] Track all forms, genders and shiny variants
- [x] Editabe Pokémon data: caught, form gender (m/f/-), shiny
- [x] Search for Pokémon by name, type, color, dex number, etc.
- [ ] View Pokémon basic details such as location, stats, types, and abilities
- [ ] Direct links to well-known Pokémon resource websites
- [x] The main page lists the current progress of all your stored dexes
- [ ] Trainer Cards (Trainer Profiles): a simple page with your name, avatar, short bio, and a list of your favorite
      Pokemon and their Pokeball, and the games you own. Downloadable as image and shareable via link & QR.
- [x] JSON imports/exports for your data, to keep it safe wherever you want
- [ ] Random Shiny Hunting challenge: from all games that you own, this widget will challengee you to hunt a shiny
      Pokémon that you don't own yet.
- [ ] Trade Box: A simple box with 30 slots to store Pokémon (incl. form. gender and shinyness). It is shareable via a
      link, so you can share your box with friends or on social media. The box title and color are editable.
      Unfortunatelly, since this is a client-only webapp, these links can become very large, so we can't guarantee that
      all social media platforms will accept them.

Compared to the original SuperEffective.gg project, this webapp doesn't require a server to run: it stores all your data
locally in your browser's storage. This means you don't need a login, you can use it locally, and you don't have to
worry about your data being stored in an external server.

This webapp is just a Pokédex tracker, not a Living Dex Box Organizer. If you're looking for a Living Dex Box Organizer
check out our main, cloud based project: [supereffective.gg](https://supereffective.gg/).

## TODO (dev)

- [ ] Add homepage dashboard
- [ ] Track Forms/Shinies/Cosmetic Forms should be editable per dex, and also in general (as a default for new dexes)
- [ ] Add placeholders to avoid Cumulative Layout Shifts (CLS)
- [x] Add React router to navigate between dexes (hash router)
- [x] Put filters back together with the main state, or export both stores in the JSON
- [ ] Add a "Mark all as caught" toggle button
- [ ] Add a "Mark all as shiny" toggle button
- [ ] Better icon for Smartphone PWA homescreen
- [x] Better HTTP 404 page
- [ ] Home dex selector should prefill the selections with your latest edited dex
- [ ] Add a "go back home" button to all left drawers that are not in the home page

## Tech Stack

- Node as JS runtime
- PNPM as package manager
- [Vite](https://vite.dev) as dev server and bundler
- `vite-node`` as JS/TS script runner (similar to `tsx`, but compatible with Vite's APIs like `import.meta.env`)
- [React.js + SWC](https://github.com/vitejs/vite-plugin-react-swc) as frontend framework
- SCSS Modules + OpenProps for styling
- TanStack Query + Zustand for state management
- localStorage to persist state
- SuperEffective's CDN for data and images (bundled from https://github.com/supeffective)
- URL as the state for sharing functionality
- Tauri as the desktop app wrapper and build tool
- Github Actions as CI/CD
- Github Pages for deployments

SVG Icons are from lucide.dev and simpleicons.org

## Development

To develop this project, first, you will need Node 20+ and PNPM 8+ or higher installed on your machine. Then, you can
run the following commands after cloning this repository, to get started:

```bash
pnpm install
pnpm make:data
pnpm dev
open http://localhost:1510/
```

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## Acknowledgments

- SciresM, Kurt, Matt and Lewtwo's Asset Archive, for collecting all imagery
- PokeAPI, for providing all the missing pokedexes data
- The Showdown project, for being our main data source
- Serebii, Bulbapedia, for being such valuable resources to the community and this project (we use them to manually
  double check and verify data)
