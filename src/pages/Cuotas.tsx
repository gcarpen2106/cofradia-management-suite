
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { CuotasList } from '@/components/cuotas/CuotasList';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Bar
} from 'recharts';

const mockChartData = [
  { mes: 'Ene', cobradas: 45, pendientes: 12, vencidas: 5 },
  { mes: 'Feb', cobradas: 50, pendientes: 10, vencidas: 4 },
  { mes: 'Mar', cobradas: 55, pendientes: 8, vencidas: 3 },
  { mes: 'Abr', cobradas: 42, pendientes: 15, vencidas: 6 },
];

const Cuotas = () => {
  const handleMarkPaid = (id: number) => {
    alert(`Marcar como pagada la cuota con id ${id}`);
    // Aquí iría la lógica para marcar como pagada
  };

  const handleGenerateReceipt = (id: number) => {
    alert(`Generar recibo para la cuota con id ${id}`);
    // Aquí iría la lógica para generar recibo
  };

  const handleAddCuota = () => {
    alert('Añadir nueva cuota');
    // Aquí iría la lógica para añadir cuota
  };

  return (
    <MainLayout title="Cuotas">
      <div className="space-y-6">
        <h2 className="text-2xl font-serif">Gestión de Cuotas</h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="hermandad-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Cobradas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-green-500">120</div>
              <div className="text-muted-foreground text-sm">6.000€ en total</div>
            </CardContent>
          </Card>
          <Card className="hermandad-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Pendientes</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-amber-500">45</div>
              <div className="text-muted-foreground text-sm">2.250€ en total</div>
            </CardContent>
          </Card>
          <Card className="hermandad-card">
            <CardHeader className="pb-2">
              <CardTitle className="text-lg">Vencidas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="text-3xl font-bold text-red-500">15</div>
              <div className="text-muted-foreground text-sm">750€ en total</div>
            </CardContent>
          </Card>
        </div>

        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Evolución de Cuotas 2024</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={mockChartData}
                margin={{
                  top: 5,
                  right: 30,
                  left: 20,
                  bottom: 5,
                }}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                <XAxis dataKey="mes" stroke="#888" fontSize={12} />
                <YAxis stroke="#888" fontSize={12} />
                <Tooltip />
                <Legend />
                <Bar dataKey="cobradas" name="Cobradas" fill="#0A1E40" />
                <Bar dataKey="pendientes" name="Pendientes" fill="#D4AF37" />
                <Bar dataKey="vencidas" name="Vencidas" fill="#EF4444" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
        
        <Tabs defaultValue="todas" className="w-full">
          <TabsList>
            <TabsTrigger value="todas">Todas las Cuotas</TabsTrigger>
            <TabsTrigger value="pendientes">Pendientes</TabsTrigger>
            <TabsTrigger value="vencidas">Vencidas</TabsTrigger>
          </TabsList>
          <TabsContent value="todas" className="mt-4">
            <CuotasList
              onMarkAsPaid={handleMarkPaid}
              onGenerateReceipt={handleGenerateReceipt}
              onAdd={handleAddCuota}
            />
          </TabsContent>
          <TabsContent value="pendientes" className="mt-4">
            <CuotasList
              onMarkAsPaid={handleMarkPaid}
              onGenerateReceipt={handleGenerateReceipt}
              onAdd={handleAddCuota}
            />
          </TabsContent>
          <TabsContent value="vencidas" className="mt-4">
            <CuotasList
              onMarkAsPaid={handleMarkPaid}
              onGenerateReceipt={handleGenerateReceipt}
              onAdd={handleAddCuota}
            />
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Cuotas;
