import React, {useState, useMemo, useContext} from 'react';
import styles from './BuilderPage.module.css';
import pc from "../../assets/pc.png"
import ComponentSelectionModal from "../../components/ComponentSelectionModal/ComponentSelectionModal.jsx";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal.jsx";
import {toast} from "react-toastify";
import {AuthContext} from "../../providers/AuthProvider.jsx";

const availableComponents = {
    cpu: {
        name: 'Процессор',
    },
    gpu: {
        name: 'Видеокарта',
    },
    ram: {
        name: 'Оперативная память',
    },
    storage: {
        name: 'Накопитель'
    },
    motherboard: {
        name: 'Материнская плата'
    },
    POWER_SUPPLY: {
        name: 'Блок питания'
    },
    cooling: {
        name: 'Охлаждение'
    },
    pc_case: {
        name: 'Корпус'
    },
};



const BuilderPage = () => {
    const [currentBuild, setCurrentBuild] = useState({});
    const [modalState, setModalState] = useState({ isOpen: false, categoryKey: null });
    const [openModal, setOpenModal] = useState(false);
    const {isAuthenticated: auth} = useContext(AuthContext);

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


    const handleCheckoutClick = () => {
        if(!auth) return toast("Войдите в аккаунт, чтобы продолжить", {
            type: "warning",
        });

        const missing = Object.keys(availableComponents).filter(
            category => !currentBuild[category]
        );

        if (missing.length > 0) {
            const missingNames = missing.map(cat => {
                return availableComponents[cat].name;
            }).join(', ');
            toast.error(`Пожалуйста, выберите все компоненты: ${missingNames}`);
            return;
        }

        setOpenModal(true);
    };

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
                    <div className={styles.configurator}>
                        <h1 className={styles.title}>Конфигуратор <span className={styles.highlight}>сборки</span></h1>
                        <p className={styles.subtitle}>Подберите идеальные комплектующие для вашего будущего ПК.</p>

                        <div className={styles.componentList}>
                            {Object.entries(availableComponents).map(([key, category]) => (
                                <div key={key} className={styles.componentItem}>
                                    <div className={styles.componentInfo}>
                                        <span className={styles.componentName}>{category.name}</span>
                                        <span className={styles.componentSelection}>{currentBuild[key]?.name}</span>
                                    </div>
                                    <button className={styles.selectButton} onClick={() => handleOpenModal(key)}>Изменить</button>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div className={styles.summary}>
                        <div className={styles.pcImageContainer}>
                            <img src={pc} alt="PC Build" className={styles.pcImage} />
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
                            <span className={styles.totalPrice}>{totalCost.toFixed(2)} BYN</span>
                        </div>
                        <button onClick={handleCheckoutClick} className={styles.addToCartButton}>Заказать</button>
                        <CheckoutModal onClose={() => setOpenModal(false)} isOpen={openModal} buildData={currentBuild} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default BuilderPage;