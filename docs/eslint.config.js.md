# ESLint Configuration – `eslint.config.js`

This file is the central linting configuration for the repository.  
It is written in the new **ESLint 8+** module‑style format (ESM) and is tailored for a **TypeScript + React** codebase.

---

## 1. Overview

| Item | Description |
|------|-------------|
| **Purpose** | Enforces consistent coding style, catches bugs early, and guarantees that the code follows the best practices of JavaScript, TypeScript, and React. |
| **Scope** | Applies to all `.ts` and `.tsx` files in the project, while ignoring the compiled output (`dist/`). |
| **Key Features** | • Uses the official ESLint core rules (`@eslint/js`).<br>• Adds TypeScript support via `@typescript-eslint`.<br>• Enforces React‑specific rules for hooks and fast refresh. |

> **Why this file?**  
> Modern projects often use a single, shared ESLint configuration that can be imported by CI pipelines, IDEs, and other tooling. This file is the entry point that pulls together all the rule sets and plugins required for the project.

---

## 2. Detailed Breakdown

```js
import js from '@eslint/js';
import globals from 'globals';
import reactHooks from 'eslint-plugin-react-hooks';
import reactRefresh from 'eslint-plugin-react-refresh';
import tseslint from 'typescript-eslint';
```

* **`@eslint/js`** – The official ESLint core configuration (`recommended`).
* **`globals`** – Provides a set of predefined global variables (e.g., `window`, `document`).
* **`eslint-plugin-react-hooks`** – Lints React hook usage (ensures rules of hooks are followed).
* **`eslint-plugin-react-refresh`** – Lints React Fast Refresh usage (ensures only components are exported for hot‑reload).
* **`@typescript-eslint`** – Adds TypeScript‑specific linting rules.

### Exported Configuration

```js
export default tseslint.config(
  { ignores: ['dist'] },          // 1️⃣ Ignore compiled output
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ['**/*.{ts,tsx}'],     // 2️⃣ Target TypeScript files only
    languageOptions: {
      ecmaVersion: 2020,          // 3️⃣ Enable ES2020 syntax
      globals: globals.browser,   // 4️⃣ Browser globals (window, document, etc.)
    },
    plugins: {
      'react-hooks': reactHooks,
      'react-refresh': reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules, // 5️⃣ React‑hooks recommended rules
      'react-refresh/only-export-components': [
        'warn',
        { allowConstantExport: true },          // 6️⃣ Warn if non‑component is exported
      ],
    },
  }
);
```

| Section | What it does |
|---------|--------------|
| **`ignores`** | Skips linting of the `dist/` folder (build artifacts). |
| **`extends`** | Combines the base ESLint recommended rules with the TypeScript‑specific recommended rules. |
| **`files`** | Restricts the configuration to TypeScript source files (`.ts` & `.tsx`). |
| **`languageOptions`** | Sets the ECMAScript version and declares global variables for the browser environment. |
| **`plugins`** | Registers the React‑hooks and React‑refresh plugins so that their rules can be used. |
| **`rules`** | 1. Inherits all recommended rules from `eslint-plugin-react-hooks`. 2. Adds a custom rule to warn when a non‑React component is exported for Fast Refresh, but allows constant exports (e.g., utility functions). |

> **Why `tseslint.config`?**  
> The `@typescript-eslint` package exposes a helper that merges TypeScript‑specific settings with the base ESLint config, making the file concise and type‑safe.

---

## 3. Integrations

| Component | Interaction |
|-----------|-------------|
| **ESLint CLI / IDE** | The file is automatically discovered by ESLint when running `eslint .` or by IDE extensions (VS Code, WebStorm). |
| **CI/CD Pipelines** | Linting is typically invoked in CI jobs (`npm run lint` or `yarn lint`). The configuration ensures consistent linting across all environments. |
| **Build Process** | The `dist/` ignore rule prevents linting of compiled JavaScript, keeping the build fast. |
| **React Fast Refresh** | The `react-refresh/only-export-components` rule integrates with Next.js or Vite hot‑reload setups, ensuring that only components are exported for HMR. |
| **TypeScript Compiler** | The `@typescript-eslint` plugin works hand‑in‑hand with `tsc`, providing linting that understands TypeScript syntax and types. |
| **Global Variables** | `globals.browser` ensures that linting does not flag browser globals as undefined, which is essential for client‑side code. |

---

## 4. Usage Tips

1. **Adding Custom Rules**  
   ```js
   rules: {
     ...reactHooks.configs.recommended.rules,
     'react-refresh/only-export-components': ['warn', { allowConstantExport: true }],
     'no-console': 'warn', // Example of a custom rule
   }
   ```

2. **Extending Further**  
   If you need additional plugins (e.g., `eslint-plugin-react`), add them to the `plugins` section and extend their recommended configs in the `extends` array.

3. **Running ESLint**  
   ```bash
   npx eslint . --ext .ts,.tsx
   ```

4. **Fixing Issues Automatically**  
   ```bash
   npx eslint . --ext .ts,.tsx --fix
   ```

---

## 5. References

* [ESLint 8+ Config File Format](https://eslint.org/docs/latest/use/configure/configuration-files-new)
* [@typescript-eslint](https://github.com/typescript-eslint/typescript-eslint)
* [eslint-plugin-react-hooks](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-hooks)
* [eslint-plugin-react-refresh](https://github.com/facebook/react/tree/main/packages/eslint-plugin-react-refresh)

---

**End of Documentation**