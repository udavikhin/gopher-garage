import {createContext, useContext, useEffect, useState} from "react";
import {apiClient, authClient, setAuthHeader} from "../api/client.js";
import axios from "axios";

const AuthContext = createContext(null);

const parseJWTPayload = (token) => {
    const payload = token.split('.')[1];
    return JSON.parse(atob(payload));
}

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        const storedUser = localStorage.getItem('user');
        return storedUser ? JSON.parse(storedUser) : null;
    });
    const [accessToken, setAccessToken] = useState(() => {
        const token = localStorage.getItem('access_token');
        if (token) setAuthHeader(token);
        return token;
    });

    useEffect(() => {
        const interceptor = apiClient.interceptors.response.use(
            (response) => response,
            async (error) => {
                if (error.response?.status === axios.HttpStatusCode.Unauthorized && !error.config._retry) {
                    try {
                        error.config._retry = true;
                        const {data} = await authClient.post('/refresh');
                        const accessToken = data.access_token;
                        setAccessToken(accessToken);
                        setAuthHeader(accessToken);
                        localStorage.setItem('access_token', accessToken);
                        return apiClient(error.config);
                    } catch (e) {
                        setAccessToken(null);
                        setAuthHeader(null);
                        localStorage.removeItem('access_token');
                    }
                }
                return Promise.reject(error);
            }
        );

        return () => apiClient.interceptors.response.eject(interceptor);
    }, []);

    const login = async (email, password) => {
        await authClient.post('login', {email, password}).then((response) => {
            const token = response.data?.access_token;
            const {full_name} = parseJWTPayload(token);
            setUser({full_name});
            setAccessToken(token);
            setAuthHeader(token);
            localStorage.setItem('access_token', token);
            localStorage.setItem('user', JSON.stringify({ full_name }));
        }).catch((e) => {
            throw new Error(e?.response?.data ?? "Произошла ошибка при попытке входа")
        })
    }

    const register = async (formData) => {
        await authClient.post('register', formData).then((response) => {
            const token = response.data?.access_token;
            setAccessToken(token);
            setAuthHeader(token);
            localStorage.setItem('access_token', token);
        }).catch((e) => {
            throw new Error(e?.response?.data ?? "Произошла ошибка при попытке регистрации")
        })
    }

    const logout = async () => {
        try {
            await authClient.post('logout');
        } finally {
            setAccessToken(null);
            setUser(null);
            setAuthHeader(null);
            localStorage.removeItem('access_token');
            localStorage.removeItem('full_name');
        }
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, login, logout, register, isAuthenticated: !!accessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
