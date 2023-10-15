import React, {Dispatch, SetStateAction} from 'react';
import {IDeletedItem, ITodo} from "../types/data";
import ToDoItem from "./ToDoItem";
import {Simulate} from "react-dom/test-utils";
import toggle = Simulate.toggle;
interface ITodoList {
    items : ITodo[];
    toggleTodo : (id:number) => void;
    deleteTodo : (id:number, completed: boolean) => void;
    setDeletedItem : (item: IDeletedItem) => void;
    setIsDeleteModalOpened: Dispatch<SetStateAction<boolean>>;
}

const ToDoList:React.FC<ITodoList> = (props) => {

    const {
        items,
        toggleTodo,
        deleteTodo,
        setDeletedItem,
        setIsDeleteModalOpened,
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
                        {...item}
                    />
                )
            }
        </div>
    );
};

export default ToDoList;