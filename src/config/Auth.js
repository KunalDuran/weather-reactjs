// ** React Imports
import { createContext, useEffect, useState, useCallback } from 'react'
import { toast } from 'react-toastify'
import util from '../services/util'
import { useRouter } from 'next/router'
import jwt from 'jsonwebtoken'

const defaultProvider = {
    user: null,
    login: () => Promise.resolve(),
    logout: () => Promise.resolve(),
    register: () => Promise.resolve()
}

const AuthContext = createContext(defaultProvider)

const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(defaultProvider.user)
    const router = useRouter()

    useEffect(() => {
        const initAuth = async () => {
            const storedToken = window.localStorage.getItem('token')
            if (storedToken) {
                try {
                    const response = await authme(storedToken)
                    if (response.error) {
                        localStorage.removeItem('token')
                    } else {
                        setUser(response.Username)
                    }
                } catch (error) {
                    console.error('Error occurred:', error.message);
                }
            } else {
                if (!['/login', '/register'].includes(router.pathname)) {
                    router.push('/login')
                }
            }
        }
        initAuth()
    }, [router])
    

    const handleLogin = useCallback(async (username, password) => {
        try {
            const response = await fetch(`${util.API_URL}/api/login`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password }),
            })

            if (!response.ok) {
                toast("Invalid credentials", { type: "error" })
                return
            }

            const data = await response.json()
            if (data.status !== "success"){
                toast(data.message, { type: "error" })
                return
            }
            localStorage.setItem('token', data.data.token)
            toast("User logged in successfully", { type: "success" })
            router.push('/')
        } catch (error) {
            console.error('Error logging in:', error)
        }
    }, [router])

    const handleLogout = useCallback(() => {
        setUser(null)
        window.localStorage.removeItem('token')
        router.push('/login')
    }, [router])

    const handleRegister = useCallback(async (username, password, dob) => {
        try {
            const response = await fetch(`${util.API_URL}/api/register`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ username, password, birth_date: dob }),
            })
            const data = await response.json()
            if (data.status !== "success") {
                toast(data.message, { type: "info" })
                return
            }
            toast("User registered successfully", { type: "success" })
            router.push('/login')
        } catch (error) {
            toast(error.message, { type: "error" })
            console.error('Error registering user:', error)
        }
    }, [router])

    const values = {
        user,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

async function authme(token) {
    try {
        const decoded = jwt.decode(token, { complete: true })
        if (decoded) {
            const userData = decoded.payload
            return userData
        } else {
            return { error: "not decoded" }
        }
    } catch (error) {
        console.error('Error occurred:', error.message);
    }
}

export { AuthContext, AuthProvider }
