import React, {useState} from 'react';
import styles from './BuilderPage.module.css';
import Configurator from "./Configurator.jsx";
import Summary from "./Summary.jsx";

const availableComponents = {
    cpu: {
        name: 'Процессор',
    },
    gpu: {
        name: 'Видеокарта',
    },
    ram: {
        name: 'Оперативная память',
    },
    storage: {
        name: 'Накопитель'
    },
    motherboard: {
        name: 'Материнская плата'
    },
    POWER_SUPPLY: {
        name: 'Блок питания'
    },
    cooling: {
        name: 'Охлаждение'
    },
    pc_case: {
        name: 'Корпус'
    },
};

const BuilderPage = () => {
    const [currentBuild, setCurrentBuild] = useState({});

    return (
        <>
            <div className={styles.builderWrapper}>
                <div className={styles.builderContainer}>

                    <Configurator availableComponents={availableComponents}
                                  currentBuild={currentBuild}
                                  setCurrentBuild={setCurrentBuild} />

                    <Summary currentBuild={currentBuild} availableComponents={availableComponents} />

                </div>
            </div>
        </>
    );
};

export default BuilderPage;