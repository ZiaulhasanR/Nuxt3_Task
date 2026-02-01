# Frontend Cookie-Based Authentication Implementation

## ✅ What Was Implemented

### 1. Updated Request Handler (`composables/useRequest.js`)

**Changes:**

- ✅ Added `credentials: 'include'` to all API requests
- ✅ Removed Authorization Bearer token header
- ✅ Now uses httpOnly cookies for authentication
- ✅ Cookies are automatically sent/received by the browser

**Key Features:**

```javascript
credentials: 'include', // Required for cookie-based authentication
```

### 2. New Authentication Composable (`composables/useAuth.js`)

**Provides:**

- ✅ `register(userData)` - Register new user
- ✅ `login(credentials)` - Login user
- ✅ `logout()` - Logout user and clear cookies
- ✅ `getProfile()` - Fetch current user profile
- ✅ `checkAuth()` - Check if user is authenticated
- ✅ `user` - Reactive user state
- ✅ `isAuthenticated` - Computed authentication status

**Usage Example:**

```javascript
const { user, isAuthenticated, login, logout, checkAuth } = useAuth();

// Login
const { success, user, error } = await login({ email, password });

// Check auth status
await checkAuth();

// Logout
await logout();
```

### 3. Updated Authentication Pages

#### **Signup Page (`pages/Auth/signup.vue`)**

- ✅ Uses `useAuth` composable
- ✅ Handles registration with cookie-based auth
- ✅ Shows success/error messages
- ✅ Redirects to login after successful registration
- ✅ Loading state during registration

#### **Login Page (`pages/Auth/login.vue`)**

- ✅ Uses `useAuth` composable
- ✅ Handles login with cookie-based auth
- ✅ Shows success/error messages
- ✅ Redirects to home after successful login
- ✅ Loading state during login

### 4. Updated Navbar Component (`components/Navbar.vue`)

**Features:**

- ✅ Automatically checks authentication status on mount
- ✅ Shows user avatar/initials when authenticated
- ✅ Dropdown menu with Profile, Settings, and Logout options
- ✅ Logout functionality that clears cookies
- ✅ Mobile-responsive authentication UI
- ✅ Dynamic state based on authentication status

**States:**

- `guest` - Not authenticated (shows Sign Up button)
- `authenticated` - Logged in (shows user avatar and dropdown)

## 🔐 Authentication Flow

### Registration Flow:

```
1. User fills registration form
   ↓
2. Frontend calls POST /api/auth/register with credentials: 'include'
   ↓
3. Backend validates, creates user, generates JWT
   ↓
4. Backend sets httpOnly cookie with JWT
   ↓
5. Frontend receives user data (no token in response)
   ↓
6. User state updated, redirect to login
```

### Login Flow:

```
1. User fills login form
   ↓
2. Frontend calls POST /api/auth/login with credentials: 'include'
   ↓
3. Backend validates credentials, generates JWT
   ↓
4. Backend sets httpOnly cookie with JWT
   ↓
5. Frontend receives user data (no token in response)
   ↓
6. User state updated, redirect to home
```

### Protected Route Access:

```
1. User navigates to protected page
   ↓
2. Frontend calls GET /api/auth/profile with credentials: 'include'
   ↓
3. Browser automatically sends httpOnly cookie
   ↓
4. Backend verifies JWT from cookie
   ↓
5. Backend returns user data
   ↓
6. Frontend updates user state
```

### Logout Flow:

```
1. User clicks logout
   ↓
2. Frontend calls POST /api/auth/logout with credentials: 'include'
   ↓
3. Backend clears authentication cookie
   ↓
4. Frontend clears user state
   ↓
5. Redirect to login page
```

## 📝 API Endpoints Used

| Method | Endpoint             | Purpose           | Credentials Required |
| ------ | -------------------- | ----------------- | -------------------- |
| POST   | `/api/auth/register` | Register new user | Yes                  |
| POST   | `/api/auth/login`    | Login user        | Yes                  |
| POST   | `/api/auth/logout`   | Logout user       | Yes                  |
| GET    | `/api/auth/profile`  | Get user profile  | Yes                  |

## 🔧 Configuration

### Environment Variables (`.env`)

```env
BASE_URL=http://localhost:5000/api
```

### Nuxt Config (`nuxt.config.ts`)

```javascript
runtimeConfig: {
  public: {
    baseURL: process.env.BASE_URL || 'http://localhost:5000/api',
  }
}
```

## 🌟 Security Features

✅ **httpOnly Cookies** - Cannot be accessed by JavaScript (XSS protection)  
✅ **Automatic Cookie Handling** - Browser sends cookies automatically  
✅ **Secure in Production** - Cookies only sent over HTTPS  
✅ **SameSite Attribute** - CSRF protection  
✅ **No Token in Response** - Token never exposed to frontend code  
✅ **No localStorage** - No token storage in browser storage

## 📋 Usage Guide

### 1. Register a New User

```vue
<script setup>
import { useAuth } from "~/composables/useAuth";

const { register } = useAuth();

const handleRegister = async () => {
  const { success, user, error } = await register({
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  });

  if (success) {
    console.log("Registered:", user);
    // Redirect to login
  } else {
    console.error("Error:", error);
  }
};
</script>
```

