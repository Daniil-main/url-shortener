import React from 'react';

export const FeaturesGrid: React.FC = () => {
  return (
    <div className="grid md:grid-cols-3 gap-6">
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
          <div className="text-blue-600 font-bold text-lg">⚡</div>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">Fast Shortening</h3>
        <p className="text-gray-600 text-sm">
          Generate short URLs instantly with our high-performance API.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
          <div className="text-green-600 font-bold text-lg">📊</div>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">Detailed Analytics</h3>
        <p className="text-gray-600 text-sm">
          Track clicks, locations, devices, and referral sources.
        </p>
      </div>
      
      <div className="bg-white p-6 rounded-xl shadow">
        <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
          <div className="text-purple-600 font-bold text-lg">📋</div>
        </div>
        <h3 className="font-semibold text-gray-800 mb-2">Easy Sharing</h3>
        <p className="text-gray-600 text-sm">
          Copy and share your shortened URLs with one click.
        </p>
      </div>
    </div>
  );
};