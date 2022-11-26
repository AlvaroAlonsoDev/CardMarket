import React from 'react'
import './SearchBar.css';
import { FaSearch } from "react-icons/fa";

export const SearchBar = ({ handleFilter }) => {
    return (
        <div className="height">

            <div className="row p-2 bgsearch d-flex justify-content-center align-items-center">

                <div className="col-md-6 ">
                    <div className="form">
                        <i className="fa fa-search"></i>
                        <input onChange={handleFilter} type="text" className="form-control form-input" placeholder="Search anything..." />
                        <span className="left-pan pointer"><FaSearch className='ms-2' /></span>
                    </div>
                </div>

            </div>

        </div>
    )
}
