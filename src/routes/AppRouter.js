import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Basket from '../pages/Basket'
import { Checkout } from '../pages/Checkout'
import Home from '../pages/Home'
import { Item } from '../pages/Item'
import { Profile } from '../pages/Profile'

const AppRouter = () => {
    return (

        <Routes>
            <Route path='/' element={<Home />}></Route>
            <Route path='*' element={<Home />}></Route>
            <Route path='/basket' element={<Basket />}></Route>
            <Route path='/item/:id' element={<Item />}></Route>
            <Route path='/account' element={<Profile />}></Route>
            <Route path='/checkout' element={<Checkout />}></Route>
        </Routes>

    )
}

export default AppRouter