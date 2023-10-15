import React, {Dispatch, FC, KeyboardEventHandler, SetStateAction, useEffect} from 'react';
import Button from "./UI/Button/Button";

interface ModalDeleteProps {
    isModalOpened: boolean;
    setIsModalOpened: Dispatch<SetStateAction<boolean>>;
    deleteTodo : (id:number, completed: boolean) => void;
    id: number;
    complete: boolean;
}

const ModalDelete: FC<ModalDeleteProps> =
    ({
         isModalOpened,
         setIsModalOpened,
         deleteTodo,
         id,
         complete
    }) => {
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

    const handleKeyDownInDiv: KeyboardEventHandler<HTMLDivElement>  = (e) => {
        if (e.key === 'Escape') setIsModalOpened(false);
        if (e.key === 'Enter') handleDeleteTodo();
    };

    const handleDeleteTodo = (): void => {
        deleteTodo(id, complete);
        setIsModalOpened(false);
    }

    return (
        <div onKeyDown = {handleKeyDownInDiv} className={`delete ${isModalOpened ? 'delete__opened' : 'delete__closed'}`}>
            <div onKeyDown = {handleKeyDownInDiv} className="delete__item">
                <div className="delete__title">Are you sure you want to delete the note?</div>
                <div className="delete__buttons">
                    <button onClick={handleDeleteTodo} className="delete__button delete__yes">Yes</button>
                    <button onClick={() => setIsModalOpened(false)} className="delete__button">No</button>
                </div>
            </div>
        </div>
    );
};

export default ModalDelete;