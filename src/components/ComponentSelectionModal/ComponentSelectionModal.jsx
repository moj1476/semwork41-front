import styles from "./ComponentSelectionModal.module.css"
import {useQuery} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import {useEffect} from "react";
import Modal from "../ui/Modal/Modal.jsx";


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
        <Modal onClose={onClose} isOpen={isOpen}>
            <h3 className={styles.modalTitle}>Выберите {categoryKey}</h3>
            <div className={styles.modalList}>
                {!!data && data.map(option => (
                    <div key={option.name} className={styles.modalItem} onClick={() => onSelect(categoryKey, option)}>
                        <span>{option.name}</span>
                        <span className={styles.modalItemPrice}>{option.price} BYN</span>
                    </div>
                ))}
            </div>
        </Modal>
    );
};

export default ComponentSelectionModal;