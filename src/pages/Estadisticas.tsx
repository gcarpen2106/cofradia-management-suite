
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  LineChart,
  BarChart,
  PieChart,
  Line,
  Bar,
  Pie,
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  Legend, 
  ResponsiveContainer,
  Cell
} from 'recharts';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const mockData = {
  hermanosPorAnos: [
    { name: '2019', cantidad: 110 },
    { name: '2020', cantidad: 120 },
    { name: '2021', cantidad: 132 },
    { name: '2022', cantidad: 145 },
    { name: '2023', cantidad: 160 },
    { name: '2024', cantidad: 178 },
  ],
  hermanosPorEdad: [
    { name: '18-30', value: 25 },
    { name: '31-45', value: 65 },
    { name: '46-60', value: 48 },
    { name: '60+', value: 40 },
  ],
  cuotasPorMeses: [
    { name: 'Ene', cobradas: 45, pendientes: 12 },
    { name: 'Feb', cobradas: 50, pendientes: 10 },
    { name: 'Mar', cobradas: 55, pendientes: 8 },
    { name: 'Abr', cobradas: 42, pendientes: 15 },
  ],
  donacionesPorMeses: [
    { name: 'Ene', importe: 350 },
    { name: 'Feb', importe: 500 },
    { name: 'Mar', importe: 750 },
    { name: 'Abr', importe: 575 },
  ],
  eventosPorTipo: [
    { name: 'Romerías', value: 2 },
    { name: 'Procesiones', value: 4 },
    { name: 'Misas', value: 12 },
    { name: 'Reuniones', value: 8 },
  ],
  gastosPorCategoria: [
    { name: 'Mantenimiento', value: 2500 },
    { name: 'Eventos', value: 4500 },
    { name: 'Restauración', value: 1800 },
    { name: 'Otros', value: 1200 },
  ],
};

const COLORS = ['#0A1E40', '#D4AF37', '#4C51BF', '#38A169', '#E53E3E', '#D69E2E'];

const formatCurrency = (amount: number) => {
  return new Intl.NumberFormat('es-ES', {
    style: 'currency',
    currency: 'EUR'
  }).format(amount);
};

