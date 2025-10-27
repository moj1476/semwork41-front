import React, { useState, useEffect } from 'react';
import styles from './Form.module.css';
import Modal from "../ui/Modal/Modal.jsx";

const CATEGORIES = [
    'CPU', 'GPU', 'MOTHERBOARD', 'RAM', 'STORAGE',
    'POWER_SUPPLY', 'COOLING', 'PC_CASE'
];

const ComponentModal = ({ isOpen, onClose, mode, componentData, onSubmit }) => {
    const isEditMode = mode === 'edit';

    const [formData, setFormData] = useState({
        category: CATEGORIES[0],
        name: '',
        description: '',
        price: '',
        stockQuantity: '',
    });

    useEffect(() => {
        if (isOpen) {
            if (isEditMode && componentData) {
                setFormData({
                    category: componentData.category || CATEGORIES[0],
                    name: componentData.name || '',
                    description: componentData.description || '',
                    price: componentData.price || '',
                    stockQuantity: componentData.stockQuantity || '',
                });
            } else {
                setFormData({
                    category: CATEGORIES[0],
                    name: '',
                    description: '',
                    price: '',
                    stockQuantity: '',
                });
            }
        }
    }, [isOpen, isEditMode, componentData]);

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        onSubmit(formData);
        onClose();
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            title={isEditMode ? "Редактирование компонента" : "Добавление нового компонента"}
        >
            <form onSubmit={handleSubmit} className={styles.form}>
                <div className={styles.inputGroup}>
                    <label htmlFor="category">Категория</label>
                    <select
                        id="category"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        className={styles.input}
                    >
                        {CATEGORIES.map(cat => <option key={cat} value={cat}>{cat.toUpperCase()}</option>)}
                    </select>
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="name">Название</label>
                    <input id="name" name="name" type="text" value={formData.name} onChange={handleInputChange} className={styles.input} required />
                </div>

                <div className={styles.inputGroup}>
                    <label htmlFor="description">Описание</label>
                    <textarea id="description" name="description" value={formData.description} onChange={handleInputChange} className={styles.textarea}></textarea>
                </div>

                <div className={styles.formRow}>
                    <div className={styles.inputGroup}>
                        <label htmlFor="price">Цена (BYN)</label>
                        <input id="price" name="price" type="number" step="0.01" value={formData.price} onChange={handleInputChange} className={styles.input} required />
                    </div>
                    <div className={styles.inputGroup}>
                        <label htmlFor="stockQuantity">Количество на складе</label>
                        <input id="stockQuantity" name="stockQuantity" type="number" value={formData.stockQuantity} onChange={handleInputChange} className={styles.input} required />
                    </div>
                </div>

                <button type="submit" className={styles.submitButton}>
                    {isEditMode ? 'Сохранить изменения' : 'Добавить компонент'}
                </button>
            </form>
        </Modal>
    );
};

export default ComponentModal;