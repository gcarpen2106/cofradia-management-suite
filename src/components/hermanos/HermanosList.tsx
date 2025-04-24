
import React, { useState } from 'react';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Eye, FileEdit, Trash, Search, Filter, PlusCircle } from 'lucide-react';

interface Hermano {
  id: number;
  nombre: string;
  apellidos: string;
  fechaAlta: string;
  email: string;
  telefono: string;
  estado: 'activo' | 'inactivo' | 'pendiente';
}

const mockHermanos: Hermano[] = [
  { id: 1, nombre: 'Juan', apellidos: 'García López', fechaAlta: '15/03/2010', email: 'juan.garcia@email.com', telefono: '612345678', estado: 'activo' },
  { id: 2, nombre: 'María', apellidos: 'Rodríguez Pérez', fechaAlta: '21/05/2012', email: 'maria.rodriguez@email.com', telefono: '623456789', estado: 'activo' },
  { id: 3, nombre: 'Antonio', apellidos: 'Fernández Díaz', fechaAlta: '08/09/2015', email: 'antonio.fernandez@email.com', telefono: '634567890', estado: 'inactivo' },
  { id: 4, nombre: 'Carmen', apellidos: 'López Martín', fechaAlta: '17/11/2018', email: 'carmen.lopez@email.com', telefono: '645678901', estado: 'activo' },
  { id: 5, nombre: 'Francisco', apellidos: 'Martínez Sánchez', fechaAlta: '03/02/2020', email: 'francisco.martinez@email.com', telefono: '656789012', estado: 'pendiente' },
];

interface HermanosListProps {
  onView?: (hermano: Hermano) => void;
  onEdit?: (hermano: Hermano) => void;
  onDelete?: (id: number) => void;
  onAdd?: () => void;
}

export function HermanosList({ onView, onEdit, onDelete, onAdd }: HermanosListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredHermanos, setFilteredHermanos] = useState<Hermano[]>(mockHermanos);

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    if (term.trim() === '') {
      setFilteredHermanos(mockHermanos);
      return;
    }

    const filtered = mockHermanos.filter(hermano => 
      hermano.nombre.toLowerCase().includes(term) || 
      hermano.apellidos.toLowerCase().includes(term) ||
      hermano.email.toLowerCase().includes(term)
    );
    setFilteredHermanos(filtered);
  };

  const getEstadoBadge = (estado: Hermano['estado']) => {
    switch (estado) {
      case 'activo':
        return <Badge className="bg-green-500">Activo</Badge>;
      case 'inactivo':
        return <Badge className="bg-gray-500">Inactivo</Badge>;
      case 'pendiente':
        return <Badge className="bg-amber-500">Pendiente</Badge>;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar hermanos..."
            className="pl-8 w-full sm:w-80"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <Button variant="outline" className="flex items-center gap-2">
            <Filter size={16} />
            Filtros
          </Button>
          <Button 
            onClick={onAdd}
            className="bg-hermandad-azul hover:bg-hermandad-azul/90 text-white flex items-center gap-2"
          >
            <PlusCircle size={16} />
            Nuevo Hermano
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nombre</TableHead>
              <TableHead className="hidden md:table-cell">Fecha de Alta</TableHead>
              <TableHead className="hidden md:table-cell">Email</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredHermanos.length > 0 ? (
              filteredHermanos.map((hermano) => (
                <TableRow key={hermano.id}>
                  <TableCell className="font-medium">
                    {hermano.nombre} {hermano.apellidos}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">{hermano.fechaAlta}</TableCell>
                  <TableCell className="hidden md:table-cell">{hermano.email}</TableCell>
                  <TableCell>{getEstadoBadge(hermano.estado)}</TableCell>
                  <TableCell className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onView && onView(hermano)}
                      title="Ver detalles"
                    >
                      <Eye size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onEdit && onEdit(hermano)}
                      title="Editar"
                    >
                      <FileEdit size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      onClick={() => onDelete && onDelete(hermano.id)}
                      className="text-red-500 hover:text-red-700"
                      title="Eliminar"
                    >
                      <Trash size={16} />
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-8 text-muted-foreground">
                  No se encontraron hermanos que coincidan con la búsqueda
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
