import React from 'react'
import { Link } from 'react-router-dom'

const Product = ({ product, indice }) => {
    return (
        <>
            <div className="card shadow-sm border-0 rounded profile-card-5">
                <div className="card-body p-0 card-img-block"><Link to={`item/${product.id}`} type="button" className="btn btn-sm"><img className="card-img-top maxH" src={product.img} alt="Card" /></Link>
                    <div className="p-4">
                        <h5 className="mb-0">{product.name}</h5>
                        <p className="small mt-3 text-muted">{(product.description).substr(0,100)}...</p>
                        <div className="mt-4 row justify-content-center">
                            <Link to={`item/${product.id}`} type="button" className="btn btn-outline-dark">See offer</Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Product