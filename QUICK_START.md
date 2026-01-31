# Quick Start Guide - Testing Authentication

## Testing with Mock Backend (No Real Backend Needed)

I've set up mock authentication endpoints so you can test the system immediately without a real backend.

### How to Test

1. **Start the development server:**
   
   Open PowerShell as Administrator and run:
   ```powershell
   Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
   ```
   
   Then in your project directory:
   ```bash
   npm run dev
   ```
   
   OR use this alternative:
   ```bash
   node node_modules/nuxt/bin/nuxt.mjs dev
   ```

2. **Test Login:**
   - Navigate to: `http://localhost:3000/Auth/login`
   - Enter ANY email (e.g., `john.doe@example.com`)
   - Enter ANY password (e.g., `password123`)
   - Click "Sign In"
   - You should be redirected to the home page
   - Your profile avatar should appear in the top-right corner

3. **Test Profile Dropdown:**
   - Click on the profile avatar
   - You should see a dropdown with:
     - Your name and email
     - Profile link
     - Settings link
     - Logout button

4. **Test Logout:**
   - Click the "Logout" button in the dropdown
   - You should be redirected to the home page
   - The "Sign Up" button should reappear
   - Profile avatar should disappear

5. **Test Session Persistence:**
   - Login again
   - Refresh the page (F5)
   - You should remain logged in
   - Profile avatar should still be visible

---

## Mock Backend Details

The mock backend currently:
- ✅ Accepts ANY email/password combination
- ✅ Generates a mock user based on the email
- ✅ Creates an avatar using the user's initials
- ✅ Sets httpOnly cookies properly
- ✅ Persists session across page refreshes

---

## Switching to Real Backend

Once your real backend is ready:

1. **Remove mock code** from these files:
   - `server/api/auth/login.post.js`
   - `server/api/auth/me.get.js`

2. **Follow the integration guide:**
   - See `BACKEND_INTEGRATION_GUIDE.md` for detailed instructions
   - Examples provided for Node.js, Laravel, and Python

3. **Update these files** with real API calls (examples in the guide)

---

## Current Mock Endpoints

### POST /api/auth/login
- Accepts: `{ email, password }`
- Returns: `{ user: { id, name, email, avatar } }`
- Sets: `auth_token` cookie

### GET /api/auth/me
- Requires: `auth_token` cookie
- Returns: `{ user: { id, name, email, avatar } }`

### POST /api/auth/logout
- Clears: `auth_token` cookie
- Returns: `{ success: true }`

---

## Troubleshooting

### PowerShell Script Execution Error
If you see "running scripts is disabled", run PowerShell as Administrator:
```powershell
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
```

### Port Already in Use
If port 3000 is busy, the dev server will use port 3001 or 3002 automatically.

### Avatar Not Showing
The mock backend uses `ui-avatars.com` API to generate avatars. If you're offline, avatars won't load but the functionality will still work.

---

## Next Steps

1. ✅ Test the mock authentication (works now!)
2. 📖 Read `BACKEND_INTEGRATION_GUIDE.md` for real backend setup
3. 🔧 Implement your backend endpoints
4. 🔄 Replace mock code with real API calls
5. 🎉 Deploy to production

---

## Files Modified for Mock Backend

- `server/api/auth/login.post.js` - Mock login endpoint
- `server/api/auth/me.get.js` - Mock user profile endpoint
- `server/api/auth/logout.post.js` - Already working (no changes needed)

All mock code is clearly marked with `// MOCK` comments and `TODO` notes for easy identification and removal.
