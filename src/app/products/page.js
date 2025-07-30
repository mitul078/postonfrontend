"use client"
import React from 'react'
import "./styel.scss"
import axios from '@/lib/axiosConfig'
import { useState, useEffect } from 'react'
import Spinner from '@/components/Spinner'
import toast from 'react-hot-toast'

const ProductPage = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    useEffect(() => {
        const getProducts = async () => {
            setLoading(true)
            try {
                const res = await axios.get("/api/products")
                setProducts(res.data.products)

            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }

        getProducts()

    }, [])

    const addToCart = async (pid) => {
        try {
            await axios.post("/api/cart/addToCart", { productID: pid })
            toast.success("Added to cart")
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <div className='ProductPage' >
            <div className="container">
                {loading ? <Spinner /> : (
                    products.map((product, i) => (
                        <div key={i} className="box">
                            <div className="name">{product.name}</div>
                            <div className="image"><img src={product.images[0]} alt="" /></div>
                            <div className="des">{product.description}</div>
                            <div className="price">{product.price}</div>
                            <div className="btn">
                                <button>See Details</button>
                                <button onClick={() => addToCart(product._id)}>Add to Cart</button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    )
}

export default ProductPage
