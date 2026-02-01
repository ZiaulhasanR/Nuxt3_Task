# Migration Notes - Cookie-Based Authentication

## 🔄 What Changed

The authentication system has been migrated from **localStorage token-based** to **httpOnly cookie-based** authentication.

## 📝 Breaking Changes

### 1. Token Storage

- **Before:** Tokens stored in `localStorage`
- **After:** Tokens stored in httpOnly cookies (managed by browser)

### 2. Authorization Header

- **Before:** Manual `Authorization: Bearer <token>` header
- **After:** Automatic cookie inclusion with `credentials: 'include'`

### 3. Authentication Flow

- **Before:** Manual token management
- **After:** Automatic cookie management by browser

## 🗑️ Deprecated Files

### `composables/accessToken.js`

- **Status:** No longer used
- **Reason:** Tokens are now in httpOnly cookies, not localStorage
- **Action:** Can be safely deleted (kept for reference)

## 🔧 Migration Steps

If you have existing code using the old authentication system:

### 1. Replace Token Storage

**Before:**

```javascript
// Storing token
localStorage.setItem("token", token);

// Getting token
const token = localStorage.getItem("token");

// Removing token
localStorage.removeItem("token");
```

**After:**

```javascript
// No manual token management needed!
// Cookies are automatically managed by the browser
```

### 2. Replace API Calls

**Before:**

```javascript
const token = localStorage.getItem("token");
fetch(url, {
  headers: {
    Authorization: `Bearer ${token}`,
  },
});
```

**After:**

```javascript
import { getData } from "~/composables/useRequest";
const { data } = await getData(url);
// Cookies automatically included!
```

### 3. Replace Auth Logic

**Before:**

```javascript
// Login
const response = await fetch("/api/auth/login", {
  method: "POST",
  body: JSON.stringify({ email, password }),
});
const { token, user } = await response.json();
localStorage.setItem("token", token);

// Logout
localStorage.removeItem("token");

// Check auth
const token = localStorage.getItem("token");
if (token) {
  // User is authenticated
}
```

**After:**

```javascript
import { useAuth } from "~/composables/useAuth";

const { login, logout, checkAuth, isAuthenticated } = useAuth();

// Login
const { success, user } = await login({ email, password });

// Logout
await logout();

// Check auth
await checkAuth();
if (isAuthenticated.value) {
  // User is authenticated
}
```

## ⚠️ Important Considerations

### 1. Existing Users

- Users with tokens in localStorage will need to log in again
- Old tokens will be ignored
- Clear localStorage on first load (optional)

### 2. CORS Configuration

- Backend must allow credentials
- Frontend and backend must be on allowed origins

### 3. Cookie Security

- Cookies are httpOnly (cannot be accessed by JavaScript)
- Cookies are secure in production (HTTPS only)
- Cookies have SameSite attribute (CSRF protection)

## 🧹 Cleanup Checklist

- [x] Updated `useRequest.js` to use cookies
- [x] Created `useAuth.js` composable
- [x] Updated login page
- [x] Updated signup page
- [x] Updated Navbar component
- [ ] Optional: Delete `accessToken.js` (kept for reference)
- [ ] Optional: Clear localStorage on app load
- [ ] Optional: Add migration notice to users

## 📊 Comparison

| Feature         | Old (localStorage)   | New (httpOnly Cookies) |
| --------------- | -------------------- | ---------------------- |
| Storage         | localStorage         | httpOnly cookies       |
| Security        | ❌ Vulnerable to XSS | ✅ Protected from XSS  |
| Management      | Manual               | Automatic              |
| CSRF Protection | ❌ None              | ✅ SameSite attribute  |
| Token Exposure  | ❌ Visible to JS     | ✅ Hidden from JS      |
| Complexity      | High                 | Low                    |

## 🎯 Benefits of Migration

### Security

- ✅ **XSS Protection** - Cookies are httpOnly
- ✅ **CSRF Protection** - SameSite attribute
- ✅ **No Token Exposure** - Not accessible via JavaScript
- ✅ **Secure Transmission** - HTTPS in production

### Developer Experience

- ✅ **Automatic Management** - No manual token handling
- ✅ **Cleaner Code** - No localStorage calls
- ✅ **Type Safety** - TypeScript support
- ✅ **Reusable** - useAuth composable

### User Experience

- ✅ **Persistent Sessions** - Survives page refreshes
- ✅ **Seamless** - Automatic cookie handling
- ✅ **Faster** - No manual token management
- ✅ **Reliable** - Browser-managed cookies

## 🔍 Verification

To verify the migration was successful:

1. **Check cookies in browser DevTools:**
   - Open DevTools → Application → Cookies
   - Should see a cookie named `token` (or similar)
   - Should be marked as `HttpOnly`

2. **Test authentication flow:**
   - Register a new user
   - Login with credentials
   - Refresh the page (should stay logged in)
   - Logout (cookie should be cleared)

3. **Check network requests:**
   - Open DevTools → Network
   - Make an API request
   - Check request headers - should include `Cookie` header
   - Should NOT have `Authorization` header

## 📚 Additional Resources

- **`FRONTEND_AUTH_IMPLEMENTATION.md`** - Complete implementation guide
- **`QUICK_START_AUTH.md`** - Quick reference guide
- **`backend_implements.md`** - Backend implementation details

## 🆘 Need Help?

If you encounter issues during migration:

1. Check browser console for errors
2. Verify CORS configuration
3. Ensure backend is setting cookies correctly
4. Check that `credentials: 'include'` is set on all requests
5. Review the troubleshooting section in `FRONTEND_AUTH_IMPLEMENTATION.md`

---

**Migration Date:** 2026-02-01  
**Status:** ✅ Complete  
**Backward Compatibility:** ❌ Breaking change - users must re-login
