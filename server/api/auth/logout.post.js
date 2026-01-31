export default defineEventHandler(async (event) => {
    // Clear the auth cookie
    setCookie(event, 'auth_token', '', {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        maxAge: 0, // Expire immediately
        path: '/'
    })

    return {
        success: true,
        message: 'Logged out successfully'
    }
})
