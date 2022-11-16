import React, { useRef } from 'react';
import './ShoppingCart.css';
import { FaShoppingBasket, FaWindowClose } from "react-icons/fa";
import Carrito from '../Carrito/Carrito';

export const ShoppingCart = ({ items, removeSC }) => {
    const basketDisplay = useRef();

    const displayBasket = () => {
        basketDisplay.current.classList.toggle("countDisplay")
    }
    

    return (

        <>

            <div ref={basketDisplay} className="info-carrito">
                <div className="closewindow" onClick={() => displayBasket()}>
                    <FaWindowClose />
                </div>
                <h2>Cart Details</h2>
                <i className="fa fa-shopping-basket fa-3x" aria-hidden="true"></i>
                <p>You have choose the following items.</p>
                <div className="app-body">
                    <ul className="list">
                        <Carrito items={items} removeSC={removeSC} />

                    </ul>
                </div>
                <div><h5>Precio total : 10€</h5></div>
                <div className="openpopup">
                    Check out
                </div>
                <div className="openpopup2">
                    Clear Cart
                </div>
            </div>

            <div id="tray" onClick={() => displayBasket()}>
                <div className="count countDisplay">
                    <p className='faNumber'>{items.length}</p>
                </div>

                <div className='fa'>
                    <FaShoppingBasket />
                </div>
            </div>
        </>
    )
}
