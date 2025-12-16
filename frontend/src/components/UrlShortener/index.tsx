import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { shortenUrl, clearResult } from '../../store/slices/urlSlice';
import { UrlForm } from './UrlForm';
import { UrlResult } from './UrlResult';
import { FeaturesGrid } from './FeaturesGrid';

export const UrlShortener: React.FC = () => {
  const [url, setUrl] = useState('');
  const dispatch = useDispatch();
  const { loading, error, result } = useSelector((state: any) => state.url);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (url.trim()) {
      dispatch(shortenUrl(url) as any);
    }
  };

  const handleReset = () => {
    setUrl('');
    dispatch(clearResult());
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-800 mb-4">
          Shorten Your Links Instantly
        </h1>
        <p className="text-gray-600 text-lg">
          Create short, memorable URLs and track their performance
        </p>
      </div>

      <UrlForm
        url={url}
        setUrl={setUrl}
        loading={loading}
        onSubmit={handleSubmit}
      />

      {error && (
        <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg">
          <p className="text-red-700 font-medium">Error: {error}</p>
          <button
            onClick={handleReset}
            className="mt-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}

      {result && (
        <UrlResult result={result} onReset={handleReset} />
      )}

      <FeaturesGrid />
    </div>
  );
};