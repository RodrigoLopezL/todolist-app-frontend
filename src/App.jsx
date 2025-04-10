import { useEffect, useState } from 'react'
import TaskList from './components/features/TaskList';
import FilterToolBar from './components/features/FilterToolBar';
import { fetchData } from './services/apiService';
import Modal from './components/UI/Modal';
import FormTodo from './components/features/FormTodo';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const getData = async (filters) => {
    try {

      if (filters.text) {
        const response = await fetchData("todos" + "?action=FilterText&text=" + filters.text);
        setData(response);
      } else if (filters.priority) {
        const response = await fetchData("todos" + filters.priority);
        setData(response);
      } else if (filters.state) {
        const response = await fetchData("todos" + "?action=FilterStatus&status=" + filters.state);
        setData(response);
      } else {
        setError(null);
      }
    } catch (err) {
      setError(err);
      setData(null);
      console.error("Error al cargar datos:", err);
    }
  };

  const handleTaskCreated = (newTask) => {
    // Assuming your API returns the newly created task in the response
    // You can directly update the 'data' state by adding the new task
    setData(prevData => [...(prevData || []), newTask]);
    closeModal(); // Close the modal after successful creation
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    loadData();

  };

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
      <div className='w-full h-fit'>
        <h2>Todo App</h2>
        <FilterToolBar onSearchFilter={getData} />
        <div>
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline" onClick={openModal}>
            + New To do
          </button>
          <Modal isOpen={isModalOpen} onClose={closeModal}>
            <FormTodo onTaskCreated={handleTaskCreated}  />
          </Modal>
        </div>
        <TaskList dataApi={data} onTaskCreated={handleTaskCreated} />
      </div>
    )
  }
  return null;
}

export default App
