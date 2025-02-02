import React from 'react'

import { useLocation, Navigate } from "react-router-dom";



export const ProtectRoute = ({children}:any) => {
    const location = useLocation()

    console.log(location)
    const isAuthenticated = localStorage.getItem('b2b-signature')
    const userRole = localStorage.getItem('role')

      
    if(!isAuthenticated || isAuthenticated == undefined){
        return (
            <Navigate to="/login" state={{from:location} }/>
        )
    }
    return children
}