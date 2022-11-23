import React, { useContext, useEffect, useState } from 'react'
import { Button } from 'react-bootstrap';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';
import { ItemsContext } from '../helper/context/ItemsContext';
import { ApiContext } from "../helper/context/ApiContext";
import { ListSC } from '../components/ListSC/ListSC';

const Basket = () => {
  const { items, setItems, isLoged, offers, user } = useContext(ItemsContext);
  const { fetchDataOffers } = useContext(ApiContext);
  const [price, setPrice] = useState(0);
  const [totalPrice, setTotalPrice] = useState(0);
  // const [ivaPrice, setIvaPrice] = useState(0); //* ARREGLAR
  const navigate = useNavigate();

  useEffect(() => {
    fetchDataOffers();
  }, []);
  useEffect(() => {
    setPrice(getTotalPrice());
    // setIvaPrice(0.21 * price); //* ARREGLAR
  }, [items]);
  useEffect(() => {
    setTotalPrice(price) // SUMARLE EL IVA setTotalPrice(price + ivaPrice)
    // setIvaPrice(0.21 * price); //* ARREGLAR
  }, [price, items]);


  const getTotalPrice = () => {
    let countPrice = 0
    items.forEach(element => {
      countPrice = countPrice + element.price;
    });
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
    let interimSC = items.find(item => item.id === product.id);
    let offer = offers.find(item => item.id === product.id);

    if (interimSC) {
      if (offer.quantity >= (interimSC.quantity + amount)) {
        setItems(
          items.map(element => element.id === offer.id ? {
            ...interimSC,
            quantity: interimSC.quantity + amount
          } : element)
        );
        toast.success('Successfully saved!');
      } else { toast.error('No hay mas stock'); }
    }
  };



  return (
    <div className='container'>
      <h2 className='m-4 p-2'>Your Shopping Cart</h2>

      <ListSC removeSC={removeSC} buy={buy} restOne={restOne} />

      <div className='row aling-item-center justify-content-center mt-2'>
        <h6 className='text-muted'>Base price - {price} €</h6>
        <h6 className='text-muted'>IVA (21%)</h6>
        <h3 className='mt-2'>Price no tax: {totalPrice} €</h3>
        <Button className='m-1 p-2 col-sm-6 text-center maxW btn' onClick={checkoutFunction} variant="success">
          Checkout
        </Button >
      </div>
    </div>
  )
}

export default Basket