import React from 'react';
import ReactDOM from 'react-dom';

const Modal = (props) => {
    return ReactDOM.createPortal(
        props.children,
        document.getElementById('modal')
    );
};

export default Modal;