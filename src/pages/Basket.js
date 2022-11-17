import React, { useContext, useEffect } from 'react'
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
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
    <div className='container'>
      <h2 className='m-4 p-2'>Your Shopping Cart</h2>

      <ListSC items={items} removeSC={removeSC} />

      <div className='row aling-item-center justify-content-center mt-2'>
        <h3 className='mt-2'>Precio Total: </h3>
        <Button className='m-1 col-sm-6 text-center maxW btn' variant="success">
          <Link to="/checkout" className="text-decoration-none text-white">Checkout</Link>
        </Button>
      </div>
    </div>
  )
}

export default Basket