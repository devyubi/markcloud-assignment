import React from 'react';
import { useTranslation } from 'react-i18next';

export const LoadingState: React.FC = () => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-16">
      <div className="w-12 h-12 border-4 border-slate-200 border-t-slate-900 rounded-full animate-spin mb-4"></div>
      <p className="text-sm text-slate-600">{t('loading.message')}</p>
    </div>
  );
};

export const SkeletonCard: React.FC = () => {
  return (
    <div className="bg-white rounded-lg border border-slate-200 p-5 animate-pulse">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <div className="h-6 bg-slate-200 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-slate-200 rounded w-1/2"></div>
        </div>
        <div className="w-6 h-6 bg-slate-200 rounded-full ml-3"></div>
      </div>
      <div className="space-y-2 mb-4">
        <div className="h-4 bg-slate-200 rounded w-full"></div>
        <div className="h-4 bg-slate-200 rounded w-5/6"></div>
        <div className="h-4 bg-slate-200 rounded w-4/6"></div>
      </div>
      <div className="h-10 bg-slate-200 rounded-lg"></div>
    </div>
  );
};