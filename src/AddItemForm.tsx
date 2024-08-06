import React, {ChangeEvent, useState} from "react";

type AddItemFormPropsType = {
    addItem: (newTaskTitle: string) => void;
};

export function AddItemForm(props: AddItemFormPropsType) {

    const [newTaskTitle, setNewTaskTitle] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setNewTaskTitle(e.currentTarget.value);
    };
    const onKeyPressHandler = (e: React.KeyboardEvent<HTMLInputElement>) => {  // Почему подчёркивает (e: KeyboardEvent<HTMLInputElement>)
        setError(null);
        if (e.key === 'Enter') {
            addTask();
        };
    };
    const addTask = () => {
        if (newTaskTitle.trim() !== '') {
            props.addItem(newTaskTitle.trim());
            setNewTaskTitle('');
        } else {
            setError('Field is required')
        };
    };

    return (
        <div>
            <input
                className={error ? 'error' : ''}
                placeholder="Add New Item"
                value={newTaskTitle}
                onChange={onChangeHandler}
                onKeyPress={onKeyPressHandler}
            />
            <button onClick={addTask}>+</button>
            {error && <div className='error-message'>{error}</div>}
        </div>
    );
};