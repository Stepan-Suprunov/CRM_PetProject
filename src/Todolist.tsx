import React, {useState} from "react";
import {FilterValuesType} from "./App";
import {Simulate} from "react-dom/test-utils";
import error = Simulate.error;

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
    filter: FilterValuesType
    addTask: (newTaskTitle: string) => void;
    changeTaskStatus: (taskId: string, isDone: boolean) => void;
};

export function Todolist(props: PropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);


    return (
        <div>
            <h3>{props.title}</h3>
            <div>
                <input
                    className={error ? 'error' : ''}
                    placeholder="Add New Task"
                    value={newTaskTitle}
                    onChange={(e) => setNewTaskTitle(e.target.value)}
                    onKeyPress={(e) => {
                        setError(null);
                        if (e.key === 'Enter' && newTaskTitle.trim() !== '') {
                            props.addTask(newTaskTitle.trim());
                            setNewTaskTitle('');
                        }
                    }}
                />
                <button onClick={() => {
                    if (newTaskTitle.trim() !== '') {
                        props.addTask(newTaskTitle.trim());
                        setNewTaskTitle('');
                    } else {
                        setError('Field is required')
                    }
                }}>
                    +
                </button>
                {error && <div className='error-message'>{error}</div>}
            </div>
            <ul>
                {props.tasks.map(task =>
                    <li key={task.id} className={task.isDone ?'is-done' : ''}>
                        <input type="checkbox"
                               onChange={(e) => props.changeTaskStatus(task.id, e.target.checked)}
                               checked={task.isDone}/>
                        <span>{task.title}</span>
                        <button onClick={() => {
                            props.removeTask(task.id)
                        }}>X
                        </button>
                    </li>)}
            </ul>
            <div>
                <button className={props.filter === 'all' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('all')
                        }}>All
                </button>
                <button className={props.filter === 'active' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('active')
                        }}>Active
                </button>
                <button className={props.filter === 'completed' ? 'active-filter' : ''}
                        onClick={() => {
                            props.changeFilter('completed')
                        }}>Completed
                </button>
            </div>
        </div>
    );
};