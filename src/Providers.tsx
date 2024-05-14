import React from 'react';
import './App.css';
import { HTML5Backend } from 'react-dnd-html5-backend'
import { DndProvider } from 'react-dnd'
import {QueryClient, QueryClientProvider} from "@tanstack/react-query";

const queryClient = new QueryClient()

function Providers({children}: any) {
  return (
    <QueryClientProvider client={queryClient}>
        <DndProvider backend={HTML5Backend}>
          {children}
        </DndProvider>
    </QueryClientProvider>
  );
}

export default Providers;