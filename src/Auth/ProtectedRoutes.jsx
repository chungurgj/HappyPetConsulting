import React, { useEffect } from 'react'
import { useName } from '../components/contexts/NameContext'
import { Navigate, Route, Outlet, useNavigate } from 'react-router-dom'

const ProtectedRoutes = ({ accessRole }) => {
    const { loggedIn, roles } = useName()
    const navigate = useNavigate()

    useEffect(()=>{
        console.log("roles ",roles)
    },[roles])

    useEffect(() => {
        if (roles && accessRole) {
            const isRoleAllowed = accessRole.some(role => role.toLowerCase() === roles.toLowerCase())
            if (!isRoleAllowed) {
                navigate('/unauthorized')
            }
        }
    }, [roles, accessRole, navigate])

    if (!loggedIn) {
        return <Navigate to={'/login'} />
    }

    return <Outlet />
}

export default ProtectedRoutes
