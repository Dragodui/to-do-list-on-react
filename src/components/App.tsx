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
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);

    useEffect(() => {
        const savedUncompletedTodos = localStorage.getItem('uncompletedTodos');
        const savedCompletedTodos = localStorage.getItem('completedTodos');

        if (savedUncompletedTodos) setUncompletedTodos(JSON.parse(savedUncompletedTodos));
        if (savedCompletedTodos) setCompletedTodos(JSON.parse(savedCompletedTodos));
    }, []);

    useEffect(() => {
        localStorage.setItem('uncompletedTodos', JSON.stringify(uncompletedTodos));
    }, [uncompletedTodos]);

    useEffect(() => {
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    }, [completedTodos]);

    const toggleTodo = (id: number): void => {
        const todoToToggle = allTodos.find(todo => todo.id === id);
        if (todoToToggle) {
            if (!todoToToggle.complete) {
                todoToToggle.complete = true;
                setUncompletedTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
                setCompletedTodos(prevCompletedTodos => [...prevCompletedTodos, todoToToggle]);
                // localStorage.setItem('uncompletedTodos', JSON.stringify(uncompletedTodos));
                // localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
            }
            else if (todoToToggle.complete) {
                todoToToggle.complete = false;
                setCompletedTodos(prevCompletedTodos => prevCompletedTodos.filter(todo => todo.id !== id));
                setUncompletedTodos(prevTodos => [...prevTodos, todoToToggle]);
                // localStorage.setItem('uncompletedTodos', JSON.stringify(uncompletedTodos));
                // localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
            }
        }
    };

    const deleteTodo =(id: number): void => {
        setAllTodos(prevAllTodos => prevAllTodos.filter(todo => todo.id !== id));
        setUncompletedTodos(prevUncompletedTodos => prevUncompletedTodos.filter(todo => todo.id !== id));
        setCompletedTodos(prevCompletedTodos => prevCompletedTodos.filter(todo => todo.id !== id));
    }

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
                                <ToDoList
                                    deleteTodo = {deleteTodo}
                                    items={uncompletedTodos}
                                    toggleTodo = {toggleTodo}
                                    isDeleteModalOpened={isDeleteModalOpened}
                                    setIsDeleteModalOpened={setIsDeleteModalOpened}
                                />
                              </div>
                            : ""
                    }
                    {
                        completedTodos.length
                            ? <div className="todo__list">
                                <h2 className="todo__listTitle">Completed:</h2>
                                <ToDoList
                                    deleteTodo = {deleteTodo}
                                    items={completedTodos}
                                    toggleTodo={toggleTodo}
                                    isDeleteModalOpened={isDeleteModalOpened}
                                    setIsDeleteModalOpened={setIsDeleteModalOpened}
                                />
                              </div>
                            : ""
                    }
                </div>
            </div>
        </div>
    );
};

export default App;