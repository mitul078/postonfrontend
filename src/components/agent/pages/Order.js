import React from 'react'
import "./styles/agentOrder.scss"
import axios from '@/lib/axiosConfig'
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
const Order = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getData = async () => {
            setLoading(true)
            try {
                const res = await axios.get("/api/agent/orders")
                const ordersData = res.data.orders
                const productRes = await axios.get("/api/products");
                const allProducts = productRes.data.products;

                const updateOrders = ordersData.map((order) => {
                    const updateItems = order.packageID.items.map((item) => {
                        const product = allProducts.find(p => p._id === item.productId)
                        return {
                            ...item,
                            image: product?.image?.[0] || ""
                        }
                    })

                    return {
                        ...order,
                        packageID: {
                            ...order.packageID,
                            items: updateItems
                        }
                    }
                })

                setOrders(updateOrders)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getData()
    }, [])


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
                                    {
                                        order.packageID.items.map((order , i) => (
                                            <div key={i} className="image">
                                                <img src={order.image}/>
                                                <div className="quantity">{order.quantity}</div>
                                            </div>

                                        ))
                                    }
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
