import { useContext, useEffect, useState } from 'react';
import Accordion from 'react-bootstrap/Accordion';
import { ApiContext } from '../../helper/context/ApiContext';
import { ItemsContext } from '../../helper/context/ItemsContext';
import { v4 as uuidv4 } from 'uuid';

export const ListOrders = () => {
    const { orders, user } = useContext(ItemsContext);
    const { fetchDataOrders } = useContext(ApiContext);
    let [iOrders, setIOrders] = useState([])

    useEffect(() => {
        fetchDataOrders();
    }, [])
    useEffect(() => {
        setIOrders(orders.filter(e => e.idUser === user.id))
        // console.log(iOrders[0].product);
    }, [orders])

    return (
        <Accordion defaultActiveKey={[0]} alwaysOpen>
            {
                iOrders && iOrders.map((e, index) => {
                    return (
                        <div key={uuidv4()}>
                            <Accordion.Item eventKey={index}>
                                <Accordion.Header >{e.firstname} {e.lastname} - Date: {e.date}</Accordion.Header>
                                <Accordion.Body>
                                    <Accordion>

                                        {
                                            e.product.map((e, index) => {
                                                return(
                                                <Accordion.Item key={uuidv4()} eventKey={index}>
                                                    <Accordion.Header>Accordion Item #1</Accordion.Header>
                                                    <Accordion.Body>
                                                        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                        eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                        minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                        aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                        reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                        pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                        culpa qui officia deserunt mollit anim id est laborum.
                                                    </Accordion.Body>
                                                </Accordion.Item>
                                                )
                                            })
                                        }
                                        {/* <Accordion.Item eventKey="0">
                                            <Accordion.Header>Accordion Item #1</Accordion.Header>
                                            <Accordion.Body>
                                                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
                                                eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
                                                minim veniam, quis nostrud exercitation ullamco laboris nisi ut
                                                aliquip ex ea commodo consequat. Duis aute irure dolor in
                                                reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
                                                pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
                                                culpa qui officia deserunt mollit anim id est laborum.
                                            </Accordion.Body>
                                        </Accordion.Item> */}
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