import React, { useState, useRef } from 'react';
function FilterToolBar({ onSearchFilter }) {

    const [textFilter, setTextFilter] = useState('');
    const [selectPriority, setSelectPriority] = useState('');
    const [selectState, setSelectState] = useState('');

    const handleTextChange = (event) => {
        setTextFilter(event.target.value);
        setSelectPriority('');
        setSelectState('');
    };

    const handlePriorityChange = (event) => {
        setSelectPriority(event.target.value);
        setTextFilter('');
        
        setSelectState('');
    };

    const handleStateChange = (event) => {
        setSelectState(event.target.value);
        setTextFilter('');
        setSelectPriority('');
       
    };


    const handleClick = () => {

        const filters = {
            text: textFilter,
            priority: selectPriority,
            state: selectState,
        };
        onSearchFilter(filters);

    }

    return (
        <div className='@container'>
            <div className="flex flex-col">
                <label htmlFor="labelTextTask">Name</label>
                <input type="text" name="inputTextTask" id="inputTextTask" value={textFilter} onChange={handleTextChange}/>
                <div className='flex flex-col sm:flex-row '>
                    <div className='basis-2/3'>
                        <div className='flex flex-col'>
                            <label htmlFor="labelPriorityTask">Priority</label>
                            <select name="selectPriorityTask" id="selectPriorityTask" value={selectPriority} onChange={handlePriorityChange}>
                                <option >None</option>
                                <option value="?priority=LOW&action=FilterPriority">LOW</option>
                                <option value="?priority=MEDIUM&action=FilterPriority">MEDIUM</option>
                                <option value="?priority=HIGH&action=FilterPriority">HIGH</option>
                            </select>
                        </div>

                        <div className='flex flex-col'>
                            <label htmlFor="labelStateTask">State</label>
                            <select name="selectStateTask" id="selectStateTask" value={selectState} onChange={handleStateChange}>
                                <option  >None</option>
                                <option value="true">Done</option>
                                <option value="false">Undone</option>
                            </select>
                        </div>
                    </div>
                    <button className=' basis-1/3 m-6  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ' onClick={handleClick}>Search</button>
                    
                </div>
            </div>
        </div>
    );
}
export default FilterToolBar;