import React from 'react'
import styles from "../../AuthModal/AuthModal.module.css";

const Input = ({type, placeholder, onInput, value, className}) => {

    const handleInput = (e) => {
        onInput?.(e.target.value);
    }

    return (
        <input type={type}
               placeholder={placeholder}
               value={value}
               onInput={handleInput}
               className={styles.input + " " + className} />
    );
};

export default Input;