import React from 'react'
import "./styles/agentOrder.scss"
import axios from '@/lib/axiosConfig'
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
const Order = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    const [productDetails, setProductDetails] = useState({});

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const res = await axios.get("/api/agent/orders")
                setOrders(res.data.orders)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getData()
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

    console.log(orders)




    return (
        <div className='AgentOrder'>
            <div className="header">
                <h1>Orders</h1>
            </div>
            <div className="content">
                {loading ? <Spinner /> : (
                    orders.map((order, i) => (
                        <div key={i} className="box">
                            <div className="head">
                                <h1>PackageId:{order.packageID._id}</h1>
                                <p>DueDate: {new Date(order.packageID.expectedDelivery).toLocaleString('en-IN')}</p>
                                <h1></h1>
                            </div>
                            <div className="customerDetail">
                                <h1>CustomerName: {order.packageID.customerName}</h1>
                                <h1>CustomerContact: {order.packageID.customerContact}</h1>
                                <h1>CustomerAddress: {order.packageID.customerAddress}</h1>
                                <h1>SubTotal: {order.packageID.subtotal}</h1>
                            </div>
                            <div className="items">
                                <h1>Items:</h1>
                                <div className="images">

                                    {order.packageID.items.map((item, i) => {
                                        const product = productDetails[item.productId];
                                        return (
                                            <div key={i} className="image">
                                                {product ? (
                                                    <>
                                                        <img src={product.images?.[0] || "/no-image.png"}/>
                                                        <div className="quantity">{item.quantity}</div>
                                                    </>
                                                ) : (
                                                    <p>Loading product...</p>
                                                )}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default Order
