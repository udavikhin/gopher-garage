import axios from "axios";

export const BACKEND_URL = 'http://localhost:8080';

const COMMON_CONFIG = {
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
}

export const authClient = axios.create({
    baseURL: BACKEND_URL + '/auth',
    ...COMMON_CONFIG
})

export const apiClient = axios.create({
    baseURL: BACKEND_URL + '/api/v1',
    ...COMMON_CONFIG
})

export const setAuthHeader = (token) => {
    if (!token) {
        delete apiClient.defaults.headers.common['Authorization'];
        return;
    }

    apiClient.defaults.headers.common['Authorization'] = `Bearer ${token}`;
}