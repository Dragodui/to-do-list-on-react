import React, {Dispatch, SetStateAction, useState} from 'react';
import {IDeletedItem, ITodo} from "../types/data";
// @ts-ignore
import deleteIcon from "../assets/delete.svg";
// @ts-ignore
import editIcon from "../assets/edit.svg";
// @ts-ignore
import saveIcon from "../assets/save.svg";
import Input from "./UI/Input/Input";


interface ITodoItem extends ITodo {
    toggleTodo : (id : number) => void;
    deleteTodo : (id:number, completed: boolean) => void;
    setDeletedItem : (item: IDeletedItem) => void;
    setIsModalOpened: Dispatch<SetStateAction<boolean>>;
    completedTodos: ITodo[];
    uncompletedTodos: ITodo[];
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
        completedTodos,
        uncompletedTodos,
    } = props;

    const [isEditable, setIsEditable] = useState(false);

    const [editTitle, setEditTitle] = useState<string>(title);
    const [editNote, setEditNote] = useState<string>(note);

    const [error, setError] = useState<string>('');

    const setDeleteItem = () => {
        setDeletedItem({id: id, complete: complete});
        setIsModalOpened(prevState => !prevState);
    };

    const editItem = () => {
        setError('');
        setIsEditable(true);
    };

    const saveEdit = () => {
        if (editTitle && editNote) {
            if (complete) {
                const item = completedTodos.filter(todo => todo.id === id)[0];
                item.title = editTitle;
                item.note = editNote;
                localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
            }
            else {
                const item = uncompletedTodos.filter(todo => todo.id === id)[0];
                item.title = editTitle;
                item.note = editNote;
                localStorage.setItem("uncompletedTodos", JSON.stringify(uncompletedTodos));
            }
            setIsEditable(false);
        }
        else {
            setError('fill all the blanks')
        }
    };

    return (
        <div className="item">
           <div className="item__text">
               <div className="item__header">
                   {
                       isEditable
                                ? <Input placeholder="Title" type="text" value={editTitle} onChange =
                               {
                                    e => {
                                        setEditTitle(e.target.value);
                                        setError('');
                                    }}/>
                                : <p className={`item__title ${complete ? "completed" : ""}`}>{editTitle}</p>
                   }
                   {
                       isEditable
                            ? <button onClick={saveEdit}><img src={saveIcon} alt=""/></button>
                            : <div className="item__buttons">
                               <button onClick={editItem}><img src={editIcon} alt=""/></button>
                               <button onClick={setDeleteItem}><img src={deleteIcon} alt=""/></button>
                              </div>
                   }
               </div>
               {
                   isEditable
                        ? <Input placeholder = "Note" style={{width: "100%"}} type="text" value={editNote} onChange =
                           {
                            e => {
                                setEditNote(e.target.value);
                                setError('');
                            }}/>
                        : <div className="item__info">
                           <p className={`item__note ${complete ? "completed" : ""}`}>{editNote}</p>
                           <label className="checkbox-container">
                               <input type="checkbox" checked={complete} onChange={() => toggleTodo(id)}/>
                               <span className="checkmark"></span>
                           </label>
                          </div>
               }
           </div>
            <p className="error">{error}</p>
        </div>
    );
};

export default ToDoItem;