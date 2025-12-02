import React, { useEffect } from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { getStats } from '../store/slices/urlSlice.js'
import { format, parseISO } from 'date-fns'

const StatsPage = () => {
  const { code } = useParams()
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { loading, error, stats } = useSelector(state => state.url)

  useEffect(() => {
    if (code) {
      dispatch(getStats(code))
    }
  }, [code, dispatch])

  if (loading) {
    return (
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', minHeight: '400px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            border: '4px solid #3b82f6',
            borderTopColor: 'transparent',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 1rem'
          }}></div>
          <p style={{ color: '#6b7280' }}>Loading analytics...</p>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '64px',
            height: '64px',
            backgroundColor: '#fee2e2',
            borderRadius: '50%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto 1rem'
          }}>
            <svg width="32" height="32" fill="#dc2626" viewBox="0 0 24 24">
              <path d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
            Error Loading Stats
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>{error}</p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Back to Home
          </button>
        </div>
      </div>
    )
  }

  if (!stats) {
    return (
      <div style={{ maxWidth: '600px', margin: '0 auto', backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '2rem' }}>
        <div style={{ textAlign: 'center' }}>
          <h2 style={{ fontSize: '1.5rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '1rem' }}>
            No Stats Found
          </h2>
          <p style={{ color: '#6b7280', marginBottom: '1.5rem' }}>
            The requested URL analytics could not be found.
          </p>
          <button
            onClick={() => navigate('/')}
            style={{
              padding: '0.75rem 1.5rem',
              backgroundColor: '#3b82f6',
              color: 'white',
              borderRadius: '8px',
              border: 'none',
              cursor: 'pointer',
              fontWeight: '500'
            }}
          >
            Create New URL
          </button>
        </div>
      </div>
    )
  }

  const { url, analytics } = stats

  return (
    <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
      <div style={{ marginBottom: '2rem' }}>
        <button
          onClick={() => navigate('/')}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
            color: '#3b82f6',
            fontWeight: '500',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            fontSize: '1rem'
          }}
        >
          <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
            <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
          </svg>
          Back to Home
        </button>
      </div>

      <div style={{ backgroundColor: 'white', borderRadius: '16px', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)', padding: '2rem', marginBottom: '2rem' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', marginBottom: '2rem' }}>
          <div>
            <h1 style={{ fontSize: '2rem', fontWeight: 'bold', color: '#1f2937', marginBottom: '0.5rem' }}>
              Analytics Dashboard
            </h1>
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', color: '#6b7280' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                Created: {format(parseISO(url.createdAt), 'MMM d, yyyy')}
              </span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.25rem' }}>
                <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0c-.828 0-1.5.672-1.5 1.5v4.5m0 0h-6" />
                </svg>
                Total Clicks: {url.clicks}
              </span>
            </div>
          </div>
        </div>

        <div style={{ marginBottom: '2rem' }}>
          <h2 style={{ fontSize: '1.125rem', fontWeight: '600', color: '#374151', marginBottom: '0.5rem' }}>
            Original URL
          </h2>
          <p style={{
            color: '#111827',
            fontFamily: 'monospace',
            wordBreak: 'break-all',
            padding: '0.75rem',
            backgroundColor: '#f9fafb',
            borderRadius: '8px',
            border: '1px solid #e5e7eb'
          }}>
            {url.original}
          </p>
        </div>

        {/* Stats Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
          gap: '1.5rem',
          marginBottom: '2rem'
        }}>
          <StatCard
            title="Total Clicks"
            value={analytics.totalClicks}
            color="blue"
          />
          <StatCard
            title="Unique Countries"
            value={new Set(analytics.clicks.map(c => c.country)).size}
            color="green"
          />
          <StatCard
            title="Most Used Browser"
            value={getMostCommon(analytics.clicks, 'browser')}
            color="purple"
          />
          <StatCard
            title="Most Used OS"
            value={getMostCommon(analytics.clicks, 'os')}
            color="orange"
          />
        </div>

        {/* Clicks Table */}
        <div style={{ overflow: 'hidden', borderRadius: '12px', border: '1px solid #e5e7eb' }}>
          <div style={{ overflowX: 'auto' }}>
            <table style={{ minWidth: '100%', borderCollapse: 'collapse' }}>
              <thead style={{ backgroundColor: '#f9fafb' }}>
                <tr>
                  <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                    Date & Time
                  </th>
                  <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                    IP Address
                  </th>
                  <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                    Region
                  </th>
                  <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                    Country
                  </th>
                  <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                    Browser
                  </th>
                  <th style={{ padding: '0.75rem 1.5rem', textAlign: 'left', fontSize: '0.75rem', fontWeight: '500', color: '#6b7280', textTransform: 'uppercase' }}>
                    OS
                  </th>
                </tr>
              </thead>
              <tbody style={{ backgroundColor: 'white' }}>
                {analytics.clicks.map((click) => (
                  <tr key={click.id} style={{ borderTop: '1px solid #e5e7eb' }}>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#374151' }}>
                      {format(parseISO(click.timestamp), 'MMM d, yyyy HH:mm')}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#374151', fontFamily: 'monospace' }}>
                      {click.ip}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#374151' }}>
                      {click.region}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#374151' }}>
                      {click.country}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#374151' }}>
                      {click.browser}
                    </td>
                    <td style={{ padding: '1rem 1.5rem', fontSize: '0.875rem', color: '#374151' }}>
                      {click.os}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          
          {analytics.clicks.length === 0 && (
            <div style={{ padding: '3rem', textAlign: 'center', color: '#9ca3af' }}>
              No clicks recorded yet
            </div>
          )}
        </div>
      </div>

      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
    </div>
  )
}

const StatCard = ({ title, value, color }) => {
  const colors = {
    blue: { bg: '#dbeafe', text: '#1e40af', border: '#93c5fd' },
    green: { bg: '#d1fae5', text: '#065f46', border: '#6ee7b7' },
    purple: { bg: '#f3e8ff', text: '#6d28d9', border: '#d8b4fe' },
    orange: { bg: '#ffedd5', text: '#9a3412', border: '#fdba74' }
  }

  const colorSet = colors[color] || colors.blue

  return (
    <div style={{
      backgroundColor: colorSet.bg,
      border: `1px solid ${colorSet.border}`,
      borderRadius: '12px',
      padding: '1.5rem'
    }}>
      <h3 style={{ fontSize: '0.875rem', fontWeight: '500', color: colorSet.text, marginBottom: '0.5rem' }}>
        {title}
      </h3>
      <p style={{ fontSize: '2.25rem', fontWeight: 'bold', color: colorSet.text }}>
        {value}
      </p>
    </div>
  )
}

const getMostCommon = (items, key) => {
  const counts = {}
  items.forEach(item => {
    const value = item[key] || 'Unknown'
    counts[value] = (counts[value] || 0) + 1
  })
  
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1])
  return sorted[0]?.[0] || 'Unknown'
}

export default StatsPage