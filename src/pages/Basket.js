import React, { useContext, useEffect } from 'react'
import toast from 'react-hot-toast';
import { ListSC } from '../components/ListSC/ListSC';
import { ItemsContext } from '../helper/context/ItemsContext';

const Basket = () => {
  const { items, setItems } = useContext(ItemsContext);

  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
  }, [items]);

  // const cleanBasket = () => {
  //   setItems([]);
  // }


  const removeSC = (id) => {
    let interim = items.filter((item, indice) => indice !== id);
    setItems(interim);

    toast('Deleted!', {
      icon: '🗑️',
    });
  }

  return (
    <>
      <h2 className='m-4 p-2'>Your Shopping Cart</h2>

      <ListSC items={items} removeSC={removeSC} />
    </>
  )
}

export default Basket