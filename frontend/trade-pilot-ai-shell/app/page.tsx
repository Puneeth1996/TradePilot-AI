import {
  Wallet,
  TrendingUp,
  CalendarDays,
  LineChart as LineChartIcon,
  Target,
  Percent,
  Plus,
  Sparkles,
  ArrowUpRight,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { EquityChart } from '@/components/equity-chart'
import { DailyPnlChart } from '@/components/daily-pnl-chart'
import { GoalProgressChart } from '@/components/goal-progress-chart'
import { RecentTradesTable } from '@/components/recent-trades-table'
import { WatchlistScoredTable } from '@/components/watchlist-scored-table'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'

const ranges = ['1D', '1W', '1M', '3M', '1Y', 'ALL']

export default function DashboardPage() {
  return (
    <>
      <PageHeader
        title="Dashboard"
        description="Welcome back, Alex. Here's your trading workstation at a glance."
        actions={
          <>
            <Button variant="outline" className="border-border bg-card">
              <Sparkles className="size-4 text-primary" />
              Ask AI
            </Button>
            <Button>
              <Plus className="size-4" />
              New Trade
            </Button>
          </>
        }
      />

      {/* Stat cards */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <StatCard label="Total Portfolio Value" value="$142,199.40" delta="2.84%" trend="up" icon={Wallet} hint="all accounts" />
        <StatCard label="Daily P/L" value="+$1,932.00" delta="1.38%" trend="up" icon={TrendingUp} hint="today" />
        <StatCard label="Weekly P/L" value="+$4,470.00" delta="3.24%" trend="up" icon={CalendarDays} hint="this week" />
        <StatCard label="Monthly Growth" value="+$8,399.00" delta="6.28%" trend="up" icon={LineChartIcon} hint="this month" />
        <StatCard label="Goal Progress" value="71.1%" delta="$200k goal" trend="neutral" icon={Target} hint="of target" />
        <StatCard label="Win Rate" value="58.4%" delta="1.2%" trend="up" icon={Percent} hint="30 days" />
      </div>

      {/* Charts */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-3">
        <Card className="xl:col-span-2">
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
            <div>
              <CardTitle className="text-base">Portfolio Growth</CardTitle>
              <div className="mt-1 flex items-baseline gap-2">
                <span className="font-mono text-2xl font-semibold text-foreground">$142,199.40</span>
                <span className="flex items-center gap-0.5 text-sm font-medium text-success">
                  <ArrowUpRight className="size-4" />
                  +$3,932.18 (2.84%)
                </span>
              </div>
            </div>
            <div className="hidden items-center gap-1 rounded-lg border border-border bg-secondary/50 p-0.5 sm:flex">
              {ranges.map((r, i) => (
                <button
                  key={r}
                  className={
                    i === 2
                      ? 'rounded-md bg-card px-2.5 py-1 text-xs font-medium text-foreground shadow-sm'
                      : 'rounded-md px-2.5 py-1 text-xs font-medium text-muted-foreground hover:text-foreground'
                  }
                >
                  {r}
                </button>
              ))}
            </div>
          </CardHeader>
          <CardContent>
            <EquityChart />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="space-y-0">
            <CardTitle className="text-base">Daily P/L</CardTitle>
            <CardDescription>Realized gains over the last 10 sessions</CardDescription>
          </CardHeader>
          <CardContent>
            <DailyPnlChart />
          </CardContent>
        </Card>
      </div>

      <div className="mt-4">
        <Card>
          <CardHeader className="flex flex-row items-start justify-between gap-3 space-y-0">
            <div>
              <CardTitle className="text-base">Goal Progress</CardTitle>
              <CardDescription>Portfolio value vs. target pace toward the $200k goal</CardDescription>
            </div>
            <div className="hidden items-center gap-4 text-xs text-muted-foreground sm:flex">
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-4 rounded-full bg-[var(--chart-2)]" />
                Actual
              </span>
              <span className="flex items-center gap-1.5">
                <span className="h-0.5 w-4 rounded-full bg-muted-foreground" />
                Target
              </span>
            </div>
          </CardHeader>
          <CardContent>
            <GoalProgressChart />
          </CardContent>
        </Card>
      </div>

      {/* Tables */}
      <div className="mt-4 grid grid-cols-1 gap-4 xl:grid-cols-2">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Recent Trades</CardTitle>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
              View journal
            </Button>
          </CardHeader>
          <CardContent>
            <RecentTradesTable limit={6} />
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0">
            <CardTitle className="text-base">Watchlist</CardTitle>
            <Button variant="ghost" size="sm" className="h-7 text-xs text-muted-foreground">
              View all
            </Button>
          </CardHeader>
          <CardContent>
            <WatchlistScoredTable limit={6} />
          </CardContent>
        </Card>
      </div>
    </>
  )
}
