import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active';

function App() {

    const initTasks: Array<TaskType> = [
        {
            id: v1(),
            title: 'CSS',
            isDone: true
        },
        {
            id: v1(),
            title: 'JS',
            isDone: true
        },
        {
            id: v1(),
            title: 'React',
            isDone: false
        }
    ];

    const [tasks, setTasks] = useState(initTasks);
    const [filter, setFilter] = useState<FilterValuesType>('all');

    function removeTask(id: string) {
        setTasks(tasks.filter(task => task.id !== id));
    };

    function addTask(newTaskTitle: string) {
        const newTask: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        };

        setTasks([newTask, ...tasks]);
    };

    function changeFilter(value: FilterValuesType) {
        setFilter(value);
    };

    function changeStatus(taskId: string, isDone: boolean) {
        let task = tasks.find((t) => t.id === taskId);
        if (task) task.isDone = isDone;
        setTasks([...tasks]);
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
                      changeFilter={changeFilter}
                      filter={filter}
                      addTask={addTask}
                      changeTaskStatus={changeStatus} />
        </div>
    );
}

export default App;
