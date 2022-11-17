import React, { useState } from 'react'
import { useSearchParams } from 'react-router-dom';
import { ItemsContext } from './ItemsContext'

export const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState([]);
    const [stock, setStock] = useState([]);
    const [offers, setOffers] = useState([]);
    const [dataUsers, setDataUsers] = useState([]);
    const [user, setUser] = useState([]);
    const [ isLoged, setIsLoged ] = useState(false);
    const [searchParams, setSearchParams] = useSearchParams();

    return (
        <ItemsContext.Provider value={{ isLoged, setIsLoged, items, setItems, stock, setStock, offers, setOffers, searchParams, setSearchParams, dataUsers, setDataUsers, user, setUser }}>
            {children}
        </ItemsContext.Provider>
    )
}
