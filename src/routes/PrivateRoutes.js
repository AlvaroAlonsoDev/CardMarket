import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { ItemsContext } from '../helper/context/ItemsContext'

export const PrivateRoutes = ({children}) => {

    const { isLoged } = useContext(ItemsContext)

    return isLoged ? children  : <Navigate to="/login" />
}
