import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Basket from '../pages/Basket'
import { Checkout } from '../pages/Checkout'
import Home from '../pages/Home'
import { Item } from '../pages/Item'
import { LoginPage } from '../pages/LoginPage'
import { Profile } from '../pages/Profile'
import { Setting } from '../pages/Setting'
import { Thanks } from '../pages/Thanks'
import { PrivateRoutes } from './PrivateRoutes'

const AppRouter = () => {
    return (

        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='*' element={<Home />}></Route>
            <Route path='/basket' element={<Basket />}></Route>
            <Route path='/item/:id' element={<Item />}></Route>
            <Route path='/login' element={<LoginPage />}></Route>


            <Route path='/account' element={<PrivateRoutes><Profile /></PrivateRoutes>}></Route>
            <Route path='/checkout' element={<PrivateRoutes><Checkout /></PrivateRoutes>}></Route>
            <Route path='/setting' element={<PrivateRoutes><Setting /></PrivateRoutes>}></Route>
            <Route path='/done' element={<PrivateRoutes><Thanks /></PrivateRoutes>}></Route>
        </Routes>

    )
}

export default AppRouter