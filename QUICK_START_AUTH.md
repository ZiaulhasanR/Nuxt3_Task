# 🚀 Quick Start Guide - Cookie-Based Authentication

## ⚡ TL;DR

The frontend now uses **httpOnly cookies** for authentication. No more manual token management!

## 🔑 Key Points

1. ✅ **All requests automatically include credentials**
2. ✅ **Cookies are managed by the browser**
3. ✅ **No tokens in localStorage or headers**
4. ✅ **Use the `useAuth()` composable for all auth operations**

## 📦 The `useAuth()` Composable

```javascript
import { useAuth } from "~/composables/useAuth";

const {
  user, // Current user object
  isAuthenticated, // Boolean - is user logged in?
  register, // Function - register new user
  login, // Function - login user
  logout, // Function - logout user
  getProfile, // Function - fetch user profile
  checkAuth, // Function - check auth status
} = useAuth();
```

## 🎯 Common Tasks

### 1. Register a User

```vue
<script setup>
const { register } = useAuth();

const handleRegister = async () => {
  const { success, user, error } = await register({
    name: "John Doe",
    email: "john@example.com",
    password: "password123",
  });

  if (success) {
    // Registration successful
    navigateTo("/Auth/login");
  } else {
    // Handle error
    console.error(error);
  }
};
</script>
```

### 2. Login a User

```vue
<script setup>
const { login } = useAuth();

const handleLogin = async () => {
  const { success, user, error } = await login({
    email: "john@example.com",
    password: "password123",
  });

  if (success) {
    // Login successful
    navigateTo("/");
  } else {
    // Handle error
    console.error(error);
  }
};
</script>
```

### 3. Logout a User

```vue
<script setup>
const { logout } = useAuth();

const handleLogout = async () => {
  await logout();
  navigateTo("/Auth/login");
};
</script>
```

### 4. Check Authentication Status

```vue
<script setup>
const { user, isAuthenticated, checkAuth } = useAuth();

onMounted(async () => {
  await checkAuth();
});
</script>

<template>
  <div v-if="isAuthenticated">
    <p>Welcome, {{ user.name }}!</p>
  </div>
</template>
```

### 5. Display User Info

```vue
<script setup>
const { user, isAuthenticated } = useAuth();
</script>

<template>
  <div v-if="isAuthenticated">
    <h1>{{ user.name }}</h1>
    <p>{{ user.email }}</p>
  </div>
</template>
```

## 🛡️ Protected Pages

To protect a page, check auth status on mount:

```vue
<script setup>
const { isAuthenticated, checkAuth } = useAuth();
const router = useRouter();

onMounted(async () => {
  await checkAuth();

  if (!isAuthenticated.value) {
    router.push("/Auth/login");
  }
});
</script>
```

## 🔧 Making API Requests

Use the existing `useRequest` composable - it's already configured!

```javascript
import { getData, postData } from "~/composables/useRequest";

// GET request
const { data, status, error } = await getData("/products");

// POST request
const { data, status, error } = await postData("/products", {
  name: "Product Name",
  price: 99.99,
});
```

**Note:** All requests automatically include `credentials: 'include'`

## 📋 API Endpoints

| Endpoint             | Method | Body                        | Returns       |
| -------------------- | ------ | --------------------------- | ------------- |
| `/api/auth/register` | POST   | `{ name, email, password }` | `{ user }`    |
| `/api/auth/login`    | POST   | `{ email, password }`       | `{ user }`    |
| `/api/auth/logout`   | POST   | `{}`                        | `{ message }` |
| `/api/auth/profile`  | GET    | -                           | `{ user }`    |

## ⚠️ Important Notes

### ✅ DO:

- Use `useAuth()` for all authentication operations
- Use `useRequest()` for all API calls
- Check `isAuthenticated` to show/hide UI elements
- Call `checkAuth()` on protected pages

### ❌ DON'T:

- Don't manually manage tokens
- Don't store tokens in localStorage
- Don't add Authorization headers manually
- Don't forget `credentials: 'include'` in custom fetch calls

## 🐛 Troubleshooting

### Cookies not being set?

- ✅ Check backend is running on `http://localhost:5000`
- ✅ Check frontend is running on `http://localhost:3000`
- ✅ Check CORS is configured correctly on backend
- ✅ Check browser console for errors

### Authentication not persisting?

- ✅ Verify cookies are present in browser DevTools
- ✅ Check cookie expiration time
- ✅ Ensure `credentials: 'include'` is set

### 401 Unauthorized errors?

- ✅ Call `checkAuth()` to verify authentication
- ✅ Check if cookie is expired
- ✅ Try logging in again

## 🎨 UI Components

### Navbar

The Navbar component automatically:

- Shows "Sign Up" button for guests
- Shows user avatar when authenticated
- Provides dropdown with Profile, Settings, Logout
- Checks auth status on mount

### Auth Pages

- **Signup:** `/Auth/signup`
- **Login:** `/Auth/login`

Both pages are fully functional and integrated with the backend.

## 🧪 Testing

### Test Registration:

1. Go to `/Auth/signup`
2. Fill in name, email, password
3. Click "Submit"
4. Should redirect to `/Auth/login`

### Test Login:

1. Go to `/Auth/login`
2. Enter email and password
3. Click "Sign In"
4. Should redirect to `/`
5. Navbar should show avatar

### Test Logout:

1. Click avatar in navbar
2. Click "Logout"
3. Should redirect to `/Auth/login`
4. Navbar should show "Sign Up"

## 📚 More Information

For detailed documentation, see:

- **`FRONTEND_AUTH_IMPLEMENTATION.md`** - Complete guide
- **`FRONTEND_IMPLEMENTATION_SUMMARY.md`** - Summary of changes
- **`backend_implements.md`** - Backend details

## 💡 Tips

1. **Always use the composable** - Don't reinvent the wheel
2. **Check auth on mount** - For protected pages
3. **Handle errors gracefully** - Show user-friendly messages
4. **Use loading states** - Better UX during async operations
5. **Trust the cookies** - Browser handles them automatically

---

**Happy Coding! 🎉**
