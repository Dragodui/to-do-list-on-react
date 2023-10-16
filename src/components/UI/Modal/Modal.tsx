import React, {ChangeEvent, ChangeEventHandler, FC, KeyboardEventHandler, useEffect, useState} from 'react';
// @ts-ignore
import styles from "./Modal.module.css";
import Input from "../Input/Input";
import TextArea from "../TextArea/TextArea";
import Button from "../Button/Button";
import {IChosenItem, ITodo} from "../../../types/data";
import PriorityChoosing from "../PriorityChoosing/PriorityChoosing";

interface ModalProps {
    isModalOpened: boolean;
    closeModal: () => void;
    uncompletedTodos: ITodo[];
    setUncompletedTodos: (todos: ITodo[]) => void;
    chosen: IChosenItem[];
    setChosen: (items: IChosenItem[]) => void;
    setPriority: (num: number) => void;
    priority: number;
    handleChangePriority: (index:number) => void;
}

const Modal: FC<ModalProps> =
    ({
         isModalOpened,
         closeModal,
         uncompletedTodos,
         setUncompletedTodos,
         chosen,
         setChosen,
         setPriority,
         priority,
         handleChangePriority
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
                complete:false,
                priority: priority,
            }]);

            setTitle('');
            setNote('');
            setIsError(false);
            setChosen([
                { id: 0, chosen: false },
                { id: 1, chosen: false },
                { id: 2, chosen: false }
            ]);

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
                <h1 className="priority__title">Choose a priority:</h1>
                <PriorityChoosing setPriority={setPriority} chosen={chosen} setChosen={setChosen} handleChangePriority={handleChangePriority}/>
                <p className={`${isError ? styles.error: styles.noError}`}>fill all the blanks</p>
                <Button onClick={addTodo}>Add Todo</Button>
            </div>
        </div>
    );
};

export default Modal;