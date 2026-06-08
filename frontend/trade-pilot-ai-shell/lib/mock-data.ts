// Static placeholder data used purely for layout/visual demonstration.

export type Recommendation = 'Strong Buy' | 'Buy' | 'Hold' | 'Sell'

export type Stock = {
  symbol: string
  name: string
  price: number
  change: number
  changePct: number
  weeklyChangePct: number
  score: number
  recommendation: Recommendation
  confidence: number
}

export const watchlist: Stock[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp.',      price: 138.42, change:  4.18, changePct:  3.11, weeklyChangePct:  8.42, score: 92, recommendation: 'Strong Buy', confidence: 91 },
  { symbol: 'AAPL', name: 'Apple Inc.',        price: 229.87, change:  1.62, changePct:  0.71, weeklyChangePct:  2.14, score: 78, recommendation: 'Buy',        confidence: 76 },
  { symbol: 'TSLA', name: 'Tesla Inc.',        price: 412.05, change: -8.74, changePct: -2.08, weeklyChangePct: -4.61, score: 54, recommendation: 'Hold',       confidence: 58 },
  { symbol: 'MSFT', name: 'Microsoft Corp.',   price: 438.11, change:  2.95, changePct:  0.68, weeklyChangePct:  3.07, score: 84, recommendation: 'Buy',        confidence: 82 },
  { symbol: 'AMD',  name: 'Adv. Micro Devices',price: 168.33, change: -3.21, changePct: -1.87, weeklyChangePct: -5.23, score: 47, recommendation: 'Sell',       confidence: 63 },
  { symbol: 'GOOGL',name: 'Alphabet Inc.',     price: 191.24, change:  0.88, changePct:  0.46, weeklyChangePct:  1.88, score: 71, recommendation: 'Buy',        confidence: 70 },
  { symbol: 'META', name: 'Meta Platforms',    price: 602.78, change:  9.44, changePct:  1.59, weeklyChangePct:  4.93, score: 81, recommendation: 'Buy',        confidence: 79 },
]

export type Holding = {
  symbol: string
  name: string
  shares: number
  avgCost: number
  price: number
  value: number
  changePct: number
  allocation: number
}

export const holdings: Holding[] = [
  { symbol: 'NVDA', name: 'NVIDIA Corp.', shares: 320, avgCost: 92.4, price: 138.42, value: 44294.4, changePct: 49.8, allocation: 31.2 },
  { symbol: 'AAPL', name: 'Apple Inc.', shares: 140, avgCost: 178.2, price: 229.87, value: 32181.8, changePct: 29.0, allocation: 22.7 },
  { symbol: 'MSFT', name: 'Microsoft Corp.', shares: 60, avgCost: 388.5, price: 438.11, value: 26286.6, changePct: 12.8, allocation: 18.5 },
  { symbol: 'TSLA', name: 'Tesla Inc.', shares: 48, avgCost: 305.1, price: 412.05, value: 19778.4, changePct: 35.1, allocation: 13.9 },
  { symbol: 'META', name: 'Meta Platforms', shares: 22, avgCost: 478.0, price: 602.78, value: 13261.2, changePct: 26.1, allocation: 9.3 },
  { symbol: 'AMD', name: 'Adv. Micro Devices', shares: 38, avgCost: 142.7, price: 168.33, value: 6396.5, changePct: 18.0, allocation: 4.4 },
]

export type Trade = {
  id: string
  date: string
  symbol: string
  side: 'BUY' | 'SELL'
  quantity: number
  entry: number
  exit: number
  pnl: number
  pnlPct: number
  setup: string
  status: 'Win' | 'Loss' | 'Open'
}

export const trades: Trade[] = [
  { id: 'T-1042', date: 'Jun 06', symbol: 'NVDA', side: 'BUY', quantity: 80, entry: 121.4, exit: 138.42, pnl: 1361.6, pnlPct: 14.0, setup: 'Breakout', status: 'Win' },
  { id: 'T-1041', date: 'Jun 05', symbol: 'TSLA', side: 'SELL', quantity: 30, entry: 432.1, exit: 412.05, pnl: 601.5, pnlPct: 4.6, setup: 'Reversal', status: 'Win' },
  { id: 'T-1040', date: 'Jun 04', symbol: 'AMD', side: 'BUY', quantity: 50, entry: 174.2, exit: 168.33, pnl: -293.5, pnlPct: -3.4, setup: 'Pullback', status: 'Loss' },
  { id: 'T-1039', date: 'Jun 03', symbol: 'AAPL', side: 'BUY', quantity: 60, entry: 221.0, exit: 229.87, pnl: 532.2, pnlPct: 4.0, setup: 'Trend', status: 'Win' },
  { id: 'T-1038', date: 'Jun 02', symbol: 'META', side: 'BUY', quantity: 15, entry: 588.4, exit: 0, pnl: 0, pnlPct: 0, setup: 'Momentum', status: 'Open' },
  { id: 'T-1037', date: 'May 30', symbol: 'MSFT', side: 'SELL', quantity: 25, entry: 441.0, exit: 438.11, pnl: -72.25, pnlPct: -0.7, setup: 'Range', status: 'Loss' },
]

