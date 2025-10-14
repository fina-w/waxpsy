import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import { QueryClientProvider } from '@tanstack/react-query';
import { queryClient } from './api/queryClient';
import { ThemeProvider } from './components/theme/ThemeProvider';
import './index.css';
import App from './App';
import { useAuthStore } from './stores/authStore';

// Préchargement des polices
const link = document.createElement('link');
link.href = 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700&display=swap';
link.rel = 'stylesheet';
document.head.appendChild(link);

// Initialize auth store
const { initialize } = useAuthStore.getState();
initialize();

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <ThemeProvider defaultTheme="light" storageKey="waxpsy-theme">
        <App />
      </ThemeProvider>
    </QueryClientProvider>
  </StrictMode>
);
