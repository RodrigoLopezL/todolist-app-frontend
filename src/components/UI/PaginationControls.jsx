import React from 'react';

function PaginationControls({ currentPage, totalPages, onPageChange }) {
    const pageNumbers = [];
    for (let i = 0; i < totalPages; i++) {
        pageNumbers.push(i);
    }
    return (
        <div className="flex items-center justify-center">
            <button onClick={() => onPageChange(Math.max(currentPage - 1, 0))} disabled={currentPage === 0} className=' m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline '>
                Anterior
            </button>
            {pageNumbers.map(number => (
                <label key={number} className='font-bold mt-2 mb-2 '>{number}</label>
            ))}
            <button onClick={() => onPageChange(Math.min(currentPage + 1, totalPages))} disabled={currentPage === totalPages || totalPages === 0 || currentPage === totalPages-1} className=' m-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline '>
                Siguiente
            </button>
        </div>
    );
}

export default PaginationControls;