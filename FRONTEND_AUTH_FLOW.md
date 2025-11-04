# Frontend Authentication Flow and Code Walkthrough

This document explains how the frontend implements authentication with Axios, React Query, React Hook Form, and protected routes.

## Overview

- Access token is stored in memory (not persisted). It is attached to every request.
- Refresh token is stored in `localStorage` and used to refresh access tokens automatically on 401.
- On app load, the app boots the session by exchanging the refresh token for a fresh access token.
- Logout clears all tokens and redirects to the login page.

## Key Files

- `src/api/client.ts` – Axios instance, token storage, interceptors (401 → refresh), helpers.
- `src/context/AuthContext.tsx` – Auth provider, bootstraps session from refresh token, exposes `login/logout`.
- `src/api/user.ts` – React Query hooks for register/login/logout/profile.
- `src/components/ProtectedRoute.tsx` – Guards protected routes.
- `src/pages/Login.tsx` – React Hook Form + Zod validation.
- `src/pages/SignUp.tsx` – Registration form with error handling.
- `src/App.tsx` – Routing config.

## Axios & Token Management (`api/client.ts`)

- Access token: in-memory variable (`let accessToken: string | null`).
- Refresh token: `localStorage['refreshToken']`.
- Request interceptor: attaches `Authorization: Bearer <accessToken>` when present.
- Response interceptor:
  - On `401`, attempts refresh using the refresh token (unless the request was an auth/public endpoint).
  - On success, retries the original request with a new access token.
  - On failure/no refresh token, clears tokens and redirects to `/login`.

Boot helpers:
- `setAuthTokens(access, refresh)` – sets both tokens.
- `setAccessToken(token)` – sets access only.
- `getRefreshToken()` / `clearTokens()`.

## Auth Context (`context/AuthContext.tsx`)

- `isLoggedIn` is derived from presence of access token (in-memory) + refresh token in storage.
- On mount, if a refresh token exists, calls `/auth/refresh` to get a fresh access token; otherwise stays logged out.
- `login(access, refresh)` stores tokens and sets `isLoggedIn=true`.
- `logout()` clears tokens and hard-navigates to `/login`.

## React Query (`api/user.ts`)

- `useRegister()` – `POST /user/register` → returns `{ message, user }`.
- `useLogin()` – `POST /auth/login` → on success calls `login(accessToken, refreshToken)`.
- `useLogout()` – `POST /auth/logout` → on success calls `logout()`.
- `useProfile()` – `GET /auth/profile` (enabled only when authenticated).

## Protected Routing (`components/ProtectedRoute.tsx`)

- Redirects unauthenticated users to `/login`.
- `App.tsx` config:
  - Public: `/` (Home), `/login`, `/signup`.
  - Protected: `/dashboard` wrapped by `ProtectedRoute`.

## Forms (React Hook Form + Zod)

- `Login.tsx` validates email and password; on success navigates to `/dashboard`.
- `SignUp.tsx` validates and shows server error messages from Axios (`error.response.data.message`).
- If already logged in, both pages redirect to `/dashboard`.

## Environment

Create `.env`:
```
VITE_API_BASE=http://localhost:3000
```

## UX Behavior

- Wrong credentials: stays on Login, shows error, no reload.
- After login: navbar shows “Dashboard”; visiting `/login` or `/signup` redirects to `/dashboard`.
- Refresh expired access token is handled transparently by interceptor.


