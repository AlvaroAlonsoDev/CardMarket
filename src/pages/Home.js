import React, { useContext, useEffect, useState } from 'react'
import Article from '../components/Article/Article'
import { SearchBar } from '../components/SearchBar/SearchBar'
import { ItemsContext } from '../helper/context/ItemsContext'


const Home = () => {
    const { stock, searchParams, setSearchParams, isLoged, user } = useContext(ItemsContext);
    const filter = searchParams.get('filter') ?? "";

    const handleFilter = (e) => {
        setSearchParams({ filter: e.target.value });
    }

    
    return (
        <>
            <SearchBar handleFilter={handleFilter} />
            <Article stock={stock} filter={filter} isLoged={isLoged} user={user} />
        </>
    )
}

export default Home