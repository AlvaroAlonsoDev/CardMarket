import React, { useContext } from 'react'
import { ItemsContext } from '../../helper/context/ItemsContext';
import { ModalCreateOffer } from '../ModalCreateOffer/ModalCreateOffer';
import { Offer } from '../Offer/Offer';

export const Section = ({ product, buy }) => {
    const { user, isLoged, offers } = useContext(ItemsContext);
    let interim = offers.filter(e => e.idUsers !== user.id)
    let filterOffers = interim.filter(x => (x.idProduct === product.id));


    return (
        <>
            {isLoged ? <ModalCreateOffer product={product} /> : ""}
            <hr className='' />
            <div className="table-responsive">
                <table className="table container">
                    <thead className=''>
                        <tr>
                            <th scope="col">Seller</th>
                            <th scope="col">Product Information</th>
                            <th scope="col">Offer</th>
                            <th scope="col"></th>
                            <th scope="col"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {filterOffers &&
                            filterOffers.map((offer, indice) => {
                                return (
                                    <tr key={indice}>
                                        <Offer offer={offer} buy={buy} />
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </>
    )
}
