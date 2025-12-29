# `Signup.tsx`

> **Location:** `src/pages/Signup.tsx`  
> **Purpose:** A React component that renders a user registration form, validates input, creates a new user in Firebase Authentication, sends an email verification, stores user metadata in Firestore, and provides user feedback via toast notifications.

---

## 1. Overview

| Aspect | Description |
|--------|-------------|
| **Component Type** | Functional React component using hooks (`useState`, `useNavigate`). |
| **UI** | Tailwind‑CSS styled form with animated container (`framer-motion`) and icon (`lucide-react`). |
| **Auth Flow** | 1️⃣ Validate Gmail address  <br> 2️⃣ Create user with Firebase Auth  <br> 3️⃣ Send verification email  <br> 4️⃣ Persist user profile in Firestore  <br> 5️⃣ Notify user & redirect. |
| **Error Handling** | Displays inline error messages and maps Firebase error codes to user‑friendly text. |
| **Dependencies** | `react`, `react-router-dom`, `firebase/auth`, `firebase/firestore`, `lucide-react`, `framer-motion`, `react-toastify`. |

This file is the **entry point for new user registration** in the application. It is the only UI that interacts directly with Firebase Auth and Firestore for account creation, making it a critical part of the authentication subsystem.

---

## 2. Detailed Breakdown

### 2.1 Imports

```ts
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { createUserWithEmailAndPassword, sendEmailVerification } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { UserPlus } from "lucide-react";
import { motion } from "framer-motion";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
```

| Import | Purpose |
|--------|---------|
| `react`, `useState` | Core React functionality. |
| `useNavigate`, `Link` | Routing helpers from `react-router-dom`. |
| `createUserWithEmailAndPassword`, `sendEmailVerification` | Firebase Auth APIs. |
| `doc`, `setDoc` | Firestore document creation. |
| `auth`, `db` | Firebase instances exported from `../firebase`. |
| `UserPlus` | Icon component. |
| `motion` | Animation wrapper from `framer-motion`. |
| `toast` | Toast notification system. |

### 2.2 Component State

| State | Type | Purpose |
|-------|------|---------|
| `name` | `string` | User’s display name. |
| `gamingId` | `string` | Optional gaming identifier. |
| `email` | `string` | Email address (must be Gmail). |
| `password` | `string` | Account password. |
| `error` | `string` | Stores validation or Firebase error messages. |

### 2.3 `handleSubmit` Logic

```ts
const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();
  setError("");

  // 1️⃣ Validate Gmail address
  const emailRegex = /^[a-zA-Z0-9._%+-]+@gmail\.com$/;
  if (!emailRegex.test(email)) {
    setError("⚠️ Please enter a valid Gmail address (e.g., example@gmail.com).");
    return;
  }

  try {
    // 2️⃣ Create user
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;

    // 3️⃣ Send verification email
    await sendEmailVerification(user);

    // 4️⃣ Persist profile in Firestore
    await setDoc(doc(db, "users", user.uid), {
      name,
      gamingId,
      email,
      verified: false,
    });

    // 5️⃣ Success toast & redirect
    toast.success("🎉 Signup successful! Please verify your email before logging in.", {
      position: "top-center",
      autoClose: 3000,
    });

    navigate("/");
  } catch (err: any) {
    // 6️⃣ Error mapping
    if (err.code === "auth/email-already-in-use") {
      setError("⚠️ Email is already in use. Try another one.");
    } else if (err.code === "auth/weak-password") {
      setError("⚠️ Password is too weak. Use a stronger password.");
    } else if (err.code === "auth/invalid-email") {
      setError("⚠️ Invalid email format. Please check and try again.");
    } else {
      setError("⚠️ Failed to create account. Please try again.");
    }
  }
};
```

#### Key Points

1. **Email Validation** – Only Gmail addresses are accepted; regex ensures format.  
2. **Firebase Auth** – `createUserWithEmailAndPassword` returns a `UserCredential`.  
3. **Email Verification** – `sendEmailVerification` triggers Firebase’s verification email.  
4. **Firestore** – `setDoc` writes a document under `users/{uid}` with basic profile fields.  
5. **User Feedback** – `react-toastify` displays a success toast; errors are shown inline.  
6. **Navigation** – On success, user is redirected to the home page (`/`).  

### 2.4 UI Structure

- **Container** – Full‑screen flexbox with a gradient background.  
- **Animated Card** – `motion.div` scales in on mount.  
- **Form Fields** – Name, Gaming ID, Email, Password – all required.  
- **Submit Button** – Animated on hover/tap.  
- **Links** – Navigation to `/login` and `/`.  

Styling is handled via Tailwind CSS classes, ensuring a dark‑theme, purple‑accent design.

### 2.5 Error Display

```tsx
{error && (
  <div className="bg-red-600 text-white px-4 py-3 rounded mb-4 text-center">
    {error}
  </div>
)}
```

The error banner appears above the form whenever `error` is non‑empty.

---

## 3. Integrations

| Component | Interaction | Notes |
|-----------|-------------|-------|
| **Firebase Auth** | `createUserWithEmailAndPassword`, `sendEmailVerification` | Requires `auth` instance from `../firebase`. |
| **Firestore** | `setDoc(doc(db, "users", user.uid), {...})` | Stores user profile; `verified` flag set to `false` until email confirmation. |
| **React Router** | `useNavigate`, `<Link>` | Handles navigation after signup and provides links to login/home. |
| **Framer Motion** | `motion.div`, `motion.button` | Adds subtle entrance and button press animations. |
| **React Toastify** | `toast.success` | Provides non‑blocking success notification. |
| **Lucide React** | `<UserPlus>` | Icon displayed next to the heading. |
| **Tailwind CSS** | Class names | Consistent styling across the component. |

### Firebase Configuration (`../firebase`)

The component expects a module that exports initialized `auth` and `db` objects:

```ts
// Example (not part of this file)
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = { /* ... */ };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
```

### Usage

```tsx
import Signup from "./pages/Signup";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup />} />
        {/* other routes */}
      </Routes>
    </BrowserRouter>
  );
}
```

When a user navigates to `/signup`, this component renders the form and handles the entire registration flow.

---

## 4. Summary

`Signup.tsx` is a self‑contained, fully‑styled registration page that:

1. Validates user input (Gmail only).  
2. Creates a Firebase Auth user.  
3. Sends an email verification.  
4. Persists user metadata in Firestore.  
5. Provides immediate UI feedback and navigation.

It serves as the gateway for new users, ensuring that only verified Gmail accounts can register, and stores essential profile data for later use across the application.