import React, { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { useParams } from "react-router-dom";
import { Section } from "../components/Section/Section";
// import { ShoppingCart } from "../components/ShoppingCart/ShoppingCart";
import { ApiContext } from "../helper/context/ApiContext";
import { ItemsContext } from "../helper/context/ItemsContext";

export const Item = () => {
    let interim = JSON.parse(localStorage.getItem('items'));
    const { id } = useParams();
    const { stock, offers, items, setItems } = useContext(ItemsContext);
    const [product, setProduct] = useState({});
    const { fetchDataOffers } = useContext(ApiContext);

    useEffect(() => {
        if (interim) { setItems(interim) }
        fetchDataOffers();
        stock.forEach((item) => {
            if (item.id.toString() === id) { setProduct(item) }
        })
    }, []);
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);


    const buy = (product) => {
        const interim = items.find(item => item.id === product.id);

        if (interim) {
            setItems(
                items.map(element => element.id === product.id ? {
                    ...interim,
                    quantity: interim.quantity + 1
                } : element)
            );
        } else {
            let interim = {
                id: product.id,
                seller: product.user,
                name: product.name,
                price: product.price
            }
            setItems([...items, { ...interim, quantity: 1 }]);
        }
        toast.success('Successfully saved!');
    };

    // const removeSC = (id) => {
    //     let interim = items.filter((item, indice) => indice !== id);

    //     setItems(interim);
    // }

    return (
        <>
            <Section product={product} offers={offers} buy={buy} />
            {/* <ShoppingCart items={items} removeSC={removeSC} /> */}

        </>
    );
};
