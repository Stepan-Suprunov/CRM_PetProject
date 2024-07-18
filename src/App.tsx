import React from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

function App() {

    const task1: Array<TaskType> = [
        {
            id: 1,
            title: 'CSS',
            isDone: true
        },
        {
            id: 2,
            title: 'JS',
            isDone: true
        },
        {
            id: 3,
            title: 'React',
            isDone: false
        }
    ];

    const task2: Array<TaskType> = [
        {
            id: 1,
            title: 'Terminator',
            isDone: true
        },
        {
            id: 2,
            title: 'XXX',
            isDone: false
        },
        {
            id: 3,
            title: 'Lost',
            isDone: true
        }
    ];

    const task3: Array<TaskType> = [
        {
            id: 1,
            title: 'Candy Shop',
            isDone: false
        },
        {
            id: 2,
            title: 'Halleluyah',
            isDone: true
        },
        {
            id: 3,
            title: 'Butterfly',
            isDone: true
        }
    ];

    return (
        <div className="App">
            <Todolist title={'What to learn'} tasks={task1}/>
            <Todolist title={'Movies'} tasks={task2}/>
            <Todolist title={'Songs'} tasks={task3}/>
        </div>
    );
}

export default App;
