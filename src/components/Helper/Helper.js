import React, { useContext, useEffect } from 'react'
import { ApiContext } from '../../helper/context/ApiContext';
import { ItemsContext } from '../../helper/context/ItemsContext';
import Swal from 'sweetalert2'
import 'animate.css';

export const Helper = () => {
    let interim = JSON.parse(localStorage.getItem('items'));
    const { fetchDataOffers, fetchData, fetchDataUsers, fetchDataOrders, orders } = useContext(ApiContext);
    const { items, setItems, user, setProvItem, isLoged } = useContext(ItemsContext);


    useEffect(() => {
        if (interim) { setItems(interim) }
        fetchData()
        fetchDataOffers();
        fetchDataUsers();
        fetchDataOrders();
    }, []);
    useEffect(() => {
        fetchDataUsers();
    }, []);
    useEffect(() => {
        if (isLoged && !user.admin) {
            if (!user.cupon) {
                console.log("alert is coming");
                let i_user = {
                    ...user,
                    cupon: "123456"
                }
                const requestOptions = {
                    method: 'PUT',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(i_user)
                };
                fetch(`http://localhost:4000/users/${user.id}`, requestOptions)
                    .then(() => fetchDataUsers())
                    .then(() => setTimeout(() => { deliveryCupon(user.name) }, "60000"))
                    .catch(error => console.log(error));
            }
        }
    }, [isLoged])
    useEffect(() => {
        localStorage.setItem("items", JSON.stringify(items));
    }, [items]);
    useEffect(() => {
        sessionStorage.setItem("infoUserLoged", JSON.stringify(user));
    }, [user]);
    useEffect(() => {
        isLoged ? setProvItem(items.filter(e => e.idUser === user.id)) : setProvItem(items.filter(e => e.idUser === "123"));
    }, [isLoged, user, items]);

    const deliveryCupon = (name) => {
        Swal.fire({
            title: 'Hi ' + name + '! You will have $25 discount in your next order with this code: 123456 ',
            showConfirmButton: false,
            timer: 5000,
            icon: 'info',
            showClass: {
                popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
                popup: 'animate__animated animate__fadeOutUp'
            }
        })
        // Swal.fire({
        //     title: 'Hi ' + name + '! You will have $25 discount in your next order with this code: 123456 ',
        // showClass: {
        //     popup: 'animate__animated animate__fadeInDown'
        // },
        // hideClass: {
        //     popup: 'animate__animated animate__fadeOutUp'
        // }
        // })
    }

    return (<></>)
}
