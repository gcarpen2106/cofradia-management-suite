
import React from 'react';
import { Sidebar } from './Sidebar';

interface MainLayoutProps {
  children: React.ReactNode;
  title: string;
}

export function MainLayout({ children, title }: MainLayoutProps) {
  return (
    <div className="flex min-h-screen bg-gray-50">
      <Sidebar />
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white shadow-sm z-10">
          <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex justify-between items-center">
            <h1 className="text-2xl font-serif text-hermandad-azul">
              {title}
            </h1>
            <div className="flex items-center space-x-4">
              <div className="relative">
                <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                  <svg className="h-5 w-5 text-gray-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                    <path fillRule="evenodd" d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z" clipRule="evenodd" />
                  </svg>
                </span>
                <input
                  type="text"
                  name="search"
                  id="search"
                  className="block w-full pl-10 pr-3 py-2 border border-gray-300 rounded-md leading-5 bg-white placeholder-gray-500 focus:outline-none focus:placeholder-gray-400 focus:ring-1 focus:ring-hermandad-dorado focus:border-hermandad-dorado sm:text-sm"
                  placeholder="Buscar..."
                />
              </div>
              <button type="button" className="flex items-center text-sm font-medium text-gray-700 hover:text-hermandad-dorado">
                <img
                  className="h-8 w-8 rounded-full"
                  src="https://randomuser.me/api/portraits/men/42.jpg"
                  alt="User profile"
                />
                <span className="ml-2 hidden lg:block">Administrador</span>
              </button>
            </div>
          </div>
        </header>
        
        <main className="flex-1 overflow-auto">
          <div className="max-w-7xl mx-auto hermandad-container">
            {children}
          </div>
        </main>
      </div>
    </div>
  );
}
