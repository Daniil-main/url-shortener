import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { shortenUrl, clearResult } from '../store/slices/urlSlice.js'

export const UrlShortener = () => {
  const [url, setUrl] = useState('')
  const dispatch = useDispatch()
  const { loading, error, result } = useSelector(state => state.url)

  const handleSubmit = (e) => {
    e.preventDefault()
    if (url.trim()) {
      dispatch(shortenUrl(url))
    }
  }

  const handleReset = () => {
    setUrl('')
    dispatch(clearResult())
  }

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => alert('Copied to clipboard!'))
      .catch(err => console.error('Copy failed:', err))
  }

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

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="url" className="block text-sm font-medium text-gray-700 mb-2">
              Enter your long URL
            </label>
            <div className="flex gap-4">
              <input
                id="url"
                type="url"
                value={url}
                onChange={(e) => setUrl(e.target.value)}
                placeholder="https://example.com/very-long-url-path"
                className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                required
              />
              <button
                type="submit"
                disabled={loading}
                className="px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg hover:bg-blue-700 disabled:bg-blue-400 transition-colors duration-200"
              >
                {loading ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin inline-block mr-2"></div>
                    Shortening...
                  </>
                ) : (
                  'Shorten URL'
                )}
              </button>
            </div>
          </div>
        </form>

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
                  onClick={handleReset}
                  className="w-full px-4 py-3 bg-gray-100 text-gray-700 font-medium rounded-lg hover:bg-gray-200 transition-colors"
                >
                  Shorten Another URL
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

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
    </div>
  )
}