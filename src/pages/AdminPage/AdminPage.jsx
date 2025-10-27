import React, { useState } from 'react';
import styles from './AdminPage.module.css';
import ComponentsIcon from "../../assets/components.svg?react"
import UsersIcon from "../../assets/users.svg?react"
import OrdersIcon from "../../assets/orders.svg?react"
import ManageComponents from "../../components/ManageComponents/ManageComponents.jsx";
import ViewOrders from "../../components/ViewOrders/ViewOrders.jsx";
import ViewUsers from "../../components/ViewUsers/ViewUsers.jsx";

const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('components');

    const tabs = {
        components: { label: 'Компоненты', icon: <ComponentsIcon />, component: <ManageComponents /> },
        users: { label: 'Пользователи', icon: <UsersIcon />, component: <ViewUsers  /> },
        orders: { label: 'Заказы', icon: <OrdersIcon />, component: <ViewOrders /> },
    };

    return (
        <div className={styles.adminWrapper}>
            <div className={styles.adminContainer}>
                <aside className={styles.sidebar}>
                    <div className={styles.adminProfile}>
                        <div className={styles.avatar}>A</div>
                        <span className={styles.adminName}>Админ-панель</span>
                    </div>
                    <nav className={styles.nav}>
                        <ul>
                            {Object.keys(tabs).map(tabKey => (
                                <li key={tabKey}>
                                    <button className={`${styles.navButton} ${activeTab === tabKey ? styles.active : ''}`} onClick={() => setActiveTab(tabKey)}>
                                        <span className={styles.navIcon}>{tabs[tabKey].icon}</span>
                                        {tabs[tabKey].label}
                                    </button>
                                </li>
                            ))}
                        </ul>
                    </nav>
                </aside>
                <main className={styles.content}>{tabs[activeTab].component}</main>
            </div>
        </div>
    );
};

export default AdminPage;