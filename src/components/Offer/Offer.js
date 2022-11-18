import React, { useContext, useEffect, useReducer } from 'react'
import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { ItemsContext } from '../../helper/context/ItemsContext';
import { NumberReducer } from '../../helper/reducer/NumberReducer';

export const Offer = ({ offer, buy }) => {
    const [number, dispatch] = useReducer(NumberReducer, 1);
    
    useEffect(() => {
        console.log();
    }, [number]);

    const addOne = () => {
        const action = {
            type: "pluss",
            payload: number
        }
        if (number < offer.quantity) {
            dispatch(action);
        }
    }
    const restOne = () => {
        const action = {
            type: "rest",
            payload: number
        }
        if (number !== 1) {
            dispatch(action);
        }
    }

    return (
        <>
            <td>{offer.user}</td>
            <td>
                {offer.condition} - <small>{offer.description}</small></td>
            <td><i><small>{offer.quantity}</small></i> x {offer.price}€ </td>
            <td>

                <button onClick={restOne} className='btn btn-sm'><FaMinus /></button>
                {number}
                <button onClick={addOne} className='btn btn-sm'><FaPlus /></button>


            </td>
            <td>
                <button onClick={() => { buy(offer, number) }} className='btn btn-sm btn-outline-primary'><FaShoppingCart /> </button>
            </td>
        </>
    )
}
