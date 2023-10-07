import React, {Dispatch, SetStateAction} from 'react';
import {ITodo} from "../types/data";
import ToDoItem from "./ToDoItem";
import {Simulate} from "react-dom/test-utils";
import toggle = Simulate.toggle;
interface ITodoList {
    items : ITodo[];
    toggleTodo : (id:number) => void;
    deleteTodo : (id:number) => void;
    isDeleteModalOpened: boolean;
    setIsDeleteModalOpened: Dispatch<SetStateAction<boolean>>
}

const ToDoList:React.FC<ITodoList> = (props) => {

    const {
        items,
        toggleTodo,
        deleteTodo,
        isDeleteModalOpened,
        setIsDeleteModalOpened
    } = props;

    return (
        <div className="list">
            {
                props.items.map(item =>
                    <ToDoItem
                        key={item.id}
                        toggleTodo = {toggleTodo}
                        deleteTodo = {deleteTodo}
                        isDeleteModalOpened = {isDeleteModalOpened}
                        setIsDeleteModalOpened={setIsDeleteModalOpened}
                        {...item}
                    />
                )
            }
        </div>
    );
};

export default ToDoList;