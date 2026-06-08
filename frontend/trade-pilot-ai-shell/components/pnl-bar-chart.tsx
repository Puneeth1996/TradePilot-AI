'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell } from 'recharts'
import { ChartContainer, ChartTooltip, ChartTooltipContent, type ChartConfig } from '@/components/ui/chart'

const monthlyPnl = [
  { month: 'Jan', pnl: 2400 },
  { month: 'Feb', pnl: 3100 },
  { month: 'Mar', pnl: -1200 },
  { month: 'Apr', pnl: 4800 },
  { month: 'May', pnl: 5600 },
  { month: 'Jun', pnl: 1900 },
  { month: 'Jul', pnl: -800 },
  { month: 'Aug', pnl: 4200 },
  { month: 'Sep', pnl: 3700 },
  { month: 'Oct', pnl: -1500 },
  { month: 'Nov', pnl: 5100 },
  { month: 'Dec', pnl: 2900 },
]

const config = { pnl: { label: 'Monthly P&L' } } satisfies ChartConfig

export function PnlBarChart() {
  return (
    <ChartContainer config={config} className="h-72 w-full">
      <BarChart data={monthlyPnl} margin={{ left: 4, right: 4, top: 8 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis dataKey="month" tickLine={false} axisLine={false} tickMargin={8} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} />
        <YAxis tickLine={false} axisLine={false} width={48} tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }} tickFormatter={(v) => `$${(v / 1000).toFixed(0)}k`} />
        <ChartTooltip cursor={{ fill: 'var(--secondary)' }} content={<ChartTooltipContent formatter={(v) => `$${Number(v).toLocaleString()}`} />} />
        <Bar dataKey="pnl" radius={[4, 4, 0, 0]}>
          {monthlyPnl.map((d) => (
            <Cell key={d.month} fill={d.pnl >= 0 ? 'var(--chart-1)' : 'var(--chart-3)'} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
