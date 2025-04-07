import React, { useState, useEffect } from 'react';
import TaskItem from './TaskItem';
import { fetchData } from '../../services/apiService';

function TaskList() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      setError(null);
      try {
        const reponse = await fetchData('todos'); // Llama a la función para obtener usuarios
        setData(reponse);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };
    loadData();
  }, []);

  if (loading) {
    return <p>loading taks...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }
  if (data) {
    return (
      <div>
        <table class="table-auto">
          <thead>
            <tr>
              <th>id</th>
              <th>Status</th>
              <th>Name</th>
              <th>Priority</th>
              <th>Due Date</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            <TaskItem taskData={data}/>
          </tbody>
        </table>
      </div>
    )
  }

  return null;
}

export default TaskList