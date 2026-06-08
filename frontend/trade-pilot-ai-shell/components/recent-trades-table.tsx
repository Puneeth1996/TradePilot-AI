import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { cn } from '@/lib/utils'
import { trades } from '@/lib/mock-data'

export function RecentTradesTable({ limit }: { limit?: number }) {
  const rows = (limit ? trades.slice(0, limit) : trades).filter((t) => t.status !== 'Open')

  return (
    <Table>
      <TableHeader>
        <TableRow className="border-border hover:bg-transparent">
          <TableHead className="text-xs">Symbol</TableHead>
          <TableHead className="text-right text-xs">Entry</TableHead>
          <TableHead className="text-right text-xs">Exit</TableHead>
          <TableHead className="text-right text-xs">Profit</TableHead>
          <TableHead className="text-right text-xs">Date</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rows.map((t) => {
          const up = t.pnl >= 0
          return (
            <TableRow key={t.id} className="border-border">
              <TableCell className="font-medium text-foreground">{t.symbol}</TableCell>
              <TableCell className="text-right font-mono text-muted-foreground">
                ${t.entry.toFixed(2)}
              </TableCell>
              <TableCell className="text-right font-mono text-muted-foreground">
                ${t.exit.toFixed(2)}
              </TableCell>
              <TableCell
                className={cn(
                  'text-right font-mono font-medium',
                  up ? 'text-success' : 'text-destructive',
                )}
              >
                {up ? '+' : '-'}${Math.abs(t.pnl).toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </TableCell>
              <TableCell className="text-right text-muted-foreground">{t.date}</TableCell>
            </TableRow>
          )
        })}
      </TableBody>
    </Table>
  )
}
