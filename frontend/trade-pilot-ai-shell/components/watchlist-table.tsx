import { cn } from '@/lib/utils'
import { watchlist } from '@/lib/mock-data'

export function WatchlistTable({ limit }: { limit?: number }) {
  const rows = limit ? watchlist.slice(0, limit) : watchlist
  return (
    <div className="flex flex-col">
      {rows.map((s) => {
        const up = s.change >= 0
        return (
          <div
            key={s.symbol}
            className="flex items-center justify-between gap-3 border-b border-border px-1 py-3 last:border-0"
          >
            <div className="flex items-center gap-3">
              <div className="flex size-9 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-foreground">
                {s.symbol.slice(0, 2)}
              </div>
              <div className="leading-tight">
                <p className="text-sm font-medium text-foreground">{s.symbol}</p>
                <p className="max-w-[120px] truncate text-xs text-muted-foreground">{s.name}</p>
              </div>
            </div>
            <div className="text-right leading-tight">
              <p className="font-mono text-sm font-medium text-foreground">${s.price.toFixed(2)}</p>
              <p
                className={cn(
                  'font-mono text-xs font-medium',
                  up ? 'text-success' : 'text-destructive',
                )}
              >
                {up ? '+' : ''}
                {s.changePct.toFixed(2)}%
              </p>
            </div>
          </div>
        )
      })}
    </div>
  )
}
