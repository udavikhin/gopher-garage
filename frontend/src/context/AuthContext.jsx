import {createContext, useContext, useState} from "react";
import {apiClient, authClient, setAuthHeader} from "../api/client.js";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [accessToken, setAccessToken] = useState(null);

    const login = async (email, password) => {
        await authClient.post('login', {email, password}).then((response) => {
            const token = response.data?.accessToken;
            setAccessToken(token);
            setAuthHeader(token);
        }).catch((e) => {
            console.log(e)
        })
    }

    return (
        <AuthContext.Provider value={{ user, accessToken, login, isAuthenticated: !!accessToken }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
