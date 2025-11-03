import React, {useState} from 'react';
import styles from './AccountPage.module.css';
import UserIcon from '../../assets/user-icon.svg?react';
import LockIcon from '../../assets/lock.svg?react';
import CreditCardIcon from '../../assets/credit-card.svg?react';
import AddressIcon from '../../assets/address.svg?react';
import HistoryIcon from '../../assets/history.svg?react';
import ProfileInfo from "../../components/ProfileInfo/ProfileInfo.jsx";
import ChangePassword from "../../components/ChangePassword/ChangePassword.jsx";
import PaymentMethods from "../../components/PaymentMethods/PaymentMethods.jsx";
import DeliveryAddresses from "../../components/DeliveryAddresses/DeliveryAddresses.jsx";
import OrderHistory from "../../components/OrderHistory/OrderHistory.jsx";
import AccountSidebar from "./AccountSidebar.jsx";

const tabs = {
    profile: { label: 'Профиль', icon: <UserIcon />, component: <ProfileInfo /> },
    password: { label: 'Пароль', icon: <LockIcon />, component: <ChangePassword /> },
    payment: { label: 'Карты', icon: <CreditCardIcon />, component: <PaymentMethods /> },
    address: { label: 'Адреса', icon: <AddressIcon />, component: <DeliveryAddresses /> },
    orders: { label: 'Заказы', icon: <HistoryIcon />, component: <OrderHistory /> },
};

const AccountPage = () => {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className={styles.accountWrapper}>
            <div className={styles.accountContainer}>
                <AccountSidebar activeTab={activeTab} tabs={tabs} setActiveTab={setActiveTab} />
                <main className={styles.content}>
                    {tabs[activeTab].component}
                </main>
            </div>
        </div>
    );
};

export default AccountPage;
