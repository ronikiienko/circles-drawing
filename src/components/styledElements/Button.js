import React from 'react';
import './Button.css';


export const Button = ({onClick, children, className, id}) => {
    return (
        <button id={id} className={`styled-button ${className ? className : ''}`} onClick={onClick}>{children}</button>
    );
};