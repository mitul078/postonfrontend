"use client"
import React, { useEffect, useState } from 'react';
import './style.scss';
import { useForm } from 'react-hook-form';
import axios from '@/lib/axiosConfig';
const Delivery = () => {
    const { register, handleSubmit } = useForm()
    const [totalPrice, setTotalPrice] = useState(null)
    const [products, setProducts] = useState([])
    const [productDetails, setProductDetails] = useState([]);
    const [quantityMap, setQuantityMap] = useState({});

    useEffect(() => {
        const info = async () => {
            try {
                const res = await axios.get("/api/cart/checkout")
                setTotalPrice(res.data.products.subtotal)
                const productWithQuantity = res.data.products.productWithQuantity;
                setProducts(productWithQuantity);
                const qtyMap = {};
                productWithQuantity.forEach(item => {
                    qtyMap[item.productId] = item.quantity;
                });
                setQuantityMap(qtyMap);
            } catch (error) {
                console.log(error)
            }
        }
        info()
    }, [])


    useEffect(() => {
        const getProductById = async () => {
            if (products.length > 0) {
                try {
                    // Extract all product IDs
                    const productIds = products.map(p => p.productId);
                    // Fetch all products
                    const res = await axios.get("/api/products");

                    // Filter products to only include those with matching IDs
                    const allProducts = res.data.products
                    const filteredProducts = allProducts.filter(product =>
                        productIds.includes(product._id)
                    );

                    setProductDetails(filteredProducts);
                } catch (error) {
                    console.log(error);
                }
            }

        }
        getProductById()
    }, [products])

    console.log(productDetails)

    const submitHandler = async (data) => {
        try {
            await axios.post("/api/customer/order", data)

        } catch (error) {
            console.log(error)
        }
    }
    return (
        <div className="Delivery">
            <form onSubmit={handleSubmit(submitHandler)} className="card">
                <h2 className="title">🚚 Let's Schedule Your <span className='text-red-400'>Delivery</span> </h2>
                <p className="subtitle">We just need a few quick details</p>
                <div className="input-grid">
                    <div className="input-box">
                        <h1 className='text-red-400'>PostOn.in</h1>
                    </div>
                    <div className="input-box">
                        <input {...register("customerName")} type="text" required />
                        <span>Customer Name</span>
                    </div>
                    <div className="input-box">
                        <input {...register("customerAddress")} type="text" required />
                        <span>Delivery Address</span>
                    </div>
                    <div className="input-box">
                        <input {...register("customerPinCode")} type="number" required />
                        <span>Pin Code</span>
                    </div>
                    <div className="input-box">
                        <input {...register("customerContact")} type="tel" required />
                        <span>Contact Number</span>
                    </div>
                    <div className="input-box ">
                        <input {...register("customerEmail")} type="email" required />
                        <span>Email Address</span>
                    </div>
                </div>
                <div className="products w-full ">
                    <h1>Products:</h1>
                    <div className="box">
                        {productDetails.length > 0 ? (
                            productDetails.map((img) => (
                                <div key={img._id} className='image'>
                                    <img src={img.images[0]} alt={img.name} />
                                    <p>{quantityMap[img._id] || 1}</p>

                                </div>
                            ))
                        ) : (
                            <p>Loading products...</p>
                        )}
                    </div>

                </div>

                <button type='submit' className="cta">You have to pay ${totalPrice}</button>
            </form>
        </div>
    );
};

export default Delivery;
