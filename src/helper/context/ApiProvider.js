import React, { useContext } from 'react'
import { ApiContext } from './ApiContext';
import { ItemsContext } from './ItemsContext';

export const ApiProvider = ({ children }) => {
    const { setStock, setOffers, setDataUsers, setOrders } = useContext(ItemsContext);

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

    const fetchDataUsers = async () => {
        const peticion = await fetch("http://localhost:4000/users");
        const data = await peticion.json();

        setDataUsers(data);
    }

    const fetchDataOrders = async () => {
        const peticion = await fetch("http://localhost:4000/orders");
        const data = await peticion.json();

        setOrders(data);
    }

    return (
        <ApiContext.Provider value={{ fetchData, fetchDataOffers, fetchDataUsers, fetchDataOrders }}>
            {children}
        </ApiContext.Provider>
    )
}
