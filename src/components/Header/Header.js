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


const Header = () => {
    const { items, setItems, user, setUser, setIsLoged } = useContext(ItemsContext);
    const navigate = useNavigate();

    useEffect(() => {
        sessionStorage.setItem("infoUserLoged", JSON.stringify(user));
    }, [user]);

    const signOutUser = (e) => {
        setUser([]);
        setIsLoged(false);
        navigate("/");
    }

    const renderBtnLR = () => {
        if (user.length === 0) {
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
        if (user.length !== 0) {
            return (
                <NavLink to='/account' className={({ isActive }) => isActive ? "nav-link px-2 text-muted" : "nav-link text-white"}>Profile</NavLink>
            )
        }
    }

    return (

        <Navbar bg="dark" variant="light" className='mb-3'>
            <Container>
                <Navbar.Brand><NavLink to='/' className="nav-link px-2 text-white">CardMarket</NavLink></Navbar.Brand>
                <Nav className="me-auto">
                    <NavLink to='/' className={({ isActive }) => isActive ? "nav-link px-2 text-muted" : "nav-link text-white"}>Home</NavLink>
                    <NavLink to='/basket' className={({ isActive }) => isActive ? "nav-link px-2 text-muted" : "nav-link text-white"}>Basket</NavLink>
                    {renderProfile()}

                </Nav>
                <ModalListSC />
            </Container>
            <div className='mx-2'>
                {renderBtnLR()}
            </div>
        </Navbar>
        
    )
}

export default Header;


