'use client'

import { createContext, useState } from 'react';

// Crear el contexto
export const MyContext = createContext();

// Proveedor del contexto
export const MyProvider = ({ children }) => {
  // Estado para manejar el toggle
  const [toggle, setToggle] = useState(false);

  // Función para alternar el estado
  const toggleState = () => {
    setToggle((prev) => !prev);
  };

  return (
    <MyContext.Provider value={{ toggle, setToggle: toggleState }}>
      {children}
    </MyContext.Provider>
  );
};
