import React, { useState, useMemo } from 'react';
import styles from './AdminPage.module.css';

// --- Иконки для навигации ---
const ComponentsIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M3 13h8V3H3v10zm0 8h8v-6H3v6zm10 0h8V11h-8v10zm0-18v6h8V3h-8z"/></svg>;
const UsersIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M16 11c1.66 0 2.99-1.34 2.99-3S17.66 5 16 5c-1.66 0-3 1.34-3 3s1.34 3 3 3zm-8 0c1.66 0 2.99-1.34 2.99-3S9.66 5 8 5C6.34 5 5 6.34 5 8s1.34 3 3 3zm0 2c-2.33 0-7 1.17-7 3.5V19h14v-2.5c0-2.33-4.67-3.5-7-3.5zm8 0c-.29 0-.62.02-.97.05 1.16.84 1.97 1.97 1.97 3.45V19h6v-2.5c0-2.33-4.67-3.5-7-3.5z"/></svg>;
const OrdersIcon = () => <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20 6h-4V4c0-1.11-.89-2-2-2h-4c-1.11 0-2 .89-2 2v2H4c-1.11 0-1.99.89-1.99 2L2 19c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2zm-6 0h-4V4h4v2z"/></svg>;

// --- Моковые данные ---
const initialComponents = [
    { id: 1, category: 'cpu', name: 'Intel Core i7-14700K', price: 1500 },
    { id: 2, category: 'gpu', name: 'NVIDIA GeForce RTX 4080', price: 4500 },
    { id: 3, category: 'ram', name: '32GB DDR5 6000MHz', price: 500 },
];
const initialUsers = [
    { id: 1, name: 'Алексей Петров', email: 'alex@example.com', registered: '2025-10-15' },
    { id: 2, name: 'Елена Иванова', email: 'elena@example.com', registered: '2025-10-02' },
];
const initialOrders = [
    { id: 10521, userId: 2, date: '2025-10-20', total: 9600, status: 'completed', items: [initialComponents[1], initialComponents[2]] },
    { id: 10520, userId: 1, date: '2025-10-18', total: 6500, status: 'processing', items: [initialComponents[0], initialComponents[1]] },
];

// --- Раздел управления компонентами ---
const ManageComponents = ({ components, setComponents }) => {
    const [modalOpen, setModalOpen] = useState(false);
    const [editingComponent, setEditingComponent] = useState(null);

    const handleOpenModal = (component = null) => {
        setEditingComponent(component);
        setModalOpen(true);
    };

    const handleSave = (component) => {
        if (editingComponent) {
            setComponents(components.map(c => c.id === component.id ? component : c));
        } else {
            setComponents([...components, { ...component, id: Date.now() }]);
        }
    };

    const handleDelete = (id) => {
        if (window.confirm('Вы уверены, что хотите удалить этот компонент?')) {
            setComponents(components.filter(c => c.id !== id));
        }
    }

    return (
        <div className={styles.tabContent}>
            <div className={styles.tabHeader}>
                <h2>Управление компонентами</h2>
                <button className={styles.actionButton} onClick={() => handleOpenModal()}>+ Добавить компонент</button>
            </div>
            <table className={styles.table}>
                <thead><tr><th>ID</th><th>Категория</th><th>Название</th><th>Цена</th><th>Действия</th></tr></thead>
                <tbody>
                {components.map(c => (
                    <tr key={c.id}>
                        <td>{c.id}</td><td>{c.category}</td><td>{c.name}</td><td>{c.price} BYN</td>
                        <td>
                            <button className={styles.editButton} onClick={() => handleOpenModal(c)}>Редакт.</button>
                            <button className={styles.deleteButton} onClick={() => handleDelete(c.id)}>Удалить</button>
                        </td>
                    </tr>
                ))}
                </tbody>
            </table>
            {/* Модальное окно будет здесь */}
        </div>
    );
};

// --- Раздел просмотра пользователей ---
const ViewUsers = ({ users }) => (
    <div className={styles.tabContent}>
        <div className={styles.tabHeader}><h2>Зарегистрированные пользователи</h2></div>
        <table className={styles.table}>
            <thead><tr><th>ID</th><th>Имя</th><th>Email</th><th>Дата регистрации</th></tr></thead>
            <tbody>
            {users.map(u => (
                <tr key={u.id}><td>{u.id}</td><td>{u.name}</td><td>{u.email}</td><td>{u.registered}</td></tr>
            ))}
            </tbody>
        </table>
    </div>
);

// --- Раздел просмотра заказов ---
const ViewOrders = ({ orders, setOrders, users }) => {
    const handleStatusChange = (orderId, newStatus) => {
        setOrders(orders.map(o => o.id === orderId ? {...o, status: newStatus} : o));
    };

    return (
        <div className={styles.tabContent}>
            <div className={styles.tabHeader}><h2>Активные и завершенные заказы</h2></div>
            <table className={styles.table}>
                <thead><tr><th>ID Заказа</th><th>Клиент</th><th>Сумма</th><th>Статус</th></tr></thead>
                <tbody>
                {orders.map(o => {
                    const user = users.find(u => u.id === o.userId);
                    return (
                        <tr key={o.id}>
                            <td>#{o.id}</td>
                            <td>{user ? user.name : 'N/A'}</td>
                            <td>{o.total} BYN</td>
                            <td>
                                <select
                                    className={`${styles.statusSelect} ${styles[o.status]}`}
                                    value={o.status}
                                    onChange={(e) => handleStatusChange(o.id, e.target.value)}
                                >
                                    <option value="processing">В сборке</option>
                                    <option value="shipped">Отправлен</option>
                                    <option value="completed">Выполнен</option>
                                </select>
                            </td>
                        </tr>
                    )
                })}
                </tbody>
            </table>
        </div>
    );
}

// --- Основной компонент страницы ---
const AdminPage = () => {
    const [activeTab, setActiveTab] = useState('components');
    const [components, setComponents] = useState(initialComponents);
    const [users, setUsers] = useState(initialUsers);
    const [orders, setOrders] = useState(initialOrders);

    const tabs = {
        components: { label: 'Компоненты', icon: <ComponentsIcon />, component: <ManageComponents components={components} setComponents={setComponents} /> },
        users: { label: 'Пользователи', icon: <UsersIcon />, component: <ViewUsers users={users} /> },
        orders: { label: 'Заказы', icon: <OrdersIcon />, component: <ViewOrders orders={orders} setOrders={setOrders} users={users}/> },
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