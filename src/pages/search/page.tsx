import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../../components/feature/Header';
import { SearchFilters } from '../../components/feature/SearchFilters';
import { TrademarkCard } from '../../components/feature/TrademarkCard';
import { TrademarkDetail } from '../../components/feature/TrademarkDetail';
import { LoadingState, SkeletonCard } from '../../components/feature/LoadingState';
import { EmptyState } from '../../components/feature/EmptyState';
import { ErrorState } from '../../components/feature/ErrorState';
import { Input } from '../../components/base/Input';
import { Button } from '../../components/base/Button';
import { useTrademarkSearch } from '../../hooks/useTrademarkSearch';
import { useFavorites } from '../../hooks/useFavorites';
import { SearchFilters as SearchFiltersType, Trademark } from '../../types/trademark';

export default function SearchPage() {
  const { t } = useTranslation();
  const [filters, setFilters] = useState<SearchFiltersType>({
    country: 'korea',
    searchTerm: '',
    applicationNumber: '',
    status: 'all',
    startDate: '',
    endDate: '',
  });
  const [quickSearch, setQuickSearch] = useState('');
  const [selectedTrademark, setSelectedTrademark] = useState<Trademark | null>(null);
  const [showMobileFilters, setShowMobileFilters] = useState(false);

  const { results, loading, error } = useTrademarkSearch(filters);
  const { favorites, toggleFavorite, isFavorite } = useFavorites();

  const handleQuickSearch = () => {
    setFilters({ ...filters, searchTerm: quickSearch });
  };

  const handleCountryChange = (country: 'korea' | 'us') => {
    setFilters({ ...filters, country });
  };

  const handleRetry = () => {
    setFilters({ ...filters });
  };

  return (
    <div className="min-h-screen bg-slate-50">
      <Header selectedCountry={filters.country} onCountryChange={handleCountryChange} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Search Bar */}
        <div className="mb-8">
          <div className="max-w-3xl mx-auto">
            <div className="flex gap-3">
              <Input
                placeholder={t('search.placeholder')}
                value={quickSearch}
                onChange={(e) => setQuickSearch(e.target.value)}
                onKeyPress={(e) => e.key === 'Enter' && handleQuickSearch()}
                className="flex-1"
              />
              <Button variant="primary" onClick={handleQuickSearch} className="px-8">
                {t('search.button')}
              </Button>
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          {/* Desktop Filters Sidebar */}
          <aside className="hidden lg:block w-80 flex-shrink-0">
            <div className="sticky top-24">
              <SearchFilters filters={filters} onFiltersChange={setFilters} />
            </div>
          </aside>

          {/* Mobile Filters Button */}
          <div className="lg:hidden">
            <Button
              variant="outline"
              onClick={() => setShowMobileFilters(true)}
              className="w-full"
            >
              <div className="w-5 h-5 flex items-center justify-center mr-2">
                <i className="ri-filter-3-line"></i>
              </div>
              {t('search.filters')}
            </Button>
          </div>

          {/* Main Content */}
          <main className="flex-1 min-w-0">
            {/* Results Header */}
            {!loading && !error && (
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900 mb-2">{t('results.title')}</h2>
                <p className="text-sm text-slate-600">
                  {t('results.count', { count: results.length })}
                </p>
              </div>
            )}

            {/* Loading State */}
            {loading && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {[1, 2, 3, 4].map((i) => (
                  <SkeletonCard key={i} />
                ))}
              </div>
            )}

            {/* Error State */}
            {error && <ErrorState onRetry={handleRetry} />}

            {/* Empty State */}
            {!loading && !error && results.length === 0 && (
              <EmptyState
                icon="ri-search-line"
                title={t('results.noResults')}
                description={t('results.noResultsDesc')}
              />
            )}

            {/* Results Grid */}
            {!loading && !error && results.length > 0 && (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {results.map((trademark) => (
                  <TrademarkCard
                    key={trademark.id}
                    trademark={trademark}
                    isFavorite={isFavorite(trademark.id)}
                    onToggleFavorite={toggleFavorite}
                    onViewDetails={setSelectedTrademark}
                  />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>

      {/* Mobile Filters Drawer */}
      {showMobileFilters && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="fixed inset-0 bg-slate-900 bg-opacity-50"
            onClick={() => setShowMobileFilters(false)}
          ></div>
          <div className="fixed inset-y-0 right-0 max-w-sm w-full bg-white shadow-xl overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-slate-200">
              <h3 className="text-lg font-semibold text-slate-900">{t('search.filters')}</h3>
              <button
                onClick={() => setShowMobileFilters(false)}
                className="cursor-pointer text-slate-400 hover:text-slate-600"
              >
                <div className="w-6 h-6 flex items-center justify-center">
                  <i className="ri-close-line text-2xl"></i>
                </div>
              </button>
            </div>
            <SearchFilters
              filters={filters}
              onFiltersChange={(newFilters) => {
                setFilters(newFilters);
                setShowMobileFilters(false);
              }}
              isMobile
            />
          </div>
        </div>
      )}

      {/* Trademark Detail Modal */}
      {selectedTrademark && (
        <TrademarkDetail
          trademark={selectedTrademark}
          isFavorite={isFavorite(selectedTrademark.id)}
          onToggleFavorite={toggleFavorite}
          onClose={() => setSelectedTrademark(null)}
        />
      )}
    </div>
  );
}