# Firebase Configuration – `src/firebase.ts`

This module is the single source of truth for initializing and exposing Firebase services used throughout the application. It encapsulates the Firebase SDK setup and provides ready‑to‑use instances of **Auth** and **Firestore** that other parts of the codebase can import.

---

## 1. Overview

| Item | Description |
|------|-------------|
| **Purpose** | Bootstrap Firebase for the app and expose the authentication and database services. |
| **Location** | `src/firebase.ts` – a central, reusable module. |
| **Scope** | Only contains initialization logic; no business logic or UI code. |
| **Usage** | Import `auth` and `db` wherever Firebase functionality is required (e.g., in components, hooks, or services). |

By keeping the Firebase configuration in a dedicated file, we:

- **Centralize credentials** – easier to update or rotate keys.
- **Promote reusability** – any module can import the same `auth`/`db` instances.
- **Simplify testing** – mock `auth`/`db` in unit tests.

---

## 2. Detailed Breakdown

```ts
import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
```

- **Imports**: Pulls the core Firebase app initializer and the specific services we need (Auth & Firestore).

```ts
const firebaseConfig = {
  apiKey: "AIzaSyDTXS1YtxDRu9NNTsfzUSwrrF-8R1FkgHM",
  authDomain: "mygameapp-1dff7.firebaseapp.com",
  projectId: "mygameapp-1dff7",
  storageBucket: "mygameapp-1dff7.firebasestorage.app",
  messagingSenderId: "1077127069070",
  appId: "1:1077127069070:web:7e1765122a17a300c8f8df"
};
```

- **Configuration Object**: Holds the Firebase project credentials.  
  - `apiKey` – Public key for client‑side SDK usage.  
  - `authDomain` – Domain used for Firebase Authentication.  
  - `projectId` – Unique identifier for the Firebase project.  
  - `storageBucket` – Cloud Storage bucket for file uploads.  
  - `messagingSenderId` – Identifier for Firebase Cloud Messaging.  
  - `appId` – Unique identifier for the app instance.

> **Security Note**: These values are safe to expose in client‑side code because they are public keys. However, sensitive operations should still be protected on the server side.

```ts
const app = initializeApp(firebaseConfig);
```

- **App Initialization**: Creates a singleton Firebase app instance using the provided config.

```ts
export const auth = getAuth(app);
export const db = getFirestore(app);
```

- **Service Exports**:  
  - `auth` – Firebase Authentication instance for sign‑in, sign‑out, and user state management.  
  - `db` – Firestore instance for CRUD operations on the database.

These exports are **named** so that they can be imported explicitly:

```ts
import { auth, db } from '@/firebase';
```

---

## 3. Integrations

| Component | Interaction | Purpose |
|-----------|-------------|---------|
| **Auth Hooks / Context** | `auth` | Provides current user, login, logout, and auth state listeners. |
| **Data Services** | `db` | Executes queries, writes, and listens to real‑time updates for game data. |
| **Storage Utilities** | `firebaseConfig.storageBucket` (via `getStorage`) | Handles file uploads/downloads (not directly used in this file). |
| **Server‑Side Rendering (SSR)** | `initializeApp` | Can be called in API routes or server functions to access Firebase services. |
| **Testing** | Mock `auth`/`db` | Allows unit tests to replace Firebase with in‑memory or mock implementations. |

> **Typical Flow**  
> 1. **User signs in** → `auth` handles authentication.  
> 2. **App fetches data** → `db` queries Firestore collections.  
> 3. **Data updates** → `db` writes or listens for changes, triggering UI updates.

---

## 4. Best Practices & Recommendations

1. **Environment Variables**  
   - Move the `firebaseConfig` values to environment variables (`.env`) and load them with `import.meta.env` or `process.env`.  
   - Example: `apiKey: import.meta.env.VITE_FIREBASE_API_KEY`.

2. **Singleton Pattern**  
   - The file already ensures a single Firebase app instance. Avoid calling `initializeApp` multiple times.

3. **Error Handling**  
   - Wrap `initializeApp` in a try/catch if you anticipate misconfiguration or network issues.

4. **Version Pinning**  
   - Keep Firebase SDK versions up to date in `package.json` and monitor breaking changes.

5. **Security Rules**  
   - Ensure Firestore and Storage security rules are properly configured to restrict access based on `auth` state.

---

## 5. Example Usage

```ts
// src/hooks/useUser.ts
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';

export function useUser() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return unsubscribe;
  }, []);

  return user;
}
```

```ts
// src/services/gameData.ts
import { collection, getDocs } from 'firebase/firestore';
import { db } from '@/firebase';

export async function fetchGames() {
  const snapshot = await getDocs(collection(db, 'games'));
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}
```

---

### Summary

`src/firebase.ts` is the cornerstone of the app’s Firebase integration. It cleanly separates configuration from usage, enabling consistent access to authentication and Firestore across the codebase while keeping the initialization logic in one place. By following the best practices above, you can maintain a secure, scalable, and maintainable Firebase setup.