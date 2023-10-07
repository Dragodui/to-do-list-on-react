import React, {Dispatch, SetStateAction} from 'react';
import {ITodo} from "../types/data";
// @ts-ignore
import editIcon from "../assets/edit_icon.png";
// @ts-ignore
import deleteIcon from "../assets/delete_icon.svg";
import ModalDelete from "./ModalDelete";


interface ITodoItem extends ITodo {
    toggleTodo : (id : number) => void;
    deleteTodo : (id:number) => void;
    isDeleteModalOpened: boolean;
    setIsDeleteModalOpened: Dispatch<SetStateAction<boolean>>
}

const ToDoItem :React.FC<ITodoItem> = (props) => {

    const {
        id,
        title,
        note,
        complete,
        toggleTodo,
        deleteTodo,
        isDeleteModalOpened,
        setIsDeleteModalOpened
    } = props;
    
    return (
        <div className="item">
           <div className="item__text">
               <div className="item__header">
                   <p className={`item__title ${complete ? "completed" : ""}`}>{title}</p>
                   <div className="item__buttons">
                       {/*<button ><img src={editIcon} alt=""/></button>*/}
                       <button onClick={() => setIsDeleteModalOpened(true)}><img src={deleteIcon} alt=""/></button>
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
            <ModalDelete id={id} deleteTodo={deleteTodo} isModalOpened={isDeleteModalOpened} setIsModalOpened={setIsDeleteModalOpened}/>
        </div>
    );
};

export default ToDoItem;