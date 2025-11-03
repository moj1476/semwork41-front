import React, { useState, useEffect } from 'react';
import styles from './Checkout.module.css';
import Modal from "../ui/Modal/Modal.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import {toast} from "react-toastify";
import Payment from "./Payment.jsx";
import Address from "./Address.jsx";
import Components from "./Components.jsx";
import TotalPrice from "./TotalPrice.jsx";


const CheckoutModal = ({ isOpen, onClose, buildData }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);

    const {data: addresses} = useQuery({
        queryKey: ["address"],
        queryFn: () => apiClient(
            BASE_URL + API_ENDPOINTS.GET_ADDRESSES,
            {
                method: 'GET',
            },
            true
        )
    })

    const {data: paymentMethods} = useQuery({
        queryKey: ["payments"],
        queryFn: () => apiClient(
            BASE_URL + API_ENDPOINTS.GET_PAYMENT_METHODS,
            {
                method: 'GET',
            },
            true
        )
    })

    const {mutate} = useMutation({
        mutationFn: (vars) => apiClient(
            BASE_URL + API_ENDPOINTS.CREATE_ORDER,
            {
                method: 'POST',
                body: JSON.stringify(vars),
            },
            true
        )
    })

    useEffect(() => {
        if (isOpen && addresses && paymentMethods) {
            setSelectedAddress(addresses[0]);
            setSelectedCard(paymentMethods[0]);
        }
    }, [addresses, isOpen, paymentMethods]);

    if (!buildData) return (<div></div>);


    const handleConfirmOrder = () => {
        if(!selectedAddress) {
            return toast("Выберите адресс доставки", {
                type: "error",
            })
        }
        if(!selectedCard) {
            return toast("Выберите способ оплаты", {
                type: "error",
            })
        }

        mutate({
            totalPrice: totalPrice(),
            deliveryAddress: {
                fullAddress: selectedAddress.fullAddress,
            },
            items: [
                ...Object.values(buildData).map(item => ({
                    id: item.id,
                    name: item.name,
                    price: item.price,
                    quantity: 1,
                })),
            ]
        })
        toast("Заказ успешно подтвержден!", {
            type: "success",
        })
        onClose();
    };

    const totalPrice = () => {
        return Object.values(buildData).reduce((prev, value) => {
            return prev + value.price;
        }, 0).toFixed(2);
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className={styles.checkoutContainer}>

                <Components buildData={buildData} />

                <Address addresses={addresses}
                         selectedAddress={selectedAddress}
                         setSelectedAddress={setSelectedAddress} />

                <Payment paymentMethods={paymentMethods}
                         selectedCard={selectedCard}
                         setSelectedCard={setSelectedCard} />

                <TotalPrice totalPrice={totalPrice} handleConfirmOrder={handleConfirmOrder} />
            </div>

        </Modal>
    );
};

export default CheckoutModal;