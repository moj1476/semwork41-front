import styles from "../../pages/AdminPage/AdminPage.module.css";
import React from "react";
import {useQuery} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";

const ViewUsers = () => {

    const {data} = useQuery({
        queryKey: ['users'],
        queryFn: () => apiClient(
            BASE_URL + API_ENDPOINTS.ADMIN_GET_ALL_USERS,
            {
                method: 'GET',
            },
            true
        )
    })

    return <div className={styles.tabContent}>
        <div className={styles.tabHeader}><h2>Зарегистрированные пользователи</h2></div>
        <table className={styles.table}>
            <thead><tr><th>ID</th><th>Имя</th><th>Email</th></tr></thead>
            <tbody>
            {!!data && data.map(u => (
                <tr key={u.id}><td>{u.id}</td><td>{u.username}</td><td>{u.email}</td></tr>
            ))}
            </tbody>
        </table>
    </div>
};

export default ViewUsers;