import React from 'react';
import { useTranslation } from 'react-i18next';
import { Button } from '../base/Button';

interface ErrorStateProps {
  onRetry: () => void;
}

export const ErrorState: React.FC<ErrorStateProps> = ({ onRetry }) => {
  const { t } = useTranslation();

  return (
    <div className="flex flex-col items-center justify-center py-16 px-4">
      <div className="w-16 h-16 flex items-center justify-center bg-red-100 rounded-full mb-4">
        <i className="ri-error-warning-line text-3xl text-red-600"></i>
      </div>
      <h3 className="text-lg font-semibold text-slate-900 mb-2">{t('error.title')}</h3>
      <p className="text-sm text-slate-600 text-center max-w-md mb-6">{t('error.message')}</p>
      <Button variant="primary" onClick={onRetry}>
        {t('error.retry')}
      </Button>
    </div>
  );
};