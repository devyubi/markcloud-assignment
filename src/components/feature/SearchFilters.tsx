import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { SearchFilters as SearchFiltersType, TrademarkStatus } from '../../types/trademark';
import { Input } from '../base/Input';
import { Select } from '../base/Select';
import { Button } from '../base/Button';

interface SearchFiltersProps {
  filters: SearchFiltersType;
  onFiltersChange: (filters: SearchFiltersType) => void;
  isMobile?: boolean;
}

export const SearchFilters: React.FC<SearchFiltersProps> = ({
  filters,
  onFiltersChange,
  isMobile = false,
}) => {
  const { t } = useTranslation();
  const [localFilters, setLocalFilters] = useState(filters);

  const statusOptions = [
    { value: 'all', label: t('status.all') },
    { value: 'registered', label: t('status.registered') },
    { value: 'underExamination', label: t('status.underExamination') },
    { value: 'published', label: t('status.published') },
    { value: 'abandoned', label: t('status.abandoned') },
    { value: 'cancelled', label: t('status.cancelled') },
    { value: 'expired', label: t('status.expired') },
  ];

  const handleApply = () => {
    onFiltersChange(localFilters);
  };

  const handleClear = () => {
    const clearedFilters: SearchFiltersType = {
      ...localFilters,
      searchTerm: '',
      applicationNumber: '',
      status: 'all',
      startDate: '',
      endDate: '',
    };
    setLocalFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  return (
    <div className={`bg-white ${isMobile ? 'p-4' : 'rounded-lg border border-slate-200 p-6'}`}>
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-slate-900">{t('search.filters')}</h3>
        <button
          onClick={handleClear}
          className="text-sm text-slate-600 hover:text-slate-900 transition-colors cursor-pointer whitespace-nowrap"
        >
          {t('search.clearFilters')}
        </button>
      </div>

      <div className="space-y-4">
        {/* Trademark Name Search */}
        <Input
          label={t('search.placeholder')}
          placeholder={t('search.placeholder')}
          value={localFilters.searchTerm}
          onChange={(e) => setLocalFilters({ ...localFilters, searchTerm: e.target.value })}
        />

        {/* Application Number */}
        <Input
          label={t('search.applicationNumber')}
          placeholder={t('search.applicationNumberPlaceholder')}
          value={localFilters.applicationNumber}
          onChange={(e) => setLocalFilters({ ...localFilters, applicationNumber: e.target.value })}
        />

        {/* Status Filter */}
        <Select
          label={t('search.status')}
          options={statusOptions}
          value={localFilters.status}
          onChange={(e) => setLocalFilters({ ...localFilters, status: e.target.value as TrademarkStatus | 'all' })}
        />

        {/* Date Range */}
        <div>
          <label className="block text-sm font-medium text-slate-700 mb-3">
            {t('search.dateRange')}
          </label>
          <div className="space-y-3">
            <Input
              type="date"
              placeholder={t('search.startDate')}
              value={localFilters.startDate}
              onChange={(e) => setLocalFilters({ ...localFilters, startDate: e.target.value })}
            />
            <Input
              type="date"
              placeholder={t('search.endDate')}
              value={localFilters.endDate}
              onChange={(e) => setLocalFilters({ ...localFilters, endDate: e.target.value })}
            />
          </div>
        </div>

        {/* Apply Button */}
        <Button
          variant="primary"
          className="w-full"
          onClick={handleApply}
        >
          {t('search.applyFilters')}
        </Button>
      </div>
    </div>
  );
};