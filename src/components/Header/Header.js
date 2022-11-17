import React, { useContext, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ModalLogin } from '../ModalLogin/ModalLogin';
import { ModalRegister } from '../ModalRegister/ModalRegister';
import { ItemsContext } from '../../helper/context/ItemsContext';
import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';
import { ModalListSC } from '../ModalListSC/ModalListSC';

const Header = () => {
    const { items, setItems, user, setUser } = useContext(ItemsContext);

    useEffect(() => {
        sessionStorage.setItem("infoUserLoged", JSON.stringify(user));
    }, [user]);

    const renderBtnLR = () => {
        if (user.length === 0) {
            return (
                <div>
                    <ModalLogin /> <ModalRegister />
                </div>
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
                {renderBtnLR()}
            </Container>
            <div>
                <ModalListSC />
            </div>
        </Navbar>

        // <Navbar bg="dark" expand="sm" variant="dark" className="mb-3 maxWid">
        //     <Container fluid>
        //         <Navbar.Brand><NavLink to='/' className="nav-link px-2 text-white">CardMarket</NavLink></Navbar.Brand>
        //         <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-sm`} />
        //         <Navbar.Offcanvas
        //             id={`offcanvasNavbar-expand-sm`}
        //             aria-labelledby={`offcanvasNavbarLabel-expand-sm`}
        //             placement="end"
        //         >
        //             <Offcanvas.Header closeButton>
        //                 <Offcanvas.Title id={`offcanvasNavbarLabel-expand-sm`}>
        //                     CardMarket
        //                 </Offcanvas.Title>
        //             </Offcanvas.Header>
        //             <Offcanvas.Body>
        //                 <Nav className="justify-content-end flex-grow-1 pe-3">
        //                     <NavLink to='/' className={({ isActive }) => isActive ? "nav-link px-2 text-secondary" : "nav-link text-dark"}>Home</NavLink>
        //                     <NavLink to='/basket' className={({ isActive }) => isActive ? "nav-link px-2 text-secondary" : "nav-link text-dark"}>Basket</NavLink>
        //                     {/* <div className=''>
        //                         {renderProfile()}
        //                         {renderBtnLR()}
        //                     </div> */}
        //                 </Nav>
        //                 <div className='m-3 p-2'>
        //                     <ModalListSC />
        //                 </div>

        //             </Offcanvas.Body>
        //         </Navbar.Offcanvas>
        //     </Container>
        // </Navbar >
    )
}

export default Header;


