import React, {FC, InputHTMLAttributes} from 'react'
// @ts-ignore
import styles from "./Input.module.css";


const Input: FC<InputHTMLAttributes<HTMLInputElement>> = ({...props}) => {
    return (
        <input className = {styles.input} type="text" {...props}/>
    );
};

export default Input;