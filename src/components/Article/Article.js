import React, { useContext } from 'react'
import { Link } from 'react-router-dom';
import Product from '../Product/Product';
import './Article.css';

const Article = ({ stock, filter, isLoged, user }) => {


    const renderBTNCrud = () => {
        if (isLoged) {
            return (
                <>
                    <div onClick={()=>console.log("goli")} className='pointer bg-dark mb-4'>
                        <div className='text-center p-3'>
                            <h3 className='text-decoration-none text-info display-5'>Welcome {user.name}!</h3>
                            <h3 className='text-decoration-none text-light display-6'>Would you like to upload a new product? click here!</h3>
                        </div>
                    </div>

                </>
            )
        }
    }

    return (

        <article className="mt-2 container album py-5 bg-light">
            <div className="container">
                <div className=''>{renderBTNCrud()}</div>
                <div className="">

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