export type Insight = {
  id: string
  title: string
  body: string
  tag: 'Opportunity' | 'Risk' | 'Rebalance' | 'Earnings'
  confidence: number
  time: string
}

export const insights: Insight[] = [
  { id: 'i1', title: 'NVDA momentum strengthening', body: 'Volume-weighted trend score rose to 86. AI model flags continuation likelihood above sector average.', tag: 'Opportunity', confidence: 86, time: '12m ago' },
  { id: 'i2', title: 'Portfolio concentration risk', body: 'Semiconductors now represent 35.6% of holdings. Consider trimming to reduce single-sector exposure.', tag: 'Risk', confidence: 74, time: '1h ago' },
  { id: 'i3', title: 'Rebalance suggestion', body: 'Shifting 4% from TSLA into defensive positions could improve risk-adjusted returns this quarter.', tag: 'Rebalance', confidence: 68, time: '3h ago' },
  { id: 'i4', title: 'AAPL earnings approaching', body: 'Earnings in 9 days. Implied volatility is elevated; historical post-earnings drift is positive.', tag: 'Earnings', confidence: 71, time: '5h ago' },
]

export const equityCurve = [
  { date: 'Jan', value: 98200 },
  { date: 'Feb', value: 101500 },
  { date: 'Mar', value: 99800 },
  { date: 'Apr', value: 108300 },
  { date: 'May', value: 115700 },
  { date: 'Jun', value: 121480 },
  { date: 'Jul', value: 118900 },
  { date: 'Aug', value: 127400 },
  { date: 'Sep', value: 133800 },
  { date: 'Oct', value: 131200 },
  { date: 'Nov', value: 139600 },
  { date: 'Dec', value: 142199 },
]

export const allocation = [
  { sector: 'Technology', pct: 42, fill: 'var(--color-tech)' },
  { sector: 'Semiconductors', pct: 36, fill: 'var(--color-semi)' },
  { sector: 'Consumer', pct: 14, fill: 'var(--color-consumer)' },
  { sector: 'Cash', pct: 8, fill: 'var(--color-cash)' },
]

export const goals = [
  { id: 'g1', title: 'Reach $200k portfolio', current: 142199, target: 200000, due: 'Dec 2026' },
  { id: 'g2', title: 'Maintain 60% win rate', current: 58, target: 60, due: 'Ongoing', unit: '%' },
  { id: 'g3', title: 'Cap max drawdown at 10%', current: 6.4, target: 10, due: 'Ongoing', unit: '%' },
  { id: 'g4', title: 'Add $2k monthly', current: 1450, target: 2000, due: 'This month' },
]

// Daily P/L for the trailing two trading weeks (dashboard chart).
export const dailyPnl = [
  { day: 'Mon', pnl: 820 },
  { day: 'Tue', pnl: -340 },
  { day: 'Wed', pnl: 1260 },
  { day: 'Thu', pnl: 540 },
  { day: 'Fri', pnl: -180 },
  { day: 'Mon ', pnl: 960 },
  { day: 'Tue ', pnl: 1480 },
  { day: 'Wed ', pnl: -620 },
  { day: 'Thu ', pnl: 720 },
  { day: 'Fri ', pnl: 1932 },
]

// Cumulative progress toward the primary $200k portfolio goal vs. target pace.
export const goalProgress = [
  { month: 'Jan', actual: 98, target: 110 },
  { month: 'Feb', actual: 102, target: 118 },
  { month: 'Mar', actual: 100, target: 126 },
  { month: 'Apr', actual: 108, target: 134 },
  { month: 'May', actual: 116, target: 142 },
  { month: 'Jun', actual: 121, target: 150 },
  { month: 'Jul', actual: 119, target: 158 },
  { month: 'Aug', actual: 127, target: 166 },
  { month: 'Sep', actual: 134, target: 174 },
  { month: 'Oct', actual: 131, target: 182 },
  { month: 'Nov', actual: 140, target: 191 },
  { month: 'Dec', actual: 142, target: 200 },
]
