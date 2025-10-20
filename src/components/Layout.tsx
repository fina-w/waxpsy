import type { ReactNode } from 'react';
import { Header } from './Header';

interface LayoutProps {
  children: ReactNode;
}

// Layout pour toutes les pages SAUF Homepage (qui a son propre header transparent)
export const Layout = ({ children }: LayoutProps) => {
  return (
    <>
      <Header />
      <main className="pt-20">
        {children}
      </main>
    </>
  );
};
