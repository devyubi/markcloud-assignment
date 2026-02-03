import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trademark } from '../../types/trademark';
import { Card } from '../base/Card';
import { Badge } from '../base/Badge';

interface TrademarkCardProps {
  trademark: Trademark;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onViewDetails: (trademark: Trademark) => void;
}

export const TrademarkCard: React.FC<TrademarkCardProps> = ({
  trademark,
  isFavorite,
  onToggleFavorite,
  onViewDetails,
}) => {
  const { t } = useTranslation();

  return (
    <Card className="p-5">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h3 className="text-lg font-semibold text-slate-900 mb-1">
            {trademark.productName}
          </h3>
          {trademark.productNameEng && (
            <p className="text-sm text-slate-600">{trademark.productNameEng}</p>
          )}
        </div>
        <button
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(trademark.id);
          }}
          className="ml-3 cursor-pointer transition-colors"
          aria-label={isFavorite ? t('favorites.remove') : t('favorites.add')}
        >
          <div className="w-6 h-6 flex items-center justify-center">
            <i className={`${isFavorite ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-slate-400 hover:text-red-500'} text-xl`}></i>
          </div>
        </button>
      </div>

      <div className="space-y-2 mb-4">
        <div className="flex items-center text-sm">
          <span className="text-slate-600 w-32">{t('results.applicationNumber')}</span>
          <span className="text-slate-900 font-medium">{trademark.applicationNumber}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-slate-600 w-32">{t('results.applicationDate')}</span>
          <span className="text-slate-900">{trademark.applicationDate}</span>
        </div>
        <div className="flex items-center text-sm">
          <span className="text-slate-600 w-32">{t('results.status')}</span>
          <Badge status={trademark.status} label={t(`status.${trademark.status}`)} />
        </div>
      </div>

      <button
        onClick={() => onViewDetails(trademark)}
        className="w-full px-4 py-2 bg-slate-900 text-white text-sm font-medium rounded-lg hover:bg-slate-800 transition-colors cursor-pointer whitespace-nowrap"
      >
        {t('results.viewDetails')}
      </button>
    </Card>
  );
};