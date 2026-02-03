import { useState, useEffect } from 'react';
import { Trademark, SearchFilters } from '../types/trademark';
import { mockTrademarks } from '../mocks/trademarks';

export const useTrademarkSearch = (filters: SearchFilters) => {
  const [results, setResults] = useState<Trademark[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const searchTrademarks = async () => {
      setLoading(true);
      setError(null);

      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 800));

        let filtered = mockTrademarks.filter(tm => tm.country === filters.country);

        // Filter by search term
        if (filters.searchTerm) {
          const term = filters.searchTerm.toLowerCase();
          filtered = filtered.filter(tm => 
            tm.productName.toLowerCase().includes(term) ||
            (tm.productNameEng && tm.productNameEng.toLowerCase().includes(term))
          );
        }

        // Filter by application number
        if (filters.applicationNumber) {
          filtered = filtered.filter(tm => 
            tm.applicationNumber === filters.applicationNumber
          );
        }

        // Filter by status
        if (filters.status !== 'all') {
          filtered = filtered.filter(tm => tm.status === filters.status);
        }

        // Filter by date range
        if (filters.startDate) {
          filtered = filtered.filter(tm => tm.applicationDate >= filters.startDate);
        }
        if (filters.endDate) {
          filtered = filtered.filter(tm => tm.applicationDate <= filters.endDate);
        }

        setResults(filtered);
      } catch (err) {
        setError('Failed to fetch trademarks');
      } finally {
        setLoading(false);
      }
    };

    searchTrademarks();
  }, [filters]);

  return { results, loading, error };
};