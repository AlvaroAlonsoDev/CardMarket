import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom';
import { ModalRegister } from '../components/ModalRegister/ModalRegister';
import { ShoppingCart } from '../components/ShoppingCart/ShoppingCart';
import { ItemsContext } from '../helper/context/ItemsContext';

export const LoginPage = () => {
    const { dataUsers, setUser, setIsLoged, setItems, items } = useContext(ItemsContext);
    const navigate = useNavigate();
    let bcrypt = require('bcryptjs');

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
            navigate('/checkout')
        } else { alert("credenciales erroneas"); }
    }
    // const getLogin = (e) => {
    //     e.preventDefault();

    //     //conseguir datos del form
    //     let email = e.target.email.value;
    //     let pass = e.target.pass.value;

    //     // Comprobar datos
    //     const interim_autho = dataUsers.find(u => email === u.email);
    //     const interim_autho_pass = () => {
    //         if (interim_autho.pass === pass) {
    //             return true;
    //         } else { alert("credenciales erroneas"); }
    //     }

    //     if (interim_autho_pass()) {
    //         setItems(
    //             items.map(element => element.idUser === "123" ? {
    //                 ...element,
    //                 idUser: interim_autho.id
    //             } : element))
    //     }
    //     setUser(interim_autho);
    //     setIsLoged(true);
    //     navigate('/checkout')
    // }

    return (
        <div className='container mt-2'>
            <div className="row g-5">

                <div className="col-md-7 col-lg-8">
                    <h4 className="display-3 my-2 text-center">Log in</h4>
                    <form onSubmit={e => getLogin(e)} className="needs-validation mt-3">
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

                {/* //? HACER COMPONENTE ESTA SECCION */}
                <div className="col-md-5 col-lg-4 order-md-last">
                    <ShoppingCart />
                </div>
            </div>
        </div>
    )
}
