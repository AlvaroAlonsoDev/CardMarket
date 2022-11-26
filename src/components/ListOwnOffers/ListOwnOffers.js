import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaTrashAlt } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { ApiContext } from '../../helper/context/ApiContext';
import { ItemsContext } from '../../helper/context/ItemsContext';
import toast from "react-hot-toast";
import { ModalEditOffer } from '../ModalEditOffer/ModalEditOffer';

export function ListOwnOffers() {
    const { fetchDataOffers } = useContext(ApiContext);
    const { user, offers } = useContext(ItemsContext)
    const [myOffers, setMyOffers] = useState(offers.filter(e => e.idUsers === user.id));
    const [interim, setInterim] = useState();

    
    useEffect(()=> {
        setMyOffers(offers.filter(e => e.idUsers === user.id))
    }, [interim])


    const removeOffer = (product, id) => {
        let interim = myOffers.find((offer, indice) => indice === id);
        let offers_prov = myOffers.filter((offer, indice) => indice !== id);

        fetch(`http://localhost:4000/offers/${interim.id}`, {
            method: 'DELETE'
        }).then(() => setMyOffers(offers_prov))
            .then(() => fetchDataOffers())
            .then(() => toast('Deleted!', { icon: '🗑️' }))
            .catch(error => console.log(error));
    }

    return (
        <ListGroup as="ol" numbered>
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
                                <ModalEditOffer item={item} index={index} setInterim={setInterim}/>
                                <Button onClick={e => { removeOffer(item, index) }} variant="outline-danger" ><FaTrashAlt /></Button>
                            </div>

                        </ListGroup.Item>
                    )
                })
            }
        </ListGroup>
    );
}