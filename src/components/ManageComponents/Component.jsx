import React from 'react'
import styles from "../../pages/AdminPage/AdminPage.module.css";

const Component = ({c, handleOpenModal, handleDelete}) => {
    return (
        <tr>
            <td>{c.id}</td>
            <td>{c.category}</td>
            <td>{c.name}</td>
            <td>{c.price} BYN</td>
            <td>
                <button className={styles.editButton} onClick={() => handleOpenModal(c)}>Редакт.</button>
                <button className={styles.deleteButton} onClick={() => handleDelete(c.id)}>Удалить</button>
            </td>
        </tr>
    );
};

export default Component;