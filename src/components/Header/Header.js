import React, { useContext, useEffect } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ModalLogin } from '../ModalLogin/ModalLogin';
import { ModalRegister } from '../ModalRegister/ModalRegister';
import { ItemsContext } from '../../helper/context/ItemsContext';
import './Header.css';
import { ModalListSC } from '../ModalListSC/ModalListSC';
import Button from 'react-bootstrap/Button';
import toast from 'react-hot-toast';
import { ApiContext } from "../../helper/context/ApiContext";


const Header = () => {
    const { user, setUser, setIsLoged, isLoged, items, setItems, offers } = useContext(ItemsContext);
    const navigate = useNavigate();


    const signOutUser = (e) => {
        setUser([]);
        setIsLoged(false);
        navigate("/");
    }

    const renderBtnLR = () => {
        if (!isLoged) {
            return (
                <div>
                    <ModalLogin /> <ModalRegister />
                </div>
            )
        } else {
            return (
                <Button className="mx-2" variant="outline-danger" onClick={signOutUser}>
                    Sign Out
                </Button>
            )
        }
    }
    const renderProfile = () => {
        if (isLoged) {
            return (
                <NavLink to='/account' className={({ isActive }) => isActive ? "nav-link px-2 text-muted" : "nav-link text-white"}>Profile</NavLink>
            )
        }
    }

    const removeSC = (id) => {
        let interim_sameID = items.filter(item => isLoged ? (item.idUser === user.id) : (item.idUser === "123"));
        let interim_other = items.filter(item => isLoged ? (item.idUser !== user.id) : (item.idUser !== "123"));
        let interim = interim_sameID.filter((item, indice) => indice !== id);
        setItems(interim_other.concat(interim));
        toast('Deleted!', {
            icon: '🗑️',
        });
    }

    const buy = (product, amount = 1) => {
        let interim = items.filter(item => isLoged ? (item.idUser === user.id) : (item.idUser === "123"));
        let interim2 = interim.find(item => item.id === product.id)
        if (interim2) {
            //* cambiarle el quantity
            let product_single = items.find(item => item.id === product.id);
            let offer = offers.find(item => item.id === product.id);
            
            if (offer.quantity > product_single.quantity) {
                setItems(
                    items.map(element => element.id === offer.id ? {
                        ...product_single,
                        quantity: product_single.quantity + amount
                    } : element)
                );
                toast.success('Successfully saved!');
            } else { toast.error('No hay mas stock'); }
        }
    };

    const restOne = (product, id) => {
        let interim_same_ID = items.filter(item => isLoged ? (item.idUser === user.id) : (item.idUser === "123"));
        let interim = interim_same_ID.find((item, indice) => indice === id);

        let interim_other = items.filter(item => isLoged ? (item.idUser !== user.id) : (item.idUser !== "123"));
        let interim_delete = interim_same_ID.filter((item, indice) => indice !== id);

        interim.quantity > 1 ?
            setItems(
                items.map(element => element.id === product.id ? {
                    ...element,
                    quantity: element.quantity - 1
                } : element)
            ) : setItems(interim_other.concat(interim_delete));
    }

    return (
        <Navbar collapseOnSelect expand="sm" bg="dark" variant="dark">
            <Container>
                <Navbar.Brand><NavLink to='/' className="nav-link text-white">CardMarket</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className={({ isActive }) => isActive ? "nav-link px-2 text-muted" : "nav-link text-white"}>Home</NavLink>
                        <NavLink to='/basket' className={({ isActive }) => isActive ? "nav-link px-2 text-muted" : "nav-link text-white"}>Basket</NavLink>
                        {renderProfile()}
                    </Nav>
                    <Nav>
                        {renderBtnLR()}
                    </Nav>
                    <Nav className='mx-2'>
                        <ModalListSC removeSC={removeSC} buy={buy} restOne={restOne} />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;


