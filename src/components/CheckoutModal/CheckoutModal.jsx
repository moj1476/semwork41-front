import React, { useState, useEffect } from 'react';
import styles from './Checkout.module.css';
import CreditCardIcon from "../../assets/credit-card.svg?react";
import AddressIcon from "../../assets/address.svg?react";
import Modal from "../ui/Modal/Modal.jsx";
import {useMutation, useQuery} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import {toast} from "react-toastify";
import AddAddressModal from "../AddAddressModal/AddAddressModal.jsx";
import AddCardModal from "../AddCardModal/AddCardModal.jsx";


const CheckoutModal = ({ isOpen, onClose, buildData }) => {
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [selectedCard, setSelectedCard] = useState(null);
    const [addressModalOpen, setAddressModalOpen] = useState(false);
    const [cardModalOpen, setCardModalOpen] = useState(false);

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
        <Modal isOpen={isOpen} onClose={onClose} title="Оформление заказа">
            <div className={styles.checkoutContainer}>
                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Ваша сборка</h4>
                    <div className={styles.itemsList}>
                        {Object.entries(buildData).map(([, item]) => (
                            <div key={item.name} className={styles.item}>
                                <span>{item.name}</span>
                                <span className={styles.itemPrice}>{item.price} BYN</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Адрес доставки</h4>
                    <div className={styles.selectionList}>
                        {!!addresses && addresses.map(addr => (
                            <label key={addr.id} className={`${styles.selectionItem} ${selectedAddress?.id === addr.id ? styles.selected : ''}`}>
                                <AddressIcon />
                                <div className={styles.selectionInfo}>
                                    <strong>{addr.title}</strong>
                                    <span>{addr.fullAddress}</span>
                                </div>
                                <input
                                    type="radio"
                                    name="address"
                                    value={addr.id}
                                    checked={selectedAddress?.id === addr.id}
                                    onChange={() => setSelectedAddress(addr)}
                                />
                            </label>
                        ))}
                        <button onClick={() => setAddressModalOpen(true)} className={styles.addButton}>+ Добавить новый адрес</button>
                    </div>
                </div>

                <div className={styles.section}>
                    <h4 className={styles.sectionTitle}>Способ оплаты</h4>
                    <div className={styles.selectionList}>
                        {!!paymentMethods && paymentMethods.map(card => (
                            <label key={card.id} className={`${styles.selectionItem} ${selectedCard?.id === card.id ? styles.selected : ''}`}>
                                <CreditCardIcon />
                                <div className={styles.selectionInfo}>
                                    <strong>{card.cardType}</strong>
                                    <span>**** **** **** {card.lastFourDigits}</span>
                                </div>
                                <input
                                    type="radio"
                                    name="payment"
                                    value={card.id}
                                    checked={selectedCard?.id === card.id}
                                    onChange={() => setSelectedCard(card)}
                                />
                            </label>
                        ))}
                        <button onClick={() => setCardModalOpen(true)} className={styles.addButton}>+ Добавить новую карту</button>
                    </div>
                </div>

                <div className={styles.footer}>
                    <div className={styles.total}>
                        <span>Итоговая стоимость:</span>
                        <strong>{totalPrice()} BYN</strong>
                    </div>
                    <button onClick={handleConfirmOrder} className={styles.confirmButton}>
                        Подтвердить заказ
                    </button>
                </div>
            </div>
            <AddAddressModal isOpen={addressModalOpen} onClose={() => setAddressModalOpen(false)} />
            <AddCardModal isOpen={cardModalOpen} onClose={() => setCardModalOpen(false)} />
        </Modal>
    );
};

export default CheckoutModal;