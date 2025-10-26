import React, {useEffect, useState} from 'react'
import styles from './AuthModal.module.css';

const AuthModal = ({ isOpen, onClose }) => {
    const [isLoginView, setIsLoginView] = useState(true);

    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    const switchToRegister = () => setIsLoginView(false);
    const switchToLogin = () => setIsLoginView(true);

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={handleContentClick}>
                <button className={styles.closeButton} onClick={onClose}>&times;</button>

                {isLoginView ? (
                    // --- Форма входа ---
                    <div className={styles.formContainer}>
                        <h2 className={styles.title}>Вход в <span className={styles.highlight}>liquid lab</span></h2>
                        <p className={styles.subtitle}>Добро пожаловать!</p>
                        <form className={styles.form}>
                            <input type="email" placeholder="Email" className={styles.input} />
                            <input type="password" placeholder="Пароль" className={styles.input} />
                            <a href="#" className={styles.forgotPassword}>Забыли пароль?</a>
                            <button type="submit" className={styles.submitButton}>Войти</button>
                        </form>
                        <p className={styles.switchText}>
                            Нет аккаунта? <button onClick={switchToRegister} className={styles.switchButton}>Зарегистрироваться</button>
                        </p>
                    </div>
                ) : (
                    // --- Форма регистрации ---
                    <div className={styles.formContainer}>
                        <h2 className={styles.title}>Регистрация в <span className={styles.highlight}>liquid lab</span></h2>
                        <p className={styles.subtitle}>Создайте новый аккаунт</p>
                        <form className={styles.form}>
                            <input type="text" placeholder="Ваше имя" className={styles.input} />
                            <input type="email" placeholder="Email" className={styles.input} />
                            <input type="password" placeholder="Пароль" className={styles.input} />
                            <input type="password" placeholder="Повторите пароль" className={styles.input} />
                            <button type="submit" className={styles.submitButton}>Создать аккаунт</button>
                        </form>
                        <p className={styles.switchText}>
                            Уже есть аккаунт? <button onClick={switchToLogin} className={styles.switchButton}>Войти</button>
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AuthModal;