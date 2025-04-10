import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { patchData } from '../../services/apiService';

function TaskList({ dataApi, onTaskCreated }) {
  const [data, setData] = useState(dataApi);
  const [error, setError] = useState(null);

  useEffect(() => {
      setData(dataApi);
  }, [dataApi]);

  const patchTask = async (taskId, isChecked) => {
      const action = isChecked ? 'done' : 'undone'; // Defines the action based on the status of the checkbox
      try {
          const response = await patchData(taskId, action);
          if (response) {  // The patchData function already throws an error if the response is not ok.
              console.log(`Tarea ${taskId} marcada como ${action}`);
              setData(prevData =>
                  prevData.map(task =>
                      task.id === taskId ? { ...task, state: isChecked } : task
                  )
              );//search more about this function
          }
      } catch (error) {
          setError(error);
          console.error("Error al actualizar la tarea:", error);
      }
  };

  return (
      <div className='m-4'>
          <table className="w-full border-collapse border border-gray-400">
              <thead>
                  <tr>
                      
                      <th className="border border-gray-300">Status</th>
                      <th className="border border-gray-300">Name</th>
                      <th className="border border-gray-300">Priority</th>
                      <th className="border border-gray-300">Due Date</th>
                      <th className="border border-gray-300">Actions</th>
                  </tr>
              </thead>
              <tbody>
                  {data && <TaskItem taskData={data} onCheckboxChange={patchTask} onTaskCreated={onTaskCreated} />}
              </tbody>
          </table>
      </div>
  );
}

export default TaskList;