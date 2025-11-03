import React, {useState} from 'react'
import styles from "../../pages/AccountPage/AccountPage.module.css";
import AddAddressModal from "../AddAddressModal/AddAddressModal.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import DeliveryAddressesItem from "./DeliveryAddressesItem.jsx";
import {toast} from "react-toastify";

const DeliveryAddresses = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClose = () => {
        setIsModalOpen(false);
    }

    const handleOpen = () => {
        setIsModalOpen(true);
    }

    const {data} = useQuery({
        queryKey: ["address"],
        queryFn: () => apiClient(
            BASE_URL + API_ENDPOINTS.GET_ADDRESSES,
            {
                method: 'GET',
            },
            true
        )
    })
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: (data) => apiClient(
            BASE_URL + API_ENDPOINTS.REMOVE_ADDRESS,
            {
                method: 'POST',
                body: JSON.stringify(data),
            },
            true
        ),
        onSuccess: () => {
            queryClient.invalidateQueries("address")
            toast("Адрес доставки успешно удален", {
                type: "success",
            })
        }
    })

    const handleDelete = (id) => {
        mutate({
            id,
        })
    }

    return (
        <div className={styles.tabContent}>
            <h2>Адреса доставки</h2>
            <p>Добавьте или измените адрес для доставки ваших заказов.</p>
            <div className={styles.cardList}>
                {
                    !!data && data.map((item) => (
                        <DeliveryAddressesItem item={item} key={item.id} handleDelete={handleDelete} />
                    ))
                }
            </div>
            <button onClick={handleOpen} className={styles.addButton}>+ Добавить новый адрес</button>
            <AddAddressModal isOpen={isModalOpen} onClose={handleClose} />
        </div>
    );
};

export default DeliveryAddresses;