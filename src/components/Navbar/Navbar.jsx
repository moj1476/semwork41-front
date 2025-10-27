import React, {useContext, useState} from 'react'
import Logo from "../Logo/Logo.jsx";
import s from './Navbar.module.css'
import Button from "../ui/Button/Button.jsx";
import AuthModal from "../../components/AuthModal/AuthModal.jsx";
import {AuthContext} from "../../providers/AuthProvider.jsx";
import {Routes, useNavigate} from "react-router-dom";
import {RoutesPath} from "../../const/const.js";

const Navbar = () => {
    const [isAuthModalOpen, setAuthModalOpen] = useState(false);
    const authContext = useContext(AuthContext);

    const navigate = useNavigate();

    const openAuthModal = () => {
        setAuthModalOpen(true);
    }

    const closeAuthModal = () => {
        setAuthModalOpen(false);
    }

    return (
        <div className={s.navbar}>
            <Logo />
            <div className={s.links}>
                <Button onClick={() => navigate(RoutesPath.builder)} variant={"none"} className={s.link}>
                    Сборка
                </Button>
                <Button onClick={() => navigate(RoutesPath.reviews)} variant={"none"} className={s.link}>
                    Отзывы
                </Button>
                <div className={s.btns}>
                    {
                        authContext.isAuthenticated ? (
                            <Button onClick={() => navigate(RoutesPath.account)} variant={"button"} className={s.btn}>
                                Профиль
                            </Button>
                        ) : (
                            <Button onClick={openAuthModal} variant={"button"} className={s.btn}>
                                Вход / Регистрация
                            </Button>
                        )
                    }
                </div>
            </div>
            <AuthModal isOpen={isAuthModalOpen} onClose={closeAuthModal} />
        </div>
    );
};

export default Navbar;