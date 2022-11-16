import React from 'react'
import { Offer } from '../Offer/Offer';

export const Section = ({ product, offers, buy }) => {
    
    let filterOffers = offers.filter(x => x.idProduct === product.id);

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
                        {/*//? SOLO PINTAR LOS ELEMENTOS QUE TENGAN EL MISMO IDPRODUCT */}
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
