import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { json, NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ItemsContext } from '../../helper/context/ItemsContext';

export const ModalDeleteOffer = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const getDeleteNewOffer = (e) => {
        e.preventDefault();
        console.log(e);
    }
    return (
        <>
            <div className='row aling-item-center justify-content-center'>
                <Button className='m-1 col-sm-6 text-center maxW btn' variant="danger" onClick={handleShow}>
                    Upload new offer
                </Button>
            </div>

            <Modal show={show} onHide={handleClose} >
                <Modal.Header closeButton>
                    <Modal.Title>New Offer</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={e => { getDeleteNewOffer(e) }}>

                        <div className="form-floating mb-3">
                            <input name="username" type="text" className="form-control" id="floatingInputUsername" placeholder="myusername" autoFocus />
                            <label htmlFor="floatingInputUsername">Username</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="email" type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" />
                            <label htmlFor="floatingInputEmail">Email address</label>
                        </div>

                        <hr />

                        <div className="form-floating mb-3">
                            <input name="pass" type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input type="password" className="form-control" id="floatingPasswordConfirm" placeholder="Confirm Password" />
                            <label htmlFor="floatingPasswordConfirm">Confirm Password</label>
                        </div>

                        <div className="d-grid mb-2">
                            <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Register</button>
                        </div>

                        <NavLink className="d-block text-center mt-2 small" to="/">Have an account? Sign In</NavLink>

                        <hr className="my-4" />
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
