import React from 'react'
import { Link } from 'react-router-dom'
// import Pictures from '../../assets/db';

const Product = ({ product }) => {
    return (
        <div className="col-md-4 mt-4">
            <div className="card profile-card-5">
                <div className="card-img-block">
                    <Link to={`item/${product.id}`} type="button" className="btn btn-sm"><img className="card-img-top maxH" src={product.img} alt="Card" /></Link>

                </div>
                <div className="card-body pt-0">
                    <Link to={`item/${product.id}`} type="button" className="btn btn-sm btn-outline-primary">See offer</Link>
                </div>
            </div>
        </div>
    )
}

export default Product