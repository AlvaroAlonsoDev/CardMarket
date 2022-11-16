import { Button } from 'react-bootstrap';
import ListGroup from 'react-bootstrap/ListGroup';
import { Toaster } from 'react-hot-toast';
import { FaTrashAlt } from "react-icons/fa";

export function ListSC({ items, removeSC }) {


    return (
        <ListGroup as="ol" numbered>
            {
                items && items.map((item, index) => {
                    return (
                        <ListGroup.Item
                            key={item.id}
                            as="li"
                            className="d-flex justify-content-between align-items-start"
                        >
                            <div className="ms-2 me-auto">
                                <div className="fw-bold">{item.name}</div>
                                {item.quantity} x {item.price}
                            </div>
                            <div className="pointer">
                                <Button onClick={e => removeSC(index)} variant="outline-danger"><FaTrashAlt /></Button>
                            </div>
                        </ListGroup.Item>
                    )
                })
            }
        </ListGroup>
    );
}