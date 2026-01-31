export default defineNuxtPlugin(async (nuxtApp) => {
    // Only run on client side
    if (process.client) {
        const { fetchUser } = useAuth()

        // Try to fetch user on app initialization
        try {
            await fetchUser()
        } catch (error) {
            // Silently fail - user is not authenticated
            console.log('User not authenticated')
        }
    }
})
