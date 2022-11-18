import React, { useContext, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Offcanvas from 'react-bootstrap/Offcanvas';
import { FaShoppingCart } from "react-icons/fa";
import toast from 'react-hot-toast';
import { ItemsContext } from '../../helper/context/ItemsContext';
import { ListSC } from '../ListSC/ListSC';

export function ModalListSC({ removeSC, buy }) {
    const [show, setShow] = useState(false);
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
    const { items, setItems } = useContext(ItemsContext);


    
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
                    
                    <ListSC items={items} removeSC={removeSC} buy={buy} />
                </Offcanvas.Body>
            </Offcanvas>
        </>
    );
}
// import React, { useContext, useEffect, useState } from 'react';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
// import { ListSC } from '../ListSC/ListSC';

// import { ItemsContext } from '../../helper/context/ItemsContext';


// export const ModalListSC = () => {
//     const [show, setShow] = useState(false);
//     const handleClose = () => setShow(false);
//     const handleShow = () => setShow(true);


//     return (
//         <>
//             <div className='row aling-item-center justify-content-center'>
//                 <Button className='m-1 maxW btn' variant="outline-info" onClick={handleShow}>
//                     <FaShoppingCart /> Basket
//                 </Button>
//             </div>

//             <Modal show={show} onHide={handleClose} >
//                 <Modal.Header closeButton>
//                     <Modal.Title>New Offer</Modal.Title>
//                 </Modal.Header>
//                 <Modal.Body>

//                     <ListSC items={items} removeSC={removeSC} />

//                 </Modal.Body>
//                 <Modal.Footer>
//                     <Button variant="outline-primary" onClick={handleClose}>
//                         Close
//                     </Button>
//                 </Modal.Footer>
//             </Modal>
//         </>
//     );
// }
