import React from 'react'
import { Link } from 'react-router-dom'
import Checkbox from '@mui/material/Checkbox';
import FavoriteBorder from '@mui/icons-material/FavoriteBorder';
import Favorite from '@mui/icons-material/Favorite';


const label = { inputProps: { 'aria-label': 'Checkbox demo' } };


const Product = ({ product }) => {
    return (
        <>
            <div className="card shadow-sm border-0 rounded profile-card-5">
                {/* <div className='mb-2'><Checkbox {...label} icon={<FavoriteBorder />} checkedIcon={<Favorite />} /></div> */}
                <div className="card-body p-0 card-img-block"><Link to={`item/${product.id}`} type="button" className="btn btn-sm"><img className="card-img-top maxH" src={product.img} alt="Card" /></Link>
                    <div className="p-4">
                        <h5 className="mb-0">{product.name}</h5>
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