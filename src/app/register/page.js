"use client";

import { useRouter } from 'next/navigation';
import { useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import axios from '@/lib/axiosConfig';
import "./style.scss";

const Register = () => {

    const { reset, register, handleSubmit } = useForm();
    const [loading, setLoading] = useState(false)
    const router = useRouter();


    const onSubmit = async (data) => {
        setLoading(true)
        try {
            const res = await axios.post("/api/auth/register", data)

            if (res.status === 200) {
                toast.success("Registration successful!");
                reset();
                setTimeout(() => router.push("/login"), 1500);
            }

        } catch (error) {
            if (error.response && error.response.status === 400) {
                toast.error(error.response.data.message || "User already exists");
            }
            else {
                toast.error("Something went wrong. Try again later.");
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='Register'>
            <div className="container">
                <div className="header">
                    <h1>Welcome back, to Focus</h1>
                </div>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="input-box">
                        <input required {...register("email")} type="text" placeholder='Email-id' />
                        <i className="ri-mail-send-fill"></i>

                    </div>
                    <div className="input-box">
                        <input required {...register("username")} type="text" placeholder='Username' />
                        <i className="ri-user-4-fill"></i>
                    </div>
                    <div className="input-box">
                        <input required {...register("password")} type="password" placeholder='Password' />
                        <i className="ri-rotate-lock-fill"></i>
                    </div>

                    <div className="btn">
                        <button type='submit' >
                            {loading ? "wait a moment..." : "Sign-up"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default Register
