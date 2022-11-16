import React from 'react'
import Product from '../Product/Product';
import './Article.css';

const Article = ({ stock }) => {

    return (

        <article className="container album py-5 bg-light">
            <div className="container">
                <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 g-3">

                    {
                        stock && stock.map((product, indice) => {
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