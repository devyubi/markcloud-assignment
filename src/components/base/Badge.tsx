import React from 'react';
import { TrademarkStatus } from '../../types/trademark';

interface BadgeProps {
  status: TrademarkStatus;
  label: string;
}

export const Badge: React.FC<BadgeProps> = ({ status, label }) => {
  const statusColors = {
    registered: 'bg-emerald-100 text-emerald-800 border-emerald-200',
    underExamination: 'bg-blue-100 text-blue-800 border-blue-200',
    published: 'bg-purple-100 text-purple-800 border-purple-200',
    abandoned: 'bg-gray-100 text-gray-800 border-gray-200',
    cancelled: 'bg-orange-100 text-orange-800 border-orange-200',
    expired: 'bg-red-100 text-red-800 border-red-200',
  };

  return (
    <span className={`inline-flex items-center px-2.5 py-1 rounded-md text-xs font-medium border ${statusColors[status]}`}>
      {label}
    </span>
  );
};