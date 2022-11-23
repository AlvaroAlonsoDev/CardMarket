import React, { useContext, useEffect } from 'react'
import { ItemsContext } from '../../helper/context/ItemsContext';

export const Helper = () => {

    let interim = JSON.parse(localStorage.getItem('items'));

    const { items, setItems } = useContext(ItemsContext);

    useEffect(() => {
        if (interim) { setItems(interim) }
    }, []);
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);


    return (
        <></>
    )
}
