import { useState } from 'react';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaTrashAlt } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';

export function ListOwnOffers({ user, offers }) {
    const [myOffers, setMyOffers] = useState(offers.filter(e => e.idUsers === user.id));


    const removeOffer = (product, id) => {
        let interim = myOffers.find((offer, indice) => indice === id);
        let offers_prov = myOffers.filter((offer, indice) => indice !== id);

        fetch(`http://localhost:4000/offers/${interim.id}`, {
            method: 'DELETE'
        }).then(() => setMyOffers(offers_prov));
}

return (
    <ListGroup as="ol" numbered>
        <div className='m-5 bg-dark'>
            <h5 className='text-center p-3 text-white'>
                Your Shopping Cart
            </h5>
        </div>
        {
            myOffers && myOffers.map((item, index) => {
                return (
                    <ListGroup.Item
                        key={uuidv4()}
                        as="li"
                        className="d-flex justify-content-between align-items-start"
                    >
                        <div className="ms-2 me-auto">
                            <div className="fw-bold">{item.name}</div>
                            {item.quantity} x {item.price}
                        </div>

                        {/* //TODO CAMBIAR BOTON PARA QUE HAGA UN METHOD DELETE */}
                        <div className="pointer">
                            <Button onClick={e => { removeOffer(item, index) }} variant="outline-danger"><FaTrashAlt /></Button>
                        </div>

                    </ListGroup.Item>
                )
            })
        }
    </ListGroup>
);
}