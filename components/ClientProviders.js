'use client';

import { ThemeProvider } from '@/contexts/ThemeContext';

export default function ClientProviders({ children }) {
  return (
    <ThemeProvider>
      {children}
    </ThemeProvider>
  );
}
