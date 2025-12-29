# `Profile.tsx`

> **Location:** `src/components/Profile.tsx`  
> **Purpose:** Renders a protected user profile page that displays the authenticated user’s information and redirects unauthenticated visitors to the login screen.

---

## 1. Overview

The `Profile` component is a **React functional component** that:

| Feature | Description |
|---------|-------------|
| **Authentication guard** | Uses Firebase Auth’s `onAuthStateChanged` to detect the current user and redirect to `/login` if none is found. |
| **Data fetching** | Retrieves the user’s document from Firestore (`users/{uid}`) once authenticated. |
| **UI** | Shows a loading spinner while data is being fetched, then displays the user’s name, gaming ID, and email inside a styled card. |
| **Animations** | Utilizes `framer-motion` for a rotating spinner and a fade‑in/scale‑up effect on the profile card. |
| **Routing** | Leverages `react-router-dom`’s `useNavigate` for programmatic navigation. |

This component is part of the **frontend presentation layer** and is typically rendered by a protected route (e.g., `/profile`) that requires a logged‑in user.

---

## 2. Detailed Breakdown

### Imports

```tsx
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../firebase";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore";
import { motion } from "framer-motion";
```

| Import | Purpose |
|--------|---------|
| `React`, `useEffect`, `useState` | Core React APIs. |
| `useNavigate` | Programmatic navigation. |
| `auth`, `db` | Firebase Auth & Firestore instances (configured in `../firebase`). |
| `onAuthStateChanged` | Listener for auth state changes. |
| `doc`, `getDoc` | Firestore document reference & fetch. |
| `motion` | Framer‑Motion component for animations. |

### Component State

```tsx
const [user, setUser] = useState<any>(null);
const [loading, setLoading] = useState(true);
```

* `user`: Holds the Firestore document data for the logged‑in user.  
* `loading`: Indicates whether the component is still waiting for auth status or data.

> **Tip:** Replace `any` with a proper TypeScript interface (e.g., `UserProfile`) for type safety.

### `useEffect` – Auth & Data Flow

```tsx
useEffect(() => {
  const unsubscribe = onAuthStateChanged(auth, async (authUser) => {
    if (authUser) {
      const userDoc = await getDoc(doc(db, "users", authUser.uid));
      if (userDoc.exists()) {
        setUser(userDoc.data());
      }
    } else {
      navigate("/login");
    }
    setLoading(false);
  });

  return () => unsubscribe();
}, [navigate]);
```

1. **Auth Listener** – `onAuthStateChanged` fires whenever the user’s authentication state changes.
2. **Authenticated Path**  
   * Fetches the user document from `users/{uid}`.  
   * If the document exists, stores its data in `user`.  
3. **Unauthenticated Path** – Redirects to `/login`.  
4. **Cleanup** – Unsubscribes the listener on component unmount.  
5. **Dependencies** – Only `navigate` is listed; the listener is stable across renders.

### Loading UI

```tsx
if (loading) {
  return (
    <div className="flex justify-center items-center min-h-screen">
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity }}
        className="w-12 h-12 border-t-4 border-purple-500 rounded-full animate-spin"
      />
    </div>
  );
}
```

* A centered, spinning circle (Tailwind + Framer‑Motion) indicates that the profile is being fetched.

### Profile Card

```tsx
<motion.div
  initial={{ opacity: 0, scale: 0.9 }}
  animate={{ opacity: 1, scale: 1 }}
  transition={{ duration: 0.5 }}
  className="p-10 rounded-xl shadow-lg bg-gray-800 border border-purple-500"
>
  <h2 className="text-3xl font-bold text-purple-400 mb-5">Profile</h2>
  <p><strong>Name:</strong> {user?.name}</p>
  <p><strong>Gaming ID:</strong> {user?.gamingId}</p>
  <p><strong>Email:</strong> {user?.email}</p>
</motion.div>
```

* **Animation** – Fade‑in + scale‑up on mount.  
* **Styling** – Tailwind CSS for dark theme and purple accents.  
* **Data Display** – Safely accesses `user` fields with optional chaining.

### Export

```tsx
export default Profile;
```

---

## 3. Integrations

| Component | Interaction | Notes |
|-----------|-------------|-------|
| **Firebase Auth** (`auth`) | Auth state listener (`onAuthStateChanged`) | Requires Firebase SDK initialization in `../firebase`. |
| **Firestore** (`db`) | Reads `users/{uid}` document | Assumes a `users` collection with documents keyed by UID. |
| **React Router** (`useNavigate`) | Redirects unauthenticated users to `/login` | Should be used within a `<Router>` context. |
| **Framer Motion** | Provides loading spinner and card entrance animation | Adds a polished UX feel. |
| **Tailwind CSS** | Styling classes (`bg-gray-900`, `border-purple-500`, etc.) | Project must have Tailwind configured. |

### Suggested Enhancements

1. **Error Handling** – Add try/catch around Firestore fetch and display an error message if it fails.  
2. **Loading State Refinement** – Show a skeleton UI instead of a spinner for a smoother experience.  
3. **TypeScript** – Replace `any` with a typed interface for `user`.  
4. **Security** – Ensure Firestore rules restrict `users/{uid}` reads to the authenticated user.  
5. **Testing** – Unit tests for auth flow and rendering with mocked Firebase services.

---

### Quick Reference

```tsx
// Example of a typed user profile
interface UserProfile {
  name: string;
  gamingId: string;
  email: string;
}
```

With this documentation, developers can quickly understand the purpose, flow, and dependencies of `Profile.tsx`, and can extend or refactor it with confidence.