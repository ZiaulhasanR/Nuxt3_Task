# Backend Integration Guide for Cookie-Based Authentication

## Overview
This guide explains how to integrate your backend API with the new cookie-based authentication system. The frontend is getting a 401 error because the backend needs to be updated to support the new authentication flow.

---

## Problem: 401 Unauthorized Error

The frontend is receiving a 401 error during login because:
1. The backend API endpoint might not exist at `/auth/login`
2. The backend might be expecting different request format
3. The backend might not be returning the expected response format

---

## Backend Requirements

Your backend API needs to provide these endpoints:

### 1. Login Endpoint

**Endpoint:** `POST /api/auth/login`

**Request Body:**
```json
{
  "email": "user@example.com",
  "password": "password123"
}
```

**Expected Response (Success - 200):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": "https://example.com/avatar.jpg"  // Optional
  }
}
```

**OR (Alternative format):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "name": "John Doe",
  "email": "user@example.com",
  "avatar": "https://example.com/avatar.jpg"  // Optional
}
```

**Error Response (401):**
```json
{
  "message": "Invalid credentials",
  "error": "Unauthorized"
}
```

---

### 2. User Profile Endpoint

**Endpoint:** `GET /api/auth/me`

**Headers:**
```
Authorization: Bearer <token>
Accept: application/json
```

**Expected Response (Success - 200):**
```json
{
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com",
    "avatar": "https://example.com/avatar.jpg"  // Optional
  }
}
```

**OR (Alternative format):**
```json
{
  "id": 1,
  "name": "John Doe",
  "email": "user@example.com",
  "avatar": "https://example.com/avatar.jpg"  // Optional
}
```

**Error Response (401):**
```json
{
  "message": "Unauthorized",
  "error": "Invalid or expired token"
}
```

---

### 3. Register Endpoint (Optional)

**Endpoint:** `POST /api/auth/register`

**Request Body:**
```json
{
  "name": "John Doe",
  "email": "user@example.com",
  "password": "password123"
}
```

**Expected Response (Success - 201):**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "John Doe",
    "email": "user@example.com"
  }
}
```

---

## Backend Implementation Examples

### Node.js/Express Example

```javascript
const express = require('express');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const router = express.Router();

const JWT_SECRET = process.env.JWT_SECRET || 'your-secret-key';

// Login endpoint
router.post('/auth/login', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate user credentials (replace with your database logic)
    const user = await findUserByEmail(email);
    
    if (!user || !await bcrypt.compare(password, user.password)) {
      return res.status(401).json({
        message: 'Invalid credentials',
        error: 'Unauthorized'
      });
    }

    // Generate JWT token
    const token = jwt.sign(
      { userId: user.id, email: user.email },
      JWT_SECRET,
      { expiresIn: '7d' }
    );

    // Return token and user data
    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || null
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Get current user endpoint
router.get('/auth/me', authenticateToken, async (req, res) => {
  try {
    // req.user is set by authenticateToken middleware
    const user = await findUserById(req.user.userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.json({
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
        avatar: user.avatar || null
      }
    });
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ message: 'Internal server error' });
  }
});

// Middleware to authenticate JWT token
function authenticateToken(req, res, next) {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

  if (!token) {
    return res.status(401).json({ message: 'No token provided' });
  }

  jwt.verify(token, JWT_SECRET, (err, user) => {
    if (err) {
      return res.status(401).json({ message: 'Invalid or expired token' });
    }
    req.user = user;
    next();
  });
}

module.exports = router;
```

---

### Laravel/PHP Example

```php
<?php

namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    // Login endpoint
    public function login(Request $request)
    {
        $credentials = $request->validate([
            'email' => 'required|email',
            'password' => 'required'
        ]);

        if (!Auth::attempt($credentials)) {
            return response()->json([
                'message' => 'Invalid credentials',
                'error' => 'Unauthorized'
            ], 401);
        }

        $user = Auth::user();
        $token = $user->createToken('auth-token')->plainTextToken;

        return response()->json([
            'token' => $token,
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar ?? null
            ]
        ]);
    }

    // Get current user endpoint
    public function me(Request $request)
    {
        $user = $request->user();

        return response()->json([
            'user' => [
                'id' => $user->id,
                'name' => $user->name,
                'email' => $user->email,
                'avatar' => $user->avatar ?? null
            ]
        ]);
    }
}
```

**Routes (routes/api.php):**
```php
Route::post('/auth/login', [AuthController::class, 'login']);
Route::get('/auth/me', [AuthController::class, 'me'])->middleware('auth:sanctum');
```

---

### Python/FastAPI Example

```python
from fastapi import APIRouter, HTTPException, Depends, status
from fastapi.security import HTTPBearer, HTTPAuthorizationCredentials
from pydantic import BaseModel
from datetime import datetime, timedelta
import jwt
from passlib.context import CryptContext

router = APIRouter()
security = HTTPBearer()
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")

SECRET_KEY = "your-secret-key"
ALGORITHM = "HS256"

class LoginRequest(BaseModel):
    email: str
    password: str

class UserResponse(BaseModel):
    id: int
    name: str
    email: str
    avatar: str | None = None

# Login endpoint
@router.post("/auth/login")
async def login(credentials: LoginRequest):
    # Validate user credentials (replace with your database logic)
    user = get_user_by_email(credentials.email)
    
    if not user or not pwd_context.verify(credentials.password, user.password):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid credentials"
        )
    
    # Generate JWT token
    token_data = {
        "user_id": user.id,
        "email": user.email,
        "exp": datetime.utcnow() + timedelta(days=7)
    }
    token = jwt.encode(token_data, SECRET_KEY, algorithm=ALGORITHM)
    
    return {
        "token": token,
        "user": {
            "id": user.id,
            "name": user.name,
            "email": user.email,
            "avatar": user.avatar
        }
    }

# Get current user endpoint
@router.get("/auth/me")
async def get_current_user(credentials: HTTPAuthorizationCredentials = Depends(security)):
    try:
        token = credentials.credentials
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        user_id = payload.get("user_id")
        
        user = get_user_by_id(user_id)
        if not user:
            raise HTTPException(status_code=404, detail="User not found")
        
        return {
            "user": {
                "id": user.id,
                "name": user.name,
                "email": user.email,
                "avatar": user.avatar
            }
        }
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=401, detail="Token expired")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=401, detail="Invalid token")
```

---

## CORS Configuration

Your backend must allow CORS requests from your frontend. Add these headers:

### Express.js
```javascript
const cors = require('cors');

app.use(cors({
  origin: 'http://localhost:3000', // Your Nuxt frontend URL
  credentials: true, // Important for cookies
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));
```

### Laravel
```php
// config/cors.php
return [
    'paths' => ['api/*'],
    'allowed_methods' => ['*'],
    'allowed_origins' => ['http://localhost:3000'],
    'allowed_headers' => ['*'],
    'exposed_headers' => [],
    'max_age' => 0,
    'supports_credentials' => true,
];
```

---

## Testing Your Backend

### Using cURL

**Test Login:**
```bash
curl -X POST http://localhost:5001/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"password123"}'
```

**Expected Response:**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...",
  "user": {
    "id": 1,
    "name": "Test User",
    "email": "test@example.com"
  }
}
```

**Test Get User:**
```bash
curl -X GET http://localhost:5001/api/auth/me \
  -H "Authorization: Bearer YOUR_TOKEN_HERE" \
  -H "Accept: application/json"
```

---

## Troubleshooting

### Issue 1: 401 on Login
**Cause:** Backend endpoint doesn't exist or wrong URL
**Solution:** 
- Verify backend is running on `http://localhost:5001`
- Check `.env` file: `BASE_URL=http://localhost:5001/api`
- Test endpoint with cURL

### Issue 2: CORS Error
**Cause:** Backend not allowing frontend origin
**Solution:** Add CORS configuration (see above)

### Issue 3: Token Not Working
**Cause:** Backend not accepting Bearer token
**Solution:** Ensure backend middleware extracts token from `Authorization: Bearer <token>` header

### Issue 4: Wrong Response Format
**Cause:** Backend returning different structure
**Solution:** Update frontend server route to match your backend format

---

## Frontend Configuration

### Update .env file
```env
BASE_URL=http://localhost:5001/api
```

### If Backend Response Format is Different

If your backend returns a different format, update the server route:

**File:** `server/api/auth/login.post.js`

```javascript
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  try {
    const response = await $fetch('/auth/login', {
      baseURL: config.public.baseURL,
      method: 'POST',
      body: body
    })

    // Set httpOnly cookie with the token
    if (response.token) {
      setCookie(event, 'auth_token', response.token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7,
        path: '/'
      })
    }

    // CUSTOMIZE THIS PART based on your backend response
    return {
      user: {
        name: response.user?.name || response.name || body.email.split('@')[0],
        email: response.user?.email || response.email || body.email,
        avatar: response.user?.avatar || response.avatar || null
      }
    }
  } catch (error) {
    console.error('Login error:', error)
    throw createError({
      statusCode: error.statusCode || 401,
      message: error.data?.message || error.message || 'Login failed'
    })
  }
})
```

---

## Quick Fix for Testing

If you don't have a backend yet, you can create a mock backend:

**File:** `server/api/auth/login.post.js` (Replace entire file)

```javascript
export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  // MOCK LOGIN - Remove this in production!
  // Accept any email/password for testing
  const mockToken = 'mock-jwt-token-' + Date.now()
  const mockUser = {
    id: 1,
    name: body.email.split('@')[0],
    email: body.email,
    avatar: `https://ui-avatars.com/api/?name=${body.email.split('@')[0]}&background=10b981&color=fff`
  }

  // Set cookie
  setCookie(event, 'auth_token', mockToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 60 * 60 * 24 * 7,
    path: '/'
  })

  return { user: mockUser }
})
```

**File:** `server/api/auth/me.get.js` (Replace entire file)

```javascript
export default defineEventHandler(async (event) => {
  const token = getCookie(event, 'auth_token')

  if (!token) {
    throw createError({
      statusCode: 401,
      message: 'Not authenticated'
    })
  }

  // MOCK USER - Remove this in production!
  return {
    user: {
      id: 1,
      name: 'Test User',
      email: 'test@example.com',
      avatar: 'https://ui-avatars.com/api/?name=Test+User&background=10b981&color=fff'
    }
  }
})
```

---

## Next Steps

1. **Implement backend endpoints** following the examples above
2. **Test endpoints** with cURL or Postman
3. **Configure CORS** on your backend
4. **Update `.env`** with correct backend URL
5. **Test login flow** in the frontend
6. **Remove mock code** once real backend is ready

---

## Need Help?

If you're still getting 401 errors:
1. Check browser DevTools → Network tab
2. Look at the request/response for `/api/auth/login`
3. Share the error message and response format
4. I can help customize the integration for your specific backend
