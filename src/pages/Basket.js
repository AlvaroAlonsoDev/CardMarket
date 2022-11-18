import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { Link } from 'react-router-dom';
import { ItemsContext } from '../helper/context/ItemsContext';
import { ListSC } from '../components/ListSC/ListSC';
import { ModalLogin } from '../components/ModalLogin/ModalLogin';
import { ApiContext } from '../helper/context/ApiContext';

const Basket = () => {
  let interim = JSON.parse(localStorage.getItem('items'));
  const { items, setItems, isLoged } = useContext(ItemsContext);
  const [price, setPrice] = useState(0);
  const [ivaPrice, setIvaPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);

  useEffect(() => {
    if (interim) { setItems(interim) }
  }, []);
  useEffect(() => {
    localStorage.setItem("items", JSON.stringify(items));
    setPrice(getTotalPrice());
    setIvaPrice(0.21 * price);
  }, [items]);

  useEffect(() => {
    setIvaPrice(0.21 * price);
    setTotalPrice(price + ivaPrice)
  }, [price, items]);
  // const cleanBasket = () => {
  //   setItems([]);
  // }

  const getTotalPrice = () => {
    let countPrice = 0
    items.forEach(element => {
      countPrice = countPrice + element.price;
    });
    return countPrice;
  }

  const removeSC = (id) => {
    let interim = items.filter((item, indice) => indice !== id);
    setItems(interim);

    toast('Deleted!', {
      icon: '🗑️',
    });
  }

  const renderBTNcheckout = () => {
    if (isLoged) {
      return (
        <Button className='m-1 col-sm-6 text-center maxW btn' variant="success">
          <Link to="/checkout" className="text-decoration-none text-white">Checkout</Link>
        </Button >
      )
    } else {
      return (
        <ModalLogin />
      )
    }
  }

  const buy = (product, amount = 1) => {
    let interim = items.find(item => item.id === product.id);

    if (interim) {
      if (product.quantity >= (interim.quantity + amount)) {
        // interim.quantity < product.quantity
        setItems(
          items.map(element => element.id === product.id ? {
            ...interim,
            quantity: interim.quantity + amount
          } : element)
        );
        toast.success('Successfully saved!');
      } else { toast.error('No hay mas stock'); }
    } else {
      let interim = {
        id: product.id,
        seller: product.user,
        name: product.name,
        price: product.price
      }
      setItems([...items, { ...interim, quantity: 1 }]);
      toast.success('Successfully saved!');
    }
  };


  return (
    <div className='container'>
      <h2 className='m-4 p-2'>Your Shopping Cart</h2>

      <ListSC items={items} removeSC={removeSC} buy={buy} />

      <div className='row aling-item-center justify-content-center mt-2'>
        <h6 className='text-muted'>Base imponible {price} €</h6>
        <h6 className='text-muted'>IVA (21%) {ivaPrice} €</h6>
        <h3 className='mt-2'>Precio Total: {totalPrice} €</h3>
        {renderBTNcheckout()}
      </div>
    </div>
  )
}

export default Basket