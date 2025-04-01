import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import 'react-toastify/dist/ReactToastify.css';
import '@mantine/core/styles.css';
import '@mantine/charts/styles.css';
import App from './App.tsx';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from '@/context/tanstack-provider.tsx';
import { ToastContainer } from 'react-toastify';
import { MantineProvider } from '@mantine/core';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <MantineProvider>
        <App />
      </MantineProvider>
      <ToastContainer role="alert" draggablePercent={60} />
    </QueryClientProvider>
  </StrictMode>
);
