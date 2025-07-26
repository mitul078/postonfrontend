import AuthGuard from '@/utils/authGuard'
import React from 'react'

const Profile = () => {
    return (
        <AuthGuard>

            <div>
                Profile
            </div>

        </AuthGuard>
    )
}

export default Profile
