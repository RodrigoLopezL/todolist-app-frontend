import { useEffect, useState } from 'react';
import TaskList from './components/features/TaskList';
import FilterToolBar from './components/features/FilterToolBar';
import { fetchData } from './services/apiService';
import { patchData } from './services/apiService';
import Modal from './components/UI/Modal';
import FormTodo from './components/features/FormTodo';
import TimeBar from './components/features/TimeBar';
import PaginationControls from './components/UI/PaginationControls'; // Importa el componente de paginación

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [taskPatch,setTaskPatch] = useState(-1);
  const [currentPage, setCurrentPage] = useState(0);
  const [pageSize] = useState(5); // define number of tasks per page
  const [totalPages, setTotalPages] = useState(0);

  const getData = async (filters, page = currentPage) => {
    setLoading(true);
    setError(null);
    try {
      let url = 'http://localhost:8080/todos?page=' + page + '&size=' + pageSize;

      if (filters?.text) {
        url += "&text=" + filters.text;
      } else if (filters?.priority) {
        url += "&priority="+filters.priority;
      } else if (filters?.state) {
        url += "&state=" + filters.state;
      } else if (filters?.clean) {
        
      }


      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      const tasks = await response.json();

      setData(tasks.content);
      setTotalPages(tasks.totalPages);

    } catch (err) {
      setError(err);
      setData(null);
      console.error("Error al cargar datos:", err);
    } finally {
      setLoading(false);
    }
  };

  const patchTask = async (taskId, isChecked) => {
    const action = isChecked ? 'done' : 'undone'; // Defines the action based on the status of the checkbox
    try {
      const response = await patchData(taskId, action);
      if (response) {  // The patchData function already throws an error if the response is not ok.
        console.log(`Task ${taskId} status changed ${action}`);
        setTaskPatch(response.id);
        // setData(prevData =>
        //   prevData.map(task =>
        //     task.id === taskId ? { ...task, state: isChecked } : task
        //   )
        // );//search more about this function
      }
    } catch (error) {
      setError(error);
      console.error("Error patching task:", error);
    }
  };

  const handleTaskCreated = (newTask) => {
    setData(prevData => [...(prevData || []), newTask]);
    closeModal();
    // Si quieres recargar la primera página después de crear, puedes hacer:
    setCurrentPage(0);
    // getData({}, 1);
  };

  const handleTaskUpdated = async (updatedTask) => {
    setData(prevData =>
      prevData.map(task => (task.id === updatedTask.id ? updatedTask : task))
    );
    closeModal();
    // No es necesario recargar la página completa al actualizar,
    // ya que el estado 'data' se actualiza directamente.
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  useEffect(() => {
    getData({});
    // setTaskPatch(false); // Carga la primera página al montar el componente
  }, [currentPage, pageSize, taskPatch]); // Dependencias para recargar al cambiar página o tamaño

  // const totalPages = Math.ceil(totalTasks / pageSize);

  if (loading) {
    return <p>loading taks...</p>;
  }

  if (error) {
    return <p>Error loading data: {error.message}</p>;
  }

  return (
    <div className='w-full h-fit'>
      <h2 className='text-xl font-bold mb-4 m-3'>Todo App</h2>
      <FilterToolBar onSearchFilter={(filters) => getData(filters, 0)} /> {/* Reinicia a la primera página al filtrar */}
      <div className='p-3'>
        <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={openModal}>
          + New To do
        </button>
        <Modal isOpen={isModalOpen} onClose={closeModal}>
          <FormTodo onTaskCreated={handleTaskCreated} onClose={closeModal} />
        </Modal>
      </div>
      <TaskList dataApi={data} onTaskUpdated={handleTaskUpdated} onTaskPatch={patchTask}/>
      {data && (
        <PaginationControls
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={handlePageChange}
        />
      )}
      <TimeBar />
    </div>
  );
}

export default App;