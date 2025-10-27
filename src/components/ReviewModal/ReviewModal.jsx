import React, {useState} from "react";
import styles from "../../pages/ReviewsPage/ReviewsPage.module.css";
import {StarIcon} from "../../pages/ReviewsPage/ReviewsPage.jsx";
import Modal from "../ui/Modal/Modal.jsx";
import {useMutation, useQueryClient} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";

const InteractiveRating = ({ rating, setRating }) => {
    const [hoverRating, setHoverRating] = useState(0);

    return (
        <div className={styles.rating} onMouseLeave={() => setHoverRating(0)}>
            {[...Array(5)].map((_, index) => {
                const starRating = index + 1;
                return (
                    <StarIcon
                        key={index}
                        filled={starRating <= (hoverRating || rating)}
                        interactive={true}
                        onHover={() => setHoverRating(starRating)}
                        onClick={() => setRating(starRating)}
                    />
                );
            })}
        </div>
    );
};

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
                    <label>Ваша оценка:</label>
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