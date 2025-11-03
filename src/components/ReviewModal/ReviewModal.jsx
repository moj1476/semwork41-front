import React, {useState} from "react";
import styles from "../../pages/ReviewsPage/ReviewsPage.module.css";
import Modal from "../ui/Modal/Modal.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import InteractiveRating from "../ui/InteractiveRating/InteractiveRating.jsx";

const ReviewModal = ({ isOpen, onClose }) => {
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');

    const queryClient = useQueryClient();
    const {mutate} = useMutation(
        {
            mutationFn: (vars) => apiClient(
                BASE_URL + API_ENDPOINTS.CREATE_REVIEW,
                {
                    method: 'POST',
                    body: JSON.stringify(vars),
                },
                true
            ),
            onSettled: () => {
                queryClient.invalidateQueries("reviews")
            }
        }
    )

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && rating > 0) {
            mutate({ rating, text });
            onClose();
            setRating(0);
            setText('');
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <h3 className={styles.modalTitle}>Ваш отзыв</h3>
            <form onSubmit={handleSubmit} className={styles.modalForm}>
                <div className={styles.modalGroup}>
                    <p>Ваша оценка:</p>
                    <InteractiveRating rating={rating} setRating={setRating} />
                </div>
                <div className={styles.modalGroup}>
                    <label htmlFor="reviewText">Текст отзыва:</label>
                    <textarea
                        id="reviewText"
                        className={styles.modalTextarea}
                        placeholder="Поделитесь вашими впечатлениями..."
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        rows="6"
                    />
                </div>
                <button type="submit" className={styles.modalSubmitButton} disabled={!text.trim() || rating === 0}>
                    Отправить отзыв
                </button>
            </form>
        </Modal>
    );
};

export default ReviewModal;