import React, { useContext } from 'react'
import { ApiContext } from './ApiContext';
import { ItemsContext } from './ItemsContext';

export const ApiProvider = ({ children }) => {
    const { setStock, setOffers } = useContext(ItemsContext);

    const fetchData = async () => {
        const peticion = await fetch("http://localhost:4000/products");
        const data = await peticion.json();

        setStock(data);
    }
    
    const fetchDataOffers = async () => {
        const peticion = await fetch("http://localhost:4000/offers");
        const data = await peticion.json();

        setOffers(data);
    }
    return (
        <ApiContext.Provider value={{ fetchData, fetchDataOffers }}>
            {children}
        </ApiContext.Provider>
    )
}
