import React from 'react'
import styles from "./AccountPage.module.css";

const AccountSidebarItem = ({activeTab, setActiveTab, tabKey, tabs}) => {
    return (
        <li>
            <button
                className={`${styles.navButton} ${activeTab === tabKey ? styles.active : ''}`}
                onClick={() => setActiveTab(tabKey)}
            >
                <div className={styles.navIcon}>{tabs[tabKey].icon}</div>
                {tabs[tabKey].label}
            </button>
        </li>
    );
};

export default AccountSidebarItem;