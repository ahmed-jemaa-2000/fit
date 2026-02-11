# Repository Guidelines

## Project Structure & Module Organization
This repository is organized around the `liftoff/` application (the active product code). Use `liftoff/src/app` for Next.js App Router pages and API handlers (`liftoff/src/app/api`). Put feature components in `liftoff/src/components`, shared primitives in `liftoff/src/components/ui`, business logic in `liftoff/src/services`, and utilities/integrations in `liftoff/src/lib`. Database schema and scripts live in `liftoff/src/db` and SQL migrations in `liftoff/src/db/migrations`. Tests are in `liftoff/test`, static assets in `liftoff/public`, and localization files in `liftoff/messages`.

## Build, Test, and Development Commands
Run commands from `liftoff/`:

- `npm ci`: install dependencies from `package-lock.json`.
- `npm run dev`: start local development server (Next.js) on port 3000.
- `npm run build`: build production bundle.
- `npm run start`: run the production build.
- `npm run lint`: run ESLint checks.
- `npm test`: run Vitest test suite.
- `npm run test:coverage`: run tests with V8 coverage and HTML output.
- `npm run db:migrate`: apply Drizzle migrations.
- `npm run db:seed`: seed local database data.

## Coding Style & Naming Conventions
TypeScript strict mode is enabled; keep types explicit at API/service boundaries. Follow existing style: 2-space indentation, semicolons, and clear imports. Use `PascalCase` for React components (e.g., `WorkoutEditorModal.tsx`), `use*` naming for hooks (e.g., `useRank.ts`), and kebab-case for service/utility modules (e.g., `workout-log.ts`). Prefer the `@/*` import alias for internal modules (`@/lib/utils`). Run `npm run lint` before pushing.

## Testing Guidelines
Vitest is configured with `jsdom` and Testing Library setup in `liftoff/test/setup.ts`. Name tests `*.test.ts` (examples: `liftoff/test/example.test.ts`, `liftoff/test/exercise-library.test.ts`). Add tests for both main flows and edge cases when changing services, filtering logic, or API behavior. Use `npm test` for quick checks and `npm run test:coverage` for larger feature work.

## Commit & Pull Request Guidelines
Prefer Conventional Commit style used in history (`feat:`, `fix:`, `chore:`, optional scope like `feat(ai): ...`). Keep messages specific and imperative. For pull requests, include:

- concise change summary and motivation;
- linked issue/ticket when available;
- validation evidence (`npm run lint`, `npm test`, and build status);
- screenshots or short recordings for UI changes.

CI runs lint, typecheck, build, and tests on PRs to `main`/`develop`; ensure all checks pass before requesting review.

## Security & Configuration Tips
Do not commit `.env` files or secrets. For local auth/build paths, set `DATABASE_URL`, `NEXTAUTH_SECRET`, and `NEXTAUTH_URL` in local environment files.
