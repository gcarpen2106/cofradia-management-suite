
import React from 'react';
import { LucideIcon } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  description?: string;
  change?: number;
  icon: LucideIcon;
  color?: 'primary' | 'accent' | 'success' | 'warning';
}

export function StatCard({ 
  title, 
  value, 
  description, 
  change, 
  icon: Icon,
  color = 'primary' 
}: StatCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'accent':
        return 'bg-hermandad-dorado/10 text-hermandad-dorado';
      case 'success':
        return 'bg-green-50 text-green-600';
      case 'warning':
        return 'bg-amber-50 text-amber-600';
      case 'primary':
      default:
        return 'bg-hermandad-azul/10 text-hermandad-azul';
    }
  };

  const iconColorClass = getColorClasses();

  return (
    <div className="hermandad-card flex flex-col">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-medium text-gray-700">{title}</h3>
        <div className={`p-2 rounded-full ${iconColorClass}`}>
          <Icon className="h-6 w-6" />
        </div>
      </div>
      <div className="flex-grow">
        <div className="text-3xl font-bold text-gray-900">{value}</div>
        {description && <p className="text-sm text-gray-500 mt-1">{description}</p>}
      </div>
      {typeof change === 'number' && (
        <div className={`flex items-center mt-3 text-sm ${change >= 0 ? 'text-green-600' : 'text-red-600'}`}>
          <span className="font-medium">
            {change >= 0 ? `+${change}%` : `${change}%`}
          </span>
          <span className="ml-2">desde el mes anterior</span>
        </div>
      )}
    </div>
  );
}
