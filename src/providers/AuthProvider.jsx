import React, {createContext, useContext, useEffect, useState} from 'react'
import {useQuery} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../api/index.js";

const AuthContext = createContext(null);

const AuthProvider = ({children}) => {
    const [auth, setAuth] = useState(false);
    const { data, isLoading, isError, isSuccess} = useQuery({
        queryKey: ['auth'],
        queryFn: () => apiClient(
            BASE_URL + API_ENDPOINTS.USER_PROFILE,
            { method: "GET" },
            true
        ),
    })

    useEffect(() => {
        if (isSuccess && data) {
            setAuth(true);
        }

        if (isError) {
            setAuth(false);
        }
    }, [isSuccess, isError, data]);

    const defaultValue = {
        isAuthenticated: auth,
        user: data ?? null,
        setAuthState: setAuth,
    }
    if(isLoading){
        return "loading...";
    }

    return (
        <AuthContext value={defaultValue}>
            {children}
        </AuthContext>
    );
};

const ProtectedRoute = ({children}) => {
    const {isAuthenticated: auth} = useContext(AuthContext);

    if(!auth){
        return "forbidden";
    } else {
        return (
            children
        )
    }
}

const AdminProtectedRoute = ({children}) => {
    const {isAuthenticated: auth, user} = useContext(AuthContext);

    if(auth && user.role === "ADMIN"){
        return (
            children
        )
    } else {

        return "forbidden";
    }
}

export {AuthContext, AuthProvider, AdminProtectedRoute, ProtectedRoute}