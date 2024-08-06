import React from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type PropsType = {
    id: string
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string, todolistId: string) => void;
    changeFilter: (value: FilterValuesType, todolistId: string) => void;
    filter: FilterValuesType
    addTask: (newTaskTitle: string, todolistId: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean, todolistId: string) => void;
    removeTodolist: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {

    const removeTodolist = () => props.removeTodolist(props.id);

    const addTask = (newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.id);
    };

    return (
        <div>
            <h3>{props.title}
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask} />
            <ul>
                {props.tasks.map(task =>
                    <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                        <input type="checkbox"
                               onChange={(e) => props.changeTaskStatus(task.id, e.target.checked, props.id)}
                               checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => {
                            props.removeTask(task.id, props.id)
                        }}>X
                        </button>
                    </li>)}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('all', props.id)
                        }}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('active', props.id)
                        }}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('completed', props.id)
                        }}>Completed
                </button>
            </div>
        </div>
    );
};
