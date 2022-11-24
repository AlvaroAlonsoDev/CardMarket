import React, { useContext, useEffect } from 'react'
import { ApiContext } from '../../helper/context/ApiContext';
import { ItemsContext } from '../../helper/context/ItemsContext';

export const Helper = () => {
    let interim = JSON.parse(localStorage.getItem('items'));
    const { fetchDataOffers, fetchData, fetchDataUsers, fetchDataOrders } = useContext(ApiContext);
    const { items, setItems, user, setProvItem, isLoged } = useContext(ItemsContext);


    useEffect(() => {
        if (interim) { setItems(interim) }
        fetchData()
        fetchDataOffers();
        fetchDataUsers();
        fetchDataOrders();
    }, []);
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);
    useEffect(() => {
        sessionStorage.setItem("infoUserLoged", JSON.stringify(user));
    }, [user]);
    useEffect(() => {
        isLoged ? setProvItem(items.filter(e => e.idUser === user.id)) : setProvItem(items.filter(e => e.idUser === "123"));
    }, [isLoged, user, items]);


    return (<></>)
}
