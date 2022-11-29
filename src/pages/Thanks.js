import React, { useContext, useEffect } from 'react'
import { ItemsContext } from '../helper/context/ItemsContext';
import { v4 as uuidv4 } from 'uuid';
import { Link, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import { ApiContext } from '../helper/context/ApiContext';

export const Thanks = () => {
    const { user, isLoged, stock } = useContext(ItemsContext);
    const { fetchDataOffers, fetchDataOrders } = useContext(ApiContext);
    const lastOrder = JSON.parse(localStorage.getItem("lastOrder"))
    const navigate = useNavigate();
    useEffect(() => {
        if (!isLoged) { navigate('/') } else if (user.admin) { navigate('/profile') }
        fetchDataOffers();
        fetchDataOrders();
    }, [])
    return (
        <div className="container py-3">
            <div className="pricing-header p-3 pb-md-4 mx-auto text-center">
                <h1 className="display-4 fw-normal">Thank you!</h1>
                <p className="fs-5 p-2 text-muted">Your order is coming, it should arrive in 24-48 hours</p>
                <p className="fs-5 text-muted"><small>Here are the details of your order. <Link to='/account' className='link-info'>Orders History!</Link></small></p>
            </div>
            <div className="row row-cols-1 row-cols-md-3 mb-3 text-center">


                {
                    (lastOrder.product).map(e => {
                        const product = stock.find(x => x.name == e.name) 
                        return (
                                <div key={uuidv4()} className="col">
                                    <div className="card mb-4 rounded-3 shadow-sm">
                                        <div className="card-header py-3 card-header py-3 bgpurple">
                                            <h4 className="my-0 fw-normal text-white">{e.name}</h4>
                                        </div>
                                        <div className="card-body">
                                            <h1 className="card-title pricing-card-title">${e.price}</h1>
                                            <ul className="list-unstyled mt-3 mb-4">
                                                <li>Seller: <i>{e.seller}</i></li>
                                                <li>Quantity: <i>{e.quantity}</i></li>
                                                <li>Version: <i>{e.version}</i></li>
                                                <li>Condition: <i>{e.condition}</i></li>
                                            </ul>
                                            <Button onClick={() => navigate(`/item/${product.id}`)} color="secondary">See offers available</Button>
                                        </div>
                                    </div>
                                </div>
                        )
                    })
                }


            </div>
        </div >
    )


}