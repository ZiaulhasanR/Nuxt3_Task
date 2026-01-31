import { ref, computed } from 'vue'

// Global state for authentication
const user = ref(null)
const isLoading = ref(false)

export const useAuth = () => {
    const isAuthenticated = computed(() => !!user.value)

    // Fetch current user profile
    const fetchUser = async () => {
        try {
            isLoading.value = true
            const data = await $fetch('/api/auth/me', {
                credentials: 'include'
            })
            user.value = data.user
            return data.user
        } catch (error) {
            console.error('Failed to fetch user:', error)
            user.value = null
            return null
        } finally {
            isLoading.value = false
        }
    }

    // Login function
    const login = async (credentials) => {
        try {
            isLoading.value = true
            const data = await $fetch('/api/auth/login', {
                method: 'POST',
                body: credentials,
                credentials: 'include'
            })
            user.value = data.user
            return { success: true, user: data.user }
        } catch (error) {
            console.error('Login failed:', error)
            return { success: false, error }
        } finally {
            isLoading.value = false
        }
    }

    // Logout function
    const logout = async () => {
        try {
            isLoading.value = true
            await $fetch('/api/auth/logout', {
                method: 'POST',
                credentials: 'include'
            })
            user.value = null
            // Navigate to home page
            await navigateTo('/')
        } catch (error) {
            console.error('Logout failed:', error)
            // Clear user anyway
            user.value = null
            await navigateTo('/')
        } finally {
            isLoading.value = false
        }
    }

    // Get user initials for avatar
    const getInitials = (name) => {
        if (!name) return 'U'
        const parts = name.split(' ')
        if (parts.length >= 2) {
            return (parts[0][0] + parts[1][0]).toUpperCase()
        }
        return name.substring(0, 2).toUpperCase()
    }

    return {
        user: computed(() => user.value),
        isAuthenticated,
        isLoading: computed(() => isLoading.value),
        fetchUser,
        login,
        logout,
        getInitials
    }
}
