import { useContext, useEffect, useState } from 'react';
import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { FaTrashAlt } from "react-icons/fa";
import { v4 as uuidv4 } from 'uuid';
import { ApiContext } from '../../helper/context/ApiContext';
import { ItemsContext } from '../../helper/context/ItemsContext';
import { ModalEditOffer } from '../ModalEditOffer/ModalEditOffer';
import Swal from 'sweetalert2'

export function ListOwnOffers() {
    const { fetchDataOffers } = useContext(ApiContext);
    const { user, offers } = useContext(ItemsContext)
    const [myOffers, setMyOffers] = useState(offers.filter(e => e.idUsers === user.id));
    const [interim, setInterim] = useState();


    useEffect(() => {
        setMyOffers(offers.filter(e => e.idUsers === user.id))
    }, [interim])


    const removeOffer = (product, id) => {
        Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Yes, delete it!'
        }).then((result) => {
            if (result.isConfirmed) {
                let interim = myOffers.find((offer, indice) => indice === id);
                let offers_prov = myOffers.filter((offer, indice) => indice !== id);

                fetch(`http://localhost:4000/offers/${interim.id}`, {
                    method: 'DELETE'
                }).then(() => setMyOffers(offers_prov))
                    .then(() => fetchDataOffers())
                    .then(() => Swal.fire(
                        'Deleted!',
                        'Your file has been deleted.',
                        'success'
                    ))
                        .catch(error => console.log(error));
            }
        })

    }

    return (
        <ListGroup numbered>
            {
                myOffers && myOffers.map((item, index) => {
                    return (
                        <ListGroup.Item key={uuidv4()} as="li" className="d-flex justify-content-between align-items-start">
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{item.name}</div>
                                {item.quantity} x ${item.price}
                            </div>

                            <div className="pointer">
                                <ModalEditOffer item={item} index={index} setInterim={setInterim} />
                                <Button onClick={e => { removeOffer(item, index) }} variant="outline-danger" ><FaTrashAlt /></Button>
                            </div>

                        </ListGroup.Item>
                    )
                })
            }
        </ListGroup>
    );
}