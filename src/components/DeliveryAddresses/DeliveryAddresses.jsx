import React, {useState} from 'react'
import styles from "../../pages/AccountPage/AccountPage.module.css";
import AddAddressModal from "../AddAddressModal/AddAddressModal.jsx";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";

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
        onSettled: () => {
            queryClient.invalidateQueries("address")
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
                        <div className={styles.card} key={item.id}>
                            <div>
                                <p className={styles.addressTitle}>{item.title}</p>
                                <p className={styles.addressDetails}>{item.fullAddress}</p>
                            </div>
                            <button onClick={() => handleDelete(item.id)} className={styles.cardAction}>Удалить</button>
                        </div>
                    ))
                }
            </div>
            <button onClick={handleOpen} className={styles.addButton}>+ Добавить новый адрес</button>
            <AddAddressModal isOpen={isModalOpen} onClose={handleClose} />
        </div>
    );
};

export default DeliveryAddresses;