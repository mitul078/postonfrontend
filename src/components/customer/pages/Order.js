"use client"
import React, { useEffect, useState } from 'react'
import "./styles/order.scss"
import axios from '@/lib/axiosConfig'
import Spinner from '@/components/Spinner'

const Order = () => {
    const [orders, setOrders] = useState([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        const getDetails = async () => {
            setLoading(true)
            try {
                const res = await axios.get("/api/customer/order")
                setOrders(res.data.orders)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getDetails()
    }, [])

    const statusColors = {
        pending: "orange",
        assigned: "blue",
        "in-transit": "purple",
        delivered: "green",
    }

    return (
        <div className='Order'>
            <div className="container">
                <div className="header">
                    <h1>Orders</h1>
                </div>

                {loading ? (
                    <Spinner />
                ) : (
                    <div className="content">
                        {orders.length === 0 ? (
                            <div className='fallback'><h1>No Orders Yet</h1></div>
                        ) : (
                            orders.map((order, i) => (
                                <div key={i} className="box">
                                    <div className="head">
                                        <h1>{order.productName}</h1>
                                    </div>
                                    <div className="image">
                                        <img src={order.productImage} alt="" />

                                    </div>
                                    <div className="details">
                                        <div className="dates">
                                            <p>Arriving At: {order?.expectedDelivery?.split("T")[0] || "2005-01-16"}</p>
                                            <p>Order Date: {order.createdAt?.split("T")[0]}</p>
                                        </div>
                                        <div className="status">
                                            <h1>
                                                Status:{" "}
                                                <span style={{ color: statusColors[order.currentStatus] || "gray" }}>
                                                    {order.currentStatus?.toUpperCase() || "UNKNOWN"}
                                                </span>
                                            </h1>
                                        </div>
                                        <div className="location">
                                            <div className="b1">
                                                <p>From</p>
                                                <h1>{order.origin}</h1>
                                            </div>
                                            <div className="b1">
                                                <p>To</p>
                                                <h1>{order.destination}</h1>
                                            </div>
                                        </div>
                                        <div className="agent">
                                            <h1>Delivery Agent Detail:</h1>
                                            {
                                                order.assignedAgentInfo === null ? (
                                                    <>
                                                    <p className='text-green-500'>Order Received</p>
                                                        <h1 className='font-bold text-md text-red-500 '>We will contact you as soon as possible </h1>
                                                    </>
                                                ) : (
                                                    <>
                                                        <p>Name: {order.assignedAgentInfo?.username || "name"}</p>
                                                        <p>Email: {order.assignedAgentInfo?.email || "email"}</p>
                                                        <p>Contact no: {order.assignedAgentInfo?.contact || "contact"}</p>

                                                    </>

                                                )
                                            }
                                        </div>
                                    </div>
                                </div>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    )
}

export default Order