const Estadisticas = () => {
  return (
    <MainLayout title="Estadísticas">
      <div className="space-y-6">
        <h2 className="text-2xl font-serif">Panel de Estadísticas</h2>

        <Tabs defaultValue="hermanos" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="hermanos">Hermanos</TabsTrigger>
            <TabsTrigger value="financiero">Financiero</TabsTrigger>
            <TabsTrigger value="eventos">Eventos</TabsTrigger>
          </TabsList>
          
          <TabsContent value="hermanos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hermandad-card">
                <CardHeader>
                  <CardTitle>Evolución de Hermanos</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <LineChart
                      data={mockData.hermanosPorAnos}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#888" fontSize={12} />
                      <YAxis stroke="#888" fontSize={12} />
                      <Tooltip />
                      <Line
                        type="monotone"
                        dataKey="cantidad"
                        name="Nº Hermanos"
                        stroke="#0A1E40"
                        strokeWidth={2}
                        activeDot={{ r: 8 }}
                      />
                    </LineChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="hermandad-card">
                <CardHeader>
                  <CardTitle>Distribución por Edad</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockData.hermanosPorEdad}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {mockData.hermanosPorEdad.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => `${value} hermanos`} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="hermandad-card md:col-span-2">
                <CardHeader>
                  <CardTitle>Estado de Hermanos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
                    <div className="text-center p-6 bg-green-50 rounded-lg">
                      <p className="text-xl text-gray-600">Activos</p>
                      <p className="text-4xl font-bold text-green-600">145</p>
                      <p className="text-sm text-gray-500">81.5% del total</p>
                    </div>
                    <div className="text-center p-6 bg-amber-50 rounded-lg">
                      <p className="text-xl text-gray-600">Pendientes</p>
                      <p className="text-4xl font-bold text-amber-600">22</p>
                      <p className="text-sm text-gray-500">12.3% del total</p>
                    </div>
                    <div className="text-center p-6 bg-gray-50 rounded-lg">
                      <p className="text-xl text-gray-600">Inactivos</p>
                      <p className="text-4xl font-bold text-gray-600">11</p>
                      <p className="text-sm text-gray-500">6.2% del total</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="financiero" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hermandad-card">
                <CardHeader>
                  <CardTitle>Cuotas por Mes (2024)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={mockData.cuotasPorMeses}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#888" fontSize={12} />
                      <YAxis stroke="#888" fontSize={12} />
                      <Tooltip />
                      <Legend />
                      <Bar dataKey="cobradas" name="Cobradas" fill="#0A1E40" />
                      <Bar dataKey="pendientes" name="Pendientes" fill="#D4AF37" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="hermandad-card">
                <CardHeader>
                  <CardTitle>Donaciones por Mes (2024)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <BarChart
                      data={mockData.donacionesPorMeses}
                      margin={{
                        top: 5,
                        right: 30,
                        left: 20,
                        bottom: 5,
                      }}
                    >
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="name" stroke="#888" fontSize={12} />
                      <YAxis stroke="#888" fontSize={12} />
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Bar dataKey="importe" name="Importe" fill="#D4AF37" />
                    </BarChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="hermandad-card md:col-span-2">
                <CardHeader>
                  <CardTitle>Gastos por Categoría (2024)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockData.gastosPorCategoria}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {mockData.gastosPorCategoria.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip formatter={(value) => formatCurrency(Number(value))} />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="eventos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card className="hermandad-card">
                <CardHeader>
                  <CardTitle>Eventos por Tipo (2024)</CardTitle>
                </CardHeader>
                <CardContent>
                  <ResponsiveContainer width="100%" height={300}>
                    <PieChart>
                      <Pie
                        data={mockData.eventosPorTipo}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={100}
                        fill="#8884d8"
                        dataKey="value"
                        label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                      >
                        {mockData.eventosPorTipo.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                      <Legend />
                    </PieChart>
                  </ResponsiveContainer>
                </CardContent>
              </Card>

              <Card className="hermandad-card">
                <CardHeader>
                  <CardTitle>Asistencia a Eventos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-6">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="font-medium">Romería Anual 2023</p>
                        <p className="font-semibold">140 asistentes</p>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-hermandad-azul h-2 rounded-full" style={{ width: '78%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500">78% de participación</p>
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="font-medium">Procesión Corpus 2023</p>
                        <p className="font-semibold">180 asistentes</p>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-hermandad-azul h-2 rounded-full" style={{ width: '90%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500">90% de participación</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="font-medium">Misa Aniversario</p>
                        <p className="font-semibold">95 asistentes</p>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-hermandad-azul h-2 rounded-full" style={{ width: '53%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500">53% de participación</p>
                    </div>
                    
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <p className="font-medium">Asamblea General</p>
                        <p className="font-semibold">85 asistentes</p>
                      </div>
                      <div className="w-full bg-gray-200 h-2 rounded-full">
                        <div className="bg-hermandad-azul h-2 rounded-full" style={{ width: '47%' }}></div>
                      </div>
                      <p className="text-sm text-gray-500">47% de participación</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card className="hermandad-card md:col-span-2">
                <CardHeader>
                  <CardTitle>Calendario Anual de Eventos</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                    {["Ene", "Feb", "Mar", "Abr", "May", "Jun", "Jul", "Ago", "Sep", "Oct", "Nov", "Dic"].map((mes) => (
                      <div key={mes} className="border rounded-md p-3 text-center">
                        <p className="font-medium text-lg">{mes}</p>
                        <div className="flex justify-center gap-1 mt-2">
                          {mes === "May" && (
                            <span className="w-3 h-3 rounded-full bg-green-500" title="Romería"></span>
                          )}
                          {mes === "Jun" && (
                            <span className="w-3 h-3 rounded-full bg-hermandad-azul" title="Procesión"></span>
                          )}
                          {(mes === "Ene" || mes === "Feb" || mes === "Mar" || mes === "Abr" || mes === "May" || mes === "Jun" || mes === "Sep" || mes === "Oct" || mes === "Nov" || mes === "Dic") && (
                            <span className="w-3 h-3 rounded-full bg-amber-500" title="Misa"></span>
                          )}
                          {(mes === "Feb" || mes === "Abr" || mes === "Jun" || mes === "Sep" || mes === "Nov") && (
                            <span className="w-3 h-3 rounded-full bg-gray-500" title="Reunión"></span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

export default Estadisticas;
