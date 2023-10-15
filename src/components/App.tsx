import React, {useEffect} from 'react';
import {useState} from "react";
import {IDeletedItem, ITodo} from "../types/data";
import ToDoList from "./ToDoList";
import "../styles/style.css"
import Button from "./UI/Button/Button";
import Modal from "./UI/Modal/Modal";
import ModalDelete from "./ModalDelete";


const App: React.FC = () => {

    const [uncompletedTodos, setUncompletedTodos] = useState<ITodo[]>([]);
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [completedTodos, setCompletedTodos] = useState<ITodo[]>([]);
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);
    const [deletedItem, setDeletedItem] = useState<IDeletedItem>({id: 1, complete: false});

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
        const todoToToggle = uncompletedTodos.find(todo => todo.id === id) || completedTodos.find(todo => todo.id === id);

        if (todoToToggle) {
            if (!todoToToggle.complete) {
                todoToToggle.complete = true;
                setUncompletedTodos(prevTodos => prevTodos.filter(todo => todo.id !== id));
                setCompletedTodos(prevCompletedTodos => [...prevCompletedTodos, todoToToggle]);
            }
            else if (todoToToggle.complete) {
                todoToToggle.complete = false;
                setCompletedTodos(prevCompletedTodos => prevCompletedTodos.filter(todo => todo.id !== id));
                setUncompletedTodos(prevTodos => [...prevTodos, todoToToggle]);
            }
        }
    };

    const deleteTodo =(id: number, complete: boolean): void => {
        if (complete) {
            setCompletedTodos(prevCompletedTodos => prevCompletedTodos.filter(todo => todo.id !== id));
        }
        else {
            setUncompletedTodos(prevUncompletedTodos => prevUncompletedTodos.filter(todo => todo.id !== id));
        }
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
                        uncompletedTodos={uncompletedTodos}
                        setUncompletedTodos={setUncompletedTodos}
                    />
                    <ModalDelete
                        id={deletedItem?.id}
                        complete={deletedItem?.complete}
                        deleteTodo={deleteTodo}
                        isModalOpened={isDeleteModalOpened}
                        setIsModalOpened={setIsDeleteModalOpened}
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
                                    setDeletedItem={setDeletedItem}
                                    setIsDeleteModalOpened = {setIsDeleteModalOpened}
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
                                    setDeletedItem={setDeletedItem}
                                    setIsDeleteModalOpened = {setIsDeleteModalOpened}
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