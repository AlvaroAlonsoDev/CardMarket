import React, { useContext, useEffect, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { Link, useNavigate } from 'react-router-dom';
import { ItemsContext } from '../../helper/context/ItemsContext';
import { v4 as uuidv4 } from 'uuid';
import { ApiContext } from '../../helper/context/ApiContext';

export const ModalCreateProduct = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { fetchData } = useContext(ApiContext);
    const { setStock } = useContext(ItemsContext);
    const navigate = useNavigate()



    const createNewOffer = e => {
        e.preventDefault();

        let new_product = {
            id: uuidv4(),
            name: e.target.name.value,
            description: e.target.description.value,
            img: e.target.img.value,
        }

        fetch('http://localhost:4000/products', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_product)
        }).then(res => res.json())
            .then(() => fetchData())
            .then(() => handleClose())
            .catch(error => console.log(error));

        navigate("/")
    }
    return (
        <>
            <div className='row justify-content-center'>
                <button className="btn btn-info btn-lg col-auto p-3" onClick={handleShow}>Add new PRODUCT</button>
            </div>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>New Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={e => { createNewOffer(e) }}>

                        <div className="form-floating mb-3">
                            <input name="name" type="text" className="form-control" id="floatingInputUsername" placeholder="condition" autoFocus />
                            <label htmlFor="floatingInputUsername">Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="description" type="text" className="form-control" id="floatingInputUsername" placeholder="Description" />
                            <label htmlFor="floatingInputUsername">Description</label>
                        </div>

                        <hr className="m-3" />

                        <div className="form-floating mb-3">
                            <input name="img" type="text" className="form-control" id="floatingInputUsername" placeholder="Image" />
                            <label htmlFor="floatingInputUsername">Img</label>
                        </div>

                        <br className="m-4" />

                        <div className="d-grid">
                            <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit" >
                                Create Product
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
