import React, {useState} from 'react'
import styles from "../../pages/AccountPage/AccountPage.module.css";
import {useMutation} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import Input from "../ui/Input/Input.jsx";
import {toast} from "react-toastify";

const ChangePassword = () => {
    const [oldPassword, setOldPassword] = useState();
    const [newPassword, setNewPassword] = useState();
    const [confirmPassword, setConfirmPassword] = useState();
    const [localError, setLocalError] = useState("");

    const {mutate} = useMutation(
        {
            mutationFn: (data) => apiClient(
                BASE_URL + API_ENDPOINTS.CHANGE_PASSWORD,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                },
                true
            ),
            onError: (error) => {
                toast(error.message, {
                    type: "error",
                })
            },
            onSuccess: () => {
                toast("Пароль успешно изменен", {
                    type: "success",
                })
            }
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        if(newPassword !== confirmPassword) {
            setLocalError("Пароли не совпадают");
        } else {
            setLocalError("")
            mutate({
                oldPassword,
                newPassword,
            })
        }
    }


    return (
        <div className={styles.tabContent}>
            <h2>Смена пароля</h2>
            <p>Рекомендуем использовать сложный пароль, который вы не используете на других сайтах.</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="current-password">Текущий пароль</label>
                    <Input value={oldPassword} onInput={setOldPassword} id="current-password" type="password" className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="new-password">Новый пароль</label>
                    <Input value={newPassword} onInput={setNewPassword} id="new-password" type="password" className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="confirm-password">Повторите новый пароль</label>
                    <Input value={confirmPassword} onInput={setConfirmPassword} id="confirm-password" type="password" className={styles.input} />
                </div>
                {
                    localError.length > 0 && (
                        <p className={styles.errorText}>{localError}</p>
                    )
                }
                <button type="submit" className={styles.submitButton}>Изменить пароль</button>
            </form>
        </div>
    );
};

export default ChangePassword;