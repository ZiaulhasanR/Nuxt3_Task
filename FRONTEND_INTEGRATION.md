# Frontend Integration Examples

This document provides examples of how to integrate your frontend application with this Express JWT Authentication API.

## Base URL Configuration

The API is configured with a base URL that makes it easy to connect from any frontend framework:

```
BASE_URL=http://localhost:5000/api
```

## Quick Start Examples

### 1. React / Next.js

#### Setup Environment Variables

Create a `.env.local` file in your React/Next.js project:

```bash
NEXT_PUBLIC_API_URL=http://localhost:5000/api
```

#### Create API Service

```javascript
// services/api.js
const API_URL = process.env.NEXT_PUBLIC_API_URL;

export const authService = {
  // Register new user
  async register(name, email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  // Login user
  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  // Get user profile
  async getProfile(token) {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
```

#### Usage in Component

```javascript
// components/LoginForm.jsx
import { useState } from "react";
import { authService } from "../services/api";

export default function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const data = await authService.login(email, password);
      localStorage.setItem("token", data.token);
      console.log("Login successful:", data.user);
    } catch (error) {
      console.error("Login failed:", error);
    }
  };

  return (
    <form onSubmit={handleLogin}>
      <input
        type="email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        placeholder="Email"
      />
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Password"
      />
      <button type="submit">Login</button>
    </form>
  );
}
```

### 2. Vue.js / Nuxt.js

#### Setup Environment Variables

Create a `.env` file in your Vue/Nuxt project:

```bash
VITE_API_URL=http://localhost:5000/api
```

#### Create API Service

```javascript
// services/api.js
const API_URL = import.meta.env.VITE_API_URL;

export const authService = {
  async register(name, email, password) {
    const response = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, email, password }),
    });
    return response.json();
  },

  async login(email, password) {
    const response = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, password }),
    });
    return response.json();
  },

  async getProfile(token) {
    const response = await fetch(`${API_URL}/auth/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    return response.json();
  },
};
```

#### Usage in Component

```vue
<!-- components/LoginForm.vue -->
<template>
  <form @submit.prevent="handleLogin">
    <input v-model="email" type="email" placeholder="Email" />
    <input v-model="password" type="password" placeholder="Password" />
    <button type="submit">Login</button>
  </form>
</template>

<script setup>
import { ref } from "vue";
import { authService } from "../services/api";

const email = ref("");
const password = ref("");

const handleLogin = async () => {
  try {
    const data = await authService.login(email.value, password.value);
    localStorage.setItem("token", data.token);
    console.log("Login successful:", data.user);
  } catch (error) {
    console.error("Login failed:", error);
  }
};
</script>
```

### 3. Vanilla JavaScript

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Login Example</title>
  </head>
  <body>
    <form id="loginForm">
      <input type="email" id="email" placeholder="Email" required />
      <input type="password" id="password" placeholder="Password" required />
      <button type="submit">Login</button>
    </form>

    <script>
      const API_URL = "http://localhost:5000/api";

      document
        .getElementById("loginForm")
        .addEventListener("submit", async (e) => {
          e.preventDefault();

          const email = document.getElementById("email").value;
          const password = document.getElementById("password").value;

          try {
            const response = await fetch(`${API_URL}/auth/login`, {
              method: "POST",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ email, password }),
            });

            const data = await response.json();

            if (response.ok) {
              localStorage.setItem("token", data.token);
              console.log("Login successful:", data.user);
            } else {
              console.error("Login failed:", data.message);
            }
          } catch (error) {
            console.error("Error:", error);
          }
        });
    </script>
  </body>
</html>
```

### 4. Angular

#### Setup Environment

```typescript
// src/environments/environment.ts
export const environment = {
  production: false,
  apiUrl: "http://localhost:5000/api",
};
```

#### Create API Service

```typescript
// services/auth.service.ts
import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from "rxjs";
import { environment } from "../environments/environment";

@Injectable({
  providedIn: "root",
})
export class AuthService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  register(name: string, email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/register`, {
      name,
      email,
      password,
    });
  }

  login(email: string, password: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/auth/login`, {
      email,
      password,
    });
  }

  getProfile(token: string): Observable<any> {
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`,
    });
    return this.http.get(`${this.apiUrl}/auth/profile`, { headers });
  }
}
```

## API Endpoints Reference

All endpoints are prefixed with the `BASE_URL`:

| Endpoint         | Method | Auth Required | Description       |
| ---------------- | ------ | ------------- | ----------------- |
| `/auth/register` | POST   | No            | Register new user |
| `/auth/login`    | POST   | No            | Login user        |
| `/auth/profile`  | GET    | Yes           | Get user profile  |

## Authentication Flow

1. **Register/Login**: Call the register or login endpoint
2. **Store Token**: Save the JWT token from the response (usually in localStorage or a secure cookie)
3. **Authenticated Requests**: Include the token in the Authorization header for protected routes:
   ```
   Authorization: Bearer YOUR_JWT_TOKEN
   ```

## Error Handling

The API returns standard HTTP status codes:

- `200`: Success
- `201`: Created (registration successful)
- `400`: Bad Request (validation error)
- `401`: Unauthorized (invalid credentials or token)
- `404`: Not Found
- `500`: Server Error

Example error response:

```json
{
  "message": "Invalid credentials"
}
```

## CORS Configuration

The backend is configured with CORS enabled, allowing requests from different origins. This means your frontend can run on a different port (e.g., `localhost:3000`) and still communicate with the API on `localhost:5000`.

## Security Best Practices

1. **Never expose tokens in URLs** - Always use headers for authentication
2. **Store tokens securely** - Use httpOnly cookies or secure localStorage
3. **Implement token refresh** - Add refresh token logic for better security
4. **Use HTTPS in production** - Always use secure connections in production
5. **Validate on both sides** - Implement validation on both frontend and backend

## Production Deployment

When deploying to production, update your environment variables:

**Backend (.env):**

```bash
PORT=5000
BASE_URL=https://your-api-domain.com/api
JWT_SECRET=your_production_secret_key
JWT_EXPIRES_IN=1d
MONGO_URI=your_production_mongodb_uri
```

**Frontend:**

```bash
# React/Next.js
NEXT_PUBLIC_API_URL=https://your-api-domain.com/api

# Vue/Nuxt
VITE_API_URL=https://your-api-domain.com/api

# Angular
# Update environment.prod.ts
```

## Testing the Connection

You can test the API connection using cURL:

```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

## Support

For more information, see:

- `README.md` - Full project documentation
- `API_TESTING.md` - Detailed API endpoint documentation
- `IMPLEMENTATION_SUMMARY.md` - Implementation details
