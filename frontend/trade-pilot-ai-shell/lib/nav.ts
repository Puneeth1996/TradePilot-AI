import {
  LayoutDashboard,
  Briefcase,
  BookOpen,
  Eye,
  BarChart3,
  Sparkles,
  Target,
  Settings,
  type LucideIcon,
} from 'lucide-react'

export type NavItem = {
  title: string
  href: string
  icon: LucideIcon
  badge?: string
}

export const navItems: NavItem[] = [
  { title: 'Dashboard', href: '/', icon: LayoutDashboard },
  { title: 'Portfolio', href: '/portfolio', icon: Briefcase },
  { title: 'Trade Journal', href: '/journal', icon: BookOpen },
  { title: 'Watchlist', href: '/watchlist', icon: Eye },
  { title: 'Analytics', href: '/analytics', icon: BarChart3 },
  { title: 'AI Insights', href: '/insights', icon: Sparkles, badge: '4' },
  { title: 'Goals', href: '/goals', icon: Target },
  { title: 'Settings', href: '/settings', icon: Settings },
]
