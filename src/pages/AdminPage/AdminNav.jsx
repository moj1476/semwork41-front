import React from 'react'
import styles from "./AdminPage.module.css";
import AdminNavItem from "./AdminNavItem.jsx";

const AdminNav = ({tabs, setActiveTab, activeTab}) => {
    return (
        <aside className={styles.sidebar}>
            <div className={styles.adminProfile}>
                <div className={styles.avatar}>A</div>
                <div className={styles.adminName}>Админ-панель</div>
            </div>
            <nav className={styles.nav}>
                <ul>
                    {Object.keys(tabs).map(tabKey => (
                        <AdminNavItem activeTab={activeTab} key={tabKey} tabKey={tabKey} tabs={tabs} setActiveTab={setActiveTab} />
                    ))}
                </ul>
            </nav>
        </aside>
    );
};

export default AdminNav;