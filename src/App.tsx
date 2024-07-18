import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {

    const initTasks: Array<TaskType> = [
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

    const [tasks, setTasks] = useState(initTasks);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: number) {
        setTasks(tasks.filter(task => task.id !== id));
    };

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    };

    let tasksForTodolist = tasks;
    if (filter === 'completed') {
        tasksForTodolist = tasks.filter(task => task.isDone);
    };
    if (filter === 'active') {
        tasksForTodolist = tasks.filter(task => !task.isDone);
    };

    return (
        <div className="App">
            <Todolist title={'What to learn'}
                      tasks={tasksForTodolist}
                      removeTask={removeTask}
                      changeFilter={changeFilter}/>
        </div>
    );
}

export default App;
