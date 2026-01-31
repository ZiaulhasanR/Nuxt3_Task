export default defineEventHandler(async (event) => {
    // Get token from cookie
    const token = getCookie(event, 'auth_token')

    if (!token) {
        throw createError({
            statusCode: 401,
            message: 'Not authenticated'
        })
    }

    // MOCK USER PROFILE FOR TESTING
    // TODO: Replace with real backend API call in production

    try {
        // Decode the mock token to get email
        const emailBase64 = token.replace('mock-jwt-token-', '')
        const email = Buffer.from(emailBase64, 'base64').toString('utf-8')

        const userName = email.split('@')[0].replace(/[._-]/g, ' ')
        const mockUser = {
            id: Math.floor(Math.random() * 1000),
            name: userName.charAt(0).toUpperCase() + userName.slice(1),
            email: email,
            avatar: `https://ui-avatars.com/api/?name=${encodeURIComponent(userName)}&background=10b981&color=fff&size=128`
        }

        console.log('Mock user profile fetched for:', mockUser.email)

        return {
            user: mockUser
        }
    } catch (error) {
        console.error('Failed to decode mock token:', error)

        // If token is invalid, clear the cookie
        setCookie(event, 'auth_token', '', {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'lax',
            maxAge: 0,
            path: '/'
        })

        throw createError({
            statusCode: 401,
            message: 'Invalid token'
        })
    }
})
