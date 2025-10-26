import React from 'react'
import LogoIcon from "../../assets/logo.svg?react"
import s from "./Logo.module.css"

const Logo = () => {
    return (
        <div className={s.container}>
            <LogoIcon className={s.svg} />
        </div>
    );
};

export default Logo;