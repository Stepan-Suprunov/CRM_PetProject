import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";

export type FilterValuesType = 'all' | 'completed' | 'active';

type TodoListType = {
    id: string
    title: string
    filter: FilterValuesType
};

function App() {

    const todolistId1 = v1();
    const todolistId2 = v1();

    const [todolists, setTodolists] = useState<Array<TodoListType>>([
        {id: todolistId1, title: "What to learn", filter: "all"},
        {id: todolistId2, title: "What to do", filter: "all"}
    ]);
    const [tasksObj, setTasksObj] = useState({
        [todolistId1]: [
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
        ],
        [todolistId2]: [
            {
                id: v1(),
                title: 'Social network',
                isDone: false
            },
            {
                id: v1(),
                title: 'Revisitor vision',
                isDone: false
            },
            {
                id: v1(),
                title: 'Tod-do list',
                isDone: true
            }
        ]
    });

    function removeTask(id: string, todolistId: string) {
        const tasks = tasksObj[todolistId];
        const filteredTasks = tasks.filter(task => task.id !== id);
        tasksObj[todolistId] = filteredTasks;
        setTasksObj({...tasksObj});
    };

    function addTask(newTaskTitle: string, todolistId: string) {
        const task: TaskType = {
            id: v1(),
            title: newTaskTitle,
            isDone: false
        };

        const tasks = tasksObj[todolistId];
        const newTasks = [task, ...tasks];
        tasksObj[todolistId] = newTasks;

        setTasksObj({...tasksObj});
    };

    function changeFilter(value: FilterValuesType, todolistId: string) {
        let todolist = todolists.find(tl => tl.id === todolistId);
        if (todolist) {
            todolist.filter = value;
            setTodolists([...todolists]);
        };
    };

    function changeStatus(taskId: string, isDone: boolean, todolistId: string) {
        let task = tasksObj[todolistId].find((t) => t.id === taskId);
        if (task) {
            task.isDone = isDone;
            setTasksObj({...tasksObj});
        }
    };

    function removeTodolist(todolistId: string) {
        const filteredTodolists = todolists.filter(tl => tl.id !== todolistId);
        setTodolists(filteredTodolists);
        delete tasksObj[todolistId];
        setTasksObj({...tasksObj});
    };

    return (
        <div className="App">
            {
                todolists.map((tl) => {

                    let tasksForTodolist = tasksObj[tl.id];
                    if (tl.filter === 'completed') {
                        tasksForTodolist = tasksForTodolist.filter(task => task.isDone);
                    };
                    if (tl.filter === 'active') {
                        tasksForTodolist = tasksForTodolist.filter(task => !task.isDone);
                    };

                    return <Todolist key={tl.id}
                                     id={tl.id}
                                     title={tl.title}
                                     tasks={tasksForTodolist}
                                     removeTask={removeTask}
                                     changeFilter={changeFilter}
                                     filter={tl.filter}
                                     addTask={addTask}
                                     changeTaskStatus={changeStatus}
                                     removeTodolist={removeTodolist}/>
                })
            }
        </div>
    );
}

export default App;
