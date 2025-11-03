import React, {useState} from 'react'
import styles from "./BuilderPage.module.css";
import ComponentSelectionModal from "../../components/ComponentSelectionModal/ComponentSelectionModal.jsx";

const Configurator = ({availableComponents, currentBuild, setCurrentBuild}) => {
    const [modalState, setModalState] = useState({ isOpen: false, categoryKey: null });

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

    return (
        <div className={styles.configurator}>
            <h1 className={styles.title}>Конфигуратор <span className={styles.highlight}>сборки</span></h1>
            <p className={styles.subtitle}>Подберите идеальные комплектующие для вашего будущего ПК.</p>

            <div className={styles.componentList}>
                {Object.entries(availableComponents).map(([key, category]) => (
                    <div key={key} className={styles.componentItem}>
                        <div className={styles.componentInfo}>
                            <span className={styles.componentName}>{category.name}</span>
                            <span className={styles.componentSelection}>{currentBuild[key]?.name ?? "Не выбрано"}</span>
                        </div>
                        <button className={styles.selectButton} onClick={() => handleOpenModal(key)}>Изменить</button>
                    </div>
                ))}
            </div>
            <ComponentSelectionModal
                isOpen={modalState.isOpen}
                onClose={handleCloseModal}
                categoryKey={modalState.categoryKey}
                onSelect={handleComponentSelect}
            />
        </div>
    );
};

export default Configurator;