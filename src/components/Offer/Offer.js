import React, { useEffect, useReducer } from 'react'
import { Badge } from 'react-bootstrap';
import { FaShoppingCart, FaPlus, FaMinus } from "react-icons/fa";
import { NumberReducer } from '../../helper/reducer/NumberReducer';
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import IconButton from '@mui/material/IconButton';

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
            <td>${offer.price} </td>
            <td>
                <Badge bg="info" pill>
                    <small>{offer.quantity}</small>
                </Badge>
            </td>
            <td>

                <button onClick={restOne} className='btn btn-sm'><FaMinus /></button>
                {number}
                <button onClick={addOne} className='btn btn-sm'><FaPlus /></button>
                    <IconButton onClick={() => { buy(offer, number) }} color="primary" aria-label="add to shopping cart">
                        <AddShoppingCartIcon />
                    </IconButton>
            </td>
        </>
    )
}
