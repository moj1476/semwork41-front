import React, { useState } from 'react';
import styles from './AccountPage.module.css';

const UserIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/></svg>;
const LockIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M18 8h-1V6c0-2.76-2.24-5-5-5S7 3.24 7 6v2H6c-1.1 0-2 .9-2 2v10c0 1.1.9 2 2 2h12c1.1 0 2-.9 2-2V10c0-1.1-.9-2-2-2zm-6 9c-1.1 0-2-.9-2-2s.9-2 2-2 2 .9 2 2-.9 2-2 2zm3.1-9H8.9V6c0-1.71 1.39-3.1 3.1-3.1 1.71 0 3.1 1.39 3.1 3.1v2z"/></svg>;
const CreditCardIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm0 14H4v-6h16v6zm0-10H4V6h16v2z"/></svg>;
const AddressIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7zm0 9.5c-1.38 0-2.5-1.12-2.5-2.5s1.12-2.5 2.5-2.5 2.5 1.12 2.5 2.5-1.12 2.5-2.5 2.5z"/></svg>;
const HistoryIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M13 3c-4.97 0-9 4.03-9 9H1l3.89 3.89.07.14L9 12H6c0-3.87 3.13-7 7-7s7 3.13 7 7-3.13 7-7 7c-1.93 0-3.68-.79-4.94-2.06l-1.42 1.42C8.27 19.99 10.51 21 13 21c4.97 0 9-4.03 9-9s-4.03-9-9-9zm-1 5v5l4.25 2.52.77-1.28-3.52-2.09V8H12z"/></svg>;



const ProfileInfo = () => (
    <div className={styles.tabContent}>
        <h2>Основная информация</h2>
        <p>Здесь вы можете обновить свои личные данные.</p>
        <form className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="name">Ваше имя</label>
                <input id="name" type="text" placeholder="Владислав" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="email">Email</label>
                <input id="email" type="email" placeholder="vladislavmoj@example.com" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="phone">Телефон</label>
                <input id="phone" type="tel" placeholder="+375 (29) 123-45-67" className={styles.input} />
            </div>
            <button type="submit" className={styles.submitButton}>Сохранить изменения</button>
        </form>
    </div>
);

const ChangePassword = () => (
    <div className={styles.tabContent}>
        <h2>Смена пароля</h2>
        <p>Рекомендуем использовать сложный пароль, который вы не используете на других сайтах.</p>
        <form className={styles.form}>
            <div className={styles.inputGroup}>
                <label htmlFor="current-password">Текущий пароль</label>
                <input id="current-password" type="password" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="new-password">Новый пароль</label>
                <input id="new-password" type="password" className={styles.input} />
            </div>
            <div className={styles.inputGroup}>
                <label htmlFor="confirm-password">Повторите новый пароль</label>
                <input id="confirm-password" type="password" className={styles.input} />
            </div>
            <button type="submit" className={styles.submitButton}>Изменить пароль</button>
        </form>
    </div>
);

const PaymentMethods = () => (
    <div className={styles.tabContent}>
        <h2>Способы оплаты</h2>
        <p>Привяжите карту для быстрой и удобной оплаты заказов.</p>
        <div className={styles.cardList}>
            <div className={styles.card}>
                <span>Visa **** **** **** 4242</span>
                <span className={styles.cardDefault}>Основная</span>
                <button className={styles.cardAction}>Удалить</button>
            </div>
        </div>
        <button className={styles.addButton}>+ Добавить новую карту</button>
    </div>
);

const DeliveryAddresses = () => (
    <div className={styles.tabContent}>
        <h2>Адреса доставки</h2>
        <p>Добавьте или измените адрес для доставки ваших заказов.</p>
        <div className={styles.cardList}>
            <div className={styles.card}>
                <div>
                    <p className={styles.addressTitle}>Дом</p>
                    <p className={styles.addressDetails}>г. Минск, ул. Независимости, д. 1, кв. 2</p>
                </div>
                <button className={styles.cardAction}>Удалить</button>
            </div>
        </div>
        <button className={styles.addButton}>+ Добавить новый адрес</button>
    </div>
);

const OrderHistory = () => (
    <div className={styles.tabContent}>
        <h2>История заказов</h2>
        <p>Здесь отображаются все ваши прошлые и текущие заказы.</p>
        <div className={styles.orderList}>
            <div className={styles.orderItem}>
                <div>
                    <span className={styles.orderId}>Заказ #10521</span>
                    <span className={styles.orderDate}>10 октября 2025</span>
                </div>
                <div className={styles.orderStatus} data-status="completed">Выполнен</div>
                <div className={styles.orderTotal}>2500 BYN</div>
                <a href="#" className={styles.orderDetails}>Детали</a>
            </div>
            <div className={styles.orderItem}>
                <div>
                    <span className={styles.orderId}>Заказ #10520</span>
                    <span className={styles.orderDate}>05 октября 2025</span>
                </div>
                <div className={styles.orderStatus} data-status="processing">В сборке</div>
                <div className={styles.orderTotal}>4800 BYN</div>
                <a href="#" className={styles.orderDetails}>Детали</a>
            </div>
        </div>
    </div>
);


const AccountPage = () => {
    const [activeTab, setActiveTab] = useState('profile');

    const tabs = {
        profile: { label: 'Профиль', icon: <UserIcon />, component: <ProfileInfo /> },
        password: { label: 'Пароль', icon: <LockIcon />, component: <ChangePassword /> },
        payment: { label: 'Карты', icon: <CreditCardIcon />, component: <PaymentMethods /> },
        address: { label: 'Адреса', icon: <AddressIcon />, component: <DeliveryAddresses /> },
        orders: { label: 'Заказы', icon: <HistoryIcon />, component: <OrderHistory /> },
    };

    return (
        <div className={styles.accountWrapper}>
            <div className={styles.accountContainer}>
                <aside className={styles.sidebar}>
                    <div className={styles.userProfile}>
                        <div className={styles.avatar}>В</div>
                        <span className={styles.userName}>Владислав</span>
                    </div>
                    <nav className={styles.nav}>
                        <ul>
                            {Object.keys(tabs).map(tabKey => (
                                <li key={tabKey}>
                                    <button
                                        className={`${styles.navButton} ${activeTab === tabKey ? styles.active : ''}`}
                                        onClick={() => setActiveTab(tabKey)}
                                    >
                                        <span className={styles.navIcon}>{tabs[tabKey].icon}</span>
                                        {tabs[tabKey].label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className={styles.content}>
                    {tabs[activeTab].component}
                </main>
            </div>
        </div>
    );
};

export default AccountPage;
