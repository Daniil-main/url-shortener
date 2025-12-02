import { format, parseISO, subDays } from 'date-fns'

export const statsService = {
  filterByDateRange: (clicks, range) => {
    const now = new Date()
    
    switch (range) {
      case '7d':
        return clicks.filter(click => 
          parseISO(click.timestamp) >= subDays(now, 7)
        )
      case '30d':
        return clicks.filter(click => 
          parseISO(click.timestamp) >= subDays(now, 30)
        )
      case '90d':
        return clicks.filter(click => 
          parseISO(click.timestamp) >= subDays(now, 90)
        )
      default:
        return clicks
    }
  },

  groupByDate: (clicks) => {
    const groups = {}
    
    clicks.forEach(click => {
      const date = format(parseISO(click.timestamp), 'yyyy-MM-dd')
      if (!groups[date]) groups[date] = 0
      groups[date]++
    })
    
    return Object.entries(groups).map(([date, count]) => ({
      date,
      count
    })).sort((a, b) => a.date.localeCompare(b.date))
  },

  getCountryData: (clicks) => {
    const countryMap = {}
    
    clicks.forEach(click => {
      const country = click.country || 'Unknown'
      if (!countryMap[country]) countryMap[country] = 0
      countryMap[country]++
    })
    
    return Object.entries(countryMap)
      .map(([country, count]) => ({ country, count }))
      .sort((a, b) => b.count - a.count)
  },

  getBrowserData: (clicks) => {
    const browserMap = {}
    
    clicks.forEach(click => {
      const browser = click.browser || 'Unknown'
      if (!browserMap[browser]) browserMap[browser] = 0
      browserMap[browser]++
    })
    
    return Object.entries(browserMap)
      .map(([browser, count]) => ({ browser, count }))
      .sort((a, b) => b.count - a.count)
  }
}