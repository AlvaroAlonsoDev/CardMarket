import React from 'react'
import { ModalCreateOffer } from '../ModalCreateOffer/ModalCreateOffer';
import Product from '../Product/Product';
import './Article.css';

const Article = ({ stock, items, filter }) => {

    return (

        <article className="mt-2 container album py-5 bg-light">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                    {stock
                        .filter(items => {
                            if (!filter) return true;
                            else {
                                const itemName = items.name.toLowerCase();
                                return itemName.includes(filter.toLowerCase());
                            }
                        })
                        .map((product, indice) => {
                            return (
                                <div key={indice}>
                                    <Product product={product} />
                                </div>
                            )
                        })
                    }


                </div>
            </div>
        </article>

    )
}

export default Article