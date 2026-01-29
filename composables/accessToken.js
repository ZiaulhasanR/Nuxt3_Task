// Helper function to get access token from localStorage
export const accessToken = () => {
    if (process.client) {
        return localStorage.getItem('token') || '';
    }
    return '';
}
