import React from 'react'
import styles from "./ReviewsPage.module.css";
import StaticRating from "../../components/ui/StaticRating/StaticRating.jsx";

const ReviewCard = ({review}) => {
    return (
        <div className={styles.reviewCard}>
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
        </div>
    );
};

export default ReviewCard;