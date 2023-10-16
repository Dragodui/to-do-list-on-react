import React, {Dispatch, SetStateAction} from 'react';
import {IChosenItem, IDeletedItem, ITodo} from "../types/data";
import ToDoItem from "./ToDoItem";


interface ITodoList {
    items : ITodo[];
    toggleTodo : (id:number) => void;
    deleteTodo : (id:number, completed: boolean) => void;
    setDeletedItem : (item: IDeletedItem) => void;
    setIsDeleteModalOpened: Dispatch<SetStateAction<boolean>>;
    completedTodos: ITodo[];
    uncompletedTodos: ITodo[];
    chosen: IChosenItem[];
    setChosen: (items: IChosenItem[]) => void;
    setPriority: (num: number) => void;
    handleChangePriority: (index:number) => void;
}

const ToDoList:React.FC<ITodoList> = (props) => {

    const {
        items,
        toggleTodo,
        deleteTodo,
        setDeletedItem,
        setIsDeleteModalOpened,
        completedTodos,
        uncompletedTodos,
        setPriority,
        chosen,
        setChosen,
        handleChangePriority,
    } = props;

    return (
        <div className="list">
            {
                items.map(item =>
                    <ToDoItem
                        key={item.id}
                        toggleTodo = {toggleTodo}
                        deleteTodo = {deleteTodo}
                        setDeletedItem={setDeletedItem}
                        setIsModalOpened = {setIsDeleteModalOpened}
                        completedTodos = {completedTodos}
                        uncompletedTodos = {uncompletedTodos}
                        setPriority={setPriority}
                        chosen={chosen}
                        setChosen={setChosen}
                        handleChangePriority={handleChangePriority}
                        {...item}
                    />
                )
            }
        </div>
    );
};

export default ToDoList;