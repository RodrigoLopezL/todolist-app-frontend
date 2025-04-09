import React from 'react';
import TaskItem from './TaskItem';

function TaskList({ dataApi }) {

    return (
      <div>
        <table className="table w-full">
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
            <TaskItem taskData={dataApi}/>
          </tbody>
        </table>
      </div>
    );
  
}


export default TaskList;