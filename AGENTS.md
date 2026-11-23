# AGENTS.md

## Project Context

**Sunaq-Atlas** is a standalone, open-source React + Vite interactive audio-visual map of the Kodiak Archipelago built on the Alutiiq Museum's *Kodiak Placenames* (2025) dataset.

Start with `README.md` for local setup, environment variables, data attribution, and project overview.

## Architecture & Decoupling Notes

This repository was migrated off Base44 into a standalone open-source frontend. **Do not** re-add `@base44/sdk`, `@base44/vite-plugin`, or `base44` CLI dependencies.

- Client calls routed through `src/api/base44Client.js` are backed by `src/lib/openSourceSdk.js` using the Adapter pattern so existing component imports remain intact without proprietary backend calls.
- `vite.config.js` aliases `@` to `./src` and redirects any `@base44/sdk` imports to `src/lib/openSourceSdk.js`.

## Key Files

- `src/`: frontend application source (React, Tailwind CSS, shadcn/ui).
- `src/lib/openSourceSdk.js`: open-source drop-in adapter replacing `@base44/sdk`.
- `src/api/base44Client.js`: client initialization wrapper consumed by components.
- `vite.config.js`: standalone Vite configuration and `@/` path aliases.
- `.env` / `.env.local`: local-only environment values (ignored by `.gitignore`; never commit secrets).

## Working Notes

- Use `npm run dev` as the default local development command.
- Use `npm run build` to verify production builds before finishing changes.
- Preserve all cultural attributions, Elder credits, and dataset citations from the Alutiiq Museum (*Kodiak Placenames*, 2025) across the UI and documentation.
- Run the relevant lint and build checks from `package.json` before completing code changes.
