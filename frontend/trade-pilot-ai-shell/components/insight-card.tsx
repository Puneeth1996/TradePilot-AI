import { Sparkles, TrendingUp, AlertTriangle, Scale, CalendarClock } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Insight } from '@/lib/mock-data'

const tagMeta: Record<
  Insight['tag'],
  { icon: typeof Sparkles; className: string }
> = {
  Opportunity: { icon: TrendingUp, className: 'bg-success/15 text-success' },
  Risk: { icon: AlertTriangle, className: 'bg-destructive/15 text-destructive' },
  Rebalance: { icon: Scale, className: 'bg-info/15 text-info' },
  Earnings: { icon: CalendarClock, className: 'bg-chart-4/15 text-chart-4' },
}

export function InsightCard({ insight }: { insight: Insight }) {
  const meta = tagMeta[insight.tag]
  const Icon = meta.icon
  return (
    <div className="rounded-xl border border-border bg-card p-4 transition-colors hover:border-primary/40">
      <div className="flex items-start justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className={cn('flex items-center gap-1 rounded-md px-2 py-0.5 text-xs font-medium', meta.className)}>
            <Icon className="size-3" />
            {insight.tag}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{insight.time}</span>
      </div>
      <h3 className="mt-3 text-sm font-semibold text-card-foreground">{insight.title}</h3>
      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">{insight.body}</p>
      <div className="mt-3 flex items-center gap-2">
        <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-secondary">
          <div
            className="h-full rounded-full bg-primary"
            style={{ width: `${insight.confidence}%` }}
          />
        </div>
        <span className="font-mono text-xs font-medium text-muted-foreground">
          {insight.confidence}% confidence
        </span>
      </div>
    </div>
  )
}
