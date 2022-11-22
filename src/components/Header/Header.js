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
    let offer;
    const { user, setUser, setIsLoged, isLoged, items, setItems, offers } = useContext(ItemsContext);
    const { fetchDataOffers } = useContext(ApiContext);
    const navigate = useNavigate();

    useEffect(() => {
        fetchDataOffers();
    }, []);
    useEffect(() => {
        sessionStorage.setItem("infoUserLoged", JSON.stringify(user));
    }, [user]);

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
        let interim = items.filter((item, indice) => indice !== id);
        setItems(interim);

        toast('Deleted!', {
            icon: '🗑️',
        });
    }

    const buy = (product, amount = 1) => {
        let interimSC = items.find(item => item.id === product.id);
        offer = offers.find(item => item.id === product.id);

        if (interimSC) {
            if (offer.quantity >= (interimSC.quantity + amount)) {
                setItems(
                    items.map(element => element.id === offer.id ? {
                        ...interimSC,
                        quantity: interimSC.quantity + amount
                    } : element)
                );
                toast.success('Successfully saved!');
            } else { toast.error('No hay mas stock'); }
        }
    };

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
                        <ModalListSC removeSC={removeSC} buy={buy} />
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;


