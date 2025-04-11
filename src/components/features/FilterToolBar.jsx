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
            state: selectState
        };
        onSearchFilter(filters);
    }

    const handleClickClean = () => {
        const filters = {
            clean: "clean"
        };
        onSearchFilter(filters);
    }

    return (
        <div className='@container p-3'>
            <div className="flex flex-col p-4 border-1 border-gray-400">
                <label className='font-bold mb-4'>Name</label>
                <input type="text" name="inputTextTask" id="inputTextTask" value={textFilter} onChange={handleTextChange} className="shadow appearance-none border rounded w-3/4 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" placeholder='text' />
                <div className='flex flex-col sm:flex-row '>
                    <div className='basis-3/5'>
                        <div className='flex flex-col'>
                            <label className='font-bold mt-2 mb-2'>Priority</label>
                            <select name="selectPriorityTask" id="selectPriorityTask" value={selectPriority} onChange={handlePriorityChange} className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option >None</option>
                                <option value="LOW">LOW</option>
                                <option value="MEDIUM">MEDIUM</option>
                                <option value="HIGH">HIGH</option>
                            </select>
                        </div>

                        <div className='flex flex-col'>
                            <label className='font-bold mt-2 mb-2'>State</label>
                            <select name="selectStateTask" id="selectStateTask" value={selectState} onChange={handleStateChange} className="shadow appearance-none border rounded w-1/2 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline">
                                <option  >None</option>
                                <option value="true">Done</option>
                                <option value="false">Undone</option>
                            </select>
                        </div>
                    </div>
                    <div className='basis-2/5 p-2'>
                        <button className=' m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ' onClick={handleClick}>Search</button>
                        <button className=' m-2  bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline ' onClick={handleClickClean}>Clean</button>
                    </div>
                </div>
            </div>
        </div>
    );
}
export default FilterToolBar;