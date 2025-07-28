"use client"
import React from 'react'
import "./style.scss"
import { motion } from "motion/react"
import { useState } from 'react'
import { useEffect } from 'react'
import PendingOrder from "@/components/manager/pages/PendingOrder"
import AssignedOrder from "@/components/manager/pages/AssignedOrder"
import AgentList from "@/components/manager/pages/AgentList"
const Manager = () => {

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
  const [selected, setSelected] = useState("pending")

  const renderContent = () => {
    switch (selected) {
      case "agents": return <AgentList />;
      case "pending": return <PendingOrder />;
      case "assigned": return <AssignedOrder />
      default:
        return <PendingOrder />;
    }
  }


  return (
    <div className='Manager'>
      <motion.div
        animate={{ width: isMobile ? "100%" : isExpanded ? "25rem" : "5rem" }}
        onMouseEnter={() => setIsExpanded(true)}
        onMouseLeave={() => setIsExpanded(false)}
        className="sidebar ">
        <motion.div
          onClick={() => {
            setSelected("agents")
            setIsExpanded(false)
          }} className="box">
          <div className="icon">
            <h1>1</h1>
          </div>
          <div className="name">
            Agents
          </div>
        </motion.div>
        <div onClick={() => {
          setSelected("pending")
          setIsExpanded(false)
        }} className="box">
          <div className="icon">
            <h1>2</h1>
          </div>
          <div className="name">
            Pending Orders
          </div>
        </div>
        <div onClick={() => {
          setSelected("assigned")
          setIsExpanded(false)
        }} className="box">
          <div className="icon">
            <h1>3</h1>
          </div>
          <div className="name">
            Assigned Orders
          </div>
        </div>
        
      </motion.div>
      <div className="main-content ">
        {renderContent()}
      </div>
    </div>
  )
}

export default Manager
