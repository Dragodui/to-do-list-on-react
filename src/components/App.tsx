import React, {useEffect, useLayoutEffect} from 'react';
import {useState} from "react";
import {IChosenItem, IDeletedItem, ITodo} from "../types/data";
import ToDoList from "./ToDoList";
import "../styles/style.css"
import Button from "./UI/Button/Button";
import Modal from "./UI/Modal/Modal";
import ModalDelete from "./ModalDelete";
import Search from "./Search";


const App: React.FC = () => {

    const [uncompletedTodos, setUncompletedTodos] = useState<ITodo[]>([]);
    const [filteredUncompletedTodos, setFilteredUncompletedTodos] = useState<ITodo[]>([]);
    const [filteredCompletedTodos, setFilteredCompletedTodos] = useState<ITodo[]>([]);
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [completedTodos, setCompletedTodos] = useState<ITodo[]>([]);
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);
    const [deletedItem, setDeletedItem] = useState<IDeletedItem>({id: 1, complete: false});
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [priority, setPriority] = useState<number>(0);
    const [sortingMethod, setSortingMethod] = useState<string>("default");
    const [chosen, setChosen] = useState<IChosenItem[]>([
        { id: 0, chosen: false },
        { id: 1, chosen: false },
        { id: 2, chosen: false }
    ]);

    useEffect(() => {
        const savedUncompletedTodos = JSON.parse(localStorage.getItem('uncompletedTodos') || "[]");
        const savedCompletedTodos = JSON.parse(localStorage.getItem('completedTodos') || "[]");

        setUncompletedTodos(savedUncompletedTodos);
        setCompletedTodos(savedCompletedTodos);
    }, []);

    useEffect(() => {
        localStorage.setItem('uncompletedTodos', JSON.stringify(uncompletedTodos));
    }, [uncompletedTodos]);

    useEffect(() => {
        localStorage.setItem('completedTodos', JSON.stringify(completedTodos));
    }, [completedTodos]);

    useEffect(() => {
        if (uncompletedTodos.length && filteredUncompletedTodos.length) {
            const sortedTodos = [...filteredUncompletedTodos].sort((a, b) => {
                switch (sortingMethod) {
                    case "name":
                        return a.title.localeCompare(b.title);
                    case "description":
                        return a.note.localeCompare(b.note);
                    case "priority":
                        return a.priority - b.priority;
                    case "default":
                        return 0;
                    default:
                        return 0;
                }
            });
            setFilteredUncompletedTodos(sortedTodos);
        }
    }, [sortingMethod]);
    
    

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
        setSortingMethod("default");
    };

    const setSearch = (serachValue: string) => {
        setSearchTerm(serachValue);
    };

    const openModal = (): void => {
        setIsModalOpened(true);
    };

    const closeModal = (): void => {
        setIsModalOpened(false);
    };

    const handleChangePriority = (index: number) => {
        const newChosen = chosen.map(
            (
                item, i) => (
                { ...item, chosen: i === index }
            )
        );
        setChosen(newChosen);
        setPriority(index + 1);
    };

    useEffect(() => {
        setFilteredUncompletedTodos(
            uncompletedTodos.filter(todo =>
                todo.title.toLowerCase().includes(searchTerm.toLowerCase()) || todo.note.toLowerCase().includes(searchTerm.toLowerCase())));

        setFilteredCompletedTodos(
            completedTodos.filter(todo =>
                todo.title.toLowerCase().includes(searchTerm.toLowerCase()) || todo.note.toLowerCase().includes(searchTerm.toLowerCase())));

    }, [uncompletedTodos, completedTodos, searchTerm]);

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
                        chosen={chosen}
                        setChosen={setChosen}
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
                        <select className="todo__sort" onChange={e => setSortingMethod(e.target.value)}>
                            <option value="default">Sort by</option>
                            <option value="name">name</option>
                            <option value="description">description</option>
                            <option value="priority">priority</option>
                        </select>
                        <Search setSearch={setSearch}/>
                    </div>
                    {
                        (filteredCompletedTodos.length || filteredUncompletedTodos.length)
                            ? <div className="todo__lists">
                                {
                                    filteredUncompletedTodos.length
                                        ? <div className="todo__list">
                                            <h2 className="todo__listTitle">Uncompleted: </h2>
                                            <ToDoList
                                                deleteTodo = {deleteTodo}
                                                items={filteredUncompletedTodos}
                                                toggleTodo = {toggleTodo}
                                                setDeletedItem={setDeletedItem}
                                                setIsDeleteModalOpened = {setIsDeleteModalOpened}
                                                completedTodos = {completedTodos}
                                                uncompletedTodos = {uncompletedTodos}
                                                setChosen={setChosen}
                                                setPriority={setPriority}
                                                chosen={chosen}
                                                handleChangePriority={handleChangePriority}
                                            />
                                        </div>
                                        : ""
                                }
                                {
                                    filteredCompletedTodos.length
                                        ? <div className="todo__list">
                                            <h2 className="todo__listTitle">Completed:</h2>
                                            <ToDoList
                                                deleteTodo = {deleteTodo}
                                                items={filteredCompletedTodos}
                                                toggleTodo={toggleTodo}
                                                setDeletedItem={setDeletedItem}
                                                setIsDeleteModalOpened = {setIsDeleteModalOpened}
                                                completedTodos = {completedTodos}
                                                uncompletedTodos = {uncompletedTodos}
                                                setChosen={setChosen}
                                                setPriority={setPriority}
                                                chosen={chosen}
                                                handleChangePriority={handleChangePriority}
                                            />
                                        </div>
                                        : ""
                                }
                            </div>
                            : <div className="todo__empty">there are no todos yet</div>
                    }
                </div>
            </div>
        </div>
    );
};

export default App;