import React, {ChangeEvent, ChangeEventHandler, FC, KeyboardEventHandler, useEffect, useState} from 'react';
// @ts-ignore
import styles from "./Modal.module.css";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import {ITodo} from "../../../types/data";

interface ModalProps {
    isModalOpened: boolean;
    closeModal: () => void;
    uncompletedTodos: ITodo[];
    setUncompletedTodos: (todos: ITodo[]) => void;
}

const Modal: FC<ModalProps> =
    ({
         isModalOpened,
         closeModal,
         uncompletedTodos,
         setUncompletedTodos
    }) => {

    const [title, setTitle] = useState<string>('');
    const [note, setNote] = useState<string>('');
    const [isError, setIsError] = useState<boolean>(false);
    useEffect(() => {
        const disableScroll = () => {
            document.body.classList.add('modal-open');
        };
        const enableScroll = () => {
            document.body.classList.remove('modal-open');
        };

        if (isModalOpened) {
            disableScroll();
        } else {
            enableScroll();
        }
        return () => {
            enableScroll();
        };
    }, [isModalOpened]);



        const handleTitle: React.ChangeEventHandler<HTMLInputElement> = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.target.value);
    };

    const handleNote: ChangeEventHandler<HTMLTextAreaElement> = (e: ChangeEvent<HTMLTextAreaElement>) => {
        setNote(e.target.value);
    };

    const handleKeyDownInText: KeyboardEventHandler<HTMLInputElement | HTMLTextAreaElement>  = (e) => {
        if (e.key === 'Enter') addTodo();
    };

    const handleKeyDownInDiv: KeyboardEventHandler<HTMLDivElement>  = (e) => {
            if (e.key === 'Escape') closeModal();
    };

    const addTodo = () => {
        if (title && note) {
            const id = Date.now();

            setUncompletedTodos([...uncompletedTodos, {
                id:id,
                title: title,
                note: note,
                complete:false
            }]);

            setTitle('');
            setNote('');
            setIsError(false);

            closeModal();
        }
        else {
            setIsError(true);
        }
    };
    return (
        <div onKeyDown = {handleKeyDownInDiv} onClick = {closeModal} className={`${isModalOpened ? styles.opened : styles.closed} ${styles.wrapper}`}>
            <div className = {styles.modal} onClick={e => e.stopPropagation()}>
                <div className={styles.header}>
                    <div className={styles.title}>Add Todo</div>
                    <button className = {styles.closeButton} onClick={closeModal}>✖</button>
                </div>
                <Input value={title} onChange={handleTitle} onKeyDown={handleKeyDownInText} placeholder = "title"/>
                <TextArea value={note} onChange={handleNote} onKeyDown={handleKeyDownInText} placeholder = "note"/>
                <p className={`${isError ? styles.error: styles.noError}`}>fill all the blanks</p>
                <Button onClick={addTodo}>Add Todo</Button>
            </div>
        </div>
    );
};

export default Modal;