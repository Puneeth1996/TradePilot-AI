import { Calendar, TrendingUp, Activity, Gauge, Scale } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { EquityChart } from '@/components/equity-chart'
import { PnlBarChart } from '@/components/pnl-bar-chart'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const metrics = [
  { label: 'Sharpe Ratio', value: '1.84', hint: 'Risk-adjusted return' },
  { label: 'Max Drawdown', value: '-6.4%', hint: 'Peak to trough' },
  { label: 'Profit Factor', value: '2.31', hint: 'Gross win / loss' },
  { label: 'Avg Hold Time', value: '4.2d', hint: 'Per position' },
  { label: 'Beta', value: '1.12', hint: 'vs S&P 500' },
  { label: 'Volatility', value: '14.8%', hint: 'Annualized' },
]

export default function AnalyticsPage() {
  return (
    <>
      <PageHeader
        title="Analytics"
        description="Deep performance metrics and risk analysis for your strategy."
        actions={
          <Button variant="outline" className="border-border bg-card">
            <Calendar className="size-4" />
            Last 12 months
          </Button>
        }
      />

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <StatCard label="Total Return" value="+44.8%" delta="12.3%" trend="up" icon={TrendingUp} hint="YTD" />
        <StatCard label="Sharpe Ratio" value="1.84" delta="0.2" trend="up" icon={Gauge} />
        <StatCard label="Max Drawdown" value="-6.4%" delta="Improved" trend="up" icon={Activity} />
        <StatCard label="Profit Factor" value="2.31" delta="0.15" trend="up" icon={Scale} />
      </div>

      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Equity Curve</CardTitle>
          </CardHeader>
          <CardContent>
            <EquityChart />
          </CardContent>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Monthly P&L</CardTitle>
          </CardHeader>
          <CardContent>
            <PnlBarChart />
          </CardContent>
        </Card>
      </div>

      <Card className="mt-4">
        <CardHeader>
          <CardTitle className="text-base">Risk Metrics</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-2 gap-px overflow-hidden rounded-xl border border-border bg-border md:grid-cols-3 lg:grid-cols-6">
          {metrics.map((m) => (
            <div key={m.label} className="bg-card p-4">
              <p className="font-mono text-xl font-semibold text-foreground">{m.value}</p>
              <p className="mt-1 text-xs font-medium text-foreground">{m.label}</p>
              <p className="mt-0.5 text-[11px] text-muted-foreground">{m.hint}</p>
            </div>
          ))}
        </CardContent>
      </Card>
    </>
  )
}
