
import React from 'react';
import { MainLayout } from '@/components/layout/MainLayout';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, MapPin, Clock, Users, PlusCircle } from 'lucide-react';

interface Evento {
  id: number;
  titulo: string;
  fecha: string;
  hora: string;
  lugar: string;
  tipo: 'romería' | 'procesión' | 'misa' | 'reunión' | 'otro';
  descripcion: string;
  asistentes?: number;
  imagen?: string;
}

const mockEventos: Evento[] = [
  {
    id: 1,
    titulo: 'Romería Anual 2024',
    fecha: '08/05/2024',
    hora: '09:00',
    lugar: 'Ermita de San Juan',
    tipo: 'romería',
    descripcion: 'Romería anual con recorrido tradicional desde la Iglesia hasta la Ermita de San Juan.',
    asistentes: 150,
    imagen: 'https://images.unsplash.com/photo-1551984427-6d77d5fe42f0?q=80&w=2069&auto=format&fit=crop'
  },
  {
    id: 2,
    titulo: 'Misa Mensual Mayo',
    fecha: '01/05/2024',
    hora: '19:00',
    lugar: 'Parroquia de Santa María',
    tipo: 'misa',
    descripcion: 'Misa mensual de hermandad dedicada a todos los hermanos.',
    asistentes: 80,
  },
  {
    id: 3,
    titulo: 'Reunión Junta Directiva',
    fecha: '29/04/2024',
    hora: '18:00',
    lugar: 'Sede de la Hermandad',
    tipo: 'reunión',
    descripcion: 'Reunión mensual de la junta directiva para tratar temas de gestión.',
    asistentes: 12,
  },
  {
    id: 4,
    titulo: 'Procesión Corpus Christi',
    fecha: '02/06/2024',
    hora: '19:00',
    lugar: 'Centro Histórico',
    tipo: 'procesión',
    descripcion: 'Procesión del Corpus Christi con recorrido por el centro histórico de la ciudad.',
    asistentes: 200,
    imagen: 'https://images.unsplash.com/photo-1584567612396-38bed93ea93b?q=80&w=2067&auto=format&fit=crop'
  },
];

const getTipoBadge = (tipo: Evento['tipo']) => {
  switch (tipo) {
    case 'romería':
      return <Badge className="bg-green-500">Romería</Badge>;
    case 'procesión':
      return <Badge className="bg-hermandad-azul">Procesión</Badge>;
    case 'misa':
      return <Badge className="bg-amber-500">Misa</Badge>;
    case 'reunión':
      return <Badge className="bg-gray-500">Reunión</Badge>;
    case 'otro':
    default:
      return <Badge>Otro</Badge>;
  }
};

const Eventos = () => {
  const pasadosEventos = mockEventos.filter(e => new Date(e.fecha.split('/').reverse().join('-')) < new Date());
  const proximosEventos = mockEventos.filter(e => new Date(e.fecha.split('/').reverse().join('-')) >= new Date());

  return (
    <MainLayout title="Eventos">
      <div className="space-y-6">
        <div className="flex justify-between items-center">
          <h2 className="text-2xl font-serif">Calendario de Eventos</h2>
          <Button
            className="bg-hermandad-azul hover:bg-hermandad-azul/90 text-white flex items-center gap-2"
          >
            <PlusCircle size={16} />
            Nuevo Evento
          </Button>
        </div>

        <Tabs defaultValue="proximos" className="w-full">
          <TabsList>
            <TabsTrigger value="proximos">Próximos Eventos</TabsTrigger>
            <TabsTrigger value="pasados">Eventos Pasados</TabsTrigger>
          </TabsList>
          <TabsContent value="proximos" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {proximosEventos.map((evento) => (
                <EventoCard key={evento.id} evento={evento} />
              ))}
            </div>
          </TabsContent>
          <TabsContent value="pasados" className="mt-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {pasadosEventos.map((evento) => (
                <EventoCard key={evento.id} evento={evento} />
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </MainLayout>
  );
};

interface EventoCardProps {
  evento: Evento;
}

const EventoCard = ({ evento }: EventoCardProps) => {
  return (
    <Card className="overflow-hidden border-0 shadow-md">
      {evento.imagen && (
        <div className="w-full h-48 overflow-hidden">
          <img 
            src={evento.imagen} 
            alt={evento.titulo} 
            className="w-full h-full object-cover hover:scale-105 transition-transform duration-300" 
          />
        </div>
      )}
      <CardContent className={`p-6 ${!evento.imagen ? 'border-t-4 border-hermandad-dorado' : ''}`}>
        <div className="flex flex-col space-y-4">
          <div className="flex justify-between items-start">
            <h3 className="text-xl font-serif font-medium">{evento.titulo}</h3>
            {getTipoBadge(evento.tipo)}
          </div>
          
          <p className="text-gray-600">{evento.descripcion}</p>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="flex items-center">
              <Calendar className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{evento.fecha}</span>
            </div>
            <div className="flex items-center">
              <Clock className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{evento.hora}</span>
            </div>
            <div className="flex items-center">
              <MapPin className="h-4 w-4 mr-2 text-gray-500" />
              <span className="text-sm">{evento.lugar}</span>
            </div>
            {evento.asistentes && (
              <div className="flex items-center">
                <Users className="h-4 w-4 mr-2 text-gray-500" />
                <span className="text-sm">{evento.asistentes} asistentes</span>
              </div>
            )}
          </div>
          
          <div className="flex justify-end pt-2">
            <Button variant="outline">Ver Detalles</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default Eventos;
