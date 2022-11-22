import React, { useContext, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { ListOwnOffers } from '../components/ListOwnOffers/ListOwnOffers'
import { ModalDeleteOffer } from '../components/ModalDeleteOffer/ModalDeleteOffer'
import { ModalEditOffer } from '../components/ModalEditOffer/ModalEditOffer'
import { ApiContext } from '../helper/context/ApiContext'
import { ItemsContext } from '../helper/context/ItemsContext'

export const Profile = () => {
    const { isLoged } = useContext(ItemsContext);
    const { fetchDataOffers } = useContext(ApiContext);
    const navigate = useNavigate();
    const { user, offers } = useContext(ItemsContext);

    useEffect(() => {
        fetchDataOffers();
        if(!isLoged){navigate('/')}
    },[])

    return (
        <>
            <div>
                <ModalEditOffer />
                <ModalDeleteOffer />
            </div>
            <div>
                <ListOwnOffers user={user} offers={offers} />
            </div>
        </>
    )
}
