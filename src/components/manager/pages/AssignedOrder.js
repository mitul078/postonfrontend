import React, { useState, useEffect } from 'react'
import "./styles/assignedOrder.scss"
import axios from '@/lib/axiosConfig'
import Spinner from '@/components/Spinner'

const AssignedOrder = () => {
  const [loading, setLoading] = useState(false)
  const [orders, setOrders] = useState([])
  useEffect(() => {
    const getOrders = async () => {
      setLoading(true)
      try {
        const res = await axios.get("/api/manager/assignedOrders")
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
    <div className='Assigned'>
      <div className="header">
        <h1>Assigned Orders</h1>
      </div>
      <div className="content">
        {!loading && orders.length === 0 && (
          <div className="text-gray-500 text-center">seems like you didn't assigned any orders</div>
        )}
        <div className="box satitle ">
          <div className='number '>Sr</div>
          <div className='name '>Agent Name</div>
          <div className='email'>Agent Email</div>
          <div className='agentId truncate'>AgentID</div>
          <div className='customerId truncate'>CustomerID</div>
        </div>
        {loading ? (
          <Spinner />
        ) : (
          orders.map((order, i) => (

            <div key={i} className="box">
              <div className='number '>{i + 1}</div>
              <div className='name '><span>Agent Name:</span>{order.assignedAgentInfo.username}</div>
              <div className='email'><span>Agent Email</span> {order.assignedAgentInfo.email}</div>
              <div className='agentId truncate'><span>AgentID:</span>{order.assignedAgentInfo._id}</div>
              <div className='customerId truncate'><span>CID:</span>{order.customerID}</div>
            </div>
          ))
        )

        }
      </div>

    </div>
  )
}

export default AssignedOrder
