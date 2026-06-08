import { Download, Plus, ArrowUpRight, ArrowDownRight } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { AllocationChart } from '@/components/allocation-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table'
import { holdings } from '@/lib/mock-data'

export default function PortfolioPage() {
  return (
    <>
      <PageHeader
        title="Portfolio"
        description="Your positions, allocation, and performance across all holdings."
        actions={
          <>
            <Button variant="outline" className="border-border bg-card">
              <Download className="size-4" />
              Export
            </Button>
            <Button>
              <Plus className="size-4" />
              Add Position
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-1 gap-4 lg:grid-cols-3">
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle className="text-base">Allocation</CardTitle>
          </CardHeader>
          <CardContent>
            <AllocationChart />
          </CardContent>
        </Card>

        <Card className="lg:col-span-2">
          <CardHeader>
            <CardTitle className="text-base">Summary</CardTitle>
          </CardHeader>
          <CardContent className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-4">
            {[
              { label: 'Invested', value: '$110,797' },
              { label: 'Market Value', value: '$142,199' },
              { label: 'Unrealized P&L', value: '+$31,402', accent: 'text-success' },
              { label: 'Day Change', value: '+2.84%', accent: 'text-success' },
            ].map((s) => (
              <div key={s.label} className="bg-card p-4">
                <p className="text-xs font-medium text-muted-foreground">{s.label}</p>
                <p className={`mt-1.5 font-mono text-lg font-semibold ${s.accent ?? 'text-foreground'}`}>
                  {s.value}
                </p>
              </div>
            ))}
            <div className="col-span-2 bg-card p-4 md:col-span-4">
              <p className="text-xs font-medium text-muted-foreground">Diversification score</p>
              <div className="mt-2 flex items-center gap-3">
                <div className="h-2 flex-1 overflow-hidden rounded-full bg-secondary">
                  <div className="h-full w-[64%] rounded-full bg-primary" />
                </div>
                <span className="font-mono text-sm font-medium text-foreground">64 / 100</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Holdings</CardTitle>
        </CardHeader>
        <CardContent className="px-0">
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow className="border-border hover:bg-transparent">
                  <TableHead>Symbol</TableHead>
                  <TableHead className="text-right">Shares</TableHead>
                  <TableHead className="text-right">Avg Cost</TableHead>
                  <TableHead className="text-right">Price</TableHead>
                  <TableHead className="text-right">Value</TableHead>
                  <TableHead className="text-right">Return</TableHead>
                  <TableHead className="text-right">Weight</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {holdings.map((h) => {
                  const up = h.changePct >= 0
                  return (
                    <TableRow key={h.symbol} className="border-border">
                      <TableCell>
                        <div className="flex items-center gap-3">
                          <div className="flex size-8 items-center justify-center rounded-lg bg-secondary text-xs font-semibold text-foreground">
                            {h.symbol.slice(0, 2)}
                          </div>
                          <div className="leading-tight">
                            <p className="text-sm font-medium text-foreground">{h.symbol}</p>
                            <p className="text-xs text-muted-foreground">{h.name}</p>
                          </div>
                        </div>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-foreground">{h.shares}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">${h.avgCost.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-foreground">${h.price.toFixed(2)}</TableCell>
                      <TableCell className="text-right font-mono text-sm text-foreground">${h.value.toLocaleString()}</TableCell>
                      <TableCell className="text-right">
                        <span className={`inline-flex items-center justify-end gap-0.5 font-mono text-sm font-medium ${up ? 'text-success' : 'text-destructive'}`}>
                          {up ? <ArrowUpRight className="size-3.5" /> : <ArrowDownRight className="size-3.5" />}
                          {Math.abs(h.changePct).toFixed(1)}%
                        </span>
                      </TableCell>
                      <TableCell className="text-right font-mono text-sm text-muted-foreground">{h.allocation}%</TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </>
  )
}