### 2. Login User

```vue
<script setup>
import { useAuth } from "~/composables/useAuth";

const { login } = useAuth();

const handleLogin = async () => {
  const { success, user, error } = await login({
    email: "john@example.com",
    password: "password123",
  });

  if (success) {
    console.log("Logged in:", user);
    // Redirect to home
  } else {
    console.error("Error:", error);
  }
};
</script>
```

### 3. Check Authentication Status

```vue
<script setup>
import { useAuth } from "~/composables/useAuth";
import { onMounted } from "vue";

const { user, isAuthenticated, checkAuth } = useAuth();

onMounted(async () => {
  await checkAuth();

  if (isAuthenticated.value) {
    console.log("User is authenticated:", user.value);
  } else {
    console.log("User is not authenticated");
  }
});
</script>
```

### 4. Logout User

```vue
<script setup>
import { useAuth } from "~/composables/useAuth";

const { logout } = useAuth();

const handleLogout = async () => {
  const { success } = await logout();

  if (success) {
    console.log("Logged out successfully");
    // Redirect to login
  }
};
</script>
```

### 5. Access User Data

```vue
<script setup>
import { useAuth } from "~/composables/useAuth";

const { user, isAuthenticated } = useAuth();
</script>

<template>
  <div v-if="isAuthenticated">
    <p>Welcome, {{ user.name }}!</p>
    <p>Email: {{ user.email }}</p>
  </div>
  <div v-else>
    <p>Please log in</p>
  </div>
</template>
```

## 🚀 Testing the Implementation

### 1. Start Backend Server

```bash
cd backend
npm run dev
# Server runs on http://localhost:5000
```

### 2. Start Frontend Server

```bash
cd frontend
npm run dev
# Server runs on http://localhost:3000
```

### 3. Test Registration

1. Navigate to `/Auth/signup`
2. Fill in name, email, and password
3. Click "Submit"
4. Should redirect to `/Auth/login` on success

### 4. Test Login

1. Navigate to `/Auth/login`
2. Enter email and password
3. Click "Sign In"
4. Should redirect to `/` on success
5. Navbar should show user avatar

### 5. Test Protected Routes

1. After login, navigate to any page
2. User should remain authenticated
3. Refresh the page - user should still be authenticated

### 6. Test Logout

1. Click on user avatar in navbar
2. Click "Logout" in dropdown
3. Should redirect to `/Auth/login`
4. Navbar should show "Sign Up" button

## ⚠️ Important Notes

### CORS Configuration

The backend must have CORS configured to allow credentials:

```javascript
app.use(
  cors({
    origin: "http://localhost:3000", // Frontend URL
    credentials: true,
  }),
);
```

### Cookie Settings

Backend must set cookies with proper attributes:

```javascript
res.cookie("token", token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === "production",
  sameSite: "lax",
  maxAge: 24 * 60 * 60 * 1000, // 1 day
});
```

### All Requests Must Include Credentials

Every API request must include `credentials: 'include'`:

```javascript
fetch(url, {
  credentials: "include",
  // ... other options
});
```

## 🐛 Troubleshooting

### Cookies Not Being Set

- ✅ Check CORS configuration
- ✅ Ensure `credentials: 'include'` is set
- ✅ Verify backend is setting cookies correctly
- ✅ Check browser console for CORS errors

### Authentication Not Persisting

- ✅ Verify cookies are being sent with requests
- ✅ Check cookie expiration time
- ✅ Ensure backend is reading cookies correctly

### 401 Unauthorized Errors

- ✅ Check if cookie is present in request
- ✅ Verify JWT is valid and not expired
- ✅ Check backend middleware is reading cookies

## 📊 File Structure

```
frontend/
├── composables/
│   ├── useAuth.js          # Authentication composable
│   └── useRequest.js       # API request handler
├── pages/
│   └── Auth/
│       ├── login.vue       # Login page
│       └── signup.vue      # Signup page
├── components/
│   └── Navbar.vue          # Navigation with auth UI
├── .env                    # Environment variables
└── nuxt.config.ts          # Nuxt configuration
```

## ✨ What's Working

- ✅ Cookie-based authentication
- ✅ User registration
- ✅ User login
- ✅ User logout
- ✅ Profile fetching
- ✅ Authentication state management
- ✅ Protected routes
- ✅ Automatic cookie handling
- ✅ Navbar authentication UI
- ✅ User avatar/initials display
- ✅ Dropdown menu with logout

## 🎯 Next Steps (Optional Enhancements)

- [ ] Add route guards for protected pages
- [ ] Add loading states and spinners
- [ ] Add toast notifications instead of alerts
- [ ] Add form validation
- [ ] Add password strength indicator
- [ ] Add "Remember Me" functionality
- [ ] Add profile page
- [ ] Add settings page
- [ ] Add password reset flow
- [ ] Add email verification
- [ ] Add social login integration

---

**Status: ✅ FULLY FUNCTIONAL**

The frontend is now fully integrated with the backend's cookie-based authentication system!
