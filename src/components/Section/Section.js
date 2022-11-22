import React, { useContext } from 'react'
import { ItemsContext } from '../../helper/context/ItemsContext';
import { ModalCreateOffer } from '../ModalCreateOffer/ModalCreateOffer';
import { Offer } from '../Offer/Offer';

export const Section = ({ product, offers, buy }) => {
    const { user, isLoged } = useContext(ItemsContext);
    let interim = offers.filter(e => e.idUsers !== user.id)
    let filterOffers = interim.filter(x => (x.idProduct === product.id));

    const renderCreateOffer = () => {
        if (isLoged) {
            return (
                <ModalCreateOffer product={product} />
            )
        }else{
            return (
                <p>HOLA</p>
            )
        }
    }
    return (
        <div className="container">
            <div>
                <br />
                <div className="flex-grow-1">
                    <h1>{product.name}</h1>
                </div>
                <br />
                <img className="" src={product.img} alt="Card" />
            </div>
            <hr />
            <div className="table-responsive">
                <h2>OFFERS AVAILABLE</h2>
                {renderCreateOffer()}
                <table className="table">
                    <thead>
                        <tr>
                            <th scope="col">Seller</th>
                            <th scope="col">Product Information</th>
                            <th scope="col">Offer</th>
                            <th scope="col">Cantidad</th>
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
        </div>
    )
}
