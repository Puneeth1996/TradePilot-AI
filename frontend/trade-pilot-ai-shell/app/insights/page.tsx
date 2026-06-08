import { Sparkles, Send, Zap, Brain, ShieldCheck } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { InsightCard } from '@/components/insight-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import { insights } from '@/lib/mock-data'

const prompts = [
  'Analyze my portfolio risk',
  'Find breakout candidates',
  'Summarize today’s market',
  'Suggest a rebalance',
]

const signals = [
  { icon: Zap, label: 'Momentum Signals', value: 3, tone: 'text-success' },
  { icon: ShieldCheck, label: 'Risk Alerts', value: 1, tone: 'text-destructive' },
  { icon: Brain, label: 'Model Confidence', value: '78%', tone: 'text-info' },
]

export default function InsightsPage() {
  return (
    <>
      <PageHeader
        title="AI Insights"
        description="Personalized, model-generated intelligence for your portfolio."
        actions={<Badge className="bg-info/15 text-info">Beta</Badge>}
      />

      <Card className="mb-4 overflow-hidden border-primary/30 bg-gradient-to-br from-accent/40 to-card">
        <CardContent className="flex flex-col gap-4 p-5">
          <div className="flex items-center gap-2">
            <div className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
              <Sparkles className="size-5" />
            </div>
            <div>
              <p className="text-sm font-semibold text-foreground">TradePilot Copilot</p>
              <p className="text-xs text-muted-foreground">Ask anything about your portfolio or the markets</p>
            </div>
          </div>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Input placeholder="e.g. What's my biggest risk right now?" className="h-10 flex-1 border-border bg-card" />
            <Button className="h-10">
              <Send className="size-4" />
              Ask
            </Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {prompts.map((p) => (
              <button
                key={p}
                className="rounded-full border border-border bg-card px-3 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:border-primary/40 hover:text-foreground"
              >
                {p}
              </button>
            ))}
          </div>
        </CardContent>
      </Card>

      <div className="mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3">
        {signals.map((s) => {
          const Icon = s.icon
          return (
            <Card key={s.label} className="gap-0 p-5">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium text-muted-foreground">{s.label}</p>
                <Icon className={`size-4 ${s.tone}`} />
              </div>
              <p className={`mt-2 font-mono text-2xl font-semibold ${s.tone}`}>{s.value}</p>
            </Card>
          )
        })}
      </div>

      <Card>
        <CardHeader>
          <CardTitle className="text-base">Latest Insights</CardTitle>
        </CardHeader>
        <CardContent className="grid grid-cols-1 gap-3 md:grid-cols-2">
          {insights.map((i) => (
            <InsightCard key={i.id} insight={i} />
          ))}
        </CardContent>
      </Card>
    </>
  )
}
