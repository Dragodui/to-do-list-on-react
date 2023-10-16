import React, {useEffect} from 'react';
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
    const [isModalOpened, setIsModalOpened] = useState<boolean>(false);
    const [completedTodos, setCompletedTodos] = useState<ITodo[]>([]);
    const [isDeleteModalOpened, setIsDeleteModalOpened] = useState<boolean>(false);
    const [deletedItem, setDeletedItem] = useState<IDeletedItem>({id: 1, complete: false});
    const [searchTerm, setSearchTerm] = useState<string>('');
    const [priority, setPriority] = useState<number>(0);
    const [chosen, setChosen] = useState<IChosenItem[]>([
        { id: 0, chosen: false },
        { id: 1, chosen: false },
        { id: 2, chosen: false }
    ]);

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

    const filteredUncompletedTodos: ITodo[] =
        uncompletedTodos.filter(todo =>
            todo.title.toLowerCase().includes(searchTerm) || todo.note.toLowerCase().includes(searchTerm));

    const filteredCompletedTodos: ITodo[] =
        completedTodos.filter(todo =>
            todo.title.toLowerCase().includes(searchTerm) || todo.note.toLowerCase().includes(searchTerm));

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
                        setPriority={setPriority}
                        priority={priority}
                        handleChangePriority={handleChangePriority}
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