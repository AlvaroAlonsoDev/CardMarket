import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import React, { useContext } from "react";
import { v4 as uuidv4 } from 'uuid';
import { ItemsContext } from '../../helper/context/ItemsContext';

export function ListSC({ removeSC, buy, restOne }) {
    const { provItem } = useContext(ItemsContext);

    return (
        <ListGroup as="ol" numbered>
            {
                provItem && provItem.map((item, index) => {
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