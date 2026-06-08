'use client'

import { Bell, Search, ChevronDown, ArrowUpRight } from 'lucide-react'
import { MobileNav } from '@/components/mobile-nav'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import {
  Avatar,
  AvatarFallback,
} from '@/components/ui/avatar'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'

export function Header() {
  return (
    <header className="sticky top-0 z-30 flex h-16 items-center gap-3 border-b border-border bg-background/80 px-4 backdrop-blur-md md:px-6">
      <MobileNav />

      <div className="relative hidden flex-1 md:block md:max-w-md">
        <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search stocks, symbols, news..."
          className="h-9 border-border bg-card pl-9 text-sm placeholder:text-muted-foreground"
        />
        <kbd className="pointer-events-none absolute right-2.5 top-1/2 hidden -translate-y-1/2 rounded border border-border bg-secondary px-1.5 py-0.5 text-[10px] font-medium text-muted-foreground lg:inline-block">
          ⌘K
        </kbd>
      </div>

      <div className="flex flex-1 items-center justify-end gap-2 md:flex-none md:gap-3">
        <div className="hidden items-center gap-3 rounded-lg border border-border bg-card px-3.5 py-1.5 sm:flex">
          <div className="leading-tight">
            <p className="text-[11px] font-medium text-muted-foreground">Portfolio Value</p>
            <p className="font-mono text-sm font-semibold text-foreground">$142,199.40</p>
          </div>
          <span className="flex items-center gap-0.5 rounded-md bg-success/15 px-1.5 py-0.5 text-xs font-medium text-success">
            <ArrowUpRight className="size-3" />
            2.84%
          </span>
        </div>

        <Button
          variant="outline"
          size="icon"
          className="relative size-9 border-border bg-card"
          aria-label="Notifications"
        >
          <Bell className="size-[18px]" />
          <span className="absolute right-2 top-2 size-2 rounded-full bg-destructive ring-2 ring-background" />
        </Button>

        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button className="flex items-center gap-2 rounded-lg border border-border bg-card py-1 pl-1 pr-2 transition-colors hover:bg-secondary">
              <Avatar className="size-7">
                <AvatarFallback className="bg-primary text-xs font-semibold text-primary-foreground">
                  AM
                </AvatarFallback>
              </Avatar>
              <span className="hidden text-sm font-medium text-foreground sm:inline">Alex Morgan</span>
              <ChevronDown className="hidden size-4 text-muted-foreground sm:inline" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-52">
            <DropdownMenuLabel>
              <p className="text-sm font-medium">Alex Morgan</p>
              <p className="text-xs font-normal text-muted-foreground">alex@tradepilot.ai</p>
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem>Account</DropdownMenuItem>
            <DropdownMenuItem>Billing</DropdownMenuItem>
            <DropdownMenuItem>Preferences</DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="text-destructive focus:text-destructive">
              Sign out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
