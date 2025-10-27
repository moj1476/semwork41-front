import React from 'react'
import styles from './MainPage.module.css';
import ArrowIcon from "../../assets/arrow.svg?react"
import PcImg from "../../assets/pc.png"
import {RoutesPath} from "../../const/const.js";
import {useNavigate} from "react-router-dom";

const MainPage = () => {
    const features = [
        'Индивидуальные сборки ПК',
        'Комплектующие без "серых" схем',
        'Честная гарантия 2 года',
    ];

    const navigate = useNavigate();

    return (
        <div className={styles.wrapper}>
            <div className={styles.container}>
                <main className={styles.main}>
                    <div className={styles.content}>
                        <h1 className={styles.title}>
                            Соберём <span className={styles.highlight}>производительный</span> ПК под Ваш бюджет и задачи
                        </h1>
                        <ul className={styles.features}>
                            {features.map((feature) => (
                                <li key={feature} className={styles.featureItem}>
                                    <span className={styles.featureIcon}></span>
                                    {feature}
                                </li>
                            ))}
                        </ul>
                        <p className={styles.description}>
                            Хотите мощный компьютер без тормозов на ближайшие 3-5 лет? Соберём для вас конфигурацию, где каждая деталь идеально сочетается и правильно настроена.
                        </p>
                        <div className={styles.actions}>
                            <a onClick={() => navigate(RoutesPath.builder)} className={`${styles.button} ${styles.mainButton}`}>
                                Подобрать ПК сейчас
                            </a>
                            <a onClick={() => navigate(RoutesPath.builder)} className={styles.arrowButton}>
                                <ArrowIcon />
                            </a>
                        </div>
                    </div>
                    <div className={styles.imageContainer}>
                        <img src={PcImg} alt="PC Case" className={styles.pcImage} />
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MainPage;