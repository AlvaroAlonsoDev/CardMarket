import userEvent from '@testing-library/user-event'
import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Article from '../components/Article/Article'
import { ModalCreateOffer } from '../components/ModalCreateOffer/ModalCreateOffer'
import { ModalDeleteOffer } from '../components/ModalDeleteOffer/ModalDeleteOffer'
import { ModalEditOffer } from '../components/ModalEditOffer/ModalEditOffer'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { ApiContext } from '../helper/context/ApiContext'
import { ItemsContext } from '../helper/context/ItemsContext'


const Home = () => {
    let interim = JSON.parse(localStorage.getItem('items'));
    const { items, setItems, stock, searchParams, setSearchParams, user } = useContext(ItemsContext);
    const { fetchData } = useContext(ApiContext);
    const filter = searchParams.get('filter') ?? "";

    useEffect(() => {
        if (interim) { setItems(interim) }
        fetchData();
    }, []);
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);

    const handleFilter = (e) => {
        setSearchParams({ filter: e.target.value });
    }

    const renderBTNCrush = () => {
        if (user.length !== 0) {
            return (
                <>
                    {/* //TODO MANDAR A LA PAGINA DE ACCOUNT */}
                    <div className='m-5 bg-dark'>
                        <h5 className='text-center p-3'>
                            <Link to="/account" className='text-decoration-none text-info display-5'>Go to your Account</Link>
                        </h5>
                    </div>

                </>
            )
        } else {
            return (
                <div className='m-5 bg-dark'>
                    <h5 className='text-center p-3 display-5 text-info'>Login and upload you own offers</h5>
                </div>
            )
        }
    }

    return (
        <>
            <SearchBar handleFilter={handleFilter} />
            {renderBTNCrush()}
            <Article stock={stock} items={items} filter={filter} />
        </>
    )
}

export default Home