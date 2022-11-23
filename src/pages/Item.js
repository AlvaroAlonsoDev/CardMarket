import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Section } from "../components/Section/Section";
import { ApiContext } from "../helper/context/ApiContext";
import { ItemsContext } from "../helper/context/ItemsContext";

export const Item = () => {
    const { id } = useParams();
    const { stock, offers, items, setItems, isLoged, user } = useContext(ItemsContext);
    const [product, setProduct] = useState([]);
    const { fetchDataOffers, fetchData } = useContext(ApiContext);

    useEffect(() => {
        fetchData()
        fetchDataOffers();
    }, []);
    useEffect(() => {
        stock.forEach((item) => {
            if (item.id.toString() === id) { setProduct(item) }
        })
    }, [stock]);


    const buy = (product, amount) => {
        let interim = items.filter(item => isLoged ? (item.idUser === user.id) : (item.idUser === "123"));
        let interim2 = interim.find(item => item.id === product.id)
        if (interim2) {
            //TODO cambiarle el quantity
            let product_single = items.find(item => item.id === product.id);
            if (product.quantity >= (product_single.quantity + amount)) {
                setItems(
                    items.map(element => element.id === product.id ? {
                        ...product_single,
                        quantity: product_single.quantity + amount
                    } : element)
                );
                toast.success('Successfully saved!');
            } else { toast.error('No hay mas stock'); }
        } else {
            //TODO Añadir nuevo producto producto al carrito
            let interim = {
                id: product.id,
                seller: product.user,
                name: product.name,
                price: product.price,
                condition: product.condition,
                description: product.description,
                version: product.version
            }
            if (isLoged) {
                interim = {
                    ...interim,
                    idUser: user.id
                }
            } else {
                interim = {
                    ...interim,
                    idUser: "123"
                }
            }
            setItems([...items, { ...interim, quantity: amount }]);
            toast.success('Successfully saved!');
        }
    };

    return (
        <>
            <Section product={product} offers={offers} buy={buy} />
        </>
    );
};
