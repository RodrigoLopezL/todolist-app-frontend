import React, { useState } from 'react';
import Modal from '../UI/Modal';
import FormTodo from './FormTodo';
function TaskItem({ taskData, onCheckboxChange ,onTaskCreated}) {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [taskToEdit, setTaskToEdit] = useState(null);

    const openModal = (taskToEdit) => {
        // When opening the modal for editing, set the task data to be passed
        setTaskToEdit(taskToEdit);
        setIsModalOpen(true);
    };
   

    const closeModal = () => {
        setIsModalOpen(false);
        setTaskToEdit(null); // Clear the task data when closing the modal
    };
    const handleChange = (event) => {
        const taskId = parseInt(event.target.id); // Obtén el ID de la tarea
        const isChecked = event.target.checked; // Obtén el nuevo estado del checkbox
        onCheckboxChange(taskId, isChecked); // Llama a la función del padre
    };
    return (
        <>
            {taskData.map(task => (
                <tr key={task.id}>
                    <th className="border border-gray-300"><input
                        id={task.id}
                        type="checkbox"
                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        checked={task.state}
                        onChange={handleChange}
                    /></th>
                    <th className="border border-gray-300">{task.text}</th>
                    <th className="border border-gray-300">{task.priority}</th>
                    <th className="border border-gray-300">{task.dueDate.split('T')[0]}</th>
                    <th className="border border-gray-300">
                        <button className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 m-2 rounded focus:outline-none focus:shadow-outline" type="button">
                            X
                        </button>
                        <button onClick={() => openModal(task)} className="bg-gray-500 hover:bg-gray-700 text-white font-bold py-1 px-3 m-2 rounded focus:outline-none focus:shadow-outline" type="button">
                            E
                        </button>
                        <Modal isOpen={isModalOpen} onClose={closeModal}>
                            {/* Pass the 'taskToEdit' state as the 'task' prop to FormTodo */}
                            <FormTodo taskData={taskToEdit} onTaskCreated={onTaskCreated} onClose={closeModal}/>
                        </Modal>
                    </th>
                </tr>
            ))}
        </>
    )
}


export default TaskItem;

