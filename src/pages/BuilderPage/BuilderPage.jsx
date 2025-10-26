import React, { useState, useMemo } from 'react';
import styles from './BuilderPage.module.css';

// --- Расширенные моковые данные с вариантами выбора ---
const availableComponents = {
    cpu: {
        name: 'Процессор',
        options: [
            { name: 'Intel Core i5-14600K', price: 1200 },
            { name: 'Intel Core i7-14700K', price: 1500 },
            { name: 'AMD Ryzen 7 7800X3D', price: 1600 },
        ],
    },
    gpu: {
        name: 'Видеокарта',
        options: [
            { name: 'NVIDIA GeForce RTX 4070', price: 3000 },
            { name: 'NVIDIA GeForce RTX 4080', price: 4500 },
            { name: 'AMD Radeon RX 7900 XTX', price: 4200 },
        ],
    },
    ram: {
        name: 'Оперативная память',
        options: [
            { name: '16GB DDR5 5200MHz', price: 350 },
            { name: '32GB DDR5 6000MHz', price: 500 },
            { name: '64GB DDR5 6400MHz', price: 900 },
        ],
    },
    // ... (для краткости добавлены только 3 категории, можно расширить по аналогии)
    storage: { name: 'Накопитель', options: [{ name: '2TB NVMe SSD Gen4', price: 600 }] },
    motherboard: { name: 'Материнская плата', options: [{ name: 'ASUS ROG STRIX Z790-E', price: 1200 }] },
    power: { name: 'Блок питания', options: [{ name: '1000W 80+ Gold', price: 450 }] },
    cooling: { name: 'Охлаждение', options: [{ name: 'Система водяного охлаждения 360мм', price: 550 }] },
    pc_case: { name: 'Корпус', options: [{ name: 'Custom Mid-Tower ATX', price: 300 }] },
};

// --- Функция для инициализации начальной сборки (первый элемент из каждой категории) ---
const getDefaultBuild = () => {
    const defaultBuild = {};
    for (const key in availableComponents) {
        defaultBuild[key] = availableComponents[key].options[0];
    }
    return defaultBuild;
};


// --- Компонент модального окна выбора ---
const ComponentSelectionModal = ({ isOpen, onClose, categoryKey, onSelect }) => {
    if (!isOpen) return null;

    const category = availableComponents[categoryKey];

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalCloseButton} onClick={onClose}>&times;</button>
                <h3 className={styles.modalTitle}>Выберите {category.name.toLowerCase()}</h3>
                <div className={styles.modalList}>
                    {category.options.map(option => (
                        <div key={option.name} className={styles.modalItem} onClick={() => onSelect(categoryKey, option)}>
                            <span>{option.name}</span>
                            <span className={styles.modalItemPrice}>{option.price} BYN</span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};


const BuilderPage = () => {
    const [currentBuild, setCurrentBuild] = useState(getDefaultBuild());
    const [modalState, setModalState] = useState({ isOpen: false, categoryKey: null });

    // --- Обработчики для модального окна ---
    const handleOpenModal = (categoryKey) => {
        setModalState({ isOpen: true, categoryKey });
    };

    const handleCloseModal = () => {
        setModalState({ isOpen: false, categoryKey: null });
    };

    const handleComponentSelect = (categoryKey, selectedOption) => {
        setCurrentBuild(prevBuild => ({
            ...prevBuild,
            [categoryKey]: selectedOption,
        }));
        handleCloseModal();
    };

    // --- Вычисление общей стоимости с помощью useMemo для оптимизации ---
    const totalCost = useMemo(() => {
        return Object.values(currentBuild).reduce((sum, item) => sum + item.price, 0);
    }, [currentBuild]);

    return (
        <>
            <ComponentSelectionModal
                isOpen={modalState.isOpen}
                onClose={handleCloseModal}
                categoryKey={modalState.categoryKey}
                onSelect={handleComponentSelect}
            />
            <div className={styles.builderWrapper}>
                <div className={styles.builderContainer}>
                    {/* Левая колонка - Конфигурация */}
                    <div className={styles.configurator}>
                        <h1 className={styles.title}>Конфигуратор <span className={styles.highlight}>сборки</span></h1>
                        <p className={styles.subtitle}>Подберите идеальные комплектующие для вашего будущего ПК.</p>

                        <div className={styles.componentList}>
                            {Object.entries(availableComponents).map(([key, category]) => (
                                <div key={key} className={styles.componentItem}>
                                    <div className={styles.componentInfo}>
                                        <span className={styles.componentName}>{category.name}</span>
                                        <span className={styles.componentSelection}>{currentBuild[key].name}</span>
                                    </div>
                                    <button className={styles.selectButton} onClick={() => handleOpenModal(key)}>Изменить</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Правая колонка - Итог */}
                    <div className={styles.summary}>
                        <div className={styles.pcImageContainer}>
                            <img src="https://i.ibb.co/6g3pgPb/case.png" alt="PC Build" className={styles.pcImage} />
                        </div>
                        <h2 className={styles.summaryTitle}>Ваша сборка</h2>
                        <div className={styles.summaryList}>
                            {Object.entries(currentBuild).map(([key, component]) => (
                                <div key={key} className={styles.summaryItem}>
                                    <span>{availableComponents[key].name}</span>
                                    <span className={styles.summaryPrice}>{component.price} BYN</span>
                                </div>
                            ))}
                        </div>
                        <div className={styles.total}>
                            <span>Итоговая стоимость:</span>
                            <span className={styles.totalPrice}>{totalCost} BYN</span>
                        </div>
                        <button className={styles.addToCartButton}>Добавить в корзину</button>
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuilderPage;