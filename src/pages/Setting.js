import React, { useContext } from 'react'
import { ItemsContext } from '../helper/context/ItemsContext';
import { FaArrowLeft } from "react-icons/fa";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../helper/context/ApiContext';
import { Tab, Tabs } from 'react-bootstrap';
import { Button } from '@mui/material';

export const Setting = () => {
    const { user, setUser, dataUsers } = useContext(ItemsContext);
    const { fetchDataUsers } = useContext(ApiContext);

    const navigate = useNavigate();
    let bcrypt = require('bcryptjs');

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }

    const editUser = (e) => {
        e.preventDefault();

        // obtener en que dia mes y año estamos
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;

        // buscamos el user y creamos el provisional
        let interim_user = dataUsers.find(e => e.id === user.id);
        const user_edit = {
            ...interim_user,
            name: e.target.name.value,
            lastname: e.target.lastname.value,
            username: e.target.username.value,
            email: e.target.email.value,
            phonenumber: e.target.phonenumber.value,
            address: e.target.address.value,
            zip: e.target.zip.value,
            lastedit: currentDate,
        }
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(user_edit)
        };
        fetch(`http://localhost:4000/users/${interim_user.id}`, requestOptions)
            .then(response => response.json())
            .then(() => setUser(user_edit))
            .then(() => fetchDataUsers())
            .then(() => Swal.fire('All right!', 'You edited your profile!', 'success'))
            .catch(error => console.log(error));
    }
    const changePass = (e) => {
        e.preventDefault()

        Swal.fire({
            title: 'Do you want to save the changes?',
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: 'Save',
            denyButtonText: `Don't save`,
        }).then((result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
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
                        .then(() => Swal.fire('Saved!', '', 'success'))
                        .catch(error => console.log(error));
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Oops...',
                        text: 'Password went wrong!',
                        footer: '<a href="">Why do I have this issue?</a>'
                    })
                }

            } else if (result.isDenied) {
                Swal.fire('Changes are not saved', '', 'info')
            }
        })
    }

    return (
        <div className='bodypro'>
            <div className="container mt-4">
                <div className="row">
                    <div className="col-md-4">
                        <div className="profile-img">
                            <img src="https://img.freepik.com/vector-premium/diseno-avatar-persona_24877-38130.jpg?w=2000" alt="" />
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="profile-head">
                            <h5>
                            </h5>
                            {user.name} {user.lastname} <small>{user.datecreate}</small>
                            <p className="proile-rating">RANKINGS : <span>{getRandomInt(100)}/100</span></p>
                            <div className="col-md-8">
                                <div className="tab-content profile-tab" id="myTabContent">
                                    <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">


                                        <Tabs
                                            defaultActiveKey="profile"
                                            transition={false}
                                            id="noanim-tab-example"
                                            className="mb-3 mt-"
                                        >
                                            <Tab eventKey="profile" title="Edit Profile">
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

                                                    <div className="form-floating mb-3">
                                                        <input name="zip" type="text" className="form-control" id="floatingInputUsername" placeholder="Post Code" defaultValue={user.zip} />
                                                        <label htmlFor="floatingInputUsername">zip</label>
                                                    </div>

                                                    <div className="d-grid mb-2">
                                                        <button className="btn btn-lg btn-primary btn-login fw-bold text-uppercase" type="submit">Confirm change</button>
                                                    </div>

                                                </form>
                                            </Tab>
                                            <Tab eventKey="home" title="Change Password">
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
                                            </Tab>
                                        </Tabs>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div>
                            <Button onClick={() => navigate('/account')} variant='outlined' color="secondary">
                                <FaArrowLeft /> Go back 
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
