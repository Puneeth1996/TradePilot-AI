'use client'

import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Cell, ReferenceLine } from 'recharts'
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart'
import { dailyPnl } from '@/lib/mock-data'

const config = { pnl: { label: 'Daily P/L' } } satisfies ChartConfig

export function DailyPnlChart({ height = 'h-64' }: { height?: string }) {
  return (
    <ChartContainer config={config} className={`${height} w-full`}>
      <BarChart data={dailyPnl} margin={{ left: 4, right: 4, top: 8 }}>
        <CartesianGrid vertical={false} stroke="var(--border)" strokeDasharray="3 3" />
        <XAxis
          dataKey="day"
          tickLine={false}
          axisLine={false}
          tickMargin={8}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          width={44}
          tick={{ fill: 'var(--muted-foreground)', fontSize: 12 }}
          tickFormatter={(v) => `$${(v / 1000).toFixed(1)}k`}
        />
        <ReferenceLine y={0} stroke="var(--border)" />
        <ChartTooltip
          cursor={{ fill: 'var(--secondary)' }}
          content={<ChartTooltipContent formatter={(v) => `$${Number(v).toLocaleString()}`} />}
        />
        <Bar dataKey="pnl" radius={[3, 3, 0, 0]}>
          {dailyPnl.map((d, i) => (
            <Cell key={i} fill={d.pnl >= 0 ? 'var(--chart-1)' : 'var(--chart-3)'} />
          ))}
        </Bar>
      </BarChart>
    </ChartContainer>
  )
}
