import React, { useContext, useEffect } from 'react'
import Article from '../components/Article/Article'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { ApiContext } from '../helper/context/ApiContext'
import { ItemsContext } from '../helper/context/ItemsContext'


const Home = () => {
    const { items, stock, searchParams, setSearchParams, isLoged, user } = useContext(ItemsContext);
    const { fetchData } = useContext(ApiContext);
    const filter = searchParams.get('filter') ?? "";

    useEffect(() => {
        fetchData();
    }, []);

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