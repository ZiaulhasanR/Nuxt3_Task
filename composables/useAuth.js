import { getData, postData } from './useRequest'

/**
 * Authentication composable for cookie-based auth
 * Works with httpOnly cookies set by the backend
 */
export const useAuth = () => {
  const router = useRouter()
  const user = useState('user', () => null)
  const isAuthenticated = computed(() => !!user.value)

  /**
   * Register a new user
   * @param {Object} userData - { name, email, password }
   * @returns {Promise<Object>} - { success, user, error }
   */
  const register = async (userData) => {
    try {
      const { data, status, error } = await postData('/auth/register', userData)
      
      if (status === 'success' && data) {
        user.value = data.user
        return { success: true, user: data.user, error: null }
      }
      
      return { success: false, user: null, error: error || 'Registration failed' }
    } catch (err) {
      console.error('Registration error:', err)
      return { success: false, user: null, error: err.message || 'Registration failed' }
    }
  }

  /**
   * Login user
   * @param {Object} credentials - { email, password }
   * @returns {Promise<Object>} - { success, user, error }
   */
  const login = async (credentials) => {
    try {
      const { data, status, error } = await postData('/auth/login', credentials)
      
      if (status === 'success' && data) {
        user.value = data.user
        return { success: true, user: data.user, error: null }
      }
      
      return { success: false, user: null, error: error || 'Login failed' }
    } catch (err) {
      console.error('Login error:', err)
      return { success: false, user: null, error: err.message || 'Login failed' }
    }
  }

  /**
   * Logout user
   * @returns {Promise<Object>} - { success, error }
   */
  const logout = async () => {
    try {
      const { data, status, error } = await postData('/auth/logout', {})
      
      // Clear user state regardless of response
      user.value = null
      
      if (status === 'success') {
        return { success: true, error: null }
      }
      
      return { success: false, error: error || 'Logout failed' }
    } catch (err) {
      console.error('Logout error:', err)
      // Still clear user state even if request fails
      user.value = null
      return { success: false, error: err.message || 'Logout failed' }
    }
  }

  /**
   * Get current user profile
   * @returns {Promise<Object>} - { success, user, error }
   */
  const getProfile = async () => {
    try {
      const { data, status, error } = await getData('/auth/profile')
      
      if (status === 'success' && data) {
        user.value = data
        return { success: true, user: data, error: null }
      }
      
      // If profile fetch fails, clear user state
      user.value = null
      return { success: false, user: null, error: error || 'Failed to fetch profile' }
    } catch (err) {
      console.error('Profile fetch error:', err)
      user.value = null
      return { success: false, user: null, error: err.message || 'Failed to fetch profile' }
    }
  }

  /**
   * Check if user is authenticated by fetching profile
   * @returns {Promise<boolean>}
   */
  const checkAuth = async () => {
    const { success } = await getProfile()
    return success
  }

  return {
    user,
    isAuthenticated,
    register,
    login,
    logout,
    getProfile,
    checkAuth
  }
}
