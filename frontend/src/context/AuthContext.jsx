import {createContext, useContext, useEffect, useState} from "react";
import {apiClient, authClient, setAuthHeader} from "../api/client.js";
import axios from "axios";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
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
                        console.log(data)
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
            setAccessToken(token);
            setAuthHeader(token);
            localStorage.setItem('access_token', token);
        }).catch((e) => {
            throw new Error(e?.response?.data ?? "Произошла ошибка при попытке входа")
        })
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, login, isAuthenticated: !!accessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
