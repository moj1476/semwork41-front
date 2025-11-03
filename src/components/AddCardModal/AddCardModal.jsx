import React, {useState} from 'react'
import styles from './Form.module.css';
import Modal from "../ui/Modal/Modal.jsx";
import Input from "../ui/Input/Input.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import {toast} from "react-toastify";

const AddCardModal = ({ isOpen, onClose }) => {
    const [cardNumber, setCardNumber] = useState();
    const [expiryDate, setExpiryDate] = useState();
    const [cvc, setCvc] = useState();
    const [isDefault, setIsDefault] = useState(false);

    const queryClient = useQueryClient();
    const {mutate} = useMutation(
        {
            mutationFn: (data) => apiClient(
                BASE_URL + API_ENDPOINTS.ADD_PAYMENT_METHOD,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                },
                true
            ),
            onSuccess: () => {
                queryClient.invalidateQueries("payments")
                toast("Карта успешно добавлена", {
                    type: "success",
                })
            }
        }
    );


    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({
            cardNumber,
            expiryDate,
            cvv: cvc,
            isDefault,
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Добавление новой карты">
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="cardNumber">Номер карты</label>
                    <Input onInput={setCardNumber} value={cardNumber} id="cardNumber" type="text" placeholder="0000 0000 0000 0000" className={styles.input} />
                </div>
                <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="expiryDate">Срок действия</label>
                        <Input onInput={setExpiryDate} value={expiryDate} id="expiryDate" type="text" placeholder="ММ/ГГ" className={styles.input} />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="cvc">CVC/CVV</label>
                        <Input onInput={setCvc} value={cvc} id="cvc" type="text" placeholder="123" className={styles.input} />
                    </div>
                </div>
                <div className={styles.checkboxGroup}>
                    <input value={isDefault} onInput={(e) => setIsDefault(e.target.checked)}
                           type="checkbox" id="isDefaultCard"
                           className={styles.checkbox} />
                    <label htmlFor="isDefaultCard">Сделать основной картой</label>
                </div>
                <button type="submit" className={styles.submitButton}>Добавить карту</button>
            </form>
        </Modal>
    );
};

export default AddCardModal;