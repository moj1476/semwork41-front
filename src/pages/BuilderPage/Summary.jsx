import React, {useContext, useMemo, useState} from 'react'
import styles from "./BuilderPage.module.css";
import pc from "../../assets/pc.png";
import CheckoutModal from "../../components/CheckoutModal/CheckoutModal.jsx";
import {toast} from "react-toastify";
import {AuthContext} from "../../providers/AuthProvider.jsx";

const Summary = ({currentBuild, availableComponents}) => {
    const [openModal, setOpenModal] = useState(false);
    const {isAuthenticated: auth} = useContext(AuthContext);

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
            toast(`Пожалуйста, выберите все компоненты: ${missingNames}`, {
                type: "error",
            });
            return;
        }

        setOpenModal(true);
    };

    const totalCost = useMemo(() => {
        return Object.values(currentBuild).reduce((sum, item) => sum + item.price, 0);
    }, [currentBuild]);

    return (
        <div className={styles.summary}>
            <div className={styles.pcImageContainer}>
                <img src={pc} alt="PC Build" className={styles.pcImage} />
            </div>
            <h2 className={styles.summaryTitle}>Ваша сборка</h2>
            <div className={styles.summaryList}>
                {Object.entries(currentBuild).length > 0 ? Object.entries(currentBuild).map(([key, component]) => (
                    <div key={key} className={styles.summaryItem}>
                        <span>{availableComponents[key].name}</span>
                        <span className={styles.summaryPrice}>{component.price} BYN</span>
                    </div>
                )) : <p className={styles.emptyText}>Компоненты не выбраны</p>}
            </div>
            <div className={styles.total}>
                <span>Итоговая стоимость:</span>
                <span className={styles.totalPrice}>{totalCost.toFixed(2)} BYN</span>
            </div>
            <button onClick={handleCheckoutClick} className={styles.addToCartButton}>Заказать</button>
            <CheckoutModal onClose={() => setOpenModal(false)} isOpen={openModal} buildData={currentBuild} />
        </div>
    );
};

export default Summary;