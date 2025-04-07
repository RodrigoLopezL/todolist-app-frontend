import React, { useState } from 'react';

function CheckBox({id}) {
  const [isChecked, setIsChecked] = useState(false);

  const handleChange = (event) => {
    setIsChecked(event.target.checked);
    // Puedes agregar aquí cualquier otra lógica que necesites ejecutar al cambiar el checkbox
    if (props.onChange) {
      props.onChange(event.target.checked);
    }
  };

  return (
    <div className="flex items-center">
      <input
        id={id}
        type="checkbox"
        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
        checked={isChecked}
        onChange={handleChange}
      />
    </div>
  );
}

export default CheckBox;