import React, { useContext } from 'react'
import Carrito from '../components/Carrito/Carrito';
import { ItemsContext } from '../helper/context/ItemsContext';

const Basket = () => {

  // useEffect(() => {
  //   saveProduct((items));
  // }, [items]);

  // const cleanBasket = () => {
  //   setItems([]);
  // }

  const { items } = useContext(ItemsContext);

  // const remove = (id) => {
  //   let items_pro = items.filter((item, indice) => indice !== id);
  //   const action = {
  //     type: "delete",
  //     payload: items_pro
  //   }
  //   dispatch(action);
  // }

  return (
    <>
      <h2>Este es tu carrito</h2>
      <ul>
        <Carrito items={items} />
      </ul>
      <div className="openpopup2">
        Clear Cart
      </div>
    </>
  )
}

export default Basket