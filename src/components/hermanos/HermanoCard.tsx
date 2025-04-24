
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Label } from "@/components/ui/label";
import { Separator } from "@/components/ui/separator";
import { Button } from "@/components/ui/button";
import { Phone, Mail, Calendar, User, FileEdit, FileText, CreditCard } from 'lucide-react';

interface HermanoProps {
  id: number;
  nombre: string;
  apellidos: string;
  fechaAlta: string;
  dni: string;
  email: string;
  telefono: string;
  direccion: string;
  poblacion: string;
  provincia: string;
  codigoPostal: string;
  estado: 'activo' | 'inactivo' | 'pendiente';
  numeroCuenta?: string;
  fechaNacimiento: string;
  observaciones?: string;
  fotografia?: string;
}

const mockHermano: HermanoProps = {
  id: 1,
  nombre: 'Juan',
  apellidos: 'García López',
  fechaAlta: '15/03/2010',
  dni: '12345678A',
  email: 'juan.garcia@email.com',
  telefono: '612345678',
  direccion: 'Calle Mayor, 15',
  poblacion: 'Sevilla',
  provincia: 'Sevilla',
  codigoPostal: '41001',
  estado: 'activo',
  numeroCuenta: 'ES1234567890123456789012',
  fechaNacimiento: '05/10/1985',
  observaciones: 'Participa en procesiones como costalero desde 2012.',
  fotografia: 'https://randomuser.me/api/portraits/men/42.jpg',
};

interface HermanoCardProps {
  hermano?: HermanoProps;
  onEdit?: () => void;
  onAddCuota?: () => void;
  onGenerarPapeleta?: () => void;
}

export function HermanoCard({ 
  hermano = mockHermano, 
  onEdit,
  onAddCuota,
  onGenerarPapeleta 
}: HermanoCardProps) {
  const getEstadoBadge = (estado: HermanoProps['estado']) => {
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
    <Card className="w-full">
      <CardHeader className="pb-2">
        <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
          <div className="flex items-center gap-4">
            <div className="h-16 w-16 rounded-full overflow-hidden">
              {hermano.fotografia ? (
                <img 
                  src={hermano.fotografia} 
                  alt={`${hermano.nombre} ${hermano.apellidos}`} 
                  className="h-full w-full object-cover"
                />
              ) : (
                <div className="h-full w-full bg-gray-200 flex items-center justify-center">
                  <User className="h-8 w-8 text-gray-400" />
                </div>
              )}
            </div>
            <div>
              <CardTitle className="text-2xl">{hermano.nombre} {hermano.apellidos}</CardTitle>
              <div className="flex items-center gap-2 text-muted-foreground mt-1">
                <span>Nº Hermano: {hermano.id}</span>
                {getEstadoBadge(hermano.estado)}
              </div>
            </div>
          </div>
          <div className="flex gap-2">
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={onEdit}
            >
              <FileEdit size={16} />
              Editar
            </Button>
            <Button
              variant="outline"
              className="flex items-center gap-1"
              onClick={onAddCuota}
            >
              <CreditCard size={16} />
              Nueva Cuota
            </Button>
            <Button
              className="bg-hermandad-azul hover:bg-hermandad-azul/90 text-white flex items-center gap-1"
              onClick={onGenerarPapeleta}
            >
              <FileText size={16} />
              Generar Papeleta
            </Button>
          </div>
        </div>
      </CardHeader>
      <Separator />
      <CardContent className="pt-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-medium">Datos Personales</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-muted-foreground">DNI/NIF</Label>
                <p>{hermano.dni}</p>
              </div>
              <div>
                <Label className="text-muted-foreground">Fecha de Nacimiento</Label>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <p>{hermano.fechaNacimiento}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Fecha de Alta</Label>
                <div className="flex items-center gap-2">
                  <Calendar size={16} className="text-muted-foreground" />
                  <p>{hermano.fechaAlta}</p>
                </div>
              </div>
            </div>
            
            <h3 className="font-serif text-lg font-medium">Contacto</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-muted-foreground">Email</Label>
                <div className="flex items-center gap-2">
                  <Mail size={16} className="text-muted-foreground" />
                  <p>{hermano.email}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Teléfono</Label>
                <div className="flex items-center gap-2">
                  <Phone size={16} className="text-muted-foreground" />
                  <p>{hermano.telefono}</p>
                </div>
              </div>
            </div>
          </div>
          
          <div className="space-y-6">
            <h3 className="font-serif text-lg font-medium">Dirección</h3>
            <div className="grid grid-cols-1 gap-4">
              <div>
                <Label className="text-muted-foreground">Calle</Label>
                <p>{hermano.direccion}</p>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label className="text-muted-foreground">Población</Label>
                  <p>{hermano.poblacion}</p>
                </div>
                <div>
                  <Label className="text-muted-foreground">Código Postal</Label>
                  <p>{hermano.codigoPostal}</p>
                </div>
              </div>
              <div>
                <Label className="text-muted-foreground">Provincia</Label>
                <p>{hermano.provincia}</p>
              </div>
            </div>
            
            <h3 className="font-serif text-lg font-medium">Datos Bancarios</h3>
            <div>
              <Label className="text-muted-foreground">Número de Cuenta</Label>
              <p>{hermano.numeroCuenta || 'No disponible'}</p>
            </div>
            
            {hermano.observaciones && (
              <>
                <h3 className="font-serif text-lg font-medium">Observaciones</h3>
                <p className="text-sm text-muted-foreground">{hermano.observaciones}</p>
              </>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
