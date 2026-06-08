'use client'

import * as React from 'react'
import { Plus, Filter, TrendingUp, TrendingDown, Target } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { StatCard } from '@/components/stat-card'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import {
	Table,
	TableBody,
	TableCell,
	TableHead,
	TableHeader,
	TableRow,
} from '@/components/ui/table'
import { trades as initialTrades } from '@/lib/mock-data'
import { cn } from '@/lib/utils'

type TradeForm = {
	symbol: string
	entry: number
	exit?: number
	quantity: number
	setup: string
	notes?: string
	emotions?: string
}

const statusStyles: Record<string, string> = {
	Win: 'bg-success/15 text-success',
	Loss: 'bg-destructive/15 text-destructive',
	Open: 'bg-info/15 text-info',
}

export default function JournalPage() {
	const [list, setList] = React.useState(() =>
		initialTrades.map((t) => ({ ...t })),
	)

	const [form, setForm] = React.useState<TradeForm>({
		symbol: '',
		entry: 0,
		exit: undefined,
		quantity: 0,
		setup: '',
		notes: '',
		emotions: '',
	})

	function addTrade(e?: React.FormEvent) {
		e?.preventDefault()
		if (!form.symbol || form.quantity <= 0)
			return alert('Symbol and quantity required')
		const id = `T-${Math.floor(Math.random() * 9000) + 1000}`
		const date = new Date().toLocaleDateString(undefined, {
			month: 'short',
			day: '2-digit',
		})
		const exit = form.exit ?? 0
		const pnl = form.quantity * ((exit || form.entry) - form.entry)
		const pnlPct = form.entry ? (pnl / (form.entry * form.quantity)) * 100 : 0
		const status =
			form.exit && form.exit > 0 ? (pnl >= 0 ? 'Win' : 'Loss') : 'Open'
		const newTrade = {
			id,
			date,
			symbol: form.symbol.toUpperCase(),
			side: exit && exit > 0 && exit < form.entry ? 'SELL' : 'BUY',
			quantity: form.quantity,
			entry: form.entry,
			exit: form.exit ?? 0,
			pnl: Math.round(pnl * 100) / 100,
			pnlPct: Math.round(pnlPct * 10) / 10,
			setup: form.setup || 'Manual',
			status,
			notes: form.notes || '',
			emotions: form.emotions || '',
		}
		setList((s) => [newTrade, ...s])
		setForm({
			symbol: '',
			entry: 0,
			exit: undefined,
			quantity: 0,
			setup: '',
			notes: '',
			emotions: '',
		})
	}

	const stats = React.useMemo(() => {
		const closed = list.filter((t) => t.status !== 'Open')
		const wins = closed.filter((t) => t.status === 'Win')
		const losses = closed.filter((t) => t.status === 'Loss')
		const winRate = closed.length
			? Math.round((wins.length / closed.length) * 1000) / 10
			: 0
		const avgGain = wins.length
			? Math.round((wins.reduce((a, b) => a + b.pnl, 0) / wins.length) * 100) /
				100
			: 0
		const avgLoss = losses.length
			? Math.round(
					(losses.reduce((a, b) => a + b.pnl, 0) / losses.length) * 100,
				) / 100
			: 0
		const profitFactor =
			Math.abs(losses.reduce((a, b) => a + b.pnl, 0)) > 0
				? Math.round(
						(wins.reduce((a, b) => a + b.pnl, 0) /
							Math.abs(losses.reduce((a, b) => a + b.pnl, 0))) *
							100,
					) / 100
				: wins.reduce((a, b) => a + b.pnl, 0)
		return { winRate, avgGain, avgLoss, profitFactor }
	}, [list])

	return (
		<>
			<PageHeader
				title='Trade Journal'
				description='Log, review, and learn from every trade you take.'
				actions={
					<>
						<Button variant='outline' className='border-border bg-card'>
							<Filter className='size-4' />
							Filter
						</Button>
						<Button>
							<Plus className='size-4' />
							Log Trade
						</Button>
					</>
				}
			/>

			<div className='grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4'>
				<StatCard
					label='Total Trades'
					value={`${list.length}`}
					delta='recent'
					trend='neutral'
					icon={Target}
				/>
				<StatCard
					label='Win Rate'
					value={`${stats.winRate}%`}
					delta='vs last'
					trend='up'
					icon={TrendingUp}
					hint='closed trades'
				/>
				<StatCard
					label='Avg Gain'
					value={`$${stats.avgGain}`}
					delta='avg'
					trend='up'
					icon={TrendingUp}
				/>
				<StatCard
					label='Avg Loss'
					value={`$${Math.abs(stats.avgLoss)}`}
					delta='avg'
					trend='down'
					icon={TrendingDown}
				/>
			</div>

			<div className='mt-4 grid grid-cols-1 gap-4 lg:grid-cols-3'>
				<Card className='lg:col-span-2'>
					<CardHeader>
						<CardTitle>Trade Entry</CardTitle>
					</CardHeader>
					<CardContent>
						<form onSubmit={addTrade} className='grid gap-2'>
							<div className='grid grid-cols-2 gap-2'>
								<input
									className='input'
									placeholder='Symbol'
									value={form.symbol}
									onChange={(e) =>
										setForm((f) => ({ ...f, symbol: e.target.value }))
									}
								/>
								<input
									type='number'
									className='input'
									placeholder='Entry Price'
									value={form.entry}
									onChange={(e) =>
										setForm((f) => ({ ...f, entry: Number(e.target.value) }))
									}
								/>
								<input
									type='number'
									className='input'
									placeholder='Exit Price (optional)'
									value={form.exit ?? ''}
									onChange={(e) =>
										setForm((f) => ({
											...f,
											exit: e.target.value ? Number(e.target.value) : undefined,
										}))
									}
								/>
								<input
									type='number'
									className='input'
									placeholder='Quantity'
									value={form.quantity}
									onChange={(e) =>
										setForm((f) => ({ ...f, quantity: Number(e.target.value) }))
									}
								/>
							</div>
							<input
								className='input'
								placeholder='Setup Type'
								value={form.setup}
								onChange={(e) =>
									setForm((f) => ({ ...f, setup: e.target.value }))
								}
							/>
							<textarea
								className='input h-24'
								placeholder='Notes'
								value={form.notes}
								onChange={(e) =>
									setForm((f) => ({ ...f, notes: e.target.value }))
								}
							/>
							<input
								className='input'
								placeholder='Emotions'
								value={form.emotions}
								onChange={(e) =>
									setForm((f) => ({ ...f, emotions: e.target.value }))
								}
							/>
							<div className='flex gap-2'>
								<Button type='submit'>Add Trade</Button>
								<Button
									variant='ghost'
									onClick={() =>
										setForm({
											symbol: '',
											entry: 0,
											exit: undefined,
											quantity: 0,
											setup: '',
											notes: '',
											emotions: '',
										})
									}
								>
									Reset
								</Button>
							</div>
						</form>
					</CardContent>
				</Card>

				<Card>
					<CardHeader>
						<CardTitle>Statistics</CardTitle>
					</CardHeader>
					<CardContent>
						<div className='space-y-2'>
							<div className='flex items-center justify-between'>
								<p className='text-sm text-muted-foreground'>Win Rate</p>
								<p className='font-mono'>{stats.winRate}%</p>
							</div>
							<div className='flex items-center justify-between'>
								<p className='text-sm text-muted-foreground'>Average Gain</p>
								<p className='font-mono'>${stats.avgGain}</p>
							</div>
							<div className='flex items-center justify-between'>
								<p className='text-sm text-muted-foreground'>Average Loss</p>
								<p className='font-mono'>${Math.abs(stats.avgLoss)}</p>
							</div>
							<div className='flex items-center justify-between'>
								<p className='text-sm text-muted-foreground'>Profit Factor</p>
								<p className='font-mono'>{stats.profitFactor}</p>
							</div>
						</div>
					</CardContent>
				</Card>
			</div>

			<Card className='mt-4'>
				<CardHeader>
					<CardTitle className='text-base'>Recent Trades</CardTitle>
				</CardHeader>
				<CardContent className='px-0'>
					<div className='overflow-x-auto'>
						<Table>
							<TableHeader>
								<TableRow className='border-border hover:bg-transparent'>
									<TableHead>Trade</TableHead>
									<TableHead>Date</TableHead>
									<TableHead>Side</TableHead>
									<TableHead className='text-right'>Qty</TableHead>
									<TableHead className='text-right'>Entry</TableHead>
									<TableHead className='text-right'>Exit</TableHead>
									<TableHead className='text-right'>P&L</TableHead>
									<TableHead>Setup</TableHead>
									<TableHead className='text-right'>Status</TableHead>
								</TableRow>
							</TableHeader>
							<TableBody>
								{list.map((t) => {
									const up = t.pnl >= 0
									return (
										<TableRow key={t.id} className='border-border'>
											<TableCell>
												<div className='leading-tight'>
													<p className='text-sm font-medium text-foreground'>
														{t.symbol}
													</p>
													<p className='font-mono text-xs text-muted-foreground'>
														{t.id}
													</p>
												</div>
											</TableCell>
											<TableCell className='text-sm text-muted-foreground'>
												{t.date}
											</TableCell>
											<TableCell>
												<span
													className={cn(
														'font-mono text-xs font-medium',
														t.side === 'BUY'
															? 'text-success'
															: 'text-destructive',
													)}
												>
													{t.side}
												</span>
											</TableCell>
											<TableCell className='text-right font-mono text-sm text-foreground'>
												{t.quantity}
											</TableCell>
											<TableCell className='text-right font-mono text-sm text-muted-foreground'>
												${t.entry.toFixed(2)}
											</TableCell>
											<TableCell className='text-right font-mono text-sm text-muted-foreground'>
												{t.exit ? `$${t.exit.toFixed(2)}` : '—'}
											</TableCell>
											<TableCell className='text-right'>
												{t.status === 'Open' ? (
													<span className='font-mono text-sm text-muted-foreground'>
														—
													</span>
												) : (
													<span
														className={cn(
															'font-mono text-sm font-medium',
															up ? 'text-success' : 'text-destructive',
														)}
													>
														{up ? '+' : ''}${Math.abs(t.pnl).toFixed(0)}
													</span>
												)}
											</TableCell>
											<TableCell>
												<Badge
													variant='secondary'
													className='text-[11px] font-normal'
												>
													{t.setup}
												</Badge>
											</TableCell>
											<TableCell className='text-right'>
												<span
													className={cn(
														'rounded-md px-2 py-0.5 text-xs font-medium',
														statusStyles[t.status],
													)}
												>
													{t.status}
												</span>
											</TableCell>
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
