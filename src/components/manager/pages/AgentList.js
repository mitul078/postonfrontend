"use client"
import React, { useEffect } from 'react'
import "./styles/agents.scss"
import axios from '@/lib/axiosConfig'
import { useState } from 'react'
import Spinner from '@/components/Spinner'
import AssignDialog from './AssignDialog'
import toast from 'react-hot-toast'
const AgentList = () => {
    const [agents, setAgents] = useState([])
    const [loading, setLoading] = useState(false)
    const [dialogOpen, setDialogOpen] = useState(false)
    const [selectedAgentID, setSelectedAgentID] = useState("")

    useEffect(() => {
        const loadAgents = async () => {
            setLoading(true)
            try {
                const res = await axios.get("/api/manager/allAgents")
                setAgents(res.data.agents)
            } catch (error) {
                console.log(error)
            } finally {
                setLoading(false)
            }
        }
        loadAgents()
    }, [])

    const handleAssignClick = (agentId) => {
        setSelectedAgentID(agentId)
        setDialogOpen(true)
    }
    const handleFormSubmit = async (data) => {
        try {
            const res = await axios.post("/api/manager/assign", data)
            toast.success("Assigned SuccessFully")
        } catch (error) {
            toast.error("Assignment failed.")
        }
    }

    return (
        <div className='Agents'>
            <div className="header">
                <h1>Agents</h1>
            </div>
            <div className="content w-full p-4">
                {!loading && agents.length === 0 && (
                    <div className="text-gray-500 text-center">No agents found.</div>
                )}
                {loading ? (
                    <Spinner />

                ) : (

                    agents.map((agent, i) => (

                        <div key={i} className="box">
                            <div className="no w-[5%]">{i + 1}</div>

                            <div className="name w-[15%] truncate">{agent.username}</div>

                            <div className="email w-[30%] truncate">{agent.email}</div>

                            <div className="id w-[30%] truncate">{agent._id}</div>

                            <div className="status w-[10%] ">Active</div>

                            <div className="w-[10%] button"><button onClick={() => handleAssignClick(agent._id)}>Assign</button></div>
                        </div>

                    ))

                )



                }

            </div>

            <AssignDialog
                isOpen={dialogOpen}
                onClose={() => setDialogOpen(false)}
                agentID={selectedAgentID}
                onSubmit={handleFormSubmit}
            />

        </div>
    )
}

export default AgentList
