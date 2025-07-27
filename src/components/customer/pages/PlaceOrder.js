import React from 'react'
import "./styles/placeOrder.scss"
import { useAuth } from '@/contexts/AuthContext'
import { useState } from 'react'
import { useForm } from 'react-hook-form'
import axios from '@/lib/axiosConfig'
import toast from 'react-hot-toast'
import Spinner from '@/components/Spinner'

const PlaceOrder = () => {
    const { user } = useAuth()
    const countries = [
        "India", "United States", "Canada", "Germany", "France",
        "Australia", "Japan", "Brazil", "United Kingdom", "China",
        "Italy", "South Korea", "Mexico", "Russia", "Spain"
    ];
    const [selectedCountry, setSelectedCountry] = useState("India");
    const [isOpen, setIsOpen] = useState(false);


    const { register, handleSubmit } = useForm()
    const [loading, setLoading] = useState(false)
    const onSubmit = async (data) => {
        setLoading(true)
        try {
            <Spinner/>
            const res = await axios.post("/api/customer/make-order", data)
            if (res.status === 200) {
                toast.success("Order Placed Successfully")
            }
        }
        catch (error) {
            toast.error("Something went wrong")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className='PlaceOrder'>
            <div className="header">
                <h1>Shipping</h1>
            </div>

            <div className="content">
                <div className="layer1">
                    <div className="box">
                        <p>username:</p>
                        <h1>{user.username}</h1>
                    </div>
                    <div className="box">
                        <p>email:</p>
                        <h1>{user.email}</h1>
                    </div>
                </div>
                <div className="layer2">
                    <div className="box">
                        <p>location:</p>
                        <h1>Surat, Gujarat -395004</h1>

                    </div>
                </div>

                <div className="layer3 relative">
                    <div
                        onClick={() => setIsOpen(!isOpen)}
                        className="box h-20 bg-white  shadow-md flex items-center justify-between px-6 cursor-pointer select-none"
                    >
                        <div>
                            <p>Select Region</p>
                            <h1 className="text-xl font-semibold ">{selectedCountry}</h1>
                        </div>
                        <svg
                            className={`w-10 h-10  transform transition-transform duration-200 ${isOpen ? "rotate-180" : ""}`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </div>
                    {isOpen && (
                        <ul className="drop  absolute z-10 w-full mt-2 shadow-lg rounded-xl max-h-40 overflow-y-auto">
                            {countries.map((country) => (
                                <li
                                    key={country}
                                    onClick={() => {
                                        setSelectedCountry(country);
                                        setIsOpen(false);
                                    }}
                                    className="  cursor-pointer "
                                >
                                    {country}
                                </li>
                            ))}
                        </ul>
                    )}

                </div>

                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="layer4">
                        <div className="box relative">
                            <p>From</p>
                            <input {...register("origin")} type="text" placeholder='Enter Origin Address Here..' required />
                        </div>
                        <div className="box relative">
                            <p>To</p>
                            <input {...register("destination")} type="text" placeholder='Enter Destination Address Here.. ' required />
                        </div>

                    </div>
                        <button type='submit'>{loading ? "Wait a moment" : "Place Order"}</button>
                </form>

            </div>


        </div >
    )
}

export default PlaceOrder
