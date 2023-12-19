import React, {Dispatch, SetStateAction, useState} from 'react';
import {IChosenItem, IDeletedItem, ITodo} from "../types/data";
// @ts-ignore
import deleteIcon from "../assets/delete.svg";
// @ts-ignore
import editIcon from "../assets/edit.svg";
// @ts-ignore
import saveIcon from "../assets/save.svg";
import Input from "./UI/Input/Input";
// @ts-ignore
import checkIcon from "../assets/checked.svg";
import PriorityChoosing from "./UI/PriorityChoosing/PriorityChoosing";

interface ITodoItem {
    item: ITodo,
    toggleTodo : (id : number) => void;
    deleteTodo : (id:number, completed: boolean) => void;
    setDeletedItem : (item: IDeletedItem) => void;
    setIsModalOpened: Dispatch<SetStateAction<boolean>>;
    completedTodos: ITodo[];
    uncompletedTodos: ITodo[];
    chosen: IChosenItem[];
    setPriority: (num: number) => void;
}

const ToDoItem :React.FC<ITodoItem> = (props) => {

    const {
        item,
        toggleTodo,
        setDeletedItem,
        setIsModalOpened,
        completedTodos,
        uncompletedTodos,
        setPriority,
        chosen,
    } = props;

    const [isEditable, setIsEditable] = useState(false);
    const [editTitle, setEditTitle] = useState<string>(item.title);
    const [editNote, setEditNote] = useState<string>(item.note);
    const [editChosen, setEditChosen] = useState<IChosenItem[]>([
        { id: 0, chosen: item.priority === 1 },
        { id: 1, chosen: item.priority === 2 },
        { id: 2, chosen: item.priority === 3 }
    ]);
    const [editPriority, setEditPriority] = useState<number>(1);

    const [error, setError] = useState<string>('');

    const setDeleteItem = () => {
        setDeletedItem({id: item.id, complete: item.complete});
        setIsModalOpened(prevState => !prevState);
    };

    const handleChangeEditPriority = (index: number) => {
        const newChosen = chosen.map(
            (
                item, i) => (
                { ...item, chosen: i === index }
            )
        );
        setEditChosen(newChosen);
        setEditPriority(index + 1);
    };

    const editItem = () => {
        setError('');
        setIsEditable(true);
    };

    const saveEdit = () => {
        if (editTitle && editNote) {
            if (item.complete) {
                const changeItem = completedTodos.filter(todo => todo.id === item.id)[0];
                changeItem.title = editTitle;
                changeItem.note = editNote;
                changeItem.priority = editPriority;
                localStorage.setItem("completedTodos", JSON.stringify(completedTodos));
            }
            else {
                const changeItem = uncompletedTodos.filter(todo => todo.id === item.id)[0];
                changeItem.title = editTitle;
                changeItem.note = editNote;
                changeItem.priority = editPriority;
                localStorage.setItem("uncompletedTodos", JSON.stringify(uncompletedTodos));
            }

            setPriority(editPriority);
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
                                ? <div>
                               <Input style={{marginBottom: 20}} placeholder="Title" type="text" value={editTitle} onChange =
                                   {
                                       e => {
                                           setEditTitle(e.target.value);
                                           setError('');
                                       }}/>
                                <PriorityChoosing
                                     setPriority={setEditPriority}
                                     chosen={editChosen}
                                     setChosen={setEditChosen}
                                     handleChangePriority={handleChangeEditPriority}
                                />
                                </div>
                                : <div className="item__priority">
                                    <div className={`priority${item.priority} priority`}>{item.priority}</div>
                                    <p className={`item__title ${item.complete ? "completed" : ""}`}>{editTitle}</p>
                                  </div>
                   }
                   {
                       isEditable
                            ? <button style={{border:"none", paddingTop:10}} onClick={saveEdit}><img src={saveIcon} alt=""/></button>
                            : <div className="item__buttons">
                               <button style={{border:"none"}} onClick={editItem}><img src={editIcon} alt=""/></button>
                               <button style={{border:"none"}} onClick={setDeleteItem}><img src={deleteIcon} alt=""/></button>
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
                           <p className={`item__note ${item.complete ? "completed" : ""}`}>{editNote}</p>
                           <div
                               onClick={() => toggleTodo(item.id)}
                               className="item__toggle"
                           >
                               {
                                   item.complete
                                       ? <img src={checkIcon} alt=""/>
                                       : <div className="item__circle"></div>
                               }
                           </div>
                          </div>
               }

           </div>
            <p className="error">{error}</p>
        </div>
    );
};

export default ToDoItem;