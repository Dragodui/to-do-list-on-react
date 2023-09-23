import React, {useEffect, useRef} from 'react';
import {useState} from "react";
import {ITodo} from "../types/data";
import ToDoList from "./ToDoList";
import "../styles/style.css"
import Button from "./UI/Button/Button";
import Modal from "./UI/Modal/Modal";


const App: React.FC = () => {

    const [allTodos, setAllTodos] = useState<ITodo[]>([]);
    const [uncompletedTodos, setUncompletedTodos] = useState<ITodo[]>([]);
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [completedTodos, setCompletedTodos] = useState<ITodo[]>([]);




    const toggleTodo = (id: number): void => {
        const todoToToggle = allTodos.find(todo => todo.id === id);
        console.log(todoToToggle?.complete);
        if (todoToToggle) {
            if (todoToToggle.complete === false) {
                todoToToggle.complete = true;
                setUncompletedTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
                setCompletedTodos(prevCompletedTodos => [...prevCompletedTodos, todoToToggle]);
            }
            else if (todoToToggle.complete === true) {
                console.log("value is true")
                todoToToggle.complete = false;
                setCompletedTodos(prevCompletedTodos => prevCompletedTodos.filter(todo => todo.id !== id));
                setUncompletedTodos(prevTodos => [...prevTodos, todoToToggle]);
            }
        }
    };



    const openModal = (): void => {
        setIsModalOpened(true);
    };
    const closeModal = (): void => {
        setIsModalOpened(false);
    };


    return (
        <div className="App">
            <div className="title">
                To Do List
            </div>
            <div className="todo">
                <div className="todo__wrapper">
                    <Modal
                        isModalOpened={isModalOpened}
                        closeModal={closeModal}
                        allTodos={allTodos}
                        uncompletedTodos={uncompletedTodos}
                        setAllTodos={setAllTodos}
                        setUncompletedTodos={setUncompletedTodos}
                    />
                    <div className="todo__panel">
                        <Button onClick={openModal}>Add todo</Button>
                    </div>
                    {
                        uncompletedTodos.length
                            ? <div className="todo__list">
                                <h2 className="todo__listTitle">Uncompleted: </h2>
                                <ToDoList items={uncompletedTodos} toggleTodo = {toggleTodo}/>
                              </div>
                            : ""
                    }
                    {
                        completedTodos.length
                            ? <div className="todo__list">
                                <h2 className="todo__listTitle">Completed:</h2>
                                <ToDoList items={completedTodos} toggleTodo={toggleTodo}/>
                              </div>
                            : ""
                    }
                </div>
            </div>
        </div>
    );
};

export default App;