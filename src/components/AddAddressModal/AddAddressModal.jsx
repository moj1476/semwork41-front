import React, {useState} from 'react'
import styles from './Form.module.css';
import Modal from "../ui/Modal/Modal.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import Input from "../ui/Input/Input.jsx";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import {toast} from "react-toastify";

const AddAddressModal = ({ isOpen, onClose }) => {
    const [isDefault, setIsDefault] = useState(false);
    const [title, setTitle] = useState();
    const [description, setDescription] = useState();

    const queryClient = useQueryClient();
    const {mutate} = useMutation(
        {
            mutationFn: (data) => apiClient(
                BASE_URL + API_ENDPOINTS.ADD_ADDRESS,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                },
                true
            ),
            onSuccess: () => {
                queryClient.invalidateQueries("address")
                toast("Адрес успешно добавлен", {
                    type: "success",
                })
            }
        }
    );


    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({
            title,
            fullAddress: description,
            isDefault,
        });
        onClose();
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Добавление нового адреса">
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="addressTitle">Название адреса</label>
                    <Input value={title} onInput={setTitle} id="addressTitle" type="text" placeholder="Например, Дом или Работа" className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="fullAddress">Полный адрес</label>
                    <Input value={description} onInput={setDescription} id="fullAddress" type="text" placeholder="Город, улица, дом, квартира" className={styles.input} />
                </div>
                <div className={styles.checkboxGroup}>
                    <input value={isDefault} onChange={e => setIsDefault(e.target.checked)} type="checkbox" id="isDefaultAddress" className={styles.checkbox} />
                    <label htmlFor="isDefaultAddress">Сделать адресом по умолчанию</label>
                </div>
                <button type="submit" className={styles.submitButton}>Добавить адрес</button>
            </form>
        </Modal>
    );
};

export default AddAddressModal;