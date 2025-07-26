import React from 'react'
import "./style.scss"
import { motion } from "motion/react"

const Customer = () => {
    return (
        <div className='Customer'>
            <div className="container">
                <motion.div
                    whileHover={{
                        width: "25rem"
                    }}
                    transition={{
                        duration:.4
                    }}
                    className="left-panel">
                    <div className="box">
                        <div className="icon">
                            <i className="ri-question-answer-fill"></i>
                        </div>
                        <div className="name">
                            <h1>See Orders</h1>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <i className="ri-task-fill"></i>
                        </div>
                        <div className="name">
                            <h1>Placed Order</h1>
                        </div>
                    </div>
                    <div className="box">
                        <div className="icon">
                            <i className="ri-compass-discover-fill"></i>
                        </div>
                        <div className="name">
                            Track Orders
                        </div>
                    </div>
                </motion.div>
                <div className="right-panel"></div>
            </div>
        </div>
    )
}

export default Customer
