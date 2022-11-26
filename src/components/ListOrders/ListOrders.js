import { useContext, useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { ApiContext } from '../../helper/context/ApiContext';
import { ItemsContext } from '../../helper/context/ItemsContext';
import ListGroup from 'react-bootstrap/ListGroup';
import { v4 as uuidv4 } from 'uuid';

export const ListOrders = () => {
    const { orders, user } = useContext(ItemsContext);

    let [iOrders, setIOrders] = useState([])
    useEffect(() => {
        setIOrders(orders.filter(e => e.idUser === user.id))
    }, [orders]);

    return (
        <Accordion defaultActiveKey={[]}>
            {
                iOrders && iOrders.map((element, index) => {
                    return (
                        <div key={uuidv4()}>
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header >{index + 1}.  Order date: {element.date} - {element.firstname} {element.lastname} - Valor Total: ${element.price}</Accordion.Header>
                                <Accordion.Body>
                                    <Accordion>
                                        {/* //? Añadirlo en plan en un lado como el shopping cart  */}

                                        {(element.product).map((int, index) => {
                                                    return (
                                                        <Accordion.Item key={uuidv4()} eventKey={index}>
                                                            <Accordion.Header>{index + 1}. {int.name} / {int.version} - {int.quantity} x ${int.price}</Accordion.Header>
                                                            <Accordion.Body>
                                                                <ListGroup variant="flush">
                                                                    <ListGroup.Item>Seller: {int.seller}</ListGroup.Item>
                                                                    <ListGroup.Item>Billing address: {element.country} {element.address}</ListGroup.Item>
                                                                    <ListGroup.Item>Post code: {element.zip}</ListGroup.Item>
                                                                    <ListGroup.Item>Description: {int.description}</ListGroup.Item>
                                                                    <ListGroup.Item>Condition: {int.condition}</ListGroup.Item>
                                                                </ListGroup>
                                                            </Accordion.Body>
                                                        </Accordion.Item>
                                                    )
                                                })
                                        }
                                    </Accordion>
                                </Accordion.Body>
                            </Accordion.Item>
                        </div>
                    )
                })
            }

        </Accordion>
    );
}

export default ListOrders;