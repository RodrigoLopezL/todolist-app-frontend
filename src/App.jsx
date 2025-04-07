import { useEffect, useState } from 'react'
import TaskList from './components/features/TaskList';
import FilterToolBar from './components/features/FilterToolBar';
function App() {
  return (
    <div className='bg-indigo-300'>
      <h2>Todo App</h2>
      <FilterToolBar/>
      <TaskList/>
    </div>
  )
}

export default App
