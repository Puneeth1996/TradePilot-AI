'use client'

import { Pie, PieChart, Cell } from 'recharts'
import { ChartContainer, type ChartConfig } from '@/components/ui/chart'
import { allocation } from '@/lib/mock-data'

const config = {
  tech: { label: 'Technology', color: 'var(--chart-2)' },
  semi: { label: 'Semiconductors', color: 'var(--chart-1)' },
  consumer: { label: 'Consumer', color: 'var(--chart-4)' },
  cash: { label: 'Cash', color: 'var(--chart-5)' },
} satisfies ChartConfig

const colors = ['var(--chart-2)', 'var(--chart-1)', 'var(--chart-4)', 'var(--chart-5)']

export function AllocationChart() {
  return (
    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-6">
      <ChartContainer config={config} className="aspect-square h-44 w-44">
        <PieChart>
          <Pie
            data={allocation}
            dataKey="pct"
            nameKey="sector"
            innerRadius={50}
            outerRadius={75}
            paddingAngle={2}
            strokeWidth={0}
          >
            {allocation.map((entry, i) => (
              <Cell key={entry.sector} fill={colors[i]} />
            ))}
          </Pie>
        </PieChart>
      </ChartContainer>
      <div className="flex flex-1 flex-col gap-2.5">
        {allocation.map((a, i) => (
          <div key={a.sector} className="flex items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="size-2.5 rounded-sm" style={{ background: colors[i] }} />
              <span className="text-sm text-foreground">{a.sector}</span>
            </div>
            <span className="font-mono text-sm font-medium text-muted-foreground">{a.pct}%</span>
          </div>
        ))}
      </div>
    </div>
  )
}
