import React, {useState} from 'react'
import styles from "./AuthModal.module.css";
import Input from "../ui/Input/Input.jsx";
import {QueryClient, useMutation, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import {setToken} from "../../utils/tokens.js";

const LoginView = ({onSwitch, onClose}) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const queryClient = useQueryClient();
    const {mutate, error, isError} = useMutation(
        {
            mutationFn: (data) => apiClient(
                BASE_URL + API_ENDPOINTS.LOGIN,
                {
                    method: "POST",
                    body: JSON.stringify(data),
                }
            ),
            onSuccess: (data) => {
                setToken(data.token);
                queryClient.invalidateQueries("auth")
                onClose();
            },
        }
    )

    const handleSubmit = (e) => {
        e.preventDefault();
        mutate({
            username: email,
            password: password
        })
    }

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Вход в <span className={styles.highlight}>liquid lab</span></h2>
            <p className={styles.subtitle}>Добро пожаловать!</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input value={email} onInput={setEmail} type="text" placeholder="Username" className={styles.input} />
                <Input value={password} onInput={setPassword} type="password" placeholder="Пароль" className={styles.input} />
                <div>
                    {isError && <p className={styles.errorText}>{error.message}</p>}
                </div>
                <button type="submit" className={styles.submitButton}>Войти</button>
            </form>
            <p className={styles.switchText}>
                Нет аккаунта?
                <button onClick={onSwitch} className={styles.switchButton}>Зарегистрироваться</button>
            </p>
        </div>
    );
};

export default LoginView;