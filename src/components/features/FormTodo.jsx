import React, { use, useState, useEffect } from 'react';
import { getFormattedTimestamp } from '../utils/dateUtils';
import { postData } from '../../services/apiService';
import { updateData } from '../../services/apiService';
function FormTodo({ onTaskUpdated,onTaskCreated, taskData, onClose }) {

    const [text, setText] = useState('');
    const [dueDate, setDueDate] = useState('');
    const [priority, setPriority] = useState('');
    const [error, setError] = useState(null);

    // useEffect to populate the form with existing task data when the 'task' prop changes
    useEffect(() => {
        if (taskData) {
            setText(taskData.text || '');
            setDueDate(taskData.dueDate ? taskData.dueDate.split('T')[0] : ''); // Extract date part
            setPriority(taskData.priority || '');
        } else {
            // Reset form if no task prop is provided (for creating new tasks)
            setText('');
            setDueDate('');
            setPriority('');
        }
    }, [taskData]);


    const handleTextChange = (event) => {
        setText(event.target.value);
    };

    const handleDueDateChange = (event) => {
        setDueDate(event.target.value);
    };

    const handleSelectPriorityChange = (event) => {
        setPriority(event.target.value);
    };

    const handleSubmit = async () => {

        const task = {
            id: taskData ? taskData.id : 0,
            text: text,
            dueDate: `${dueDate}T00:00:00`,
            priority: priority,
            state: taskData ? taskData.state:false,
            creationDate: taskData ? taskData.creationDate : getFormattedTimestamp(),
            doneDate: taskData ? taskData.doneDate : null,
            timeFrame: taskData ? taskData.timeFrame :null,           
            
        };
        
        try {
            let response;
            if (taskData) {
                // If a task with an ID exists, it's an update
                response = await updateData("todos", taskData.id, task);
                if (response) {
                    // Assuming your API returns the updated task
                    onTaskUpdated(task)
                }
            } else {
                // If no task ID, it's a new task
                response = await postData("todos", task);
                if (response) {
                    onTaskCreated(response);
                }
            }
            onClose();
        } catch (error) {
            setError(error);
            console.error("Error creating/updating task:", error);
        }
    }


    return (
        <div className='flex flex-col items-stretch'>
            <h2 className="text-xl font-bold mb-4">Create new Todo</h2>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Name:
                </label>
                <input onChange={handleTextChange} value={text} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="texto" type="text" placeholder="Ingrese texto" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Due Date:
                </label>
                <input onChange={handleDueDateChange} value={dueDate} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="fechaFin" type="date" />
            </div>
            <div className="mb-4">
                <label className="block text-gray-700 text-sm font-bold mb-2">
                    Priority:
                </label>
                <select onChange={handleSelectPriorityChange} value={priority} className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" id="htmlSelectPriority">
                    <option value="">Select a priority</option>
                    <option value="LOW">LOW</option>
                    <option value="MEDIUM">MEDIUM</option>
                    <option value="HIGH">HIGH</option>
                </select>
            </div>

            <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" type="button" onClick={handleSubmit}>
                {taskData ? 'Update' : '+ New to do'}
            </button>
        </div>
    );
}

export default FormTodo;
