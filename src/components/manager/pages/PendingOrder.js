import React from 'react'
import "./styles/pendingOrder.scss"
import axios from '@/lib/axiosConfig'
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
const PendingOrder = () => {
    const [loading, setLoading] = useState(false)
    const [orders, setOrders] = useState([])
    useEffect(() => {
        const getOrders = async () => {
            setLoading(true)
            try {
                const  res  = await axios.get("/api/manager/pendingOrders")
                setOrders(res.data.orders)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        getOrders()
    }, [])
    return (
        <div className='Pending'>
            <div className="header">
                <h1>Pending Orders</h1>
            </div>
            <div className="content">
                {!loading && orders.length === 0 && (
                    <div className="text-gray-500 text-center">No Pending Orders</div>
                )}
                {loading ? (
                    <Spinner />
                ) : (
                    orders.map((order , index) => (
                        <div key={index} className="box">
                            <h1>PackageID: <span> {order._id}</span></h1>
                            <h1>CustomerID: <span>{order.customerID}</span> </h1>
                            <h1>Origin:-/ <span>{order.origin}</span> </h1>
                            <h1>Destination:-/ <span>{order.destination}</span> </h1>
                            <div className="number">{index+1}</div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default PendingOrder
