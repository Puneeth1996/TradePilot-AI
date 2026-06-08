import { Plus, Target, CheckCircle2 } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { goals } from '@/lib/mock-data'
import {
	AreaChart,
	Area,
	XAxis,
	YAxis,
	Tooltip,
	ResponsiveContainer,
	BarChart,
	Bar,
} from 'recharts'

function formatVal(v: number, unit?: string) {
	if (unit === '%') return `${v}%`
	return `$${v.toLocaleString()}`
}

export default function GoalsPage() {
	return (
		<>
			<PageHeader
				title='Goals'
				description='Set targets and track progress toward your trading objectives.'
				actions={
					<Button>
						<Plus className='size-4' />
						New Goal
					</Button>
				}
			/>

			<div className='mb-4 grid grid-cols-1 gap-4 sm:grid-cols-3'>
				<Card className='gap-0 p-5'>
					<p className='text-sm font-medium text-muted-foreground'>
						Active Goals
					</p>
					<p className='mt-2 font-mono text-2xl font-semibold text-foreground'>
						4
					</p>
				</Card>
				<Card className='gap-0 p-5'>
					<p className='text-sm font-medium text-muted-foreground'>On Track</p>
					<p className='mt-2 font-mono text-2xl font-semibold text-success'>
						3
					</p>
				</Card>
				<Card className='gap-0 p-5'>
					<p className='text-sm font-medium text-muted-foreground'>
						Completed YTD
					</p>
					<p className='mt-2 font-mono text-2xl font-semibold text-foreground'>
						7
					</p>
				</Card>
			</div>

			<div className='grid grid-cols-1 gap-4 lg:grid-cols-2'>
				<div>
					<Card>
						<CardHeader>
							<CardTitle>Goal Completion Trend</CardTitle>
						</CardHeader>
						<CardContent>
							<div style={{ height: 200 }}>
								<ResponsiveContainer width='100%' height='100%'>
									<AreaChart
										data={goals.map((g, i) => ({
											name: g.id,
											value: Math.round((g.current / g.target) * 100),
										}))}
									>
										<XAxis dataKey='name' />
										<YAxis unit='%' />
										<Tooltip />
										<Area
											dataKey='value'
											stroke='var(--color-value)'
											fill='var(--chart-2)'
										/>
									</AreaChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>

					<Card className='mt-4'>
						<CardHeader>
							<CardTitle>Monthly Progress</CardTitle>
						</CardHeader>
						<CardContent>
							<div style={{ height: 160 }}>
								<ResponsiveContainer width='100%' height='100%'>
									<BarChart
										data={goals.map((g) => ({
											name: g.id,
											pct: Math.min(
												100,
												Math.round((g.current / g.target) * 100),
											),
										}))}
									>
										<XAxis dataKey='name' />
										<YAxis />
										<Tooltip />
										<Bar dataKey='pct' fill='var(--color-value)' />
									</BarChart>
								</ResponsiveContainer>
							</div>
						</CardContent>
					</Card>
				</div>

				<div>
					<div className='grid grid-cols-1 gap-4'>
						{goals.map((g) => {
							const pct = Math.min(
								100,
								Math.round((g.current / g.target) * 100),
							)
							const onTrack = pct >= 50
							return (
								<Card key={g.id}>
									<CardHeader className='flex flex-row items-start justify-between space-y-0'>
										<div className='flex items-center gap-2.5'>
											<div className='flex size-9 items-center justify-center rounded-lg bg-secondary text-primary'>
												<Target className='size-[18px]' />
											</div>
											<div className='leading-tight'>
												<CardTitle className='text-sm'>{g.title}</CardTitle>
												<p className='mt-0.5 text-xs text-muted-foreground'>
													Due {g.due}
												</p>
											</div>
										</div>
										<Badge
											className={
												onTrack
													? 'bg-success/15 text-success'
													: 'bg-chart-4/15 text-chart-4'
											}
										>
											{onTrack ? (
												<span className='flex items-center gap-1'>
													<CheckCircle2 className='size-3' /> On track
												</span>
											) : (
												'Behind'
											)}
										</Badge>
									</CardHeader>
									<CardContent>
										<div className='mb-2 flex items-end justify-between'>
											<span className='font-mono text-lg font-semibold text-foreground'>
												{formatVal(g.current, g.unit)}
											</span>
											<span className='text-xs text-muted-foreground'>
												of {formatVal(g.target, g.unit)}
											</span>
										</div>
										<div className='h-2.5 overflow-hidden rounded-full bg-secondary'>
											<div
												className={`h-full rounded-full ${onTrack ? 'bg-success' : 'bg-chart-4'}`}
												style={{ width: `${pct}%` }}
											/>
										</div>
										<p className='mt-2 text-xs text-muted-foreground'>
											{pct}% complete
										</p>
									</CardContent>
								</Card>
							)
						})}
					</div>
				</div>
			</div>
		</>
	)
}
