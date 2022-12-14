import React, { useContext, useEffect, useState } from 'react';
import { ItemsContext } from '../../helper/context/ItemsContext';
import { v4 as uuidv4 } from 'uuid';

export const ShoppingCart = () => {
    const { items, isLoged, cupon, setCupon, user } = useContext(ItemsContext);
    const [interim_basket, setInterim_basket] = useState([])


    useEffect(() => {
        isLoged ? setInterim_basket(items.filter(e => e.idUser === user.id)) : setInterim_basket(items.filter(e => e.idUser === "123"));
    }, [isLoged, user, items]);
    useEffect(() => {
        getTotalPrice();
    }, [cupon])

    const getIvaPrice = () => {
        let total = 0;
        interim_basket.forEach(e => total = (e.price * e.quantity) + total);
        let interim_iva = total * 0.21;
        return interim_iva.toFixed(2);
    }
    const getTotalPrice = () => {
        let total = 0;
        let totalPlusIva = 0;
        interim_basket.forEach(e => total = (e.price * e.quantity) + total);
        cupon ? totalPlusIva = (total + (total * 0.21)) - 25 : totalPlusIva = total + (total * 0.21);
        return totalPlusIva.toFixed(2);
    }


    return (

        <>
            <h4 className="d-flex justify-content-between align-items-center mb-3">
                <span className="text-primary">Your cart</span>
                <span className="badge bg-primary rounded-pill">{interim_basket.length}</span>
            </h4>
            <ul className="list-group mb-3">

                {/* //? display the own basket */}
                {interim_basket && interim_basket.map(item => {
                    return (
                        <li key={uuidv4()} className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">{item.quantity} x {item.name}</h6>
                                <small className="text-muted">{item.version} - {item.seller}</small>
                            </div>
                            <span className="text-muted">${item.price}</span>
                        </li>
                    )
                })}
                {
                    cupon === true && <li className="list-group-item d-flex justify-content-between">
                        <span>Discount <small>$25</small> (USD)</span>
                        <strong>-$25</strong>
                    </li>
                }
                <li className="list-group-item d-flex justify-content-between">
                    <span>Tax <small>21%</small> (USD)</span>
                    <strong>${getIvaPrice()}</strong>
                </li>
                <li className="list-group-item d-flex justify-content-between">
                    <span>Total (USD)</span>
                    <strong>${getTotalPrice()}</strong>
                </li>
            </ul>
        </>
    )
}
