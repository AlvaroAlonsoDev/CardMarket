import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ItemsContext } from '../../helper/context/ItemsContext';

export function ModalRegister() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { setUser, setIsLoged } = useContext(ItemsContext);


    const getRegisterUser = e => {
        e.preventDefault();

        let new_user = {
            id: uuidv4(),
            name: e.target.name.value,
            lastname: e.target.lastname.value,
            username: e.target.username.value,
            email: e.target.email.value,
            pass: e.target.pass.value,
            numberphone: e.target.pass.numberphone,
        }

        fetch('http://localhost:4000/users', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(new_user)
        }).then(res => res.json())
            .then(data => console.log(data))
            .catch(error => console.log(error));
        setUser(new_user);
        setIsLoged(true);
        handleClose();
    }

    return (
        <>
            <Button variant="outline-success" onClick={handleShow}>
                Sign-up
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Sign-up</Modal.Title>
                </Modal.Header>
                <Modal.Body>

                    <form onSubmit={e => { getRegisterUser(e) }}>

                        <div className="form-floating mb-3">
                            <input name="name" type="text" className="form-control" id="floatingInputUsername" placeholder="Name" autoFocus />
                            <label htmlFor="floatingInputUsername">Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="lastname" type="text" className="form-control" id="floatingInputUsername" placeholder="myusername" autoFocus />
                            <label htmlFor="floatingInputUsername">Last Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="username" type="text" className="form-control" id="floatingInputUsername" placeholder="myusername" autoFocus />
                            <label htmlFor="floatingInputUsername">Username</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="email" type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" />
                            <label htmlFor="floatingInputEmail">Email address</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="numberphone" type="number" className="form-control" id="floatingInputEmail" placeholder="654987321" />
                            <label htmlFor="floatingInputEmail">Phone Number</label>
                        </div>

                        <hr />

                        <div className="form-floating mb-3">
                            <input name="pass" type="password" className="form-control" id="floatingPassword" placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
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