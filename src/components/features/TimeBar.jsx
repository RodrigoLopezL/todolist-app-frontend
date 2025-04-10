import { useEffect, useState } from 'react'

function TimeBar() {

    return (
        <div className='flex flex-row'>
            <div className='basis-1/2 items-center-safe'>
                <h2 className="text-xl font-bold mb-4 text-center">Average time to finish tasks:</h2>
                <h2 className="text-xl font-bold mb-4 text-center">time</h2>
            </div>
            <div className='basis-1/2'>
                <h2 className="text-xl font-bold mb-4 text-center">Average time to finish tasks:</h2>
                <h2 className="text-xl font-bold mb-4">Low:</h2>
                <h2 className="text-xl font-bold mb-4">Medium:</h2>
                <h2 className="text-xl font-bold mb-4">High:</h2>
            </div>
        </div>
    );

};

export default TimeBar;