import React from 'react';

interface UrlResultProps {
  result: {
    shortCode: string;
    shareUrl: string;
    statsUrl: string;
  };
  onReset: () => void;
}

export const UrlResult: React.FC<UrlResultProps> = ({ result, onReset }) => {
  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Copy failed:', err));
  };

  return (
    <div className="mt-8 space-y-6">
      <div className="border-t pt-6">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">
          Your Shortened URLs
        </h3>
        
        <div className="space-y-4">
          <div className="bg-blue-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              For Sharing
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={result.shareUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-blue-300 rounded-lg font-mono text-blue-700"
              />
              <button
                onClick={() => copyToClipboard(result.shareUrl)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Copy
              </button>
            </div>
          </div>

          <div className="bg-purple-50 p-4 rounded-lg">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              For Analytics
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                value={result.statsUrl}
                readOnly
                className="flex-1 px-3 py-2 bg-white border border-purple-300 rounded-lg font-mono text-purple-700"
              />
              <a
                href={result.statsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
              >
                View Stats
              </a>
            </div>
          </div>
        </div>

        <div className="mt-6 pt-6 border-t">
          <button
            onClick={onReset}
            className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
          >
            Shorten Another URL
          </button>
        </div>
      </div>
    </div>
  );
};