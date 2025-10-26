import React from 'react'
import Logo from "../Logo/Logo.jsx";
import s from './Navbar.module.css'
import Button from "../ui/Button/Button.jsx";

const Navbar = () => {
    return (
        <div className={s.navbar}>
            <Logo />
            <div className={s.links}>
                <Button variant={"none"} className={s.link}>
                    Сборка
                </Button>
                <Button variant={"none"} className={s.link}>
                    Отзывы
                </Button>
                <Button variant={"none"} className={s.link}>
                    Контакты
                </Button>
                <div className={s.btns}>
                    <Button variant={"button"} className={s.btn}>
                        Вход / Регистрация
                    </Button>
                </div>
            </div>

        </div>
    );
};

export default Navbar;