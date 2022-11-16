import React, { useState } from 'react'
import { ItemsContext } from './ItemsContext'

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [stock, setStock] = useState([]);
    const [offers, setOffers] = useState([]);

    return (
        <ItemsContext.Provider value={{ items, setItems, stock, setStock, offers, setOffers }}>
            {children}
        </ItemsContext.Provider>
    )
}
