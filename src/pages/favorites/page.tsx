import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { Header } from '../../components/feature/Header';
import { TrademarkCard } from '../../components/feature/TrademarkCard';
import { TrademarkDetail } from '../../components/feature/TrademarkDetail';
import { EmptyState } from '../../components/feature/EmptyState';
import { useFavorites } from '../../hooks/useFavorites';
import { mockTrademarks } from '../../mocks/trademarks';
import { Trademark } from '../../types/trademark';

export default function FavoritesPage() {
  const { t } = useTranslation();
  const { favorites, toggleFavorite, isFavorite } = useFavorites();
  const [selectedTrademark, setSelectedTrademark] = useState<Trademark | null>(null);
  const [selectedCountry, setSelectedCountry] = useState<'korea' | 'us'>('korea');

  const favoriteTrademarks = mockTrademarks.filter((tm) => favorites.includes(tm.id));

  return (
    <div className="min-h-screen bg-slate-50">
      <Header selectedCountry={selectedCountry} onCountryChange={setSelectedCountry} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">{t('favorites.title')}</h1>
          <p className="text-sm text-slate-600">
            {favoriteTrademarks.length > 0
              ? t('results.count', { count: favoriteTrademarks.length })
              : t('favorites.empty')}
          </p>
        </div>

        {favoriteTrademarks.length === 0 ? (
          <EmptyState
            icon="ri-heart-line"
            title={t('favorites.empty')}
            description={t('favorites.emptyDesc')}
          />
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {favoriteTrademarks.map((trademark) => (
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
      </div>

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