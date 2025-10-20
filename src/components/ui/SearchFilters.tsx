import React, { useState, useEffect } from 'react';

interface Option {
  value: string | number;
  label: string;
}

interface SearchFiltersProps {
  onSearch: (searchTerm: string) => void;
  onFilterChange: (filterName: string, value: any) => void;
  filters: {
    name: string;
    label: string;
    type: 'select' | 'search' | 'date';
    options?: Option[];
    placeholder?: string;
    defaultValue?: string | number;
  }[];
  searchPlaceholder?: string;
  className?: string;
}

const SearchFilters: React.FC<SearchFiltersProps> = ({
  onSearch,
  onFilterChange,
  filters,
  searchPlaceholder = 'Rechercher...',
  className = '',
}) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedTerm, setDebouncedTerm] = useState('');

  // Délai pour la recherche
  useEffect(() => {
    const timerId = setTimeout(() => {
      setDebouncedTerm(searchTerm);
    }, 300);

    return () => {
      clearTimeout(timerId);
    };
  }, [searchTerm]);

  useEffect(() => {
    onSearch(debouncedTerm);
  }, [debouncedTerm, onSearch]);

  return (
    <div className={`space-y-4 ${className}`}>
      <div className="flex flex-col md:flex-row gap-4">
        {/* Barre de recherche */}
        <div className="relative flex-1">
          <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
            <svg
              className="h-5 w-5 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 20 20"
              fill="currentColor"
              aria-hidden="true"
            >
              <path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              />
            </svg>
          </div>
          <input
            type="text"
            className="block w-full pl-10 pr-3 py-2.5 border border-gray-200 rounded-lg bg-white focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 text-sm transition-all duration-200"
            placeholder={searchPlaceholder}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Filtres */}
        <div className="grid grid-cols-2 md:flex gap-3">
          {filters.map((filter) => (
            <div key={filter.name} className="min-w-[150px]">
              {filter.type === 'select' ? (
                <select
                  className="w-full px-3 py-2.5 border border-gray-200 rounded-lg bg-white text-sm text-gray-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500 cursor-pointer"
                  onChange={(e) => onFilterChange(filter.name, e.target.value)}
                  defaultValue={filter['defaultValue'] || ''}
                >
                  <option value="">
                    {filter.placeholder || `Tous les ${filter.label}`}
                  </option>
                  {filter.options?.map((option) => (
                    <option key={option.value} value={option.value}>
                      {option.label}
                    </option>
                  ))}
                </select>
              ) : filter.type === 'date' ? (
                <input
                  type="date"
                  className="w-full px-3 py-2 border border-gray-200 rounded-lg bg-white text-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  onChange={(e) => onFilterChange(filter.name, e.target.value)}
                />
              ) : null}
            </div>
          ))}
        </div>
      </div>

      {/* Filtres actifs */}
      <div className="flex flex-wrap gap-2">
        {searchTerm && (
          <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            Recherche : {searchTerm}
            <button
              onClick={() => {
                setSearchTerm('');
                onSearch('');
              }}
              className="ml-1.5 inline-flex items-center justify-center w-4 h-4 rounded-full bg-green-200 text-green-600 hover:bg-green-300 focus:outline-none"
            >
              ×
            </button>
          </span>
        )}
      </div>
    </div>
  );
};

export default SearchFilters;
