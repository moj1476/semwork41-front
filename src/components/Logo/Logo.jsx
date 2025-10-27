import React from 'react'
import LogoIcon from "../../assets/logo.svg?react"
import s from "./Logo.module.css"
import {useNavigate} from "react-router-dom";

const Logo = () => {
    const navigate = useNavigate();

    return (
        <div className={s.container}>
            <LogoIcon onClick={() => navigate("/")} className={s.svg} />
        </div>
    );
};

export default Logo;