import React, {FC, TextareaHTMLAttributes} from 'react';
// @ts-ignore
import styles from "./TextArea.module.css"

const TextArea: FC<TextareaHTMLAttributes<HTMLTextAreaElement>> = ({...props}) => {
    return (
        <textarea {...props} className={styles.textarea}>

        </textarea>
    );
};

export default TextArea;