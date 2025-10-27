import React, {useEffect} from 'react'
import styles from "./Modal.module.css";
import Portal from "../Portal/Portal.jsx";

const Modal = ({isOpen, onClose, children}) => {
    useEffect(() => {
        if (isOpen) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = 'auto';
        }
        return () => {
            document.body.style.overflow = 'auto';
        };
    }, [isOpen]);

    if (!isOpen) {
        return null;
    }

    const handleContentClick = (e) => {
        e.stopPropagation();
    };

    return (
        <Portal>
            <div className={styles.modalOverlay} onMouseDown={onClose}>
                <div className={styles.modalContent} onMouseDown={handleContentClick}>
                    <button className={styles.closeButton} onClick={onClose}>&times;</button>
                    {children}
                </div>
            </div>
        </Portal>
    );
};

export default Modal;