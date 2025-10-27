import styles from "../../pages/BuilderPage/BuilderPage.module.css"
import {useQuery} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import {useEffect} from "react";


const ComponentSelectionModal = ({ isOpen, onClose, categoryKey, onSelect }) => {
    const {data, refetch} = useQuery({
        queryKey: ["components"],
        queryFn: () => apiClient(
            BASE_URL + API_ENDPOINTS.COMPONENT_BY_CATEGORY + `/${categoryKey.toUpperCase()}`,
            {
                method: 'GET',
            },
            false
        )
    })

    useEffect(() => {
        refetch()
    }, [categoryKey]);

    if (!isOpen) return null;

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalCloseButton} onClick={onClose}>&times;</button>
                <h3 className={styles.modalTitle}>Выберите {categoryKey}</h3>
                <div className={styles.modalList}>
                    {!!data && data.map(option => (
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

export default ComponentSelectionModal;