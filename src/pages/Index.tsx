
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { StatCard } from '@/components/dashboard/StatCard';
import { ChartCard } from '@/components/dashboard/ChartCard';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, FileText, Calendar, DollarSign, Clock } from 'lucide-react';

const mockChartData = {
  hermanosPorAno: [
    { name: '2020', cantidad: 120 },
    { name: '2021', cantidad: 132 },
    { name: '2022', cantidad: 145 },
    { name: '2023', cantidad: 160 },
    { name: '2024', cantidad: 178 },
  ],
  cuotasPorEstado: [
    { name: 'Pagadas', value: 120 },
    { name: 'Pendientes', value: 45 },
    { name: 'Vencidas', value: 15 },
  ],
  ingresosUltimos6Meses: [
    { name: 'Nov', cuotas: 2300, donaciones: 850 },
    { name: 'Dic', cuotas: 1800, donaciones: 1200 },
    { name: 'Ene', cuotas: 3200, donaciones: 600 },
    { name: 'Feb', cuotas: 2100, donaciones: 700 },
    { name: 'Mar', cuotas: 1700, donaciones: 1500 },
    { name: 'Abr', cuotas: 2800, donaciones: 900 },
  ],
};

const categoriesIngresos = [
  { key: 'cuotas', name: 'Cuotas', color: '#0A1E40' },
  { key: 'donaciones', name: 'Donaciones', color: '#D4AF37' },
];

const Index = () => {
  return (
    <MainLayout title="Dashboard">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <StatCard
          title="Total Hermanos"
          value="178"
          description="Miembros activos de la hermandad"
          change={4.5}
          icon={Users}
        />
        <StatCard
          title="Cuotas Pendientes"
          value="45"
          description="Por cobrar"
          icon={FileText}
          color="warning"
        />
        <StatCard
          title="Próximo Evento"
          value="8 Mayo"
          description="Romería anual"
          icon={Calendar}
          color="accent"
        />
        <StatCard
          title="Ingresos Mes"
          value="4.325€"
          description="Abril 2024"
          change={12.3}
          icon={DollarSign}
          color="success"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <ChartCard
          title="Evolución de Hermanos"
          description="Últimos 5 años"
          data={mockChartData.hermanosPorAno}
          type="line"
          dataKey="cantidad"
        />
        <ChartCard
          title="Estado de Cuotas"
          description="Resumen actual"
          data={mockChartData.cuotasPorEstado}
          type="pie"
        />
        <Card className="hermandad-card">
          <CardHeader>
            <CardTitle>Próximos Eventos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { id: 1, nombre: 'Romería Anual', fecha: '8 Mayo, 2024', tipo: 'Evento Principal' },
                { id: 2, nombre: 'Misa Mensual', fecha: '1 Mayo, 2024', tipo: 'Celebración' },
                { id: 3, nombre: 'Reunión de Junta', fecha: '29 Abril, 2024', tipo: 'Interno' },
              ].map((evento) => (
                <div key={evento.id} className="flex items-center py-2 border-b last:border-0">
                  <div className="p-2 bg-hermandad-azul/10 rounded-full mr-4">
                    <Clock className="h-5 w-5 text-hermandad-azul" />
                  </div>
                  <div className="flex-grow">
                    <h4 className="font-medium text-sm">{evento.nombre}</h4>
                    <p className="text-sm text-gray-500">{evento.fecha} • {evento.tipo}</p>
                  </div>
                </div>
              ))}
              <div className="text-center pt-2">
                <a href="/eventos" className="text-sm text-hermandad-azul hover:text-hermandad-dorado font-medium">
                  Ver todos los eventos →
                </a>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 gap-6">
        <ChartCard
          title="Ingresos Recientes"
          description="Últimos 6 meses"
          data={mockChartData.ingresosUltimos6Meses}
          type="bar"
          categories={categoriesIngresos}
        />
      </div>
    </MainLayout>
  );
};

export default Index;
