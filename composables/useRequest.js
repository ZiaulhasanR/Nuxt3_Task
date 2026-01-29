const createRequest = async (url, method, body = null) => {
    const config = useRuntimeConfig();
    const { accessToken } = await import('./accessToken.js');
    // const authStore = useAuthStore();
    const fbp = useCookie('_fbp');
    const fbc = useCookie('_fbc');
    const clickId = useCookie("click_id");
    
    try {
        const data = await $fetch(url, {
            baseURL: config.public.baseURL,
            method: method,
            body,
            headers: {
                'Authorization': `Bearer ${accessToken()}`,
                'Accept': 'application/json',
                'Content-Type': 'application/json',
                'X-FBP': fbp.value || '',
                'X-FBC': fbc.value || '',
                'X-Click-ID': clickId.value || ''
            },
            async onResponseError({response}) {
                // if (response?.status === 401) {
                //     const router = useRouter();
                //     await authStore.clearAuth()
                //     await router.push('/login')
                // }
            }
        });

        return { data, status: 'success', error: null };
    } catch (error) {
        return { data: null, status: 'error', error };
    }
}

export const getData = async (url) => {
    return createRequest(url, 'GET');
};

export const postData = async (url, body) => {
    return createRequest(url, 'POST', body);
};
export const putData = async (url, body) => {
    return createRequest(url, 'PUT', body);
};

export const deleteData = async (url) => {
    return createRequest(url, 'DELETE');
};
