import React, { useState } from 'react';
import styles from './ReviewsPage.module.css';

// --- Иконка для звезды рейтинга ---
const StarIcon = ({ filled, interactive, onHover, onClick }) => (
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

// --- Компонент для отображения рейтинга (статичный) ---
const StaticRating = ({ score }) => (
    <div className={styles.rating}>
        {[...Array(5)].map((_, index) => (
            <StarIcon key={index} filled={index < score} />
        ))}
    </div>
);

// --- Интерактивный компонент рейтинга для модального окна ---
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


// --- Компонент модального окна для отзыва ---
const ReviewModal = ({ isOpen, onClose, onSubmit }) => {
    const [rating, setRating] = useState(0);
    const [text, setText] = useState('');

    if (!isOpen) return null;

    const handleSubmit = (e) => {
        e.preventDefault();
        if (text.trim() && rating > 0) {
            onSubmit({ rating, text });
            // Сбрасываем форму
            setRating(0);
            setText('');
        }
    };

    return (
        <div className={styles.modalOverlay} onClick={onClose}>
            <div className={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <button className={styles.modalCloseButton} onClick={onClose}>&times;</button>
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
            </div>
        </div>
    );
};


// --- Моковые данные для отзывов ---
const initialReviewsData = [
    { author: 'Алексей Петров', rating: 5, date: '15 октября 2025', text: 'Заказывал сборку для работы с графикой...', verified: true },
    { author: 'Елена Иванова', rating: 5, date: '02 октября 2025', text: 'Очень довольна своим новым игровым ПК...', verified: true },
    { author: 'Дмитрий Смирнов', rating: 4, date: '28 сентября 2025', text: 'В целом все хорошо, сборка качественная...', verified: true },
];


const ReviewsPage = () => {
    const [reviews, setReviews] = useState(initialReviewsData);
    const [isModalOpen, setIsModalOpen] = useState(false);

    const handleAddReview = ({ rating, text }) => {
        const newReview = {
            author: 'Владислав Мож', // Используем имя текущего пользователя
            rating,
            text,
            date: new Date().toLocaleDateString('ru-RU', { day: 'numeric', month: 'long', year: 'numeric' }),
            verified: false, // Новый отзыв не является "проверенной покупкой"
        };
        setReviews([newReview, ...reviews]);
        setIsModalOpen(false);
    };

    return (
        <>
            <ReviewModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSubmit={handleAddReview}
            />
            <div className={styles.reviewsWrapper}>
                <div className={styles.reviewsContainer}>
                    <header className={styles.header}>
                        <div>
                            <h1 className={styles.title}>Отзывы наших <span className={styles.highlight}>клиентов</span></h1>
                            <p className={styles.subtitle}>Нам доверяют, и мы этим гордимся. Более 500+ довольных клиентов.</p>
                        </div>
                        <button className={styles.addReviewButton} onClick={() => setIsModalOpen(true)}>
                            Оставить отзыв
                        </button>
                    </header>

                    <div className={styles.reviewsGrid}>
                        {reviews.map((review, index) => (
                            <div key={index} className={styles.reviewCard}>
                                <div className={styles.cardHeader}>
                                    <div className={styles.authorInfo}>
                                        <div className={styles.authorAvatar}>{review.author.charAt(0)}</div>
                                        <div>
                                            <p className={styles.authorName}>{review.author}</p>
                                            <p className={styles.reviewDate}>{review.date}</p>
                                        </div>
                                    </div>
                                    <StaticRating score={review.rating} />
                                </div>
                                <p className={styles.reviewText}>{review.text}</p>
                                {review.verified && <div className={styles.verifiedBadge}>✓ Проверенная покупка</div>}
                            </div>
                        ))}
                    </div>

                    <div className={styles.pagination}>
                        {/* ... пагинация ... */}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewsPage;