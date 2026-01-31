export default defineEventHandler(async (event) => {
    const body = await readBody(event)

    // MOCK LOGIN FOR TESTING
    // This accepts any email/password combination
    // TODO: Replace with real backend API call in production

    console.log('Mock login attempt:', body.email)

    // Simulate validation
    if (!body.email || !body.password) {
        throw createError({
            statusCode: 400,
            message: 'Email and password are required'
        })
    }

    // Create mock token
    const mockToken = 'mock-jwt-token-' + Buffer.from(body.email).toString('base64')

    // Create mock user from email
    const userName = body.email.split('@')[0].replace(/[._-]/g, ' ')
    const mockUser = {
        id: Math.floor(Math.random() * 1000),
        name: userName.charAt(0).toUpperCase() + userName.slice(1),
        email: body.email,
        avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=10b981&color=fff&size=128`
    }

    // Set httpOnly cookie with the mock token
    setCookie(event, 'auth_token', mockToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 60 * 60 * 24 * 7, // 7 days
        path: '/'
    })

    console.log('Mock login successful for:', mockUser.email)

    // Return user data (without token)
    return {
        user: mockUser
    }
})
