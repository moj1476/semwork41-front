import React, {useState} from 'react'
import Modal from "../ui/Modal/Modal.jsx";
import LoginView from "./LoginView.jsx";
import RegisterView from "./RegisterView.jsx";

const AuthModal = ({ isOpen, onClose }) => {
    const [isLoginView, setIsLoginView] = useState(true);

    const switchToRegister = () => setIsLoginView(false);
    const switchToLogin = () => setIsLoginView(true);

    return (
        <Modal onClose={onClose} isOpen={isOpen}>
            {isLoginView ? (
                <LoginView onSwitch={switchToRegister} onClose={onClose} />
            ) : (
                <RegisterView onSwitch={switchToLogin} onClose={onClose} />
            )}
        </Modal>
    );
};

export default AuthModal;