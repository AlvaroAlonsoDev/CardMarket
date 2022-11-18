import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Section } from "../components/Section/Section";
import { ApiContext } from "../helper/context/ApiContext";
import { ItemsContext } from "../helper/context/ItemsContext";

export const Item = () => {
    let interim = JSON.parse(localStorage.getItem('items'));
    const { id } = useParams();
    const { stock, offers, items, setItems } = useContext(ItemsContext);
    const [product, setProduct] = useState([]);
    const { fetchDataOffers, fetchData } = useContext(ApiContext);

    useEffect(() => {
        if (interim) { setItems(interim) }
        fetchData()
        fetchDataOffers();
    }, []);
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);
    useEffect(() => {
        stock.forEach((item) => {
            if (item.id.toString() === id) { setProduct(item) }
        })
    }, [stock]);


    const buy = (product, amount) => {
        let interim = items.find(item => item.id === product.id);

        if (interim) {
            if (product.quantity >= (interim.quantity + amount )) {
                // interim.quantity < product.quantity
                setItems(
                    items.map(element => element.id === product.id ? {
                        ...interim,
                        quantity: interim.quantity + amount
                    } : element)
                );
                toast.success('Successfully saved!');
            } else { toast.error('No hay mas stock'); }
        } else {
            let interim = {
                id: product.id,
                seller: product.user,
                name: product.name,
                price: product.price
            }
            setItems([...items, { ...interim, quantity: 1 }]);
            toast.success('Successfully saved!');
        }
    };

    return (
        <>
            <Section product={product} offers={offers} buy={buy} />
        </>
    );
};
