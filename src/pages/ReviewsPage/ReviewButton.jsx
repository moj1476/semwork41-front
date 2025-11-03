import React, {useContext, useState} from 'react'
import styles from "./ReviewsPage.module.css";
import {toast} from "react-toastify";
import {AuthContext} from "../../providers/AuthProvider.jsx";
import ReviewModal from "../../components/ReviewModal/ReviewModal.jsx";

const ReviewButton = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {isAuthenticated: auth} = useContext(AuthContext);
    const handleMakeModalOpen = () => {
        if(auth) {
            setIsModalOpen(true);
        } else {
            toast("Войдите в аккаунт, чтобы продолжить", {
                type: "warning",
            })
        }
    }

    return (
        <>
            <button className={styles.addReviewButton} onClick={handleMakeModalOpen}>
                Оставить отзыв
            </button>
            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </>
    );
};

export default ReviewButton;