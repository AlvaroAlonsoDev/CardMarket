import React, { useContext, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Article from '../components/Article/Article'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { ApiContext } from '../helper/context/ApiContext'
import { ItemsContext } from '../helper/context/ItemsContext'


const Home = () => {
    let interim = JSON.parse(localStorage.getItem('items'));
    const { items, setItems, stock, searchParams, setSearchParams, isLoged, user } = useContext(ItemsContext);
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

    return (
        <>
            <SearchBar handleFilter={handleFilter} />
            <Article stock={stock} items={items} filter={filter} isLoged={isLoged} user={user} />
        </>
    )
}

export default Home