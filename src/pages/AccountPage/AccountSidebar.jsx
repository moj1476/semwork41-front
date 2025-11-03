import React, {useContext} from 'react'
import styles from "./AccountPage.module.css";
import {RoutesPath} from "../../const/const.js";
import AdminIcon from "../../assets/admin.svg?react";
import LogoutButton from "../../components/LogoutButton/LogoutButton.jsx";
import {AuthContext} from "../../providers/AuthProvider.jsx";
import {useNavigate} from "react-router-dom";
import AccountSidebarItem from "./AccountSidebarItem.jsx";

const AccountSidebar = ({setActiveTab, activeTab, tabs}) => {
    const navigate = useNavigate();
    const { user } = useContext(AuthContext);

    return (
        <aside className={styles.sidebar}>
            <div className={styles.userProfile}>
                <div className={styles.avatar}>{user.username.slice(0, 1)}</div>
                <span className={styles.userName}>{user.username}</span>
            </div>
            <nav className={styles.nav}>
                <ul>
                    {Object.keys(tabs).map(tabKey => (
                        <AccountSidebarItem key={tabKey} tabs={tabs}
                                            activeTab={activeTab}
                                            setActiveTab={setActiveTab}
                                            tabKey={tabKey} />
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
                <LogoutButton />
            </div>
        </aside>
    );
};

export default AccountSidebar;