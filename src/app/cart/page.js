"use client"
import React from 'react'
import "./style.scss"
import axios from '@/lib/axiosConfig'
import { useEffect, useState } from 'react'
import Spinner from '@/components/Spinner'
const Cart = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    useEffect(() => {
        setLoading(true)
        const getProducts = async () => {
            try {
                const res = await axios.get("/api/cart/seeCart")
                setProducts(res.data.cart.items)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }

        getProducts()

    }, [])
    return (
        <div className='Cart'>
            <div className="header">
                <h1>items</h1>
            </div>
            <div className="content">
                {loading ? <Spinner /> : (

                    products.map((product, i) => (

                        <div key={i} className="box">
                            <div className="left">
                                <div className="image">
                                    <img src={product.product.images[0]} alt="" />
                                </div>
                            </div>
                            <div className="right">
                                <div className="name">
                                    <h1>{product.product.name}</h1>
                                </div>
                                <div className="des">
                                    <h1>{product.product.description}</h1>
                                </div>
                                <div className="price">
                                    <h1>${product.product.price}</h1>
                                </div>
                                <div className="quantity">
                                    <span>+</span> <h1>{product.product?.quantity || 1}</h1> <span>-</span>
                                </div>
                                <div className="btn">
                                    <button className='delete'>Delete</button>
                                    <button className='order'>Placed Order</button>
                                </div>
                            </div>

                        </div>
                    ))

                )

                }
            </div>
        </div>
    )
}

export default Cart
