import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ItemsContext } from '../../helper/context/ItemsContext';
import toast from "react-hot-toast";
import { ApiContext } from '../../helper/context/ApiContext';

export const ModalEditPass = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { user, setUser } = useContext(ItemsContext);
    const { fetchDataUsers } = useContext(ApiContext);
    let bcrypt = require('bcryptjs');

    const changePass = (e) => {
        e.preventDefault()

        // get info form
        let edit_pass = {
            oldpass: e.target.oldpass.value,
            newpass: e.target.newpass.value,
        }

        //Desencriptar password
        const decodePass = () => {
            //pass already hash
            let pass_hash = user.pass;
            let compare = bcrypt.compareSync(edit_pass.oldpass, pass_hash);
            return compare;
        }

        if (decodePass()) {
            // obtener en que dia mes
            const date = new Date();
            let day = date.getDate();
            let month = date.getMonth() + 1;
            let year = date.getFullYear();
            let currentDate = `${day}-${month}-${year}`;
            let time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

            // encriptar new passwprd
            const hashedPassword = bcrypt.hashSync(edit_pass.newpass, 8);

            // provisional 
            const interim_user = {
                ...user,
                pass: hashedPassword,
                lasteditpass: currentDate + ' at ' + time,
            }
            //actualizar base de datos (userData)
            const requestOptions = {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(interim_user)
            };
            fetch(`http://localhost:4000/users/${user.id}`, requestOptions)
                .then(response => response.json())
                .then(() => setUser(interim_user))
                .then(() => fetchDataUsers())
                .then(() => toast.success('Successfully saved!'))
                .then(() => handleClose())
                .catch(error => console.log(error));

        } else { alert("Credenciales erroneas") }

    }

    return (
        <>
            <Button className='' variant="light" onClick={handleShow}>
                Change Password
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile <small>{user.lasteditpass ? 'Last change: ' + user.lasteditpass : ""}</small></Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <!-- Edit Form --> */}
                    <form onSubmit={e => changePass(e)}>

                        <div className="form-floating mb-3">
                            <input name="oldpass" type="password" className="form-control" id="floatingInputUsername" placeholder="Name" />
                            <label htmlFor="floatingInputUsername">Old password</label>
                        </div>

                        <hr />

                        <div className="form-floating mb-3">
                            <input name="newpass" type="password" className="form-control" id="floatingInputUsername" placeholder="New Password" />
                            <label htmlFor="floatingInputUsername">New Password</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="repitenewpass" type="password" className="form-control" id="floatingInputUsername" placeholder="Repite new Password" />
                            <label htmlFor="floatingInputUsername">Repite new Password</label>
                        </div>

                        <div className="d-grid mb-2">
                            <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Confirm change</button>
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
