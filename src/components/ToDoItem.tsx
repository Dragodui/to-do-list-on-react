import React from 'react';
import {ITodo} from "../types/data";


interface ITodoItem extends ITodo {
    toggleTodo : (id : number) => void;
}
const ToDoItem :React.FC<ITodoItem> = (props) => {

    const {id, title,note,  complete, toggleTodo} = props;
    
    return (
        <div className="item" onClick={() => toggleTodo(id)}>
           <div className="item__text">
               <div className="item__info">
                   <p className={`item__title ${complete ? "completed" : ""}`}>{title}</p>
                   <p className={`item__note ${complete ? "completed" : ""}`}>{note}</p>
               </div>
               <label className="checkbox-container">
                   <input type="checkbox" checked={complete} onChange={() => toggleTodo(id)}/>
                   <span className="checkmark"></span>
               </label>
           </div>
        
        </div>
    );
};

export default ToDoItem;