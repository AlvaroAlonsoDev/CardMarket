import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ItemsContext } from '../helper/context/ItemsContext';
import { ListSC } from '../components/ListSC/ListSC';

const Basket = () => {
  const { items, setItems, isLoged, offers, user, provItem } = useContext(ItemsContext);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  const [ivaPrice, setIvaPrice] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    setTotalPrice(Number((price + ivaPrice).toFixed(2)))
  });
  useEffect(() => {
    getTotal();
  }, [isLoged, user, items, provItem]);


  const getTotal = () => {
    let countPrice = 0;
    provItem.forEach(element => {
      countPrice = (countPrice) + (element.price * element.quantity)
    });
    setPrice(Number(countPrice));
    setIvaPrice(Number((countPrice * 0.21).toFixed(2)));
    return countPrice;
  }
  const removeSC = (id) => {
    let interim_sameID = items.filter(item => isLoged ? (item.idUser === user.id) : (item.idUser === "123"));
    let interim_other = items.filter(item => isLoged ? (item.idUser !== user.id) : (item.idUser !== "123"));
    let interim = interim_sameID.filter((item, indice) => indice !== id);
    setItems(interim_other.concat(interim));
    toast('Deleted!', {
      icon: '🗑️',
    });
  }
  const restOne = (product, id) => {
    let interim_same_ID = items.filter(item => isLoged ? (item.idUser === user.id) : (item.idUser === "123"));
    let interim = interim_same_ID.find((item, indice) => indice === id);

    let interim_other = items.filter(item => isLoged ? (item.idUser !== user.id) : (item.idUser !== "123"));
    let interim_delete = interim_same_ID.filter((item, indice) => indice !== id);

    interim.quantity > 1 ?
      setItems(
        items.map(element => element.id === product.id ? {
          ...element,
          quantity: element.quantity - 1
        } : element)
      ) : setItems(interim_other.concat(interim_delete));
  }
  const checkoutFunction = () => {
    if (isLoged) {
      navigate("/checkout")
    } else {
      navigate("/login")
    }
  }
  const buy = (product, amount = 1) => {
    let interim = items.filter(item => isLoged ? (item.idUser === user.id) : (item.idUser === "123"));
    let interim2 = interim.find(item => item.id === product.id)
    if (interim2) {
      //* cambiarle el quantity
      let product_single = items.find(item => item.id === product.id);
      let offer = offers.find(item => item.id === product.id);

      if (offer.quantity > product_single.quantity) {
        setItems(
          items.map(element => element.id === offer.id ? {
            ...product_single,
            quantity: product_single.quantity + amount
          } : element)
        );
      } else { toast.error('No hay mas stock'); }
    }
  };


  return (
    <div className='bodypro'>
      <div className='row justify-content-center'>
        <div className='max-width col-auto'>
          <h2 className='m-4 p-2 display-5'>Your Shopping Cart</h2>
          <ul className="list-group mb-3">
            <ListSC removeSC={removeSC} buy={buy} restOne={restOne} />
            <li className="list-group-item d-flex justify-content-between">
              <span>Price (USD) </span>
              <strong>${price}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Tax <small>21%</small> (USD)</span>
              <strong>${ivaPrice}</strong>
            </li>
            <li className="list-group-item d-flex justify-content-between">
              <span>Total (USD)</span>
              <strong>${totalPrice}</strong>
            </li>
          </ul>
        </div>
        <div className='container row aling-item-center justify-content-center mt-4'>
          <Button className='mt-2 p-3 col-sm-6 text-center maxW btn' onClick={checkoutFunction} variant="success">
            {isLoged ? ("Checkout") : ("Login")}
          </Button >
        </div>
      </div>
    </div>
  )
}

export default Basket