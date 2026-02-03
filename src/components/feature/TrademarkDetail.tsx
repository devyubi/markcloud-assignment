import React from 'react';
import { useTranslation } from 'react-i18next';
import { Trademark } from '../../types/trademark';
import { Badge } from '../base/Badge';
import { Button } from '../base/Button';

interface TrademarkDetailProps {
  trademark: Trademark;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  onClose: () => void;
}

export const TrademarkDetail: React.FC<TrademarkDetailProps> = ({
  trademark,
  isFavorite,
  onToggleFavorite,
  onClose,
}) => {
  const { t } = useTranslation();

  const InfoSection: React.FC<{ title: string; children: React.ReactNode }> = ({ title, children }) => (
    <div className="mb-6">
      <h3 className="text-base font-semibold text-slate-900 mb-4 pb-2 border-b border-slate-200">
        {title}
      </h3>
      <div className="space-y-3">
        {children}
      </div>
    </div>
  );

  const InfoRow: React.FC<{ label: string; value: string | React.ReactNode }> = ({ label, value }) => (
    <div className="flex items-start">
      <span className="text-sm text-slate-600 w-40 flex-shrink-0">{label}</span>
      <span className="text-sm text-slate-900 flex-1">{value}</span>
    </div>
  );

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:p-0">
        {/* Backdrop */}
        <div
          className="fixed inset-0 bg-slate-900 bg-opacity-50 transition-opacity"
          onClick={onClose}
        ></div>

        {/* Modal */}
        <div className="relative inline-block align-bottom bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-3xl sm:w-full">
          {/* Header */}
          <div className="bg-slate-50 px-6 py-4 border-b border-slate-200">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-bold text-slate-900">{t('detail.title')}</h2>
              <div className="flex items-center space-x-3">
                <button
                  onClick={() => onToggleFavorite(trademark.id)}
                  className="cursor-pointer transition-colors"
                  aria-label={isFavorite ? t('favorites.remove') : t('favorites.add')}
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className={`${isFavorite ? 'ri-heart-fill text-red-500' : 'ri-heart-line text-slate-400 hover:text-red-500'} text-xl`}></i>
                  </div>
                </button>
                <button
                  onClick={onClose}
                  className="cursor-pointer text-slate-400 hover:text-slate-600 transition-colors"
                >
                  <div className="w-6 h-6 flex items-center justify-center">
                    <i className="ri-close-line text-2xl"></i>
                  </div>
                </button>
              </div>
            </div>
          </div>

          {/* Content */}
          <div className="px-6 py-6 max-h-[calc(100vh-200px)] overflow-y-auto">
            {/* Trademark Name */}
            <div className="mb-6 pb-6 border-b border-slate-200">
              <h3 className="text-2xl font-bold text-slate-900 mb-2">
                {trademark.productName}
              </h3>
              {trademark.productNameEng && (
                <p className="text-lg text-slate-600">{trademark.productNameEng}</p>
              )}
            </div>

            {/* Basic Information */}
            <InfoSection title={t('detail.basicInfo')}>
              <InfoRow label={t('detail.applicantName')} value={trademark.applicantName} />
              <InfoRow label={t('detail.country')} value={t(`country.${trademark.country}`)} />
              <InfoRow 
                label={t('detail.status')} 
                value={<Badge status={trademark.status} label={t(`status.${trademark.status}`)} />} 
              />
            </InfoSection>

            {/* Application Information */}
            <InfoSection title={t('detail.applicationInfo')}>
              <InfoRow label={t('detail.applicationNumber')} value={trademark.applicationNumber} />
              <InfoRow label={t('detail.applicationDate')} value={trademark.applicationDate} />
            </InfoSection>

            {/* Registration Information */}
            {trademark.registrationNumber && (
              <InfoSection title={t('detail.registrationInfo')}>
                <InfoRow label={t('detail.registrationNumber')} value={trademark.registrationNumber} />
                <InfoRow label={t('detail.registrationDate')} value={trademark.registrationDate} />
              </InfoSection>
            )}

            {/* Classification Codes */}
            <InfoSection title={t('detail.classification')}>
              <InfoRow label={t('detail.niceClass')} value={trademark.niceClass} />
              <InfoRow label={t('detail.viennaCode')} value={trademark.viennaCode} />
            </InfoSection>

            {/* Country-Specific Information */}
            {(trademark.country === 'korea' || trademark.country === 'us') && (
              <InfoSection title={t('detail.countrySpecific')}>
                {trademark.country === 'korea' && (
                  <>
                    {trademark.productNameEng && (
                      <InfoRow label={t('detail.productNameEng')} value={trademark.productNameEng} />
                    )}
                    {trademark.publicationNumber && (
                      <InfoRow label={t('detail.publicationNumber')} value={trademark.publicationNumber} />
                    )}
                  </>
                )}
                {trademark.country === 'us' && trademark.usClassCodeList && (
                  <InfoRow label={t('detail.usClassCodes')} value={trademark.usClassCodeList} />
                )}
              </InfoSection>
            )}
          </div>

          {/* Footer */}
          <div className="bg-slate-50 px-6 py-4 border-t border-slate-200">
            <Button variant="secondary" onClick={onClose} className="w-full sm:w-auto">
              {t('detail.close')}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};