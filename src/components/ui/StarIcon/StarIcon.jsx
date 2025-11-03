import React from 'react';
import styles from './StarIcon.module.css';
import StarIconSvg from '../../../assets/star.svg?react';

const StarIcon = ({ filled, interactive, onHover, onClick }) => (
    <StarIconSvg
        fill={filled ? 'var(--primary-yellow)' : 'var(--border-color)'}
        className={interactive ? styles.interactiveStar : ''}
        onMouseEnter={onHover}
        onClick={onClick}
    />
);

export default StarIcon;