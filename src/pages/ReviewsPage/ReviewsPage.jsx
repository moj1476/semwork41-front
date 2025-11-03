import React from 'react';
import styles from './ReviewsPage.module.css';
import {useQuery} from "@tanstack/react-query";
import {API_ENDPOINTS, apiClient, BASE_URL} from "../../api/index.js";
import ReviewButton from "./ReviewButton.jsx";
import ReviewCard from "./ReviewCard.jsx";


const ReviewsPage = () => {

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

    return (
        <>
            <div className={styles.reviewsWrapper}>
                <div className={styles.reviewsContainer}>
                    <header className={styles.header}>
                        <div>
                            <h1 className={styles.title}>Отзывы наших <span className={styles.highlight}>клиентов</span></h1>
                            <p className={styles.subtitle}>Нам доверяют, и мы этим гордимся. Более 500+ довольных клиентов.</p>
                        </div>
                        <ReviewButton />
                    </header>

                    <div className={styles.reviewsGrid}>
                        {!!data && data.map((review, index) => (
                            <ReviewCard review={review} key={index} />
                        ))}
                    </div>
                </div>
            </div>
        </>
    );
};

export default ReviewsPage;