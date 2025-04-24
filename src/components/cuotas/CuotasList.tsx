
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
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Search, Filter, PlusCircle, FileText, Check, X } from 'lucide-react';

interface Cuota {
  id: number;
  hermanoId: number;
  hermanoNombre: string;
  tipo: string;
  importe: number;
  fechaEmision: string;
  fechaPago?: string;
  estado: 'pagada' | 'pendiente' | 'vencida';
  metodoPago?: string;
}

const mockCuotas: Cuota[] = [
  { id: 1, hermanoId: 1, hermanoNombre: 'Juan García López', tipo: 'Anual 2024', importe: 50, fechaEmision: '15/01/2024', fechaPago: '20/01/2024', estado: 'pagada', metodoPago: 'Transferencia' },
  { id: 2, hermanoId: 2, hermanoNombre: 'María Rodríguez Pérez', tipo: 'Anual 2024', importe: 50, fechaEmision: '15/01/2024', fechaPago: '18/01/2024', estado: 'pagada', metodoPago: 'Efectivo' },
  { id: 3, hermanoId: 3, hermanoNombre: 'Antonio Fernández Díaz', tipo: 'Anual 2024', importe: 50, fechaEmision: '15/01/2024', estado: 'pendiente' },
  { id: 4, hermanoId: 4, hermanoNombre: 'Carmen López Martín', tipo: 'Anual 2024', importe: 50, fechaEmision: '15/01/2024', estado: 'pendiente' },
  { id: 5, hermanoId: 5, hermanoNombre: 'Francisco Martínez Sánchez', tipo: 'Anual 2023', importe: 45, fechaEmision: '15/01/2023', estado: 'vencida' },
];

interface CuotasListProps {
  onAdd?: () => void;
  onMarkAsPaid?: (id: number) => void;
  onGenerateReceipt?: (id: number) => void;
}

export function CuotasList({ onAdd, onMarkAsPaid, onGenerateReceipt }: CuotasListProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredCuotas, setFilteredCuotas] = useState<Cuota[]>(mockCuotas);
  const [filterEstado, setFilterEstado] = useState<string>('');

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    const term = e.target.value.toLowerCase();
    setSearchTerm(term);
    
    applyFilters(term, filterEstado);
  };

  const handleFilterChange = (value: string) => {
    setFilterEstado(value);
    applyFilters(searchTerm, value);
  };

  const applyFilters = (term: string, estado: string) => {
    let filtered = [...mockCuotas];
    
    if (term.trim() !== '') {
      filtered = filtered.filter(cuota => 
        cuota.hermanoNombre.toLowerCase().includes(term) || 
        cuota.tipo.toLowerCase().includes(term)
      );
    }
    
    if (estado !== '') {
      filtered = filtered.filter(cuota => cuota.estado === estado);
    }
    
    setFilteredCuotas(filtered);
  };

  const getEstadoBadge = (estado: Cuota['estado']) => {
    switch (estado) {
      case 'pagada':
        return <Badge className="bg-green-500">Pagada</Badge>;
      case 'pendiente':
        return <Badge className="bg-amber-500">Pendiente</Badge>;
      case 'vencida':
        return <Badge className="bg-red-500">Vencida</Badge>;
      default:
        return null;
    }
  };

  const formatCurrency = (amount: number) => {
    return new Intl.NumberFormat('es-ES', {
      style: 'currency',
      currency: 'EUR'
    }).format(amount);
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-2 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-500" />
          <Input
            placeholder="Buscar cuotas..."
            className="pl-8 w-full sm:w-80"
            value={searchTerm}
            onChange={handleSearch}
          />
        </div>
        <div className="flex items-center gap-2 w-full sm:w-auto justify-between sm:justify-end">
          <div className="flex items-center gap-2">
            <Filter size={16} className="text-gray-500" />
            <Select value={filterEstado} onValueChange={handleFilterChange}>
              <SelectTrigger className="w-32 sm:w-40">
                <SelectValue placeholder="Estado" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="">Todos</SelectItem>
                <SelectItem value="pagada">Pagada</SelectItem>
                <SelectItem value="pendiente">Pendiente</SelectItem>
                <SelectItem value="vencida">Vencida</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <Button 
            onClick={onAdd}
            className="bg-hermandad-azul hover:bg-hermandad-azul/90 text-white flex items-center gap-2"
          >
            <PlusCircle size={16} />
            Nueva Cuota
          </Button>
        </div>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Hermano</TableHead>
              <TableHead>Tipo</TableHead>
              <TableHead className="text-right">Importe</TableHead>
              <TableHead className="hidden md:table-cell">Fecha Emisión</TableHead>
              <TableHead>Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredCuotas.length > 0 ? (
              filteredCuotas.map((cuota) => (
                <TableRow key={cuota.id}>
                  <TableCell className="font-medium">{cuota.hermanoNombre}</TableCell>
                  <TableCell>{cuota.tipo}</TableCell>
                  <TableCell className="text-right">{formatCurrency(cuota.importe)}</TableCell>
                  <TableCell className="hidden md:table-cell">{cuota.fechaEmision}</TableCell>
                  <TableCell>{getEstadoBadge(cuota.estado)}</TableCell>
                  <TableCell className="text-right">
                    <div className="flex justify-end gap-2">
                      {cuota.estado !== 'pagada' && (
                        <Button 
                          variant="ghost" 
                          size="icon"
                          onClick={() => onMarkAsPaid && onMarkAsPaid(cuota.id)}
                          className="text-green-500 hover:text-green-700"
                          title="Marcar como pagada"
                        >
                          <Check size={16} />
                        </Button>
                      )}
                      <Button 
                        variant="ghost" 
                        size="icon"
                        onClick={() => onGenerateReceipt && onGenerateReceipt(cuota.id)}
                        title="Generar recibo"
                      >
                        <FileText size={16} />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
                  No se encontraron cuotas que coincidan con los filtros
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
