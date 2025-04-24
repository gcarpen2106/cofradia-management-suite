import React, { useState } from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { HermanosList } from '@/components/hermanos/HermanosList';
import { HermanoCard } from '@/components/hermanos/HermanoCard';
import { Cortejo } from '@/components/hermanos/Cortejo';
import { Button } from '@/components/ui/button';
import { ArrowLeft } from 'lucide-react';

interface Hermano {
  id: number;
  nombre: string;
  apellidos: string;
  fechaAlta: string;
  email: string;
  telefono: string;
  estado: 'activo' | 'inactivo' | 'pendiente';
}

const Hermanos = () => {
  const [selectedHermano, setSelectedHermano] = useState<Hermano | null>(null);
  const [view, setView] = useState<'list' | 'detail' | 'edit' | 'cortejo'>('list');

  const handleView = (hermano: Hermano) => {
    setSelectedHermano(hermano);
    setView('detail');
  };

  const handleEdit = (hermano: Hermano) => {
    setSelectedHermano(hermano);
    setView('edit');
  };

  const handleDelete = (id: number) => {
    alert(`Eliminar hermano con id ${id}`);
    // Aquí iría la lógica para eliminar
  };

  const handleBackToList = () => {
    setView('list');
    setSelectedHermano(null);
  };

  const handleAddNew = () => {
    setView('edit');
    setSelectedHermano(null);
  };

  const renderContent = () => {
    switch (view) {
      case 'detail':
        return (
          <div className="space-y-6">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                className="mr-2" 
                onClick={handleBackToList}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Volver
              </Button>
              <h2 className="text-2xl font-serif">Detalle del Hermano</h2>
            </div>
            <HermanoCard 
              onEdit={() => setView('edit')}
              onAddCuota={() => alert('Añadir cuota')}
              onGenerarPapeleta={() => alert('Generar papeleta')}
            />
          </div>
        );
      case 'edit':
        return (
          <div className="space-y-6">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                className="mr-2" 
                onClick={handleBackToList}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Volver
              </Button>
              <h2 className="text-2xl font-serif">
                {selectedHermano ? 'Editar Hermano' : 'Nuevo Hermano'}
              </h2>
            </div>
            <div className="hermandad-card">
              <p className="text-muted-foreground">
                {selectedHermano 
                  ? `Formulario para editar al hermano ${selectedHermano.nombre} ${selectedHermano.apellidos}`
                  : 'Formulario para crear un nuevo hermano'}
              </p>
              {/* Aquí iría el formulario */}
            </div>
          </div>
        );
      case 'cortejo':
        return (
          <div className="space-y-6">
            <div className="flex items-center">
              <Button 
                variant="ghost" 
                className="mr-2" 
                onClick={() => setView('list')}
              >
                <ArrowLeft className="h-4 w-4 mr-2" /> Volver
              </Button>
              <h2 className="text-2xl font-serif">Organización del Cortejo</h2>
            </div>
            <Cortejo />
          </div>
        );
      case 'list':
      default:
        return (
          <div className="space-y-6">
            <div className="flex items-center justify-between">
              <h2 className="text-2xl font-serif">Listado de Hermanos</h2>
              <Button 
                variant="outline" 
                onClick={() => setView('cortejo')}
                className="bg-hermandad-azul text-white hover:bg-hermandad-azul/90"
              >
                Ver Cortejo
              </Button>
            </div>
            <HermanosList
              onView={handleView}
              onEdit={handleEdit}
              onDelete={handleDelete}
              onAdd={handleAddNew}
            />
          </div>
        );
    }
  };

  return (
    <MainLayout title="Hermanos">
      {renderContent()}
    </MainLayout>
  );
};

export default Hermanos;
