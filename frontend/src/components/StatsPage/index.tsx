import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getStats } from '../../store/slices/statsSlice';
import { StatsHeader } from './StatsHeader';
import { StatsCards } from './StatsCards';
import { StatsTable } from './StatsTable';
import styled from 'styled-components';

const Container = styled.div`
  max-width: 1200px;
  margin: 0 auto;
`;

const BackButton = styled.button`
  display: flex;
  align-items: center;
  gap: 0.5rem;
  color: #3b82f6;
  font-weight: 500;
  background: none;
  border: none;
  cursor: pointer;
  font-size: 1rem;
  margin-bottom: 2rem;

  &:hover {
    color: #2563eb;
  }
`;

export const StatsPage: React.FC = () => {
  const { code } = useParams<{ code: string }>();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { loading, error, stats } = useSelector((state: any) => state.stats);
  const [timeRange, setTimeRange] = useState<string>('all');

  useEffect(() => {
    if (code) {
      dispatch(getStats(code) as any);
    }
  }, [code, dispatch]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading analytics...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
            </svg>
          </div>
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Error Loading Stats</h2>
          <p className="text-gray-600 mb-6">{error}</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    );
  }

  if (!stats) {
    return (
      <div className="max-w-2xl mx-auto bg-white rounded-xl shadow-lg p-8">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">No Stats Found</h2>
          <p className="text-gray-600 mb-6">The requested URL analytics could not be found.</p>
          <button
            onClick={() => navigate('/')}
            className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
          >
            Create New URL
          </button>
        </div>
      </div>
    );
  }

  const { url, analytics } = stats.data;

  return (
    <Container>
      <BackButton onClick={() => navigate('/')}>
        <svg width="20" height="20" fill="currentColor" viewBox="0 0 24 24">
          <path d="M10 19l-7-7m0 0l7-7m-7 7h18" />
        </svg>
        Back to Home
      </BackButton>

      <div className="bg-white rounded-2xl shadow-xl p-8 mb-8">
        <StatsHeader
          originalUrl={url.original}
          createdAt={url.createdAt}
          totalClicks={url.clicks}
          timeRange={timeRange}
          onTimeRangeChange={setTimeRange}
        />

        <StatsCards clicks={analytics.clicks} />

        <StatsTable clicks={analytics.clicks} />
      </div>
    </Container>
  );
};