"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import Cookies from "js-cookie"
import {jwtDecode} from 'jwt-decode'


const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    const checkAuth = () => {
        const token = Cookies.get('token')
        if (token) {
            try {
                const decoded = jwtDecode(token)
                setUser(decoded)
            } catch (error) {
                Cookies.remove("token");
                setUser(null);
                router.push("/login");
            }
        }
        else {
            setUser(null)
        }

        setLoading(false)
    }

    const logout = () => {
        Cookies.remove("token");
        setUser(null);
        router.push("/login");
    };


    useEffect(() => {
        checkAuth()
    }, [])
    return (
        <AuthContext.Provider value={{ user, setUser, checkAuth, loading , logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
