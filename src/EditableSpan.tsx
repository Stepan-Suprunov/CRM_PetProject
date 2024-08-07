import React, {ChangeEvent} from "react";

type EditableSpanPropsType = {
    title: string
    onChange: (newValue: string) => void
};

export function EditableSpan(props: EditableSpanPropsType) {

    const [editMode, setEditMode] = React.useState(false);
    const [title, setTitle] = React.useState('');

    const activateEditMode = () => {
        setEditMode(true);
        setTitle(props.title);
    };
    const activateViewMode = () => {
        setEditMode(false);
        props.onChange(title);
    };
    const onChangeTitleHandler = (e: ChangeEvent<HTMLInputElement>) => {
        setTitle(e.currentTarget.value)
    };

    return editMode
        ? <input value={title}
                 autoFocus
                 onChange={onChangeTitleHandler}
                 onBlur={activateViewMode}
        />
        : <span onDoubleClick={activateEditMode}>{props.title}</span>
};