import React, {useState} from 'react'
import StarIcon from "../StarIcon/StarIcon.jsx";
import styles from './InteractiveRating.module.css';

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

export default InteractiveRating;