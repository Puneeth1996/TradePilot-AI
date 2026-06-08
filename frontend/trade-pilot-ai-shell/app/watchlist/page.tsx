'use client'

import * as React from 'react'
import {
	Plus,
	Search,
	Trash2,
	BarChart2,
	Eye,
	TrendingUp,
	TrendingDown,
	Activity,
	X,
} from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Badge } from '@/components/ui/badge'
import {
	Table,
	TableHeader,
	TableBody,
	TableRow,
	TableHead,
	TableCell,
} from '@/components/ui/table'
import { watchlist as seed, type Recommendation, type Stock } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

// ── helpers ────────────────────────────────────────────────────────────────────

const REC_STYLES: Record<Recommendation, string> = {
	'Strong Buy': 'border-transparent bg-success/20 text-success',
	Buy:          'border-transparent bg-success/10 text-success',
	Hold:         'border-transparent bg-secondary text-muted-foreground',
	Sell:         'border-transparent bg-destructive/15 text-destructive',
}

function scoreColor(n: number) {
	if (n >= 75) return 'text-success'
	if (n >= 55) return 'text-foreground'
	return 'text-destructive'
}

function pctClass(n: number) {
	return n >= 0 ? 'text-success' : 'text-destructive'
}

function fmt(n: number, prefix = true) {
	const sign = n >= 0 ? (prefix ? '+' : '') : ''
	return `${sign}${n.toFixed(2)}%`
}

// ── Add-stock modal ────────────────────────────────────────────────────────────

type AddModalProps = { onClose: () => void; onAdd: (s: Stock) => void }

function AddStockModal({ onClose, onAdd }: AddModalProps) {
	const [form, setForm] = React.useState({
		symbol: '', name: '', price: '', change: '', weeklyChange: '',
		score: '', recommendation: 'Buy' as Recommendation, confidence: '',
	})

	function set(k: string, v: string) {
		setForm(f => ({ ...f, [k]: v }))
	}

	function submit(e: React.FormEvent) {
		e.preventDefault()
		const price   = parseFloat(form.price)   || 0
		const change  = parseFloat(form.change)  || 0
		const weekly  = parseFloat(form.weeklyChange) || 0
		const score   = Math.min(100, Math.max(0, parseInt(form.score) || 50))
		const conf    = Math.min(100, Math.max(0, parseInt(form.confidence) || 50))
		const changePct = price > 0 ? (change / (price - change)) * 100 : 0
		onAdd({
			symbol:           form.symbol.toUpperCase().trim(),
			name:             form.name.trim() || form.symbol.toUpperCase().trim(),
			price,
			change,
			changePct,
			weeklyChangePct:  weekly,
			score,
			recommendation:   form.recommendation,
			confidence:       conf,
		})
		onClose()
	}

	const inputCls = 'h-9 bg-card border-border text-sm text-foreground placeholder:text-muted-foreground'
	const labelCls = 'block text-xs font-medium text-muted-foreground mb-1'

	return (
		<div className='fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4'>
			<div className='w-full max-w-md rounded-xl border border-border bg-card shadow-2xl'>
				{/* header */}
				<div className='flex items-center justify-between border-b border-border px-5 py-4'>
					<div className='flex items-center gap-2'>
						<div className='flex size-7 items-center justify-center rounded-md bg-primary/15'>
							<Plus className='size-4 text-primary' />
						</div>
						<h2 className='text-sm font-semibold text-foreground'>Add Stock to Watchlist</h2>
					</div>
					<button onClick={onClose} className='rounded-md p-1 text-muted-foreground hover:bg-secondary hover:text-foreground transition-colors'>
						<X className='size-4' />
					</button>
				</div>

				{/* form */}
				<form onSubmit={submit} className='p-5 space-y-4'>
					<div className='grid grid-cols-2 gap-3'>
						<div>
							<label className={labelCls}>Symbol *</label>
							<Input required value={form.symbol} onChange={e => set('symbol', e.target.value)}
								placeholder='AAPL' className={inputCls} />
						</div>
						<div>
							<label className={labelCls}>Company</label>
							<Input value={form.name} onChange={e => set('name', e.target.value)}
								placeholder='Apple Inc.' className={inputCls} />
						</div>
					</div>

					<div className='grid grid-cols-3 gap-3'>
						<div>
							<label className={labelCls}>Price ($)</label>
							<Input type='number' step='0.01' value={form.price} onChange={e => set('price', e.target.value)}
								placeholder='0.00' className={inputCls} />
						</div>
						<div>
							<label className={labelCls}>Daily Chg ($)</label>
							<Input type='number' step='0.01' value={form.change} onChange={e => set('change', e.target.value)}
								placeholder='0.00' className={inputCls} />
						</div>
						<div>
							<label className={labelCls}>Weekly (%)</label>
							<Input type='number' step='0.01' value={form.weeklyChange} onChange={e => set('weeklyChange', e.target.value)}
								placeholder='0.00' className={inputCls} />
						</div>
					</div>

					<div className='grid grid-cols-3 gap-3'>
						<div>
							<label className={labelCls}>Score (0-100)</label>
							<Input type='number' min={0} max={100} value={form.score} onChange={e => set('score', e.target.value)}
								placeholder='50' className={inputCls} />
						</div>
						<div>
							<label className={labelCls}>AI Rec</label>
							<select value={form.recommendation} onChange={e => set('recommendation', e.target.value as Recommendation)}
								className='h-9 w-full rounded-md border border-border bg-card px-3 text-sm text-foreground'>
								{(['Strong Buy', 'Buy', 'Hold', 'Sell'] as Recommendation[]).map(r => (
									<option key={r} value={r}>{r}</option>
								))}
							</select>
						</div>
						<div>
							<label className={labelCls}>Confidence (%)</label>
							<Input type='number' min={0} max={100} value={form.confidence} onChange={e => set('confidence', e.target.value)}
								placeholder='50' className={inputCls} />
						</div>
					</div>

					<div className='flex justify-end gap-2 pt-1'>
						<Button type='button' variant='outline' size='sm' onClick={onClose}>Cancel</Button>
						<Button type='submit' size='sm' disabled={!form.symbol.trim()}>
							<Plus className='size-3.5' />
							Add to Watchlist
						</Button>
					</div>
				</form>
			</div>
		</div>
	)
}

