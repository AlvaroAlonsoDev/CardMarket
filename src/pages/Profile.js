import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListOrders from '../components/ListOrders/ListOrders'
import { ListOwnOffers } from '../components/ListOwnOffers/ListOwnOffers'
import { ModalEditPass } from '../components/ModalEditPass/ModalEditPass'
import { ModalEditProfile } from '../components/ModalEditProfile/ModalEditProfile'
import { ItemsContext } from '../helper/context/ItemsContext'

export const Profile = () => {
    const navigate = useNavigate();
    const { user, offers, isLoged, orders } = useContext(ItemsContext);
    const i_offer = offers.find(e => e.idUsers === user.id);
    const i_order = orders.find(e => e.idUsers === user.id);

    useEffect(() => {
        if (!isLoged) { navigate('/') }
    }, [])

    function getRandomInt(max) {
        return Math.floor(Math.random() * max);
    }


    return (
        <div className="container emp-profile">
            <div className="row">
                <div className="col-md-4">
                    <div className="profile-img">
                        <img src="https://cdn.icon-icons.com/icons2/1369/PNG/512/-person_90382.png" alt="" />
                        <div className="file btn btn-lg btn-primary">
                            Change Photo
                            <input type="file" name="file" />
                        </div>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="profile-head">
                        <h5>
                            {user.name} {user.lastname}
                        </h5>
                        <h6>
                            {user.datecreate}
                        </h6>
                        <p className="proile-rating">RANKINGS : <span>{getRandomInt(100)}/100</span></p>
                        <ul className="nav nav-tabs" id="myTab" role="tablist">
                            <li className="nav-item">
                                <a className="nav-link active" id="home-tab" data-toggle="tab" href="#home" role="tab" aria-controls="home" aria-selected="true">About</a>
                            </li>
                        </ul>
                    </div>
                </div>
                <div className="col-md-2">
                    <div><ModalEditProfile /></div>
                    <div><ModalEditPass /></div>
                    
                </div>
                <div>
                </div>
            </div>
            <div className="row">
                <div className="col-md-4">
                    <div className="profile-work">
                    </div>
                </div>
                <div className="col-md-8">
                    <div className="tab-content profile-tab" id="myTabContent">
                        <div className="tab-pane fade show active" id="home" role="tabpanel" aria-labelledby="home-tab">
                            <div className="row">
                                <div className="col-md-6">
                                    <label>User Id</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{user.id}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Username</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{user.username}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Name</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{user.name} {user.lastname}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Address</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{user.address ? user.address : "Complete your Profile!"}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Email</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{user.email}</p>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6">
                                    <label>Phone</label>
                                </div>
                                <div className="col-md-6">
                                    <p>{user.phonenumber ? user.phonenumber : "Complete your Profile!"}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div>
                    <h3 className='display-4'> {i_offer ? "Your Offers" : ""}</h3>
                    <div className='mt-3'><ListOwnOffers /></div>
                </div>
                <div>
                    <hr />
                    <h3 className='display-4'>{i_order ? "Your Orders" : ""}</h3>
                    <div className='mt-2'><ListOrders /></div>
                </div>
            </div>
        </div>
    )
}
