import React, {useState} from 'react'
import styles from "../../pages/AccountPage/AccountPage.module.css";
import AddCardModal from "../AddCardModal/AddCardModal.jsx";
import {QueryClient, useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";

const PaymentMethods = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleClose = () => {
        setIsModalOpen(false);
    }

    const handleOpen = () => {
        setIsModalOpen(true);
    }

    const {data} = useQuery({
        queryKey: ["payments"],
        queryFn: () => apiClient(
            BASE_URL + API_ENDPOINTS.GET_PAYMENT_METHODS,
            {
                method: 'GET',
            },
            true
        )
    })
    const queryClient = useQueryClient();
    const {mutate} = useMutation({
        mutationFn: (data) => apiClient(
            BASE_URL + API_ENDPOINTS.REMOVE_PAYMENT_METHOD,
            {
                method: 'POST',
                body: JSON.stringify(data),
            },
            true
        ),
        onSettled: () => {
            queryClient.invalidateQueries("payments")
        }
    })

    const handleDelete = (id) => {
        mutate({
            id,
        })
    }

    return (
        <div className={styles.tabContent}>
            <h2>Способы оплаты</h2>
            <p>Привяжите карту для быстрой и удобной оплаты заказов.</p>
            <div className={styles.cardList}>
                {
                    !!data && data.map((item) => (
                        <div className={styles.card} key={item.lastFourDigits}>
                            <span>{item.cardType} **** **** **** {item.lastFourDigits}</span>
                            {
                                item.default && (
                                    <span className={styles.cardDefault}>Основная</span>
                                )
                            }
                            <button onClick={() => handleDelete(item.id)} className={styles.cardAction}>Удалить</button>
                        </div>
                    ))
                }
            </div>
            <button onClick={handleOpen} className={styles.addButton}>+ Добавить новую карту</button>
            <AddCardModal isOpen={isModalOpen} onClose={handleClose} />
        </div>
    );
};

export default PaymentMethods;