import React, {useEffect, useState} from 'react'
import styles from "../../pages/AccountPage/AccountPage.module.css";
import {useMutation, useQuery, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import Input from "../ui/Input/Input.jsx";

const ProfileInfo = () => {
    const [email, setEmail] = useState();
    const [phone, setPhone] = useState();
    const {data} = useQuery({
        queryKey: ['auth', 'profile-info'],
        queryFn: () => apiClient(
            BASE_URL + API_ENDPOINTS.USER_PROFILE,
            { method: "GET" },
            true
        ),
    })
    const queryClient = useQueryClient();
    const {mutate, isError, error} = useMutation({
        mutationFn: (updatedData) => apiClient(
            BASE_URL + API_ENDPOINTS.CHANGE_USER_PROFILE,
            {
                method: "POST",
                body: JSON.stringify(updatedData),
            },
            true
        ),
        onSuccess: () => {
            queryClient.invalidateQueries("profile-info");
        }
    })

    useEffect(() => {
        if (data) {
            setEmail(data.email);
            setPhone(data.phone);
        }
    }, [data?.username, ])

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({ email, phoneNumber: phone });
    }

    return (
        <div className={styles.tabContent}>
            <h2>Основная информация</h2>
            <p>Здесь вы можете обновить свои личные данные.</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="email">Email</label>
                    <Input onInput={setEmail} value={email} id="email" type="email" placeholder="vladislavmoj@example.com" className={styles.input} />
                </div>
                <div className={styles.inputGroup}>
                    <label htmlFor="phone">Телефон</label>
                    <Input onInput={setPhone} value={phone} id="phone" type="tel" placeholder="+375 (29) 123-45-67" className={styles.input} />
                </div>
                {
                    isError && <p className={styles.errorText}>Ошибка: {error?.fieldErrors?.[0].message}</p>
                }
                <button type="submit" className={styles.submitButton}>Сохранить изменения</button>
            </form>
        </div>
    );
};

export default ProfileInfo;