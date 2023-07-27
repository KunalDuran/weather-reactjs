// ** React Imports
import { createContext, useEffect, useState } from 'react'
import { toast } from 'react-toastify'
import util from './util'
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
                const response = await authme(storedToken)
                console.log(response)
                if (response.error) {
                    localStorage.removeItem('token')
                } else {
                    setUser(response.Username)
                }
            } else {
                router.push('/login')
            }
        }
        initAuth()
    }, [])


    const handleLogin = (username, password) => {
        fetch(`${util.API_URL}/api/login`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
        })
            .then((response) => response.json())
            .then((data) => {
                if (data.status !== "success"){
                    toast(data.message, { type: "success" });
                    return
                }
                localStorage.setItem('token', data.data.token);

                toast("User logged in successfully", { type: "success" });
                window.location.href = '/'; 
            })
            .catch((error) => {
                console.error('Error logging in:', error);
            });
    }

    const handleLogout = () => {
        setUser(null)
        window.localStorage.removeItem('token')
        router.push('/login')
    }

    const handleRegister = (username, password, dob) => {
        fetch(`${util.API_URL}/api/register`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, birth_date: dob }),
        })
            .then((response) => response.json())
            .then((data) => {

                if (data.status !== "success") {
                    toast(data.message, { type: "success" });
                    return
                }

                toast("User registered successfully", { type: "success" });
                // redirect to login page
                window.location.href = '/login';
            })
            .catch((error) => {
                // Handle any errors that occur during the registration process
                toast(error.message, { type: "error" });
                console.error('Error registering user:', error);
            });
    }

    const values = {
        user,
        login: handleLogin,
        logout: handleLogout,
        register: handleRegister
    }

    return <AuthContext.Provider value={values}>{children}</AuthContext.Provider>
}

async function authme(token) {
    const decoded = jwt.decode(token, { complete: true })
    if (decoded) {
        const userData = decoded.payload
        return userData
    } else {
        return { error: "not decoded" }
    }
}

export { AuthContext, AuthProvider }
