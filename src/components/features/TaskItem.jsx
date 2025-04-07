import React, { useState } from 'react';
import CheckBox from '../UI/CheckBox';
function TaskItem(props) {
    const [isChecked, setIsChecked] = useState(false);

    const handleChange = (event) => {
        setIsChecked(event.target.checked);
        if (props.onChange) {
            props.onChange(event.target.checked);
        }
    };
    return (
        <>
            {props.taskData.map(task => (
                <tr>
                    <th>{task.id}</th>
                    <th><CheckBox id={task.id} onChange={handleChange} /></th>
                    <th>{task.text}</th>
                    <th>{task.priority}</th>
                    <th>{task.dueDate}</th>
                    <th>delete/edit</th>
                </tr>
            ))}
        </>
    )
}
export default TaskItem;

