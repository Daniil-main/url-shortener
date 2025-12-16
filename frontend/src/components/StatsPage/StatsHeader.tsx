import React from 'react';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';

const HeaderContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  margin-bottom: 2rem;
`;

const Title = styled.h1`
  font-size: 2rem;
  font-weight: bold;
  color: #1f2937;
  margin-bottom: 0.5rem;
`;

const MetaInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 1rem;
  color: #6b7280;
`;

const MetaItem = styled.span`
  display: flex;
  align-items: center;
  gap: 0.25rem;
`;

const UrlContainer = styled.div`
  margin-bottom: 2rem;
`;

const UrlLabel = styled.h2`
  font-size: 1.125rem;
  font-weight: 600;
  color: #374151;
  margin-bottom: 0.5rem;
`;

const Url = styled.p`
  color: #111827;
  font-family: monospace;
  word-break: break-all;
  padding: 0.75rem;
  background-color: #f9fafb;
  border-radius: 8px;
  border: 1px solid #e5e7eb;
`;

const Controls = styled.div`
  display: flex;
  justify-content: flex-end;
  margin-bottom: 2rem;
`;

const Select = styled.select`
  padding: 0.5rem 2rem 0.5rem 0.75rem;
  border: 1px solid #d1d5db;
  border-radius: 0.375rem;
  background-color: white;
  font-size: 0.875rem;
  color: #374151;
  outline: none;
  cursor: pointer;

  &:focus {
    border-color: #3b82f6;
    box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);
  }
`;

interface StatsHeaderProps {
  originalUrl: string;
  createdAt: string;
  totalClicks: number;
  timeRange: string;
  onTimeRangeChange: (range: string) => void;
}

export const StatsHeader: React.FC<StatsHeaderProps> = ({
  originalUrl,
  createdAt,
  totalClicks,
  timeRange,
  onTimeRangeChange
}) => {
  return (
    <>
      <HeaderContainer>
        <div>
          <Title>Analytics Dashboard</Title>
          <MetaInfo>
            <MetaItem>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              Created: {format(parseISO(createdAt), 'MMM d, yyyy')}
            </MetaItem>
            <MetaItem>
              <svg width="16" height="16" fill="currentColor" viewBox="0 0 24 24">
                <path d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5 0c-.828 0-1.5.672-1.5 1.5v4.5m0 0h-6" />
              </svg>
              Total Clicks: {totalClicks}
            </MetaItem>
          </MetaInfo>
        </div>
      </HeaderContainer>

      <UrlContainer>
        <UrlLabel>Original URL</UrlLabel>
        <Url>{originalUrl}</Url>
      </UrlContainer>

      <Controls>
        <Select
          value={timeRange}
          onChange={(e) => onTimeRangeChange(e.target.value)}
        >
          <option value="all">All Time</option>
          <option value="7d">Last 7 Days</option>
          <option value="30d">Last 30 Days</option>
          <option value="90d">Last 90 Days</option>
        </Select>
      </Controls>
    </>
  );
};