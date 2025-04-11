import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { patchData } from '../../services/apiService';
import { deleteData } from '../../services/apiService';

function TaskList({ dataApi, onTaskUpdated ,onTaskPatch}) {
    const [data, setData] = useState(dataApi);
    const [error, setError] = useState(null);

    useEffect(() => {
        setData(dataApi);
    }, [dataApi]);

    

    const deleteTask = async (taskId) => {

        try {
            const response = await deleteData(taskId);
            if (response) {  // The patchData function already throws an error if the response is not ok.
                console.log(`Task ${taskId} deleted`);
                setData(prevData => prevData.filter(task => task.id !== taskId));//search more about this function
            }
        } catch (error) {
            setError(error);
            console.error("Error patching task:", error);
        }
    };

    return (
        <div className='m-4'>
            <table className="w-full border-collapse border border-gray-400">
                <thead>
                    <tr>
                        <th className="border border-gray-400">Status</th>
                        <th className="border border-gray-400">Name</th>
                        <th className="border border-gray-400">Priority</th>
                        <th className="border border-gray-400">Due Date</th>
                        <th className="border border-gray-400">Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {data &&
                        data.map(task => (
                            <TaskItem key={task.id} task={task} onTaskUpdated={onTaskUpdated} onTaskDelete={deleteTask} onTaskPatch={onTaskPatch} />
                        ))
                    }
                </tbody>
            </table>
        </div>
    );
}

export default TaskList;