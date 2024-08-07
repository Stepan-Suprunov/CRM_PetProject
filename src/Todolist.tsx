import React, {useState} from "react";
import {FilterValuesType} from "./App";
import {AddItemForm} from "./AddItemForm";
import {EditableSpan} from "./EditableSpan";

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
    onChangeTaskTitle: (id: string, newTitle: string, todolistId: string) => void;
    changeTodolistTitle: (id: string, newTitle: string) => void;
    removeTodolist: (todolistId: string) => void;
};

export function Todolist(props: PropsType) {

    const removeTodolist = () => {
        props.removeTodolist(props.id);
    };
    const changeTodolistTitle = (newTitle: string) => {
        props.changeTodolistTitle(props.id, newTitle);
    };
    const addTask = (newTaskTitle: string) => {
        props.addTask(newTaskTitle, props.id);
    };

    return (
        <div>
            <h3>
                <EditableSpan title={props.title} onChange={changeTodolistTitle}/>
                <button onClick={removeTodolist}>x</button>
            </h3>
            <AddItemForm addItem={addTask}/>
            <ul>
                {props.tasks.map(task => {
                    const onClickHandler = () => {
                        props.removeTask(task.id, props.id);
                    };
                    const onChangeStatusHandler = (e: React.ChangeEvent<HTMLInputElement>) => {
                        props.changeTaskStatus(task.id, e.currentTarget.checked, props.id);
                    };
                    const onChangeTitleHandler = (newValue: string) => {
                        props.onChangeTaskTitle(task.id, newValue, props.id);
                    };

                    return (
                        <li key={task.id} className={task.isDone ? 'is-done' : ''}>
                            <input type="checkbox"
                                   onChange={onChangeStatusHandler}
                                   checked={task.isDone}/>
                            <EditableSpan title={task.title} onChange={onChangeTitleHandler}/>
                            <button onClick={onClickHandler}>X</button>
                        </li>
                    );
                })}
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

;
