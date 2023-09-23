import React, { ButtonHTMLAttributes, FC } from 'react';
// @ts-ignore
import styles from "./Button.module.css"

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    children: string;
}

const Button: FC<ButtonProps> = ({children, ...props}) => {
    return (
        <button {...props} className = {styles.button}>
            {children}
        </button>
    );
};

export default Button;