# `Game2.tsx` – Superhero Finder Page

## 1. Overview
`Game2.tsx` is a **React functional component** that serves as a self‑contained page for searching and displaying superhero data.  
- **Purpose**: Provide a quick, interactive UI for users to look up a superhero by name or fetch a random hero from the [Superhero API](https://superheroapi.com/).  
- **Position in the Architecture**:  
  - **Presentation Layer** – Renders UI elements (input, buttons, hero card).  
  - **Data Layer** – Calls the external API and stores the result in component state.  
  - **Styling** – Uses Tailwind CSS utility classes for a dark‑theme, responsive layout.  
  - **Routing** – Exposed as a page under the `src/pages` directory, typically rendered by a router (e.g., `react-router-dom`).

## 2. Detailed Breakdown

| Section | Description |
|---------|-------------|
| **Imports** | `useState` from React. No external libraries beyond the default fetch API. |
| **Constants** | ```ts<br>const TOKEN = "1014333022960709";<br>const BASE_URL = `https://superheroapi.com/api.php/${TOKEN}`;<br>```<br>• `TOKEN` is the public API key (hard‑coded for demo purposes).<br>• `BASE_URL` is the base endpoint for all requests. |
| **Component State** | ```ts<br>const [hero, setHero] = useState<...>(null);<br>const [searchTerm, setSearchTerm] = useState("");<br>```<br>• `hero` holds the currently displayed superhero data.<br>• `searchTerm` tracks the text input value. |
| **API Helpers** | 1. **`getSuperhero(id: number)`** – Fetches a superhero by numeric ID.<br>2. **`getSearch(name: string)`** – Performs a name‑based search and uses the first result.<br>Both functions: <br>• Use `fetch` to call the API.<br>• Parse JSON and check `data.response === "success"`.<br>• Update `hero` state with `{ name, image, powerstats }`. |
| **UI Elements** | - **Header** – “Superhero Finder” with a blue accent.<br>- **Search Bar** – Text input + “Search” button.<br>- **Random Hero** – Button that triggers `getSuperhero` with a random ID between 1 and 730.<br>- **Hero Card** – Conditionally rendered when `hero` is not null, showing name, image, and key powerstats (Power, Intelligence, Combat). |
| **Styling** | Tailwind CSS utility classes create a dark gradient background, rounded cards, and color‑coded stat labels. |
| **Error Handling** | Errors from `fetch` are logged to the console; no user‑facing error UI is implemented. |

### Key Parameters & Configurations
| Parameter | Type | Default / Notes |
|-----------|------|-----------------|
| `TOKEN` | `string` | Hard‑coded API key. In production, move to environment variables (`process.env.REACT_APP_SUPERHERO_TOKEN`). |
| `BASE_URL` | `string` | Derived from `TOKEN`. |
| `getSuperhero(id)` | `number` | Accepts an integer ID (1‑731). |
| `getSearch(name)` | `string` | Accepts a search query; uses first result. |
| `hero.powerstats` | `any` | Object containing numeric stats (`power`, `intelligence`, `combat`, etc.). |

## 3. Integrations

| Component | Interaction |
|-----------|-------------|
| **React Router** | `Game2` is a page component; it can be imported into a route configuration (`<Route path="/game2" element={<Game2 />} />`). |
| **Superhero API** | External REST API accessed via `fetch`. No authentication beyond the token. |
| **Tailwind CSS** | All styling is done with Tailwind utility classes; the project must have Tailwind configured. |
| **Browser Environment** | Uses the global `fetch` API; no polyfills required in modern browsers. |
| **State Management** | Local component state (`useState`). No external state libraries (Redux, Zustand, etc.) are used. |

### Suggested Enhancements
1. **Environment Variables** – Replace hard‑coded `TOKEN` with `process.env.REACT_APP_SUPERHERO_TOKEN`.  
2. **Loading & Error States** – Add UI feedback while awaiting API responses or when errors occur.  
3. **Pagination / Multiple Results** – Expand `getSearch` to display a list of matching heroes.  
4. **Type Definitions** – Replace `any` for `powerstats` with a proper interface for type safety.  
5. **Accessibility** – Add `aria-labels` and keyboard navigation support.  

---

**File Path**: `src/pages/Game2.tsx`  
**Author**: (Your Name / Team)  
**Last Updated**: 2025‑12‑29
