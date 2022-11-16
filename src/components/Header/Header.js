import React, { useContext } from 'react';
import { NavLink } from 'react-router-dom';
import './Header.css';
import { ModalLogin } from '../ModalLogin/ModalLogin';
import { ModalRegister } from '../ModalRegister/ModalRegister';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
// import NavDropdown from 'react-bootstrap/NavDropdown';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { ItemsContext } from '../../helper/context/ItemsContext';
import { ListSC } from '../ListSC/ListSC';

const Header = () => {
    const { items } = useContext(ItemsContext);
    const removeSC = (product) => {
        alert("borrado");
        console.log(product);
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

                            {/* //! AÑADIR DROP CUANDO IMPLEMENTEMOS EL LOGIN */}
                            {/* //? añadir el onChange para el input */}
                            {/* <NavDropdown
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
                        </Nav>
                        <hr />
                        <Form className="d-flex">
                            <Form.Control
                                type="search"
                                placeholder="Search"
                                className="me-2"
                                aria-label="Search"
                            />
                            <Button variant="outline-primary">Search</Button>
                        </Form>
                        <hr />
                        <div>
                            <ModalLogin /> <ModalRegister />
                        </div>
                        <br />
                        <Offcanvas.Title>
                            Basket
                        </Offcanvas.Title>
                        {/* //! AÑADIR COMPONENTE SHOPPING CART */}
                        <ListSC items={items} removeSC={removeSC} />
                    </Offcanvas.Body>
                </Navbar.Offcanvas>
            </Container>
        </Navbar >
    )
}

export default Header;