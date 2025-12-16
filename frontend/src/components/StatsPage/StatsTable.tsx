import React from 'react';
import { format, parseISO } from 'date-fns';
import styled from 'styled-components';

const TableContainer = styled.div`
  overflow: hidden;
  border-radius: 12px;
  border: 1px solid #e5e7eb;
`;

const Table = styled.table`
  min-width: 100%;
  border-collapse: collapse;
`;

const TableHeader = styled.thead`
  background-color: #f9fafb;
`;

const TableHeaderCell = styled.th`
  padding: 0.75rem 1.5rem;
  text-align: left;
  font-size: 0.75rem;
  font-weight: 500;
  color: #6b7280;
  text-transform: uppercase;
  letter-spacing: 0.05em;
`;

const TableRow = styled.tr`
  border-top: 1px solid #e5e7eb;
  background-color: white;

  &:hover {
    background-color: #f9fafb;
  }
`;

const TableCell = styled.td`
  padding: 1rem 1.5rem;
  font-size: 0.875rem;
  color: #374151;
`;

const MonoCell = styled(TableCell)`
  font-family: monospace;
`;

const NoData = styled.div`
  padding: 3rem;
  text-align: center;
  color: #9ca3af;
`;

interface ClickData {
  id: string;
  timestamp: string;
  ip: string;
  region: string;
  country: string;
  browser: string;
  os: string;
}

interface StatsTableProps {
  clicks: ClickData[];
}

const tableHeaders = [
  { key: 'timestamp', label: 'Date & Time' },
  { key: 'ip', label: 'IP Address' },
  { key: 'region', label: 'Region' },
  { key: 'country', label: 'Country' },
  { key: 'browser', label: 'Browser' },
  { key: 'os', label: 'OS' },
] as const;

export const StatsTable: React.FC<StatsTableProps> = ({ clicks }) => {
  if (clicks.length === 0) {
    return <NoData>No clicks recorded yet</NoData>;
  }

  return (
    <TableContainer>
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <tr>
              {tableHeaders.map((header) => (
                <TableHeaderCell key={header.key}>
                  {header.label}
                </TableHeaderCell>
              ))}
            </tr>
          </TableHeader>
          <tbody>
            {clicks.map((click) => (
              <TableRow key={click.id}>
                <TableCell>
                  {format(parseISO(click.timestamp), 'MMM d, yyyy HH:mm')}
                </TableCell>
                <MonoCell>{click.ip}</MonoCell>
                <TableCell>{click.region}</TableCell>
                <TableCell>{click.country}</TableCell>
                <TableCell>{click.browser}</TableCell>
                <TableCell>{click.os}</TableCell>
              </TableRow>
            ))}
          </tbody>
        </Table>
      </div>
    </TableContainer>
  );
};