import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaShoppingCart } from "react-icons/fa";
import { ListSC } from '../ListSC/ListSC';

export function ModalListSC({ removeSC, buy, restOne }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);


    return (
        <>
            <div>
                <Button variant="primary" onClick={handleShow}>
                    <FaShoppingCart />
                </Button>
            </div>
            <Offcanvas placement={'end'} name={'end'} show={show} onHide={handleClose}>
                <Offcanvas.Header closeButton>
                    <Offcanvas.Title>Your Basket</Offcanvas.Title>
                </Offcanvas.Header>
                <hr />
                <Offcanvas.Body>

                    <ListSC removeSC={removeSC} buy={buy} restOne={restOne} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}