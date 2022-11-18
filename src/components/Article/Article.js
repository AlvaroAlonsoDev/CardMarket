import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import { ItemsContext } from '../../helper/context/ItemsContext';
import { ModalCreateOffer } from '../ModalCreateOffer/ModalCreateOffer';
import Product from '../Product/Product';
import './Article.css';

const Article = ({ stock, items, filter, isLoged, user }) => {


    const renderBTNCrud = () => {
        if (isLoged) {
            return (
                <>
                    <div className='bg-dark mb-4'>
                        <h5 className='text-center p-2'>
                            <Link to="/account" className='text-decoration-none text-info display-5'>Welcome {user.name}!</Link>
                        </h5>
                    </div>

                </>
            )
        }
    }

    return (

        <article className="mt-2 container album py-5 bg-light">
            <div className="container">
                {renderBTNCrud()}
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