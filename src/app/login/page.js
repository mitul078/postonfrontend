"use client";
import axios from '@/lib/axiosConfig';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { useAuth } from '@/contexts/AuthContext';
import "./style.scss";
const Login = () => {

    const { reset, register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const router = useRouter();
    const { checkAuth } = useAuth()
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const res = await axios.post("/api/auth/login", data)
            if (res.status === 200) {
                toast.success("Login successful!");
                await checkAuth();
                reset();
                setTimeout(() => router.push("/"), 1500);
            }
        } catch (error) {
            if (error.response && error.response.status === 404) {
                toast.error(error.response.data.error || "User not found");
            }
            else if (error.response && error.response.status === 401) {
                toast.error(error.response.data.error || "Invalid password");
            }
            else {
                toast.error("Something went wrong. Try again later.");
            }
        }finally{
            setLoading(false)
        }
    }

    const routerHandler = () => {
        router.push("/register")
    }




    return (
        <div className='Login'>
            <div className="container">
                <div className="header">
                    <h1>Welcome, to Focus</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-box">
                        <input {...register("email")} type="text" placeholder='Email-id' />
                        <i className="ri-mail-send-fill"></i>

                    </div>
                    <div className="input-box">
                        <input {...register("password")} type="password" placeholder='Password' />
                        <i className="ri-rotate-lock-fill"></i>
                    </div>

                    <div className="forgot">
                        <p>Don't have an account <span onClick={routerHandler}>Sign-up</span></p>
                    </div>

                    <div className="btn">
                        <button>{loading ? "Signing..." : "Sign-in"}</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Login