// ── Confidence bar ─────────────────────────────────────────────────────────────

function ConfidenceBar({ value }: { value: number }) {
	const color = value >= 75 ? 'bg-success' : value >= 50 ? 'bg-primary' : 'bg-muted-foreground'
	return (
		<div className='flex items-center gap-2 min-w-[80px]'>
			<div className='h-1.5 w-16 rounded-full bg-secondary overflow-hidden'>
				<div className={cn('h-full rounded-full transition-all', color)} style={{ width: `${value}%` }} />
			</div>
			<span className='font-mono text-xs tabular-nums text-muted-foreground'>{value}%</span>
		</div>
	)
}

// ── Page ───────────────────────────────────────────────────────────────────────

export default function WatchlistPage() {
	const [items, setItems]   = React.useState<Stock[]>(seed)
	const [query, setQuery]   = React.useState('')
	const [modal, setModal]   = React.useState(false)

	const filtered = React.useMemo(
		() => items.filter(i =>
			i.symbol.toLowerCase().includes(query.toLowerCase()) ||
			i.name.toLowerCase().includes(query.toLowerCase())
		),
		[items, query],
	)

	const stats = React.useMemo(() => ({
		total: items.length,
		buy:   items.filter(i => i.recommendation === 'Buy' || i.recommendation === 'Strong Buy').length,
		watch: items.filter(i => i.recommendation === 'Hold').length,
	}), [items])

	function addStock(s: Stock)   { setItems(prev => [s, ...prev]) }
	function removeStock(sym: string) { setItems(prev => prev.filter(i => i.symbol !== sym)) }

	return (
		<>
			{modal && <AddStockModal onClose={() => setModal(false)} onAdd={addStock} />}

			<div className='space-y-5'>
				<PageHeader
					title='Watchlist'
					description='Monitor tracked symbols, AI signals, and scoring in real time.'
					actions={
						<Button onClick={() => setModal(true)} size='sm'>
							<Plus className='size-4' />
							Add Stock
						</Button>
					}
				/>

				{/* ── Summary cards ── */}
				<div className='grid grid-cols-1 gap-3 sm:grid-cols-3'>
					<SummaryCard
						label='Stocks Tracked'
						value={stats.total}
						icon={<Activity className='size-4' />}
						accent='text-primary'
					/>
					<SummaryCard
						label='Buy Signals'
						value={stats.buy}
						icon={<TrendingUp className='size-4' />}
						accent='text-success'
					/>
					<SummaryCard
						label='Watch / Hold'
						value={stats.watch}
						icon={<TrendingDown className='size-4' />}
						accent='text-muted-foreground'
					/>
				</div>

				{/* ── Filter ── */}
				<div className='relative max-w-xs'>
					<Search className='pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground' />
					<Input
						value={query}
						onChange={e => setQuery(e.currentTarget.value)}
						placeholder='Filter by symbol or company…'
						className='h-9 border-border bg-card pl-9 text-sm'
					/>
				</div>

				{/* ── Table ── */}
				<Card className='overflow-hidden'>
					<CardHeader className='border-b border-border px-5 py-3'>
						<CardTitle className='text-sm font-medium text-muted-foreground'>
							{filtered.length} of {items.length} symbols
						</CardTitle>
					</CardHeader>
					<CardContent className='p-0'>
						<div className='overflow-x-auto'>
							<Table>
								<TableHeader>
									<TableRow className='border-border hover:bg-transparent'>
										<TableHead className='pl-5 text-xs'>Symbol</TableHead>
										<TableHead className='text-xs'>Company</TableHead>
										<TableHead className='text-right text-xs'>Price</TableHead>
										<TableHead className='text-right text-xs'>Daily</TableHead>
										<TableHead className='text-right text-xs'>Weekly</TableHead>
										<TableHead className='text-right text-xs'>Score</TableHead>
										<TableHead className='text-center text-xs'>AI Rec</TableHead>
										<TableHead className='text-xs'>Confidence</TableHead>
										<TableHead className='pr-5 text-center text-xs'>Actions</TableHead>
									</TableRow>
								</TableHeader>
								<TableBody>
									{filtered.length === 0 && (
										<TableRow>
											<TableCell colSpan={9} className='py-12 text-center text-sm text-muted-foreground'>
												No symbols match your filter.
											</TableCell>
										</TableRow>
									)}
									{filtered.map(s => (
										<TableRow key={s.symbol} className='group border-border hover:bg-secondary/30 transition-colors'>
											{/* Symbol */}
											<TableCell className='pl-5'>
												<div className='flex items-center gap-3'>
													<div className='flex size-8 shrink-0 items-center justify-center rounded-md bg-secondary font-mono text-xs font-bold text-foreground'>
														{s.symbol.slice(0, 2)}
													</div>
													<span className='font-mono text-sm font-semibold text-foreground'>
														{s.symbol}
													</span>
												</div>
											</TableCell>

											{/* Company */}
											<TableCell className='max-w-[160px] truncate text-sm text-muted-foreground'>
												{s.name}
											</TableCell>

											{/* Price */}
											<TableCell className='text-right font-mono text-sm font-medium text-foreground tabular-nums'>
												${s.price.toFixed(2)}
											</TableCell>

											{/* Daily */}
											<TableCell className={cn('text-right font-mono text-xs font-medium tabular-nums', pctClass(s.changePct))}>
												{fmt(s.changePct)}
											</TableCell>

											{/* Weekly */}
											<TableCell className={cn('text-right font-mono text-xs font-medium tabular-nums', pctClass(s.weeklyChangePct))}>
												{fmt(s.weeklyChangePct)}
											</TableCell>

											{/* Score */}
											<TableCell className={cn('text-right font-mono text-sm font-bold tabular-nums', scoreColor(s.score))}>
												{s.score}
											</TableCell>

											{/* AI Rec */}
											<TableCell className='text-center'>
												<Badge variant='outline' className={cn('text-[11px]', REC_STYLES[s.recommendation])}>
													{s.recommendation}
												</Badge>
											</TableCell>

											{/* Confidence */}
											<TableCell>
												<ConfidenceBar value={s.confidence} />
											</TableCell>

											{/* Actions */}
											<TableCell className='pr-5'>
												<div className='flex items-center justify-center gap-1 opacity-60 group-hover:opacity-100 transition-opacity'>
													<Button
														size='sm'
														variant='ghost'
														className='h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground'
														onClick={() => alert(`Open analysis for ${s.symbol}`)}
													>
														<Eye className='size-3.5' />
														<span className='hidden sm:inline'>Analysis</span>
													</Button>
													<Button
														size='sm'
														variant='ghost'
														className='h-7 gap-1.5 px-2 text-xs text-muted-foreground hover:text-foreground'
														onClick={() => alert(`Open chart for ${s.symbol}`)}
													>
														<BarChart2 className='size-3.5' />
														<span className='hidden sm:inline'>Chart</span>
													</Button>
													<Button
														size='sm'
														variant='ghost'
														className='h-7 px-2 text-destructive hover:bg-destructive/10 hover:text-destructive'
														onClick={() => removeStock(s.symbol)}
													>
														<Trash2 className='size-3.5' />
													</Button>
												</div>
											</TableCell>
										</TableRow>
									))}
								</TableBody>
							</Table>
						</div>
					</CardContent>
				</Card>
			</div>
		</>
	)
}

// ── tiny internal component ────────────────────────────────────────────────────

function SummaryCard({
	label, value, icon, accent,
}: { label: string; value: number; icon: React.ReactNode; accent: string }) {
	return (
		<Card className='flex items-center gap-4 p-4'>
			<div className={cn('flex size-10 shrink-0 items-center justify-center rounded-lg bg-secondary', accent)}>
				{icon}
			</div>
			<div>
				<p className='text-xs text-muted-foreground'>{label}</p>
				<p className={cn('mt-0.5 font-mono text-2xl font-bold tabular-nums', accent)}>{value}</p>
			</div>
		</Card>
	)
}
