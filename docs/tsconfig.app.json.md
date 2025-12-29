# `tsconfig.app.json`

> **Location:** Root of the repository (or `src/tsconfig.app.json` in some setups)  
> **Purpose:** TypeScript configuration for the *application* entry‑point – the code that runs in the browser or Node runtime.  
> **Scope:** Only the `src` directory is compiled, and the output is **not** emitted (`noEmit: true`). This file is typically used by build tools such as **Vite**, **Webpack**, or **ESBuild** that consume the TypeScript compiler API.

---

## 1. Overview

`tsconfig.app.json` is a **project‑specific TypeScript configuration** that tailors the compiler for a front‑end React application.  
It is distinct from:

- `tsconfig.base.json` – shared settings for the entire repo (e.g., linting rules, shared libs).  
- `tsconfig.test.json` – configuration for unit tests.  
- `tsconfig.build.json` – configuration used when generating a production bundle.

The file is intentionally minimal yet expressive, enabling:

- **Strict type safety** (`strict`, `noUnused*`, `noFallthroughCasesInSwitch`).  
- **Modern JavaScript output** (`target: ES2020`, `module: ESNext`).  
- **Bundler‑friendly resolution** (`moduleResolution: bundler`, `moduleDetection: force`).  
- **React JSX support** (`jsx: react-jsx`).  

Because `noEmit` is set to `true`, the TypeScript compiler is used only for type checking and linting; the actual JavaScript bundle is produced by the chosen bundler.

---

## 2. Detailed Breakdown

| Section | Key | Value | Explanation |
|---------|-----|-------|-------------|
| **compilerOptions** | `target` | `ES2020` | Emits code that uses ES2020 features (e.g., `Promise.allSettled`, `globalThis`). |
| | `useDefineForClassFields` | `true` | Enables the new ECMAScript proposal for class field initialization (`this.foo = 1` becomes `Object.defineProperty`). |
| | `lib` | `["ES2020", "DOM", "DOM.Iterable"]` | Includes type definitions for the browser environment and ES2020 APIs. |
| | `module` | `ESNext` | Generates native ES module syntax (`import/export`). Bundlers can then tree‑shake and bundle efficiently. |
| | `skipLibCheck` | `true` | Skips type checking of declaration files (`*.d.ts`) to speed up compilation. |
| | **Bundler mode** | | |
| | `moduleResolution` | `bundler` | Tells TypeScript to resolve modules the same way a bundler (Vite, Webpack, etc.) does, supporting features like `import.meta` and custom extensions. |
| | `allowImportingTsExtensions` | `true` | Allows importing `.ts` or `.tsx` files directly (e.g., `import foo from "./foo.ts"`). |
| | `isolatedModules` | `true` | Ensures each file can be transpiled independently – a requirement for Babel or SWC. |
| | `moduleDetection` | `force` | Forces the compiler to treat all files as modules, even if they lack top‑level `import`/`export`. |
| | `noEmit` | `true` | Disables JavaScript output; the bundler handles emission. |
| | `jsx` | `react-jsx` | Uses the new JSX transform (React 17+), eliminating the need to import `React` in every file. |
| | **Linting** | | |
| | `strict` | `true` | Enables all strict type‑checking options (`noImplicitAny`, `strictNullChecks`, etc.). |
| | `noUnusedLocals` | `true` | Errors on variables that are declared but never used. |
| | `noUnusedParameters` | `true` | Errors on function parameters that are never referenced. |
| | `noFallthroughCasesInSwitch` | `true` | Prevents accidental fall‑through in `switch` statements. |
| **include** | `["src"]` | | Only files under `src/` are considered part of this project. |

### Why These Settings Matter

- **Modern Target & Module** – Keeps the bundle lean and leverages native browser features.  
- **Bundler‑Friendly Options** – Aligns TypeScript’s module resolution with the bundler’s logic, preventing duplicate or missing imports.  
- **Strict Linting** – Helps catch bugs early and maintain a clean codebase.  
- **No Emit** – Avoids double‑generation of JavaScript, letting the bundler handle optimizations like minification and code splitting.

---

## 3. Integrations

| Component | Interaction | Notes |
|-----------|-------------|-------|
| **Vite / Webpack / ESBuild** | Reads `tsconfig.app.json` via the `tsconfig` option or automatically if present. | The bundler uses the compiler options to type‑check and transpile files on the fly. |
| **ESLint / TypeScript ESLint** | Uses `tsconfig.app.json` as the base for `parserOptions.project`. | Ensures linting rules are consistent with compiler settings. |
| **Jest / Vitest** | May reference this config for test compilation or use a separate `tsconfig.test.json`. | If tests import application code, they inherit the same strictness. |
| **Storybook** | Loads the same `tsconfig.app.json` to type‑check stories. | Keeps component stories typed the same way as the app. |
| **CI Pipeline** | `tsc --noEmit -p tsconfig.app.json` is run to validate types before building. | Guarantees that type errors are caught early. |
| **Code Editor (VS Code)** | Uses the file for IntelliSense, auto‑imports, and error highlighting. | Provides a consistent developer experience. |

---

### Typical Build Flow

1. **Type Checking** – `tsc --noEmit -p tsconfig.app.json` runs in CI to catch type errors.  
2. **Bundling** – Vite/Webpack reads the same config to transpile and bundle the app.  
3. **Testing** – Tests import the same modules; the bundler or test runner uses the config for type safety.  
4. **Deployment** – The final bundle is produced by the bundler, respecting the `module` and `target` settings.

---

## 4. Quick Reference

```json
{
  "compilerOptions": {
    "target": "ES2020",
    "module": "ESNext",
    "jsx": "react-jsx",
    "moduleResolution": "bundler",
    "isolatedModules": true,
    "noEmit": true,
    "strict": true,
    "noUnusedLocals": true,
    "noUnusedParameters": true,
    "noFallthroughCasesInSwitch": true
  },
  "include": ["src"]
}
```

- **Add a new library**: Create a separate `tsconfig.lib.json` that extends this file but sets `declaration: true` and `noEmit: false`.  
- **Change target**: Update `target` to `ES2022` if you need newer language features.  
- **Disable strictness**: Remove `strict` or set individual flags to `false` for legacy code.

---

### Summary

`tsconfig.app.json` is the *single source of truth* for how the application’s TypeScript code is compiled, type‑checked, and integrated with modern bundlers. It enforces a strict, modern, and bundler‑friendly environment, ensuring that developers receive immediate feedback on type errors while the build pipeline remains fast and efficient.