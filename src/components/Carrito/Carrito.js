import React from 'react'

const Carrito = ({ items }) => {

    const listCart = items && items.map((item, indice) => {
        return (
            <li key={indice} className="item">
                <p>{item.name}-{item.quantity} x {item.price}€ &nbsp; <button>x</button></p>
            </li>
        )
    });

    return (
        <>
            {listCart}
        </>
    )
}

export default Carrito