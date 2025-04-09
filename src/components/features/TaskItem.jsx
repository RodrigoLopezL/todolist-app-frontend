import React, { useState } from 'react';
import CheckBox from '../UI/CheckBox';


function TaskItem({ taskData }) {
      
    return (
        <>
            {taskData.map(task => (
                <tr key={task.id}>
                    <th>{task.id}</th>
                    <th><CheckBox id={task.id} stateCB={task.state}  /></th>
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

