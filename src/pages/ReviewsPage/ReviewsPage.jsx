import React, {useContext, useState} from 'react';
import styles from './ReviewsPage.module.css';
import ReviewModal from "../../components/ReviewModal/ReviewModal.jsx";
import {useQuery} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import {AuthContext, ProtectedRoute} from "../../providers/AuthProvider.jsx";
import {toast} from "react-toastify";

export const StarIcon = ({ filled, interactive, onHover, onClick }) => (
    <svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill={filled ? 'var(--primary-yellow)' : 'var(--border-color)'}
        className={interactive ? styles.interactiveStar : ''}
        onMouseEnter={onHover}
        onClick={onClick}
    >
        <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21 12 17.27z"/>
    </svg>
);

const StaticRating = ({ score }) => (
    <div className={styles.rating}>
        {[...Array(5)].map((_, index) => (
            <StarIcon key={index} filled={index < score} />
        ))}
    </div>
);


const ReviewsPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const {isAuthenticated: auth} = useContext(AuthContext);

    const {data} = useQuery({
        queryKey: ['reviews'],
        queryFn: () => apiClient(
            BASE_URL + API_ENDPOINTS.GET_REVIEWS,
            {
                method: 'GET',
            },
            false
        )
    })

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
            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
            <div className={styles.reviewsWrapper}>
                <div className={styles.reviewsContainer}>
                    <header className={styles.header}>
                        <div>
                            <h1 className={styles.title}>Отзывы наших <span className={styles.highlight}>клиентов</span></h1>
                            <p className={styles.subtitle}>Нам доверяют, и мы этим гордимся. Более 500+ довольных клиентов.</p>
                        </div>
                        <button className={styles.addReviewButton} onClick={handleMakeModalOpen}>
                            Оставить отзыв
                        </button>
                    </header>

                    <div className={styles.reviewsGrid}>
                        {!!data && data.map((review, index) => (
                            <div key={index} className={styles.reviewCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.authorInfo}>
                                        <div className={styles.authorAvatar}>{review.author.username.charAt(0)}</div>
                                        <div>
                                            <p className={styles.authorName}>{review.author.username}</p>
                                        </div>
                                    </div>
                                    <StaticRating score={review.rating} />
                                </div>
                                <p className={styles.reviewText}>{review.text}</p>
                                {review.verified && <div className={styles.verifiedBadge}>✓ Проверенная покупка</div>}
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewsPage;