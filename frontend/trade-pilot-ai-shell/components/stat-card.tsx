import type { LucideIcon } from 'lucide-react'
import { ArrowDownRight, ArrowUpRight } from 'lucide-react'
import { cn } from '@/lib/utils'
import { Card } from '@/components/ui/card'

export type StatCardProps = {
  label: string
  value: string
  delta?: string
  trend?: 'up' | 'down' | 'neutral'
  icon: LucideIcon
  hint?: string
}

export function StatCard({ label, value, delta, trend = 'neutral', icon: Icon, hint }: StatCardProps) {
  return (
    <Card className="gap-0 p-5">
      <div className="flex items-center justify-between">
        <p className="text-sm font-medium text-muted-foreground">{label}</p>
        <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-muted-foreground">
          <Icon className="size-4" />
        </div>
      </div>
      <p className="mt-3 font-mono text-xl font-semibold tracking-tight tabular-nums text-foreground">{value}</p>
      <div className="mt-2 flex items-center gap-2">
        {delta && (
          <span
            className={cn(
              'flex items-center gap-0.5 rounded-md px-1.5 py-0.5 text-xs font-medium',
              trend === 'up' && 'bg-success/15 text-success',
              trend === 'down' && 'bg-destructive/15 text-destructive',
              trend === 'neutral' && 'bg-secondary text-muted-foreground',
            )}
          >
            {trend === 'up' && <ArrowUpRight className="size-3" />}
            {trend === 'down' && <ArrowDownRight className="size-3" />}
            {delta}
          </span>
        )}
        {hint && <span className="text-xs text-muted-foreground">{hint}</span>}
      </div>
    </Card>
  )
}
