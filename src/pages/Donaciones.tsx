
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { 
  PieChart, 
  Pie, 
  Cell, 
  Legend, 
  ResponsiveContainer,
  Tooltip
} from 'recharts';
import { FileText, PlusCircle } from 'lucide-react';

interface Donacion {
  id: number;
  nombre: string;
  importe: number;
  fecha: string;
  concepto: string;
  metodo: string;
  recibo: boolean;
}

const mockDonaciones: Donacion[] = [
  { id: 1, nombre: 'Juan García López', importe: 100, fecha: '10/04/2024', concepto: 'Donación para restauración', metodo: 'Transferencia', recibo: true },
  { id: 2, nombre: 'María Rodríguez Pérez', importe: 50, fecha: '12/04/2024', concepto: 'Donación general', metodo: 'Efectivo', recibo: true },
  { id: 3, nombre: 'Anónimo', importe: 200, fecha: '15/04/2024', concepto: 'Donación para flores', metodo: 'Transferencia', recibo: false },
  { id: 4, nombre: 'Antonio Fernández Díaz', importe: 75, fecha: '18/04/2024', concepto: 'Donación para velas', metodo: 'Tarjeta', recibo: true },
  { id: 5, nombre: 'Carmen López Martín', importe: 150, fecha: '20/04/2024', concepto: 'Donación general', metodo: 'Transferencia', recibo: true },
];

const conceptosData = [
  { name: 'General', value: 200 },
  { name: 'Restauración', value: 100 },
  { name: 'Flores', value: 200 },
  { name: 'Velas', value: 75 },
];

const COLORS = ['#0A1E40', '#D4AF37', '#4C51BF', '#38A169'];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

const Donaciones = () => {
  const totalDonaciones = mockDonaciones.reduce((total, donacion) => total + donacion.importe, 0);
  
  return (
    <MainLayout title="Donaciones">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-serif">Gestión de Donaciones</h2>
          <Button
            className="bg-hermandad-azul hover:bg-hermandad-azul/90 text-white flex items-center gap-2"
          >
            <PlusCircle size={16} />
            Nueva Donación
          </Button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hermandad-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Total Donaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-hermandad-azul">
                {formatCurrency(totalDonaciones)}
              </div>
              <div className="text-muted-foreground text-sm">Año 2024</div>
            </CardContent>
          </Card>
          <Card className="hermandad-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Donaciones del Mes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-hermandad-azul">
                {formatCurrency(575)}
              </div>
              <div className="text-muted-foreground text-sm">Abril 2024</div>
            </CardContent>
          </Card>
          <Card className="hermandad-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Donantes Únicos</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-hermandad-azul">4</div>
              <div className="text-muted-foreground text-sm">+1 anónimo</div>
            </CardContent>
          </Card>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <Card className="hermandad-card">
            <CardHeader>
              <CardTitle>Donaciones por Concepto</CardTitle>
            </CardHeader>
            <CardContent className="flex items-center justify-center">
              <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                  <Pie
                    data={conceptosData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={100}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {conceptosData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>

          <Card className="hermandad-card">
            <CardHeader>
              <CardTitle>Últimas Donaciones</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {mockDonaciones.slice(0, 4).map((donacion) => (
                  <div key={donacion.id} className="flex items-center justify-between py-2 border-b last:border-0">
                    <div>
                      <p className="font-medium">{donacion.nombre}</p>
                      <p className="text-sm text-gray-500">{donacion.fecha} • {donacion.concepto}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-bold">{formatCurrency(donacion.importe)}</p>
                      <p className="text-sm text-gray-500">{donacion.metodo}</p>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Listado de Donaciones</CardTitle>
          </CardHeader>
          <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Donante</TableHead>
                  <TableHead>Concepto</TableHead>
                  <TableHead>Fecha</TableHead>
                  <TableHead className="text-right">Importe</TableHead>
                  <TableHead>Método</TableHead>
                  <TableHead className="text-right">Acciones</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockDonaciones.map((donacion) => (
                  <TableRow key={donacion.id}>
                    <TableCell className="font-medium">{donacion.nombre}</TableCell>
                    <TableCell>{donacion.concepto}</TableCell>
                    <TableCell>{donacion.fecha}</TableCell>
                    <TableCell className="text-right">{formatCurrency(donacion.importe)}</TableCell>
                    <TableCell>{donacion.metodo}</TableCell>
                    <TableCell className="text-right">
                      {donacion.recibo && (
                        <Button
                          variant="ghost"
                          size="icon"
                          title="Generar recibo"
                        >
                          <FileText size={16} />
                        </Button>
                      )}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      </div>
    </MainLayout>
  );
};

export default Donaciones;
