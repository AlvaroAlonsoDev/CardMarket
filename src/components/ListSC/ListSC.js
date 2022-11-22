import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import React, { useContext, useEffect, useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ItemsContext } from '../../helper/context/ItemsContext';

export function ListSC({ removeSC, buy, restOne }) {
    const { user, isLoged, items } = useContext(ItemsContext);
    const [prov, setProv] = useState([])

    useEffect(() => {
        isLoged ? setProv(items.filter(e => e.idUser === user.id)) : setProv(items.filter(e => e.idUser === "123"));
    }, [isLoged, user, items]);

    return (
        <ListGroup as="ol" numbered>
            {
                prov && prov.map((item, index) => {
                    return (
                        <ListGroup.Item
                            key={uuidv4()}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{item.name} - {item.price}€</div>
                                {item.seller}
                            </div>
                            <div className="pointer">
                                <button onClick={() => { restOne(item, index) }} className='btn btn-sm'><FaMinus /></button>
                                {item.quantity}
                                <button onClick={() => { buy(item) }} className='btn btn-sm'><FaPlus /></button>
                                <Button onClick={e => removeSC(index)} variant="outline-danger"><FaTrashAlt /></Button>
                            </div>
                        </ListGroup.Item>
                    )
                })
            }


        </ListGroup >
    );
}