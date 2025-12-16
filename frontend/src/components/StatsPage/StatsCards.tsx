import React from 'react';
import styled from 'styled-components';

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 1.5rem;
  margin-bottom: 2rem;
`;

interface CardProps {
  $color: 'blue' | 'green' | 'purple' | 'orange';
}

const Card = styled.div<CardProps>`
  background-color: ${props => {
    switch (props.$color) {
      case 'blue': return '#dbeafe';
      case 'green': return '#d1fae5';
      case 'purple': return '#f3e8ff';
      case 'orange': return '#ffedd5';
      default: return '#dbeafe';
    }
  }};
  border: 1px solid ${props => {
    switch (props.$color) {
      case 'blue': return '#93c5fd';
      case 'green': return '#6ee7b7';
      case 'purple': return '#d8b4fe';
      case 'orange': return '#fdba74';
      default: return '#93c5fd';
    }
  }};
  border-radius: 12px;
  padding: 1.5rem;
`;

const CardTitle = styled.h3<CardProps>`
  font-size: 0.875rem;
  font-weight: 500;
  color: ${props => {
    switch (props.$color) {
      case 'blue': return '#1e40af';
      case 'green': return '#065f46';
      case 'purple': return '#6d28d9';
      case 'orange': return '#9a3412';
      default: return '#1e40af';
    }
  }};
  margin-bottom: 0.5rem;
`;

const CardValue = styled.p<CardProps>`
  font-size: 2.25rem;
  font-weight: bold;
  color: ${props => {
    switch (props.$color) {
      case 'blue': return '#1e40af';
      case 'green': return '#065f46';
      case 'purple': return '#6d28d9';
      case 'orange': return '#9a3412';
      default: return '#1e40af';
    }
  }};
`;

interface ClickData {
  country: string;
  browser: string;
  os: string;
}

interface StatsCardsProps {
  clicks: ClickData[];
}

const getMostCommon = (items: any[], key: keyof ClickData): string => {
  const counts: Record<string, number> = {};
  items.forEach(item => {
    const value = item[key] || 'Unknown';
    counts[value] = (counts[value] || 0) + 1;
  });
  
  const sorted = Object.entries(counts).sort((a, b) => b[1] - a[1]);
  return sorted[0]?.[0] || 'Unknown';
};

export const StatsCards: React.FC<StatsCardsProps> = ({ clicks }) => {
  const totalClicks = clicks.length;
  const uniqueCountries = new Set(clicks.map(c => c.country)).size;
  const topBrowser = getMostCommon(clicks, 'browser');
  const topOS = getMostCommon(clicks, 'os');

  return (
    <CardsGrid>
      <Card $color="blue">
        <CardTitle $color="blue">Total Clicks</CardTitle>
        <CardValue $color="blue">{totalClicks}</CardValue>
      </Card>
      
      <Card $color="green">
        <CardTitle $color="green">Unique Countries</CardTitle>
        <CardValue $color="green">{uniqueCountries}</CardValue>
      </Card>
      
      <Card $color="purple">
        <CardTitle $color="purple">Top Browser</CardTitle>
        <CardValue $color="purple">{topBrowser}</CardValue>
      </Card>
      
      <Card $color="orange">
        <CardTitle $color="orange">Top OS</CardTitle>
        <CardValue $color="orange">{topOS}</CardValue>
      </Card>
    </CardsGrid>
  );
};