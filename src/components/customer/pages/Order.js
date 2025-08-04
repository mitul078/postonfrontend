"use client"
import React, { useEffect, useState } from 'react'
import "./styles/order.scss"
import axios from '@/lib/axiosConfig'
import Spinner from '@/components/Spinner'
const Order = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [productDetails, setProductDetails] = useState({});


    useEffect(() => {
        setLoading(true)
        const getOrder = async () => {
            try {
                const res = await axios.get("/api/customer/order")
                setOrders(res.data.orders)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getOrder()
    }, [])

    useEffect(() => {
        const getProductById = async () => {
            const res = await axios.get("/api/products");
            const productMap = {};
            res.data.products.forEach(product => {
                productMap[product._id] = product;
            });
            setProductDetails(productMap);
        }
        getProductById()
    }, [])

    const getStatusColor = (status) => {
        switch (status.toLowerCase()) {
            case "pending":
                return "orange";
            case "in-transit":
                return "blue";
            case "confirmed":
                return "purple";
            case "delivered":
                return "green";
            default:
                return "black";
        }
    };



    return (
        <div className='Order'>
            <div className="header">
                <h1>Orders</h1>
            </div>
            <div className="content">
                {loading ? <Spinner /> : (
                    orders.map((order) => (
                        <div key={order._id} className="box">
                            <div className="left">
                                <div className="address">
                                    <h1>Address: {order.customerAddress}</h1>
                                </div>
                                <div className="status">
                                    <h1>Order Placed At</h1>
                                    <h1>{new Date(order.createdAt).toLocaleString('en-IN')}</h1>
                                </div>
                                <div className="agent-info">
                                    {
                                        order.assignedAgentInfo ? (
                                            <>
                                                <h1>Name: {order.assignedAgentInfo.username}</h1>
                                                <p>Email: {order.assignedAgentInfo.email}</p>
                                            </>
                                        ) : (
                                            <h1 className='ms'>Once order confirmed then we share the delivery details.</h1>
                                        )
                                    }
                                </div>
                                <div className="final-status">
                                    <h1>
                                        Expected Delivery:{" "}
                                        {order.expectedDelivery ? (
                                            new Date(order.expectedDelivery).toLocaleString('en-IN')
                                        ) : (
                                            <p className='text-red-500 text-[1rem]'>Order is not confirmed</p>
                                        )}
                                    </h1>
                                    <h1>
                                        Status:{" "}
                                        <span style={{ color: getStatusColor(order.currentStatus) }}>
                                            {order.currentStatus}
                                        </span>
                                    </h1>
                                </div>
                            </div>
                            <div className="right">
                                {order.items.map((item, i) => {
                                    const product = productDetails[item.productId];
                                    return (
                                        <div key={i} className="image">
                                            {product ? (
                                                <>
                                                    <img src={product.images?.[0] || "/no-image.png"} alt={product.name} />
                                                </>
                                            ) : (
                                                <p>Loading product...</p>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>

                        </div>

                    ))

                )
                }
            </div>
        </div>
    )
}

export default Order
