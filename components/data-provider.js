'use client';

import { createContext, useContext } from 'react';

const DataContext = createContext();

export function useDataContext(){
   return useContext(DataContext);
}

export default function DataProvider({ children, lighthouseData, loading }) {
  return (
    <DataContext.Provider value={{ lighthouseData, loading }}>
      {children}
    </DataContext.Provider>
  );
}