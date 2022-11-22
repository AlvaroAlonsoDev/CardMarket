import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaTrashAlt } from "react-icons/fa";
import { FaPlus, FaMinus } from "react-icons/fa";
import React from "react";
import { v4 as uuidv4 } from 'uuid';

export function ListSC({ items, removeSC, buy }) {

    return (
        <ListGroup as="ol" numbered>
            {
                items && items.map((item, index) => {
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
                                <button className='btn btn-sm'><FaMinus /></button>
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