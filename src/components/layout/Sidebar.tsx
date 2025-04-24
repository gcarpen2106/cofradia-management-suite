
import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  Users, 
  FileText, 
  Calendar, 
  DollarSign, 
  BarChart, 
  Settings,
  Menu,
  X
} from 'lucide-react';

export function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  
  const navigation = [
    { name: 'Dashboard', href: '/', icon: BarChart },
    { name: 'Hermanos', href: '/hermanos', icon: Users },
    { name: 'Cuotas', href: '/cuotas', icon: FileText },
    { name: 'Donaciones', href: '/donaciones', icon: DollarSign },
    { name: 'Eventos', href: '/eventos', icon: Calendar },
    { name: 'Estadísticas', href: '/estadisticas', icon: BarChart },
    { name: 'Configuración', href: '/configuracion', icon: Settings },
  ];

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      {/* Mobile menu button */}
      <div className="lg:hidden fixed top-0 left-0 z-50 m-4">
        <button
          onClick={toggleSidebar}
          className="p-2 rounded-md text-gray-700 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-hermandad-dorado"
        >
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-gray-600 bg-opacity-75 z-40 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
      
      {/* Sidebar */}
      <aside 
        className={`${
          isOpen ? 'translate-x-0' : '-translate-x-full'
        } fixed top-0 left-0 z-40 h-screen w-64 transition-transform lg:translate-x-0 lg:static bg-sidebar border-r border-sidebar-border`}
      >
        <div className="flex h-16 flex-shrink-0 items-center justify-center bg-sidebar-accent px-4">
          <h2 className="text-xl font-bold text-white">
            <span className="text-hermandad-dorado">Gestión</span> Hermandad
          </h2>
        </div>
        
        <div className="mt-5 flex flex-grow flex-col">
          <nav className="flex-1 space-y-1 px-2 pb-4">
            {navigation.map((item) => {
              const isActive = location.pathname === item.href;
              return (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`${
                    isActive
                      ? 'bg-sidebar-accent text-white'
                      : 'text-white hover:bg-sidebar-accent/50 hover:text-white'
                  } group flex items-center px-4 py-3 text-sm font-medium rounded-md transition-all duration-200`}
                >
                  <item.icon 
                    className={`${
                      isActive ? 'text-hermandad-dorado' : 'text-white'
                    } mr-3 h-5 w-5 flex-shrink-0 transition-colors`} 
                  />
                  {item.name}
                </Link>
              );
            })}
          </nav>
        </div>
        <div className="p-4 border-t border-sidebar-border">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img
                className="h-10 w-10 rounded-full"
                src="https://randomuser.me/api/portraits/men/42.jpg"
                alt=""
              />
            </div>
            <div className="ml-3">
              <p className="text-sm font-medium text-white">Administrador</p>
              <button
                type="button"
                className="text-xs font-medium text-hermandad-dorado hover:text-hermandad-dorado/80"
              >
                Cerrar Sesión
              </button>
            </div>
          </div>
        </div>
      </aside>
    </>
  );
}
