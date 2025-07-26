import AuthGuard from '@/utils/authGuard'
import React from 'react'

const Dashboard = () => {
    return (
        <AuthGuard>
            <div>
                Dashboard
            </div>

        </AuthGuard>
    )
}

export default Dashboard
