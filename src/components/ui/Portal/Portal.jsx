import React from 'react'
import {createPortal} from "react-dom";

const Portal = ({children}) => {
    return (
        createPortal(
            children,
            document.getElementById("root")
        )
    );
};

export default Portal;