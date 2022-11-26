import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { FaEdit } from "react-icons/fa";
import { ApiContext } from '../../helper/context/ApiContext';
import { ItemsContext } from '../../helper/context/ItemsContext';
import Swal from 'sweetalert2'


export const ModalEditOffer = ({ item, setInterim }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { fetchDataOffers } = useContext(ApiContext);
    const { offers, user } = useContext(ItemsContext);


    const editOffer = (e) => {
        e.preventDefault();

        // recoger info del form
        const new_offer = {
            ...item,
            price: parseInt(e.target.price.value),
            condition: e.target.condition.value,
            lenguage: e.target.lenguage.value,
            quantity: parseInt(e.target.quantity.value),
            version: e.target.version.value,
            signed: e.target.signed.value,
            altered: e.target.altered.value,
            description: e.target.description.value
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(new_offer)
        };
        fetch(`http://localhost:4000/offers/${item.id}`, requestOptions)
            .then(() => fetchDataOffers())
            .then(() => setInterim(offers.filter(e => e.idUsers === user.id)))
            .then(() => Swal.fire('All right!', 'You edited your profile!', 'success'))
            .catch(error => console.log(error));
    }


    return (
        <>
            <Button onClick={handleShow} variant="outline-success" className='mx-2'><FaEdit /></Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <!-- Edit Form --> */}
                    <form onSubmit={e => { editOffer(e) }}>

                        <div className="form-floating mb-3">
                            <input name="condition" defaultValue={item.condition} type="text" className="form-control" id="floatingInputUsername" placeholder="condition" autoFocus />
                            <label htmlFor="floatingInputUsername">Condition</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="lenguage" type="text" defaultValue={item.lenguage} className="form-control" id="floatingInputUsername" placeholder="lenguage" />
                            <label htmlFor="floatingInputUsername">Lenguage</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="version" type="text" defaultValue={item.version} className="form-control" id="floatingInputUsername" placeholder="version" />
                            <label htmlFor="floatingInputUsername">Version</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="description" type="text" defaultValue={item.description} className="form-control" id="floatingInputUsername" placeholder="description" />
                            <label htmlFor="floatingInputUsername">Description</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="signed" type="text" defaultValue={item.signed} className="form-control" id="floatingInputUsername" placeholder="signed" />
                            <label htmlFor="floatingInputUsername">Signed</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="altered" type="text" defaultValue={item.altered} className="form-control" id="floatingInputUsername" placeholder="altered" />
                            <label htmlFor="floatingInputUsername">Altered</label>
                        </div>

                        <hr />

                        <div className="form-floating mb-3">
                            <input name="quantity" type="number" defaultValue={item.quantity} className="form-control" id="floatingInputUsername" placeholder="quantity" />
                            <label htmlFor="floatingInputUsername">Quantity</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="price" type="number" defaultValue={item.price} className="form-control" id="floatingInputUsername" placeholder="price" />
                            <label htmlFor="floatingInputUsername">price</label>
                        </div>

                        <br className="m-4" />

                        <div className="d-grid">
                            <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit" >
                                Edit offer
                            </button>
                        </div>
                    </form>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="outline-primary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    )
}
