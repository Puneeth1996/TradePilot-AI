'use client'

import { User, Bell, Shield, Palette, CreditCard } from 'lucide-react'
import { PageHeader } from '@/components/page-header'
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Separator } from '@/components/ui/separator'
import { Avatar, AvatarFallback } from '@/components/ui/avatar'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'

function Field({ label, defaultValue, type = 'text' }: { label: string; defaultValue?: string; type?: string }) {
  return (
    <div className="space-y-1.5">
      <label className="text-sm font-medium text-foreground">{label}</label>
      <Input type={type} defaultValue={defaultValue} className="border-border bg-card" />
    </div>
  )
}

function Toggle({ title, desc, on }: { title: string; desc: string; on?: boolean }) {
  return (
    <div className="flex items-center justify-between gap-4 py-3">
      <div className="leading-tight">
        <p className="text-sm font-medium text-foreground">{title}</p>
        <p className="text-xs text-muted-foreground">{desc}</p>
      </div>
      <span
        className={`flex h-6 w-11 shrink-0 items-center rounded-full p-0.5 transition-colors ${on ? 'justify-end bg-primary' : 'justify-start bg-secondary'}`}
        role="switch"
        aria-checked={on}
      >
        <span className="size-5 rounded-full bg-background shadow-sm" />
      </span>
    </div>
  )
}

export default function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" description="Manage your account, preferences, and security." />

      <Tabs defaultValue="profile" className="gap-4">
        <TabsList className="bg-card">
          <TabsTrigger value="profile">
            <User className="size-4" /> Profile
          </TabsTrigger>
          <TabsTrigger value="notifications">
            <Bell className="size-4" /> Notifications
          </TabsTrigger>
          <TabsTrigger value="appearance">
            <Palette className="size-4" /> Appearance
          </TabsTrigger>
          <TabsTrigger value="security">
            <Shield className="size-4" /> Security
          </TabsTrigger>
          <TabsTrigger value="billing">
            <CreditCard className="size-4" /> Billing
          </TabsTrigger>
        </TabsList>

        <TabsContent value="profile">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Profile</CardTitle>
              <CardDescription>Update your personal information.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center gap-4">
                <Avatar className="size-16">
                  <AvatarFallback className="bg-primary text-lg font-semibold text-primary-foreground">AM</AvatarFallback>
                </Avatar>
                <Button variant="outline" className="border-border bg-card">Change avatar</Button>
              </div>
              <Separator className="bg-border" />
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Full name" defaultValue="Alex Morgan" />
                <Field label="Email" type="email" defaultValue="alex@tradepilot.ai" />
                <Field label="Username" defaultValue="@alexmorgan" />
                <Field label="Timezone" defaultValue="UTC−05:00 Eastern" />
              </div>
              <div className="flex justify-end gap-2">
                <Button variant="ghost">Cancel</Button>
                <Button>Save changes</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="notifications">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Notifications</CardTitle>
              <CardDescription>Choose what updates you want to receive.</CardDescription>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              <Toggle title="Price alerts" desc="Get notified when watchlist symbols hit targets" on />
              <Toggle title="AI insights" desc="Receive new AI-generated portfolio insights" on />
              <Toggle title="Trade fills" desc="Notify when orders are executed" on />
              <Toggle title="Weekly summary" desc="A digest of your performance every Monday" />
              <Toggle title="Marketing" desc="Product news and feature announcements" />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="appearance">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Appearance</CardTitle>
              <CardDescription>Customize how the terminal looks.</CardDescription>
            </CardHeader>
            <CardContent className="divide-y divide-border">
              <Toggle title="Dark terminal" desc="Use the dark professional theme" on />
              <Toggle title="Compact density" desc="Show more data per screen" on />
              <Toggle title="Color-blind mode" desc="Adjust gain/loss colors for accessibility" />
              <Toggle title="Animated charts" desc="Enable chart transition animations" on />
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="security">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Security</CardTitle>
              <CardDescription>Keep your account protected.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <Field label="Current password" type="password" defaultValue="********" />
                <Field label="New password" type="password" />
              </div>
              <Separator className="bg-border" />
              <Toggle title="Two-factor authentication" desc="Add an extra layer of security" on />
              <Toggle title="Login alerts" desc="Email me about new sign-ins" on />
              <div className="flex justify-end">
                <Button>Update security</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="billing">
          <Card>
            <CardHeader>
              <CardTitle className="text-base">Billing</CardTitle>
              <CardDescription>Manage your subscription and payment method.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-5">
              <div className="flex items-center justify-between rounded-xl border border-border bg-secondary/40 p-4">
                <div>
                  <p className="text-sm font-semibold text-foreground">Pro Plan</p>
                  <p className="text-xs text-muted-foreground">$29 / month · renews Jul 1, 2026</p>
                </div>
                <Button variant="outline" className="border-border bg-card">Manage plan</Button>
              </div>
              <div className="flex items-center justify-between rounded-xl border border-border p-4">
                <div className="flex items-center gap-3">
                  <CreditCard className="size-5 text-muted-foreground" />
                  <p className="text-sm text-foreground">Visa ending in 4242</p>
                </div>
                <Button variant="ghost" size="sm">Edit</Button>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </>
  )
}
