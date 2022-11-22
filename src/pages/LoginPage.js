import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { ModalRegister } from '../components/ModalRegister/ModalRegister';
import { ApiContext } from '../helper/context/ApiContext';
import { ItemsContext } from '../helper/context/ItemsContext';

export const LoginPage = () => {
    const { fetchDataUsers } = useContext(ApiContext);
    const { dataUsers, setUser, setIsLoged } = useContext(ItemsContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDataUsers();
    }, []);

    const getLogin = (e) => {
        e.preventDefault();

        //conseguir datos del form
        let email = e.target.email.value;
        let pass = e.target.pass.value;

        // Comprobar datos
        const interim = dataUsers.find(u => email === u.email);
        const interim2 = () => {
            if (interim.pass === pass) {
                return true;
            } else { alert("credenciales erroneas"); }
        }

        if (interim2()) {
            setUser(interim);
            setIsLoged(true);
            navigate('/checkout')
        }
    }

    return (
        <div className='container mt-2'>
            <div className="row g-5">

                <div className="col-md-7 col-lg-8">
                    <h4 className="display-3 my-2 text-center">Log in</h4>
                    <form onSubmit={e => getLogin(e)} className="needs-validation">
                        <div className="row g-3">

                            <div className="form-floating mb-3">
                                <input type="email" name="email" className="form-control" id="floatingInput" placeholder="name@example.com" />
                                <label htmlFor="floatingInput">Email address</label>
                            </div>

                            <div className="form-floating mb-3">
                                <input type="password" name="pass" className="form-control" id="floatingPassword" placeholder="Password" />
                                <label htmlFor="floatingPassword">Password</label>
                            </div>

                            <div className="form-check m-2 mb-3">
                                <input className="form-check-input" type="checkbox" value="" id="rememberPasswordCheck" />
                                <label className="form-check-label" htmlFor="rememberPasswordCheck">
                                    Remember password
                                </label>
                            </div>
                        </div>


                        <button className="mt-2 w-100 btn btn-primary btn-lg" type="submit">Log in</button>

                        <hr className="my-4" />

                        <p className='text-muted'>Don’t have an account? <ModalRegister /></p>

                    </form>
                </div>
                <div className="col-md-5 col-lg-4 order-md-last">
                    <h4 className="d-flex justify-content-between align-items-center mb-3">
                        <span className="text-primary">Your cart</span>
                        <span className="badge bg-primary rounded-pill">3</span>
                    </h4>
                    <ul className="list-group mb-3">
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">Product name</h6>
                                <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$12</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">Second product</h6>
                                <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$8</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between lh-sm">
                            <div>
                                <h6 className="my-0">Third item</h6>
                                <small className="text-muted">Brief description</small>
                            </div>
                            <span className="text-muted">$5</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between bg-light">
                            <div className="text-success">
                                <h6 className="my-0">Promo code</h6>
                                <small>EXAMPLECODE</small>
                            </div>
                            <span className="text-success">−$5</span>
                        </li>
                        <li className="list-group-item d-flex justify-content-between">
                            <span>Total (USD)</span>
                            <strong>$20</strong>
                        </li>
                    </ul>

                </div>
            </div>
        </div>
    )
}
