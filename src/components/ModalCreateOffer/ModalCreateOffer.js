import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { ItemsContext } from '../../helper/context/ItemsContext';
import { v4 as uuidv4 } from 'uuid';
import { ApiContext } from '../../helper/context/ApiContext';

export const ModalCreateOffer = ({ product }) => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { user } = useContext(ItemsContext);
    const { fetchDataOffers } = useContext(ApiContext);
    const navigate = useNavigate()

    const createNewOffer = e => {
        e.preventDefault();

        let new_offer = {
            id: uuidv4(),
            idProduct: product.id,
            idUsers: user.id,
            name: product.name,
            user: user.username,
            price: parseInt(e.target.price.value),
            condition: e.target.condition.value,
            lenguage: e.target.lenguage.value,
            quantity: parseInt(e.target.quantity.value),
            version: e.target.version.value,
            signed: e.target.signed.value,
            altered: e.target.altered.value,
            description: e.target.description.value
        }

        fetch('http://localhost:4000/offers', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_offer)
        }).then(res => res.json())
            .then(() => fetchDataOffers())
            .then(() => navigate("/"))
            .catch(error => console.log(error));

        
    }
    return (
        <>
            <div className='row aling-item-center justify-content-center'>
                <Button className='m-1 col-sm-6 text-center maxW btn' variant="primary" onClick={handleShow}>
                    Upload new offer
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>New Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={e => { createNewOffer(e) }}>

                        <div className="form-floating mb-3">
                            <input name="condition" type="text" className="form-control" id="floatingInputUsername" placeholder="condition" autoFocus />
                            <label htmlFor="floatingInputUsername">Condition</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="lenguage" type="text" className="form-control" id="floatingInputUsername" placeholder="lenguage"  />
                            <label htmlFor="floatingInputUsername">Lenguage</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="version" type="text" className="form-control" id="floatingInputUsername" placeholder="version"  />
                            <label htmlFor="floatingInputUsername">Version</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="description" type="text" className="form-control" id="floatingInputUsername" placeholder="description"  />
                            <label htmlFor="floatingInputUsername">Description</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="signed" type="text" className="form-control" id="floatingInputUsername" placeholder="signed"  />
                            <label htmlFor="floatingInputUsername">Signed</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="altered" type="text" className="form-control" id="floatingInputUsername" placeholder="altered"  />
                            <label htmlFor="floatingInputUsername">Altered</label>
                        </div>

                        <hr />

                        <div className="form-floating mb-3">
                            <input name="quantity" type="number" className="form-control" id="floatingInputUsername" placeholder="quantity"  />
                            <label htmlFor="floatingInputUsername">Quantity</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="price" type="number" className="form-control" id="floatingInputUsername" placeholder="price"  />
                            <label htmlFor="floatingInputUsername">price</label>
                        </div>

                        <br className="m-4" />

                        <div className="d-grid">
                            <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit" >
                                Create offer
                            </button>
                            <div className="text-center">
                                <Link to="/" className="small" >Not sure?</Link>
                            </div>
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
    );
}
