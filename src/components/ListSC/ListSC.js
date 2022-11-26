import { Button } from 'react-bootstrap';
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import React, { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ItemsContext } from '../../helper/context/ItemsContext';

export function ListSC({ removeSC, buy, restOne }) {
    const { provItem, offers } = useContext(ItemsContext);

    return (
        <>
            {
                provItem && provItem.map((item, index) => {
                    let interim = offers.find(e => e.id === item.id);
                    return (
                        <li key={uuidv4()} as="li" className="list-group-item d-flex justify-content-between lh-sm">

                            <div>
                                <h6 className="my-0">{index + 1}. {item.name} - {item.price}€</h6>
                                <small className="text-muted">{item.seller}</small> - <small>stock: {interim.quantity}</small>
                            </div>
                            <div className="pointer">
                                <button onClick={() => { restOne(item, index) }} className='btn btn-sm'><FaMinus /></button>
                                {item.quantity}
                                <button onClick={() => { buy(item) }} className='btn btn-sm'><FaPlus /></button>
                                <Button onClick={e => removeSC(index)} variant="outline-danger"><FaTrashAlt /></Button>
                            </div>
                        </li>
                    )
                })
            }
        </>


    );
}