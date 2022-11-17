import React, { useContext, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ListOwnOffers } from '../components/ListOwnOffers/ListOwnOffers'
import { ModalCreateOffer } from '../components/ModalCreateOffer/ModalCreateOffer'
import { ModalDeleteOffer } from '../components/ModalDeleteOffer/ModalDeleteOffer'
import { ModalEditOffer } from '../components/ModalEditOffer/ModalEditOffer'
import { ApiContext } from '../helper/context/ApiContext'
import { ItemsContext } from '../helper/context/ItemsContext'

export const Profile = () => {
    const { setUser } = useContext(ItemsContext);
    const { fetchDataOffers } = useContext(ApiContext);
    const navigate = useNavigate();
    const { user, offers } = useContext(ItemsContext)

    useEffect(() => {
        fetchDataOffers();
    },[])

    return (
        <>
            <div>
                <ModalCreateOffer />
                <ModalEditOffer />
                <ModalDeleteOffer />
            </div>
            <div>
                <ListOwnOffers user={user} offers={offers} />
            </div>
        </>
    )
}
