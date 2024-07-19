import React, {useState} from "react";
import {FilterValuesType} from "./App";

export type TaskType = {
    id: string
    title: string
    isDone: boolean
};

type PropsType = {
    title: string
    tasks: Array<TaskType>
    removeTask: (id: string) => void;
    changeFilter: (value: FilterValuesType) => void;
    addTask: (newTaskTitle: string) => void;
};

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    placeholder="Add New Task"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={(e) => {
                        if (e.key === 'Enter' && newTaskTitle.length > 0) {
                            props.addTask(newTaskTitle);
                            setNewTaskTitle('');
                        }
                    }}
                />
                <button onClick={() => {
                    if (newTaskTitle.length > 0) {
                        props.addTask(newTaskTitle);
                        setNewTaskTitle('');
                    }
                }}>
                    +
                </button>
            </div>
            <ul>
                {props.tasks.map(task =>
                    <li>
                        <input type="checkbox" checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => {
                            props.removeTask(task.id)
                        }}>X
                        </button>
                    </li>)}
            </ul>
            <div>
                <button onClick={() => {
                    props.changeFilter('all')
                }}>All
                </button>
                <button onClick={() => {
                    props.changeFilter('active')
                }}>Active
                </button>
                <button onClick={() => {
                    props.changeFilter('completed')
                }}>Completed
                </button>
            </div>
        </div>
    );
};