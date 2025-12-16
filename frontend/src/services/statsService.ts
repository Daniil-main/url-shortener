import { format, parseISO, subDays } from 'date-fns';

export const filterByDateRange = (clicks: any[], range: string) => {
  const now = new Date();
  
  switch (range) {
    case '7d':
      return clicks.filter(click => 
        parseISO(click.timestamp) >= subDays(now, 7)
      );
    case '30d':
      return clicks.filter(click => 
        parseISO(click.timestamp) >= subDays(now, 30)
      );
    case '90d':
      return clicks.filter(click => 
        parseISO(click.timestamp) >= subDays(now, 90)
      );
    default:
      return clicks;
  }
};

export const groupByDate = (clicks: any[]) => {
  const groups: Record<string, number> = {};
  
  clicks.forEach(click => {
    const date = format(parseISO(click.timestamp), 'yyyy-MM-dd');
    groups[date] = (groups[date] || 0) + 1;
  });
  
  return Object.entries(groups)
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => a.date.localeCompare(b.date));
};