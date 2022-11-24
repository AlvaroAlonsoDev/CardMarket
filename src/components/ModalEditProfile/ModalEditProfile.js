import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { ItemsContext } from '../../helper/context/ItemsContext';
import toast from "react-hot-toast";
import { ApiContext } from '../../helper/context/ApiContext';

export const ModalEditProfile = () => {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { user, setUser, dataUsers } = useContext(ItemsContext);


    const editUser = (e) => {
        e.preventDefault();

        let interim_user = dataUsers.find(e => e.id === user.id);
        const user_edit = {
            ...interim_user,
            name: e.target.name.value,
            lastname: e.target.lastname.value,
            username: e.target.username.value,
            email: e.target.email.value,
            phonenumber: e.target.phonenumber.value,
            address: e.target.address.value,
        }

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user_edit)
        };
        fetch(`http://localhost:4000/users/${interim_user.id}`, requestOptions)
            .then(response => response.json())
            .then(() => toast.success('Successfully saved!'))
            .then(() => setUser(user_edit))
            .then(() => handleClose())
            .catch(error => console.log(error));
    }
    return (
        <>
            <Button variant="success" onClick={handleShow}>
                Edit Profile
            </Button>

            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>Edit Profile</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {/* <!-- Edit Form --> */}
                    <form onSubmit={e => editUser(e)}>

                        <div className="form-floating mb-3">
                            <input name="name" type="text" className="form-control" id="floatingInputUsername" placeholder="Name" defaultValue={user.name} />
                            <label htmlFor="floatingInputUsername">Name</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="lastname" type="text" className="form-control" id="floatingInputUsername" placeholder="Last Name" defaultValue={user.lastname} />
                            <label htmlFor="floatingInputUsername">Last Name</label>
                        </div>

                        <hr />
                        <div className="form-floating mb-3">
                            <input name="username" type="text" className="form-control" id="floatingInputUsername" placeholder="myusername" defaultValue={user.username} />
                            <label htmlFor="floatingInputUsername">Username</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="email" type="email" className="form-control" id="floatingInputEmail" placeholder="name@example.com" defaultValue={user.email} autoFocus />
                            <label htmlFor="floatingInputEmail">Email address</label>
                        </div>

                        <hr />
                        <div className="form-floating mb-3">
                            <input name="phonenumber" type="number" className="form-control" id="floatingInputUsername" placeholder="phonenumber" defaultValue={user.phonenumber} />
                            <label htmlFor="floatingInputUsername">Phone Number</label>
                        </div>

                        <div className="form-floating mb-3">
                            <input name="address" type="text" className="form-control" id="floatingInputUsername" placeholder="Address" defaultValue={user.address} />
                            <label htmlFor="floatingInputUsername">Address</label>
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
