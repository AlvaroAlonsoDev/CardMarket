import React, { useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ModalCreateOffer } from '../components/ModalCreateOffer/ModalCreateOffer'
import { ModalDeleteOffer } from '../components/ModalDeleteOffer/ModalDeleteOffer'
import { ModalEditOffer } from '../components/ModalEditOffer/ModalEditOffer'
import { ItemsContext } from '../helper/context/ItemsContext'

export const Profile = () => {
    const { setUser } = useContext(ItemsContext);
    const navigate = useNavigate();

    const signOutUser = (e) => { 
        setUser([]);
        navigate("/");
    }


    return (
        <>
            <button onClick={signOutUser} className='btn btn-outline-danger m-2'>
                <Link to="/" className="link-danger text-decoration-none" >Sign Out</Link>
            </button>
            <ModalCreateOffer />
            <ModalEditOffer />
            <ModalDeleteOffer />
        </>
    )
}
