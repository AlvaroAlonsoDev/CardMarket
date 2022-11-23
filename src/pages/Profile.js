import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import ListOrders from '../components/ListOrders/ListOrders'
import { ListOwnOffers } from '../components/ListOwnOffers/ListOwnOffers'
import { ModalDeleteOffer } from '../components/ModalDeleteOffer/ModalDeleteOffer'
import { ModalEditOffer } from '../components/ModalEditOffer/ModalEditOffer'
import { ApiContext } from '../helper/context/ApiContext'
import { ItemsContext } from '../helper/context/ItemsContext'

export const Profile = () => {
    const { fetchDataOffers } = useContext(ApiContext);
    const navigate = useNavigate();
    const { user, offers, isLoged } = useContext(ItemsContext);

    useEffect(() => {
        fetchDataOffers();
        if(!isLoged){navigate('/')}
    },[])

    return (
        <div className='container'>
            <div>
                <ModalEditOffer />
                <ModalDeleteOffer />
            </div>
            <hr />
            <div>
                <ListOwnOffers user={user} offers={offers} />
            </div>
            <hr />
            <h3> Your Orders</h3>
            <div>
                <ListOrders />
            </div>
        </div>
    )
}
