'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { TrendingUp, LifeBuoy } from 'lucide-react'
import { cn } from '@/lib/utils'
import { navItems } from '@/lib/nav'
import { Badge } from '@/components/ui/badge'

export function Sidebar() {
  const pathname = usePathname()

  return (
    <aside className="hidden w-64 shrink-0 flex-col border-r border-border bg-sidebar lg:flex">
      <div className="flex h-16 items-center gap-2.5 border-b border-border px-5">
        <div className="flex size-8 items-center justify-center rounded-lg bg-primary text-primary-foreground">
          <TrendingUp className="size-5" />
        </div>
        <div className="leading-tight">
          <p className="text-sm font-semibold tracking-tight text-sidebar-foreground">
            TradePilot
          </p>
          <p className="text-[11px] font-medium text-primary">AI Terminal</p>
        </div>
      </div>

      <nav className="flex flex-1 flex-col gap-1 overflow-y-auto p-3">
        <p className="px-3 pb-1 pt-2 text-[11px] font-medium uppercase tracking-wider text-muted-foreground">
          Workspace
        </p>
        {navItems.map((item) => {
          const active = pathname === item.href
          const Icon = item.icon
          return (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                'group flex items-center gap-3 rounded-lg px-3 py-2 text-sm font-medium transition-colors',
                active
                  ? 'bg-sidebar-accent text-sidebar-accent-foreground'
                  : 'text-muted-foreground hover:bg-sidebar-accent/60 hover:text-sidebar-foreground',
              )}
            >
              <Icon
                className={cn(
                  'size-[18px] shrink-0',
                  active ? 'text-primary' : 'text-muted-foreground group-hover:text-sidebar-foreground',
                )}
              />
              <span className="flex-1">{item.title}</span>
              {item.badge && (
                <Badge className="h-5 min-w-5 justify-center rounded-full bg-primary px-1.5 text-[11px] text-primary-foreground">
                  {item.badge}
                </Badge>
              )}
            </Link>
          )
        })}
      </nav>

      <div className="border-t border-border p-3">
        <div className="rounded-xl border border-border bg-card p-4">
          <div className="flex items-center gap-2">
            <LifeBuoy className="size-4 text-primary" />
            <p className="text-sm font-semibold text-card-foreground">Need help?</p>
          </div>
          <p className="mt-1.5 text-xs leading-relaxed text-muted-foreground">
            Explore docs and AI trading guides to get the most out of TradePilot.
          </p>
          <button className="mt-3 w-full rounded-lg bg-secondary px-3 py-2 text-xs font-medium text-secondary-foreground transition-colors hover:bg-secondary/80">
            View documentation
          </button>
        </div>
      </div>
    </aside>
  )
}
