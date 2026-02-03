import React from 'react';

interface EmptyStateProps {
  icon: string;
  title: string;
  description: string;
}

export const EmptyState: React.FC<EmptyStateProps> = ({ icon, title, description }) => {
  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 flex items-center justify-center bg-slate-100 rounded-full mb-4">
        <i className={`${icon} text-3xl text-slate-400`}></i>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{title}</h3>
      <p className="text-sm text-slate-600 text-center max-w-md">{description}</p>
    </div>
  );
};