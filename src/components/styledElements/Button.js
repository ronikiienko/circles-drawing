import React from 'react';
import './Button.css';


export const Button = ({onClick, children, className}) => {
    return (
        <button className={`styled-button ${className ? className : ''}`} onClick={onClick}>{children}</button>
    );
};