import { useEffect, useState } from 'react'
import TaskList from './components/features/TaskList';
import FilterToolBar from './components/features/FilterToolBar';
import { fetchData } from './services/apiService';

function App() {
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);

  const getData = async (filters) => {
    try {

      if (filters.text) {
        const response = await fetchData("todos" + "?action=FilterText&text=" + filters.text);
        setData(response);
      } else if (filters.priority) {
        const response = await fetchData("todos" + filters.priority);
        setData(response);
      } else if(filters.state){
        const response = await fetchData("todos" +  "?action=FilterStatus&status=" + filters.state);
        setData(response);
      }else{ 
        setError(null);
      }
    } catch (err) {
      setError(err);
      setData(null);
      console.error("Error al cargar datos:", err);
    }
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
        <TaskList dataApi={data} />
      </div>
    )
  }
  return null;
}

export default App
