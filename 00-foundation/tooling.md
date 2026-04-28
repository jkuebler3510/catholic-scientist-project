# Tooling

## TypeScript

`tsconfig.base.json`:

```jsonc
{
  "compilerOptions": {
    "target": "ES2022",
    "lib": ["ES2022", "DOM", "DOM.Iterable"],
    "module": "ESNext",
    "moduleResolution": "Bundler",
    "strict": true,
    "noUncheckedIndexedAccess": true,
    "noImplicitOverride": true,
    "exactOptionalPropertyTypes": true,
    "noFallthroughCasesInSwitch": true,
    "isolatedModules": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "forceConsistentCasingInFileNames": true,
    "resolveJsonModule": true,
    "incremental": true
  }
}
```

Each app/package extends with its own `tsconfig.json`.

## ESLint (flat config, ESLint 9)

`packages/config/eslint.config.js`. Rules baseline:

- `@typescript-eslint/recommended-type-checked`
- `@typescript-eslint/strict-type-checked`
- `eslint-plugin-react` recommended
- `eslint-plugin-react-hooks` recommended
- `eslint-plugin-jsx-a11y` recommended
- `eslint-plugin-tailwindcss` recommended
- `eslint-plugin-import` ordered imports

Custom rules:

- `@typescript-eslint/no-explicit-any: error`
- `@typescript-eslint/consistent-type-imports: error`
- `import/no-cycle: error`

Apps consume the preset via `extends` in their flat config.

## Prettier

`packages/config/prettier.config.js`. Defaults plus:

- `singleQuote: true`
- `trailingComma: 'all'`
- `printWidth: 100`
- `plugins: ['prettier-plugin-tailwindcss']`

## Vitest

`packages/config/vitest.config.ts` exporting a `defineConfig` helper:

- `globals: true`, `environment: 'jsdom'` for component tests.
- Coverage via `v8` reporter; thresholds set per package, not globally (forces deliberate decisions).

## Playwright

`apps/web/playwright.config.ts`:

- Three projects: `chromium`, `firefox`, `webkit`.
- Reporter: `html` locally, `github` in CI.
- `webServer` boots `pnpm dev` on port 3000.
- Tests in `apps/web/e2e/`.

## CI workflow (`.github/workflows/ci.yml`)

Steps on every PR and push to `main`:

1. Checkout
2. Setup pnpm + Node 20 with cache
3. `pnpm install --frozen-lockfile`
4. `pnpm typecheck`
5. `pnpm lint`
6. `pnpm format:check`
7. `pnpm test -- --coverage`
8. (Optional, behind matrix toggle) `pnpm e2e`

Run on Linux latest. Add a job for `pnpm build` to catch build-time errors.

## Husky + lint-staged

Light. One pre-commit hook running lint-staged:

- `*.{ts,tsx,js,jsx}` → `eslint --fix`, `prettier --write`
- `*.{json,md,yml}` → `prettier --write`

Skip `pre-push` and `pre-commit` typecheck — too slow; rely on CI.
