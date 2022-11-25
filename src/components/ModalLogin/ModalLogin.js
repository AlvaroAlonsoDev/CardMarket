import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { useNavigate } from 'react-router-dom';
import { ItemsContext } from '../../helper/context/ItemsContext';

export function ModalLogin() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { dataUsers, setUser, setIsLoged, setItems, items } = useContext(ItemsContext);
    // const navigate = useNavigate();
    var bcrypt = require('bcryptjs');

    const getLogin = (e) => {
        e.preventDefault();

        //conseguir datos del form
        let email = e.target.email.value;
        let pass_form = e.target.pass.value;

        // Comprobar datos
        const interim_autho = dataUsers.find(u => email === u.email);

        const decodePass = () => {
            //Desencriptar password
            let pass_hash = interim_autho.pass;
            let compare = bcrypt.compareSync(pass_form, pass_hash)
            return compare;
        }

        if (decodePass()) {
            setItems(
                items.map(element => element.idUser === "123" ? {
                    ...element,
                    idUser: interim_autho.id
                } : element))
            setUser(interim_autho);
            setIsLoged(true);
            // navigate('/account');
        }else{ alert("credenciales erroneas"); }
    }

    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Login
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Login</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <!-- Sign In Form --> */}
                    <form onSubmit={e => getLogin(e)}>
                        <div className="form-floating mb-3">
                            <input type="email" name="email" className="form-control" id="floatingInput" placeholder="name@example.com" autoFocus />
                            <label htmlFor="floatingInput">Email address</label>
                        </div>
                        <div className="form-floating mb-3">
                            <input type="password" name="pass" className="form-control" id="floatingPassword" placeholder="Password" />
                            <label htmlFor="floatingPassword">Password</label>
                        </div>

                        <div className="form-check mb-3">
                            <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                            <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                Remember password
                            </label>
                        </div>

                        <div className="d-grid">
                            <button className="btn btn-lg btn-primary btn-login text-uppercase fw-bold mb-2" type="submit" >
                                Sign in
                            </button>
                            <div className="text-center">
                                <a className="small" href="/">Forgot password?</a>
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