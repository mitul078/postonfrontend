"use client"
import React from 'react'
import "./style.scss"
import axios from '@/lib/axiosConfig'
import { useEffect, useState } from 'react'
import Spinner from '@/components/Spinner'
import { useRouter } from 'next/navigation'
const Cart = () => {
    const [loading, setLoading] = useState(false)
    const [products, setProducts] = useState([])
    const [quantities, setQuantities] = useState({})
    // const [checkoutLoading, setCheckoutLoading] = useState(false);


    const router = useRouter()
    useEffect(() => {
        setLoading(true)
        const getProducts = async () => {
            try {
                const res = await axios.get("/api/cart/seeCart")
                setProducts(res.data.cart.items)

                const qtyMap = {}
                res.data.cart.items.forEach((item) => {
                    qtyMap[item.productId._id] = item.quantity ?? 1
                })
                setQuantities(qtyMap)
            } catch (error) {
                console.log(error)
            }
            finally {
                setLoading(false)
            }
        }

        getProducts()

    }, [])

    const increaseQuantity = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: (prev[id] || 1) + 1
        }));
    }
    const decreaseQuantity = (id) => {
        setQuantities(prev => ({
            ...prev,
            [id]: prev[id] > 1 ? prev[id] - 1 : 1
        }));
    }

    const cartTotal = products.reduce((acc, item) => {
        const qty = quantities[item.productId._id] || 1;
        return acc + (item.productId.price * qty)
    }, 0)

    const removeItem = async (pid) => {
        setLoading(true)
        try {
            await axios.delete(`/api/cart/remove/${pid}`)
            setProducts(prev => prev.filter(item => item.productId._id !== pid))
            const updatedQuantities = { ...quantities };
            delete updatedQuantities[pid];
            setQuantities(updatedQuantities);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false)
        }
    }

    const tax = Math.round(cartTotal * 0.05);
    const deliveryCharge = 0;
    const subtotal = cartTotal + tax + deliveryCharge;


    const handleDetail = async () => {
        setLoading(true)
        try {
            await axios.post("/api/cart/checkout", {
                productWithQuantity: products.map((p) => ({
                    productId: p.productId._id,
                    quantity: quantities[p.productId._id] || 1,
                })),
                cartTotal,
                tax,
                subtotal,
                cartTotal

            })

            router.push("/cart/delivery")
        } catch (error) {
            console.log(error)
        }finally{
            setLoading(false)
        }
    }

    if (!loading && products.length === 0) {
        return (
            <>
                <div className='text-3xl  w-full bg-red-200 text-black '><h1>Seems ,like you didn't like any products</h1></div>
            </>
        )
    }
    return (
        <div className='Cart'>
            <div className="header">
                <h1>items</h1>
            </div>
            <div className="content">
                {loading ? <Spinner /> : (

                    products.map((product, i) => (

                        <div key={product.productId._id} className="box">
                            <div className="left">
                                <div className="image">
                                    <img src={product.productId.images[0]} alt="" />
                                </div>
                            </div>
                            <div className="right">
                                <div className="name">
                                    <h1>{product.productId.name}</h1>
                                </div>
                                <div className="des">
                                    <h1>{product.productId.description}</h1>
                                </div>
                                <div className="price">
                                    <h1>${product.productId.price}</h1>
                                </div>
                                <div className="quantity">
                                    <span onClick={() => increaseQuantity(product.productId._id)}>+</span> <h1>{quantities[product.productId._id] || 1}</h1> <span onClick={() => decreaseQuantity(product.productId._id)}>-</span>
                                </div>

                                <button onClick={() => removeItem(product.productId._id)} className='delete'>remove</button>
                            </div>

                        </div>
                    ))

                )

                }

                <div className="nextPage">
                    <div className="next">
                        <div className="b">
                            <h1>Cart Total:</h1>
                            <p>${cartTotal}</p>
                        </div>
                        <div className="b">
                            <h1>Tax: (5%)</h1>
                            <p>${tax}</p>
                        </div>
                        <div className="b">
                            <h1>Delivery Charge</h1>
                            <p>Free</p>
                        </div>
                        <div className="b">
                            <h1>Subtotal: </h1>
                            <p>${subtotal}</p>
                        </div>
                        <button onClick={handleDetail} disabled={loading}>{loading ? "Processing..":"Proceed to checkout"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
