import React, { useContext, useEffect } from 'react';
import toast from 'react-hot-toast';
import { NavLink } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Offcanvas from 'react-bootstrap/Offcanvas';
import Navbar from 'react-bootstrap/Navbar';
import { ModalLogin } from '../ModalLogin/ModalLogin';
import { ModalRegister } from '../ModalRegister/ModalRegister';
import { ItemsContext } from '../../helper/context/ItemsContext';
import { ListSC } from '../ListSC/ListSC';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import './Header.css';

const Header = () => {
    const { items, setItems, user } = useContext(ItemsContext);
    let interim = JSON.parse(localStorage.getItem("infoUserLoged")) || [];
    const { setUser } = useContext(ItemsContext);

    useEffect(() => {
        if (interim) { setUser(interim) }
    }, [])
    useEffect(() => {
        localStorage.setItem("infoUserLoged", JSON.stringify(user));
    }, [user]);

    const removeSC = (id) => {
        let interim = items.filter((item, indice) => indice !== id);
        setItems(interim);

        toast('Deleted!', {
            icon: '🗑️',
        });
    }
    const view = () => {
        if (user) {
            <ModalLogin />
        }
    }

    return (
        <Navbar bg="dark" expand="xxl" variant="dark" className="mb-3">
            <Container fluid>
                <Navbar.Brand><NavLink to='/' className="nav-link px-2 text-white">CardMarket</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-xxl`} />
                <Navbar.Offcanvas
                    id={`offcanvasNavbar-expand-xxl`}
                    aria-labelledby={`offcanvasNavbarLabel-expand-xxl`}
                    placement="end"
                >
                    <Offcanvas.Header closeButton>
                        <Offcanvas.Title id={`offcanvasNavbarLabel-expand-xxl`}>
                            CardMarket
                        </Offcanvas.Title>
                    </Offcanvas.Header>
                    <Offcanvas.Body>
                        <Nav className="justify-content-end flex-grow-1 pe-3">
                            <NavLink to='/' className={({ isActive }) => isActive ? "nav-link px-2 text-secondary" : "nav-link px-2 text-dark"}>Home</NavLink>
                            <NavLink to='/basket' className={({ isActive }) => isActive ? "nav-link px-2 text-secondary" : "nav-link px-2 text-dark"}>Basket</NavLink>

                            {/* //! AÑADIR DROP CUANDO IMPLEMENTEMOS EL LOGIN (esta abajo) */}
                            {/* //? añadir el onChange para el input */}
                        </Nav>
                        <hr />
                        <div>

                            {/* {user && <ModalLogin />}
                            {user && <ModalRegister />} */}


                        </div>
                        <br />
                        <Offcanvas.Title>
                            Basket
                        </Offcanvas.Title>

                        <ListSC items={items} removeSC={removeSC} />

                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar >
    )
}

export default Header;


{   /* <NavDropdown
                                title="Account"
                                id={`offcanvasNavbarDropdown-expand-xxl`}
                            >
                                <NavDropdown.Item href="#action3">Action</NavDropdown.Item>
                                <NavDropdown.Item href="#action4">
                                    Another action
                                </NavDropdown.Item>
                                <NavDropdown.Divider />
                                <NavDropdown.Item href="#action5">
                                    Something else here
                                </NavDropdown.Item>
                            </NavDropdown> */}