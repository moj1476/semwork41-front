import React from 'react'
import s from "./Button.module.css"

const classes = {
    button: s.button,
    none: s.none
}

const Button = ({variant, className, children}) => {



    return (
        <button className={classes[variant] + " " + className}>
            {children}
        </button>
    );
};

export default Button;