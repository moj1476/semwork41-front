import React, {useContext, useState} from 'react';
import styles from './AccountPage.module.css';
import UserIcon from '../../assets/user-icon.svg?react';
import LockIcon from '../../assets/lock.svg?react';
import CreditCardIcon from '../../assets/credit-card.svg?react';
import AddressIcon from '../../assets/address.svg?react';
import HistoryIcon from '../../assets/history.svg?react';
import AdminIcon from '../../assets/admin.svg?react';
import LogoutIcon from '../../assets/logout.svg?react';
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo.jsx";
import ChangePassword from "../../components/ChangePassword/ChangePassword.jsx";
import PaymentMethods from "../../components/PaymentMethods/PaymentMethods.jsx";
import DeliveryAddresses from "../../components/DeliveryAddresses/DeliveryAddresses.jsx";
import OrderHistory from "../../components/OrderHistory/OrderHistory.jsx";
import {AuthContext} from "../../providers/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import {RoutesPath} from "../../const/const.js";
import {removeToken} from "../../utils/tokens.js";

const tabs = {
    profile: { label: 'Профиль', icon: <UserIcon />, component: <ProfileInfo /> },
    password: { label: 'Пароль', icon: <LockIcon />, component: <ChangePassword /> },
    payment: { label: 'Карты', icon: <CreditCardIcon />, component: <PaymentMethods /> },
    address: { label: 'Адреса', icon: <AddressIcon />, component: <DeliveryAddresses /> },
    orders: { label: 'Заказы', icon: <HistoryIcon />, component: <OrderHistory /> },

};

const AccountPage = () => {
    const [activeTab, setActiveTab] = useState('profile');
    const { user, setAuthState } = useContext(AuthContext);

    const navigate = useNavigate();

    const handleLogout = () => {
        removeToken();
        setAuthState(false);
        navigate("/")
    };

    return (
        <div className={styles.accountWrapper}>
            <div className={styles.accountContainer}>
                <aside className={styles.sidebar}>
                    <div className={styles.userProfile}>
                        <div className={styles.avatar}>{user.username.slice(0, 1)}</div>
                        <span className={styles.userName}>{user.username}</span>
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
                    <div className={styles.sidebarFooter}>
                        {user?.role === 'ADMIN' && (
                            <button onClick={() => navigate(RoutesPath.admin)} className={styles.navButton}>
                                <AdminIcon />
                                <span>Админ-панель</span>
                            </button>
                        )}
                        <button className={styles.navButton} onClick={handleLogout}>
                            <LogoutIcon />
                            <span>Выход</span>
                        </button>
                    </div>
                </aside>
                <main className={styles.content}>
                    {tabs[activeTab].component}
                </main>
            </div>
        </div>
    );
};

export default AccountPage;
