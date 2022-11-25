import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { NavLink } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
import { ApiContext } from '../../helper/context/ApiContext';
import { ItemsContext } from '../../helper/context/ItemsContext';

export function ModalRegister() {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    var bcrypt = require('bcryptjs');
    const { dataUsers, setUser, setIsLoged } = useContext(ItemsContext);
    const { fetchDataUsers } = useContext(ApiContext);


    const getRegisterUser = e => {
        e.preventDefault();

        // encriptar passwprd
        let i_pass = e.target.pass.value;
        const hashedPassword = bcrypt.hashSync(i_pass, 8);

        // obtener en que dia mes y año estamos
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        let new_user = {
            id: uuidv4(),
            name: e.target.name.value,
            username: e.target.username.value,
            email: e.target.email.value,
            pass: hashedPassword,
            dateregister: currentDate + ' at ' + time,
        }
        // Comprobar que no exista email igual
        let i_email = dataUsers.find(e => e.email === new_user.email)
        let i_username = dataUsers.find(e => e.username === new_user.username)

        if (!i_email && !i_username) {
            fetch('http://localhost:4000/users', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(new_user)
            }).then(res => res.json())
                .then(() => fetchDataUsers())
                .catch(error => console.log(error));
            setUser(new_user);
            setIsLoged(true);
            handleClose();
        } else { alert('email o username ya existentes') }
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

                        <div className="d-grid mb-2">
                            <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Register</button>
                        </div>

                        <NavLink className="d-block text-center mt-2 small" to="/">Have an account? Sign In</NavLink>
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