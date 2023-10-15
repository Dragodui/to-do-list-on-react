import React, {Dispatch, SetStateAction} from 'react';
import {IDeletedItem, ITodo} from "../types/data";
// @ts-ignore
import deleteIcon from "../assets/delete.svg";


interface ITodoItem extends ITodo {
    toggleTodo : (id : number) => void;
    deleteTodo : (id:number, completed: boolean) => void;
    setDeletedItem : (item: IDeletedItem) => void;
    setIsModalOpened: Dispatch<SetStateAction<boolean>>;
}

const ToDoItem :React.FC<ITodoItem> = (props) => {

    const {
        id,
        title,
        note,
        complete,
        toggleTodo,
        setDeletedItem,
        setIsModalOpened,
    } = props;

    const setItem = () => {
        setDeletedItem({id: id, complete: complete});
        setIsModalOpened(prevState => !prevState);
    };

    return (
        <div className="item">
           <div className="item__text">
               <div className="item__header">
                   <p className={`item__title ${complete ? "completed" : ""}`}>{title}</p>
                   <div className="item__buttons">
                       {/*<button ><img src={editIcon} alt=""/></button>*/}
                       <button onClick={setItem}><img src={deleteIcon} alt=""/></button>
                   </div>
               </div>
               <div className="item__info">
                   <p className={`item__note ${complete ? "completed" : ""}`}>{note}</p>
                   <label className="checkbox-container">
                       <input type="checkbox" checked={complete} onChange={() => toggleTodo(id)}/>
                       <span className="checkmark"></span>
                   </label>
               </div>
           </div>
        </div>
    );
};

export default ToDoItem;