"use client"
import React from 'react'

import "./style.scss"
import { motion } from "motion/react"
import { useState } from 'react'
import Order from './pages/Order'
import ChangeStatus from './pages/ChangeStatus'
import { useEffect } from 'react'

const Agent = () => {

  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    handleResize();
    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const [isExpanded, setIsExpanded] = useState(false);
  const [selected, setSelected] = useState("order")

  const renderContent = () => {
    switch (selected) {
      case "order": return <Order />;
      case "change": return <ChangeStatus />;
      default:
        return <Order />;
    }
  }


  return (
    <div className='Agent'>
      <motion.div
        animate={{ width: isMobile ? "100%" : isExpanded ? "25rem" : "5rem" }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="sidebar ">
        <motion.div
          onClick={() => {
            setSelected("order")
            setIsExpanded(false)
          }} className="box">
          <div className="icon">
            <h1>1</h1>
          </div>
          <div className="name">
            Orders
          </div>
        </motion.div>
        <div onClick={() => {
          setSelected("change")
          setIsExpanded(false)
        }} className="box">
          <div className="icon">
            <h1>2</h1>
          </div>
          <div className="name">
            Change Status
          </div>
        </div>

      </motion.div>
      <div className="main-content ">
        {renderContent()}
      </div>
    </div>
  )
}

export default Agent
