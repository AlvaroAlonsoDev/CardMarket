import React, { useContext, useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { ModalLogin } from '../ModalLogin/ModalLogin';
import { ModalRegister } from '../ModalRegister/ModalRegister';
import { ItemsContext } from '../../helper/context/ItemsContext';
import './Header.css';
import BadgeAvatars from '../Material UI/Avatar';
import Dropdown from 'react-bootstrap/Dropdown';
import { IconButton } from '@mui/material';
import Badge from '@mui/material/Badge';
import { styled } from '@mui/material/styles';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';

const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
        right: -3,
        top: 13,
        border: `2px solid ${theme.palette.background.paper}`,
        padding: '0 4px',
    },
}));


const Header = () => {
    const { user, setUser, setIsLoged, isLoged, items } = useContext(ItemsContext);
    const navigate = useNavigate();
    const [basket, setBasket] = useState(items)


    useEffect(() => {
        setBasket(items.filter(e => isLoged ? e.idUser === user.id : e.idUser === "123"));
    }, [items])


    const signOutUser = (e) => {
        setUser([]);
        setIsLoged(false);
        navigate("/");
    }

    return (
        <Navbar collapseOnSelect expand="sm" className='bgnavBar' variant="dark">
            <Container>
                <Navbar.Brand><NavLink to='/' className="nav-link text-white">CardMarket</NavLink></Navbar.Brand>
                <Navbar.Toggle aria-controls="responsive-navbar-nav" />
                <Navbar.Collapse id="responsive-navbar-nav">
                    <Nav className="me-auto">
                        <NavLink to='/' className={({ isActive }) => isActive ? "nav-link px-2 text-dark" : "nav-link text-white"}>Home</NavLink>
                        <NavLink to='/basket' className={({ isActive }) => isActive ? "nav-link px-2 text-dark" : "nav-link text-white"}>Basket</NavLink>
                    </Nav>
                    <Nav className='mx-2'>
                        {!isLoged ? <ModalLogin /> : ''}
                        {!isLoged ? <ModalRegister /> : ''}
                        {isLoged ? (
                            <>
                                <div onClick={() => navigate('/account')}><BadgeAvatars /></div>
                                <Dropdown className=''>
                                    <Dropdown.Toggle className='' variant="outline-muted" id="dropdown-basic">
                                    </Dropdown.Toggle>
                                    <Dropdown.Menu variant="dark">
                                        <Dropdown.Item onClick={() => { navigate('/account') }}>Profile</Dropdown.Item>
                                        {/* Hacer una pagina de setting */}
                                        <Dropdown.Item onClick={() => { navigate('/setting') }}>Setting</Dropdown.Item> 
                                        <hr className='m-2' />
                                        <Dropdown.Item onClick={signOutUser} >Sign Out</Dropdown.Item>
                                    </Dropdown.Menu>

                                </Dropdown>
                            </>
                        ) : ""}
                        <IconButton onClick={() => { navigate('/basket') }} className="ms-2" aria-label="cart">
                            <StyledBadge badgeContent={basket.length} color="secondary">
                                <ShoppingCartIcon />
                            </StyledBadge>
                        </IconButton>
                    </Nav>
                </Navbar.Collapse>
            </Container>
        </Navbar>
    )
}

export default Header;



// import { useContext } from 'react';
// import Button from 'react-bootstrap/Button';
// import Container from 'react-bootstrap/Container';
// import Nav from 'react-bootstrap/Nav';
// import Navbar from 'react-bootstrap/Navbar';
// import BadgeAvatars from '../Material UI/Avatar';
// import { ItemsContext } from '../../helper/context/ItemsContext';
// import { ModalLogin } from '../ModalLogin/ModalLogin';
// import { ModalRegister } from '../ModalRegister/ModalRegister';
// import { NavLink } from 'react-bootstrap';

// function Header() {

//     const { isLoged } = useContext(ItemsContext);



//     return (
//         <Navbar bg="" expand="lg">
//             <Container fluid>
//                 <Navbar.Brand><NavLink to='/' className="nav-link text-dark">CardMarket</NavLink></Navbar.Brand>
//                 <Navbar.Toggle aria-controls="navbarScroll" />
//                 <Navbar.Collapse id="responsive-navbar-nav">
//                 </Navbar.Collapse>
//                 <Navbar.Collapse id="responsive-navbar-nav">
//                     <Nav className="me-auto">
//                         <NavLink to='/' className={({ isActive }) => isActive ? "nav-link px-2 text-muted" : "nav-link text-white"}>Home</NavLink>
//                         <NavLink to='/basket' className={({ isActive }) => isActive ? "nav-link px-2 text-muted" : "nav-link text-white"}>Basket</NavLink>
//                     </Nav>
//                 </Navbar.Collapse>
//                 {/* <Navbar.Collapse id="navbarScroll">
//                     <Nav
//                         className="me-auto my-2 my-lg-0"
//                         style={{ maxHeight: '100px' }}
//                         navbarScroll
//                     >
//                         <NavLink to='/' className={({ isActive }) => isActive ? "nav-link px-2 text-muted" : "nav-link text-white"}>Home</NavLink>
//                         <NavLink to='/basket' className={({ isActive }) => isActive ? "nav-link px-2 text-muted" : "nav-link text-white"}>Basket</NavLink>

//                         <Nav.Link href="#" disabled>
//                             Link
//                         </Nav.Link>
//                     </Nav>



//                     {!isLoged ? <ModalLogin /> : ""}
//                     {!isLoged ? <ModalRegister /> : ""}
//                     {isLoged ? <BadgeAvatars /> : ""}
//                 </Navbar.Collapse> */}
//             </Container>
//         </Navbar >
//     );
// }

// export default Header;