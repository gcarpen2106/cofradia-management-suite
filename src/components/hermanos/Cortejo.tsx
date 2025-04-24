
import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Flag, FlagTriangleLeft, FlagTriangleRight } from 'lucide-react';

interface Tramo {
  id: number;
  nombre: string;
  insignia: string;
  capacidad: number;
  ocupados: number;
}

const tramosIniciales: Tramo[] = [
  { id: 1, nombre: "Cruz de Guía", insignia: "Cruz de Guía", capacidad: 2, ocupados: 1 },
  { id: 2, nombre: "Primer Tramo", insignia: "Senatus", capacidad: 30, ocupados: 25 },
  { id: 3, nombre: "Segundo Tramo", insignia: "Bandera", capacidad: 30, ocupados: 28 },
  { id: 4, nombre: "Tercer Tramo", insignia: "Libro de Reglas", capacidad: 30, ocupados: 20 },
  { id: 5, nombre: "Presidencia", insignia: "Estandarte", capacidad: 5, ocupados: 3 },
];

export function Cortejo() {
  const [tramos, setTramos] = React.useState<Tramo[]>(tramosIniciales);

  const getOcupacionBadge = (tramo: Tramo) => {
    const porcentaje = (tramo.ocupados / tramo.capacidad) * 100;
    if (porcentaje >= 90) {
      return <Badge className="bg-red-500">Completo</Badge>;
    } else if (porcentaje >= 70) {
      return <Badge className="bg-amber-500">Casi lleno</Badge>;
    }
    return <Badge className="bg-green-500">Disponible</Badge>;
  };

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-serif">Cortejo de la Cofradía</h2>
        <Button className="bg-hermandad-azul hover:bg-hermandad-azul/90 text-white">
          <Flag className="h-4 w-4 mr-2" />
          Nuevo Tramo
        </Button>
      </div>

      <div className="border rounded-md">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Tramo</TableHead>
              <TableHead>Insignia</TableHead>
              <TableHead className="text-center">Capacidad</TableHead>
              <TableHead className="text-center">Ocupación</TableHead>
              <TableHead className="text-center">Estado</TableHead>
              <TableHead className="text-right">Acciones</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {tramos.map((tramo) => (
              <TableRow key={tramo.id}>
                <TableCell className="font-medium">{tramo.nombre}</TableCell>
                <TableCell>{tramo.insignia}</TableCell>
                <TableCell className="text-center">{tramo.capacidad}</TableCell>
                <TableCell className="text-center">{tramo.ocupados}</TableCell>
                <TableCell className="text-center">
                  {getOcupacionBadge(tramo)}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button 
                      variant="ghost" 
                      size="icon"
                      title="Añadir hermano al principio"
                    >
                      <FlagTriangleLeft size={16} />
                    </Button>
                    <Button 
                      variant="ghost" 
                      size="icon"
                      title="Añadir hermano al final"
                    >
                      <FlagTriangleRight size={16} />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
