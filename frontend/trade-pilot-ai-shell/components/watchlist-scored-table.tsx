import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { Badge } from '@/components/ui/badge'
import { cn } from '@/lib/utils'
import { watchlist, type Recommendation } from '@/lib/mock-data'

const recStyles: Record<Recommendation, string> = {
  'Strong Buy': 'border-transparent bg-success/15 text-success',
  Buy: 'border-transparent bg-success/10 text-success',
  Hold: 'border-transparent bg-secondary text-muted-foreground',
  Sell: 'border-transparent bg-destructive/15 text-destructive',
}

function scoreColor(score: number) {
  if (score >= 75) return 'text-success'
  if (score >= 55) return 'text-foreground'
  return 'text-destructive'
}

export function WatchlistScoredTable({ limit }: { limit?: number }) {
  const rows = (limit ? watchlist.slice(0, limit) : watchlist)

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="text-xs">Symbol</TableHead>
          <TableHead className="text-right text-xs">Price</TableHead>
          <TableHead className="text-right text-xs">Change %</TableHead>
          <TableHead className="text-right text-xs">Score</TableHead>
          <TableHead className="text-right text-xs">Recommendation</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((s) => {
          const up = s.changePct >= 0
          return (
            <TableRow key={s.symbol} className="border-border">
              <TableCell>
                <div className="leading-tight">
                  <p className="font-medium text-foreground">{s.symbol}</p>
                  <p className="max-w-[140px] truncate text-xs text-muted-foreground">{s.name}</p>
                </div>
              </TableCell>
              <TableCell className="text-right font-mono text-foreground">
                ${s.price.toFixed(2)}
              </TableCell>
              <TableCell
                className={cn(
                  'text-right font-mono font-medium',
                  up ? 'text-success' : 'text-destructive',
                )}
              >
                {up ? '+' : ''}
                {s.changePct.toFixed(2)}%
              </TableCell>
              <TableCell className={cn('text-right font-mono font-semibold', scoreColor(s.score))}>
                {s.score}
              </TableCell>
              <TableCell className="text-right">
                <Badge variant="outline" className={recStyles[s.recommendation]}>
                  {s.recommendation}
                </Badge>
              </TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
