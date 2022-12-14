import React, { useContext, useEffect, useRef, useState } from 'react'
import { ShoppingCart } from '../components/ShoppingCart/ShoppingCart'
import { ItemsContext } from '../helper/context/ItemsContext'
import { v4 as uuidv4 } from 'uuid';
import { useNavigate } from 'react-router-dom';
import { ApiContext } from '../helper/context/ApiContext';
import toast from "react-hot-toast";
import Swal from 'sweetalert2';

export const Checkout = () => {
    const { user, isLoged, items, setItems, offers, cupon, setOrders, setCupon } = useContext(ItemsContext);
    const { fetchDataOrders, fetchDataOffers } = useContext(ApiContext);
    const [interim_basket, setInterim_basket] = useState([])
    const navigate = useNavigate();
    const inputEl = useRef(null);

    useEffect(() => {
        let items_own = items.filter(item => item.idUser === user.id);
    }, []);
    useEffect(() => {
        isLoged ? setInterim_basket(items.filter(e => e.idUser === user.id)) : setInterim_basket(items.filter(e => e.idUser === "123"));
    }, [isLoged, user, items]);
    const authCupon = () => {
        let interim = inputEl.current.value;
        inputEl.current.className = 'form-control border';
        setCupon(false);
        if (interim === "123456") {
            inputEl.current.className = 'form-control border border-success rounded'
            setCupon(true);
        }
    }
    const getTotalPrice = () => {
        let total = 0;
        let totalPlusIva = 0;
        interim_basket.forEach(e => total = (e.price * e.quantity) + total);
        if (!cupon) {
            totalPlusIva = total + (total * 0.21)
            setCupon(false);
        } else {
            totalPlusIva = (total + (total * 0.21)) - 25
            setCupon(false);
        }
        return totalPlusIva.toFixed(2);
    }
    const saveOrderLS = (order) => {
        localStorage.setItem('lastOrder', JSON.stringify(order))
    }

    const fetchPost = async (newOrder) => {
        await fetch('http://localhost:4000/orders', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(newOrder)
        }).then(res => res.json())
            .then(() => saveOrderLS(newOrder))
            .then(() => setOrders(newOrder))
            .then(() => toast.success('Successfully saved!', {
                position: "top-center",
                style: {
                    border: '1px solid #713200',
                    padding: '16px',
                    color: '#713200',
                },
                iconTheme: {
                    primary: '#713200',
                    secondary: '#FFFAEE',
                },
            }))
            .then(() => navigate('/done'))
            .catch(error => console.log(error));
    }
    const fetchPut = async (id, product) => {
        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(product)
        };

        await fetch(`http://localhost:4000/offers/${id}`, requestOptions)
            .catch(error => console.log(error));
    }
    const fetchDelete = async (id) => {
        await fetch(`http://localhost:4000/offers/${id}`, {
            method: 'DELETE'
        })
            .catch(error => console.log(error));
    }

    const getNewOrder = (e) => {
        e.preventDefault();

        // obtener en que dia mes y a??o estamos
        const date = new Date();
        let day = date.getDate();
        let month = date.getMonth() + 1;
        let year = date.getFullYear();
        let currentDate = `${day}-${month}-${year}`;
        var time = date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();

        const newOrder = {
            id: uuidv4(),
            idUser: user.id,
            firstname: e.target.firstName.value,
            lastname: e.target.lastname.value,
            emailorder: e.target.email.value,
            address: e.target.address.value,
            phonenumber: e.target.phonenumber.value,
            country: e.target.country.value,
            zip: e.target.zip.value,
            ccnanme: e.target.ccname.value,
            ccnumber: e.target.ccnumber.value,
            price: Number(getTotalPrice()),
            product: interim_basket,
            date: currentDate + ' at ' + time
        }

        fetchPost(newOrder);

        // Clean LS 
        let i_cleanLS = items.filter(e => e.idUser !== user.id);
        setItems(i_cleanLS);

        //* Update product about just seller in db.json
        offers.forEach(offer => {
            (newOrder.product).forEach(e => {
                if (e.id === offer.id) {
                    if (offer.quantity > e.quantity) {
                        console.log("El stock es superior a la cantidad que compra");
                        const offer_update = {
                            ...offer,
                            quantity: offer.quantity - e.quantity,
                        }
                        fetchPut(e.id, offer_update);
                    } else {
                        console.log("No hay mas stock y borro");
                        fetchDelete(e.id);
                    }
                }
            })
        })

        // //* Send CUPON after first buy
        // console.log(user);
        // // if (isLoged && !user.admin) {
        // //     fetchDataUsers()
        // //     console.log(user);
        // //     if (!user.cupon) {
        // let i_user = {
        //     ...user,
        //     cupon: "123456"
        // }
        // const requestOptions = {
        //     method: 'PUT',
        //     headers: { 'Content-Type': 'application/json' },
        //     body: JSON.stringify(i_user)
        // };
        // fetch(`http://localhost:4000/users/${user.id}`, requestOptions)
        //     .then((e) => console.log(e.status))
        //     .then(() => setTimeout(() => { deliveryCupon(user.name) }, "3000"))
        //     .catch(error => console.log(error));
        // //     }
        // // }

        //? Proceso de cargar al finalizar

    }

    return (
        <div className='bodypro'>
            <div className='container mt-2'>
                <div className="row g-5">
                    <div className="col-md-5 col-lg-4 order-md-last">

                        <ShoppingCart />

                        <div className="">
                            <label htmlFor="cc-expiration" className="form-label">Do you have any cupon?</label>
                            {
                                cupon === true && <p className='bg-success mt-2 text-center border rounded'>Accepted</p>
                            }
                            <input onChange={e => authCupon()} ref={inputEl} type="text" name='cupon' className="form-control" id="cc-expiration" placeholder="" />
                        </div>
                    </div>

                    <div className="col-md-7 col-lg-8">
                        <h4 className="mb-3">Billing address</h4>
                        <form onSubmit={e => { getNewOrder(e) }} className="needs-validation">
                            <div className="row g-3">
                                <div className="col-sm-6">
                                    <label htmlFor="firstName" className="form-label">First name</label>
                                    <input type="text" name='firstName' className="form-control" id="firstName" defaultValue={user.name} />
                                </div>

                                <div className="col-sm-6">
                                    <label htmlFor="lastName" className="form-label">Last name</label>
                                    <input type="text" name='lastname' className="form-control" id="lastName" defaultValue={user.lastname} />
                                </div>

                                <div className="col-12">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input type="email" name='email' className="form-control" id="email" defaultValue={user.email} />
                                    <div className="invalid-feedback">
                                        Please enter a valid email address for shipping updates.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="address" className="form-label">Address</label>
                                    <input type="text" name='address' className="form-control" id="address" placeholder="1234 Main St" defaultValue={user.address} />
                                    <div className="invalid-feedback">
                                        Please enter your shipping address.
                                    </div>
                                </div>

                                <div className="col-12">
                                    <label htmlFor="username" className="form-label">Phone Number</label>
                                    <div className="input-group has-validation">
                                        <span className="input-group-text">+34</span>
                                        <input type="number" name='phonenumber' className="form-control" id="phonenumber" defaultValue={user.phonenumber} />
                                        <div className="invalid-feedback">
                                            Your Phone number is required.
                                        </div>
                                    </div>
                                </div>

                                <div className="col-md-5">
                                    <label htmlFor="country" className="form-label">Country</label>
                                    <select name='country' className="form-select" id="country" >
                                        <option >Spain</option>
                                        <option >France</option>
                                        <option >Portugal</option>
                                        <option>United States</option>
                                        <option>United Kingdom</option>
                                    </select>
                                    <div className="invalid-feedback">
                                        Please select a valid country.
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="zip" className="form-label">Zip</label>
                                    <input type="text" name='zip' className="form-control" id="zip" placeholder="18554" defaultValue={user.zip} />
                                    <div className="invalid-feedback">
                                        Zip code required.
                                    </div>
                                </div>
                            </div>

                            <hr className="my-4" />

                            <h4 className="mb-3">Payment</h4>

                            <div className="row gy-3">
                                <div className="col-md-6">
                                    <label htmlFor="cc-name" className="form-label">Name on card</label>
                                    <input type="text" name='ccname' className="form-control" id="cc-name" placeholder="" />
                                    <small className="text-muted">Full name as displayed on card</small>
                                    <div className="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>

                                <div className="col-md-6">
                                    <label htmlFor="cc-number" className="form-label">Credit card number</label>
                                    <input type="number" name='ccnumber' className="form-control" id="cc-number" placeholder="" />
                                    <div className="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="cc-cvv" className="form-label">CVV</label>
                                    <input type="text" name='cccvv' className="form-control" id="cc-cvv" placeholder="" />
                                    <div className="invalid-feedback">
                                        Security code required
                                    </div>
                                </div>

                                <div className="col-md-3">
                                    <label htmlFor="cc-expiration" className="form-label">Expiration</label>
                                    <input type="text" name='ccexpiration' className="form-control" id="cc-expiration" placeholder="" />
                                    <div className="invalid-feedback">
                                        Expiration date required
                                    </div>
                                </div>

                            </div>

                            <hr className="my-4" />

                            <button className="w-100 btn btn-primary btn-lg" type="submit">Continue to checkout</button>

                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
