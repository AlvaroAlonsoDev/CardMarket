import React, { useContext } from 'react'
import { ModalEditPass } from '../components/ModalEditPass/ModalEditPass';
import { ItemsContext } from '../helper/context/ItemsContext';
import toast from "react-hot-toast";
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';

export const Setting = () => {
    const { user, offers, isLoged, setUser, dataUsers } = useContext(ItemsContext);
    const navigate = useNavigate();

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
            .then(() => Swal.fire('All right!', 'You edited your profile!', 'success'))
            .then(() => navigate('/account'))
            .catch(error => console.log(error));
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
                                        <div className="row">
                                            <ul className="nav nav-tabs mb-3" id="myTab" role="tablist">
                                                <li className="nav-item">
                                                    <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">Edit Profile</a>
                                                </li>
                                            </ul>
                                            <div className="col-md-6">
                                                <label>User Id</label>
                                            </div>
                                            <div className="col-md-6">
                                                <p>{user.id}</p>
                                            </div>
                                        </div>
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
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-2">
                        <div><ModalEditPass /></div>
                    </div>
                </div>
            </div>
        </div>
    )
}
