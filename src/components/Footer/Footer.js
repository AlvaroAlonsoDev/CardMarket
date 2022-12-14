import React from 'react'
import './Footer.css';

const Footer = () => {
    return (

        <footer className="d-flex flex-wrap container justify-content-between align-items-center py-3 my-4 border-top">
            <p className="col-md-4 mb-0 text-muted">© 2022 Alvaro Alonso, Inc</p>

            <a href="/" className="col-md-4 d-flex align-items-center justify-content-center mb-3 mb-md-0 me-md-auto link-dark text-decoration-none">
                <strong>CardMarket</strong>
            </a>

            <ul className="nav col-md-4 justify-content-end">
                <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Home</a></li>
                <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">Pricing</a></li>
                <li className="nav-item"><a href="/" className="nav-link px-2 text-muted">About</a></li>
            </ul>
        </footer>

    )
}

export default Footer