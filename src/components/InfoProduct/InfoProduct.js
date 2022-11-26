import React, { useContext } from 'react'
import { ItemsContext } from '../../helper/context/ItemsContext';
import './InfoProduct.css';

export const InfoProduct = ({ product }) => {
    const { offers } = useContext(ItemsContext);
    let interim_offers = offers.filter(e => e.idProduct === product.id);

    const getAveragePrice = () => {
        let avg = 0;
        interim_offers.map(e => avg = (avg + e.price))
        return avg / interim_offers.length;
    }
    const getTotalStock = () => {
        let stockTotal = 0;
        interim_offers.map(e => stockTotal = stockTotal + e.quantity);
        return stockTotal;
    }
    const getCheaperOffer = () => {
        let prices = [];
        interim_offers.map(e => prices.push(e.price))
        let min = prices[0];
        for (var i = 0; i < prices.length; i++) {if (prices[i] < min) { min = prices[i]}}
        return min;
    }

    return (
        <div className="mt-5 row featurette">
            <div className="col-md-3 order-md-1">
                <img className="bd-placeholder-img bd-placeholder-img-lg featurette-image img-fluid mx-auto" height="250" src={product.img} alt="Card" />

            </div>
            <div className="col-md-6 order-md-2">
                <div className="  mb-4">
                    <div className="card-body p-5">
                        <h4 className="display-4 mb-4">{product.name}</h4>
                        {/* <!-- List with bullets --> */}
                        <ul className="list-bullets">
                            <li className="mb-2">Average Price<b>: ${(getAveragePrice()).toFixed(2)}</b></li>
                            <li className="mb-2">Available items<b>: {getTotalStock()}</b></li>
                            <li className="mb-2">From<b>: ${getCheaperOffer()}</b></li>
                        </ul>
                        <p className="mb-2 mt-2">Description: {product.description}</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
