import React, { useContext, useEffect } from 'react'
import Article from '../components/Article/Article'
// import { ShoppingCart } from '../components/ShoppingCart/ShoppingCart'
import { ApiContext } from '../helper/context/ApiContext'
import { ItemsContext } from '../helper/context/ItemsContext'


const Home = () => {
    let interim = JSON.parse(localStorage.getItem('items'));
    const { items, setItems, stock } = useContext(ItemsContext);
    const { fetchData } = useContext(ApiContext);
    

    useEffect(() => {
        if(interim){setItems(interim)}
        fetchData();
    }, []);

    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    },[items]);

    return (
        <>
            <Article stock={stock} />
            {/* <ShoppingCart items={items} removeSC={removeSC}/> */}
        </>
    )
}

export default Home