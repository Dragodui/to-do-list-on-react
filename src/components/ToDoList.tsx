import React from 'react';
import {ITodo} from "../types/data";
import ToDoItem from "./ToDoItem";
import {Simulate} from "react-dom/test-utils";
import toggle = Simulate.toggle;
interface ITodoList {
    items : ITodo[];
    toggleTodo : (id:number) => void;
}

const ToDoList:React.FC<ITodoList> = (props) => {

    const {items, toggleTodo} = props;

    return (
        <div className="list">
            {
                props.items.map(item =>
                    <ToDoItem
                        key={item.id}
                        toggleTodo = {toggleTodo}
                        {...item}
                    />
                )
            }
        </div>
    );
};

export default ToDoList;