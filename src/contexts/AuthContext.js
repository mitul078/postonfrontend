"use client"
import React from 'react'
import { useRouter } from 'next/navigation'
import { createContext, useContext, useEffect, useState } from 'react'
import axios from '@/lib/axiosConfig'
import Cookies from 'js-cookie';

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null)
    const [loading, setLoading] = useState(true);
    const router = useRouter()

    const checkAuth = async () => {
        try {
            const res = await axios.get("/api/auth/me");
            setUser(res.data.user)
        } catch (err) {
            setUser(null);
            
        } finally {
            setLoading(false);
        }
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
        <AuthContext.Provider value={{ user, setUser, checkAuth, loading, logout }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext)
