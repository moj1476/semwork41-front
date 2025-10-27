import React, {useState} from 'react'
import styles from "./AuthModal.module.css";
import {QueryClient, useMutation, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import {setToken} from "../../utils/tokens.js";
import Input from "../ui/Input/Input.jsx";

const RegisterView = ({onSwitch, onClose}) => {
    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [localError, setLocalError] = useState('');

    const queryClient = useQueryClient();
    const {mutate, error, isError} = useMutation(
        {
            mutationFn: (data) => apiClient(
                BASE_URL + API_ENDPOINTS.REGISTER,
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
        if (password !== confirmPassword) {
            setLocalError('Пароли не совпадают');
        } else {
            setLocalError('');
            mutate({
                username: username,
                email: email,
                password: password
            }
            )
        }
    }

    return (
        <div className={styles.formContainer}>
            <h2 className={styles.title}>Регистрация в <span className={styles.highlight}>liquid lab</span></h2>
            <p className={styles.subtitle}>Создайте новый аккаунт</p>
            <form onSubmit={handleSubmit} className={styles.form}>
                <Input onInput={setUsername} value={username} type="text" placeholder="Username" className={styles.input} />
                <Input onInput={setEmail} value={email} type="email" placeholder="Email" className={styles.input} />
                <Input onInput={setPassword} value={password} type="password" placeholder="Пароль" className={styles.input} />
                <Input onInput={setConfirmPassword} value={confirmPassword} type="password" placeholder="Повторите пароль" className={styles.input} />
                {
                    isError && <p className={styles.errorText}>{error.message}</p>
                }
                {
                    !!localError && <p className={styles.errorText}>{localError}</p>
                }
                <button type="submit" className={styles.submitButton}>Создать аккаунт</button>
            </form>
            <p className={styles.switchText}>
                Уже есть аккаунт? <button onClick={onSwitch} className={styles.switchButton}>Войти</button>
            </p>
        </div>
    );
};

export default RegisterView;