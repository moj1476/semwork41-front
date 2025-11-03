import React, {useContext} from 'react'
import styles from "./LogoutButton.module.css"
import LogoutIcon from "../../assets/logout.svg?react";
import {useNavigate} from "react-router-dom";
import {useQueryClient} from "@tanstack/react-query";
import {AuthContext} from "../../providers/AuthProvider.jsx";
import {removeToken} from "../../utils/tokens.js";
import {RoutesPath} from "../../const/const.js";


const LogoutButton = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
    const { setAuthState } = useContext(AuthContext);

    const handleLogout = () => {
        removeToken();
        setAuthState(false);
        navigate(RoutesPath.main);
        queryClient.invalidateQueries("auth")
    };

    return (
        <button className={styles.navButton} onClick={handleLogout}>
            <LogoutIcon />
            <span>Выход</span>
        </button>
    );
};

export default LogoutButton;