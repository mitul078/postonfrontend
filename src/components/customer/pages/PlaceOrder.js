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
            const formData = new FormData();
            formData.append("origin", data.origin);
            formData.append("destination", data.destination);
            formData.append("productName", data.productName);
            formData.append("productImage", data.productImage[0]);
            formData.append("customerContact" , data.customerContact);
            formData.append("customerPinCode" , data.customerPinCode);

            const res = await axios.post("/api/customer/order", formData)
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
                    <div className="layer5">
                        <div className="box">
                            <p>Product Details</p>
                            <input {...register("productName")} type="text" placeholder='Enter Product Name' required />
                        </div>
                        <div className="box">
                            <p>File(image as a proof)</p>
                            <input
                                type="file"
                                accept="image/*"
                                {...register("productImage", {
                                    required: "Product image is required",
                                    validate: {
                                        fileType: (files) => {
                                            if (!files[0]) return "Product image is required";
                                            const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
                                            return allowedTypes.includes(files[0].type) || "Only image files are allowed";
                                        },
                                        fileSize: (files) => {
                                            if (!files[0]) return true;
                                            return files[0].size <= 5 * 1024 * 1024 || "File size must be less than 5MB";
                                        }
                                    }
                                })}
                                className="w-full border p-2 rounded"
                            />
                        </div>
                    </div>

                    <div className="layer6">
                        <div className="box">
                            <p>Contact No:</p>
                            <input {...register("customerContact")} type="number" placeholder='Enter Contact Number' required />
                        </div>
                        <div className="box">
                            <p>Pin-code</p>
                            <input type="text" {...register("customerPinCode")} placeholder='Enter Pincode' required />
                        </div>
                    </div>
                    <button type='submit'>{loading ? "Wait a moment" : "Place Order"}</button>
                </form>


            </div>


        </div >
    )
}

export default PlaceOrder
