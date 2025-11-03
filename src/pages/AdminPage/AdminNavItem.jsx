import React from 'react'
import styles from "./AdminPage.module.css";

const AdminNavItem = ({tabKey, activeTab, tabs, setActiveTab}) => {
    return (
        <li>
            <button className={`${styles.navButton} ${activeTab === tabKey ? styles.active : ''}`} onClick={() => setActiveTab(tabKey)}>
                <span className={styles.navIcon}>{tabs[tabKey].icon}</span>
                {tabs[tabKey].label}
            </button>
        </li>
    );
};

export default AdminNavItem;