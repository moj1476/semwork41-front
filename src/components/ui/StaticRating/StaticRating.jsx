import React from 'react'
import styles from "./StaticRating.module.css";
import StarIcon from "../StarIcon/StarIcon.jsx";

const StaticRating = ({ score }) => (
    <div className={styles.rating}>
        {[...Array(5)].map((_, index) => (
            <StarIcon key={index} filled={index < score} />
        ))}
    </div>
);

export default StaticRating;