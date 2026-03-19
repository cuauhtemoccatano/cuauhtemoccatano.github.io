"use client";

import React, { useState } from 'react';
import { 
  LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  AreaChart, Area
} from 'recharts';
import { Shield, Zap, Target, BarChart3, ArrowUpRight, Eye, Bell, Activity } from 'lucide-react';
import { cn } from '@/lib/utils';

const data = [
  { name: 'Week 1', score: 65, identity: 40, perf: 70 },
  { name: 'Week 2', score: 68, identity: 45, perf: 72 },
  { name: 'Week 3', score: 75, identity: 58, perf: 80 },
  { name: 'Week 4', score: 82, identity: 70, perf: 85 },
  { name: 'Week 5', score: 88, identity: 82, perf: 92 },
];

const StatCard = ({ title, value, change, icon: Icon }: any) => (
  <div className="glass-card p-6 rounded-2xl">
    <div className="flex justify-between items-start mb-4">
      <div className="p-2 bg-blue-500/10 rounded-lg">
        <Icon className="w-6 h-6 text-blue-400" />
      </div>
      <span className="flex items-center text-xs font-bold text-emerald-400 bg-emerald-500/10 px-2 py-1 rounded">
        <ArrowUpRight className="w-3 h-3 mr-1" /> {change}
      </span>
    </div>
    <h3 className="text-zinc-600 dark:text-zinc-400 text-sm font-medium mb-1">{title}</h3>
    <p className="text-2xl font-bold text-zinc-950 dark:text-white tracking-tight">{value}</p>
  </div>
);

export default function DashboardPage() {
  const [isPro, setIsPro] = useState(true);

  return (
    <div className="min-h-screen bg-[#FAFAFA] dark:bg-[#050505] text-zinc-950 dark:text-white p-8 transition-colors duration-500">
      <header className="mb-12 flex justify-between items-end">
        <div>
          <h1 className="text-4xl font-bold tracking-tight mb-2 text-zinc-950 dark:text-white">Executive Dashboard</h1>
          <p className="text-zinc-600 dark:text-zinc-400">Strategic Brand Intelligence & Growth Metrics</p>
        </div>
        <div className="p-1 px-3 rounded-full border border-blue-500/30 bg-blue-500/10 flex items-center gap-2">
          <div className="w-2 h-2 rounded-full bg-blue-400 animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Launchpad Pro Active</span>
        </div>
      </header>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
        <StatCard title="Brand Vitality Score" value="88/100" change="+12%" icon={Shield} />
        <StatCard title="Identity Strength" value="82%" change="+24%" icon={Target} />
        <StatCard title="Performance Index" value="92/100" change="+8%" icon={Zap} />
        <StatCard title="Market Authority" value="High" change="+5%" icon={BarChart3} />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Chart */}
        <div className="lg:col-span-2 glass-card p-8 rounded-3xl">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-xl font-bold">Brand Health Evolution</h2>
            <div className="flex gap-2">
              <button className="px-3 py-1 text-xs bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-all">Weekly</button>
              <button className="px-3 py-1 text-xs bg-blue-500/10 border border-blue-500/20 text-blue-400 rounded-lg">Monthly</button>
            </div>
          </div>
          <div className="h-[400px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={data}>
                <defs>
                  <linearGradient id="colorScore" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#3b82f6" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="name" stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <YAxis stroke="#666" fontSize={12} tickLine={false} axisLine={false} />
                <Tooltip 
                  contentStyle={{ backgroundColor: '#111', border: '1px solid #333', borderRadius: '12px' }}
                  itemStyle={{ color: '#fff' }}
                />
                <Area type="monotone" dataKey="score" stroke="#3b82f6" fillOpacity={1} fill="url(#colorScore)" strokeWidth={3} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Pro Monitoring Section */}
        <div className="space-y-8">
          <div className="bg-gradient-to-br from-blue-600/10 to-indigo-600/10 backdrop-blur-xl border border-blue-500/20 p-8 rounded-3xl">
            <div className="flex items-center gap-3 mb-6">
              <Eye className="w-5 h-5 text-blue-500 dark:text-blue-400" />
              <h2 className="text-xl font-bold text-zinc-950 dark:text-white">The Watchman</h2>
            </div>
            <p className="text-xs text-zinc-600 dark:text-zinc-300 mb-6">Continuous brand monitoring active for <span className="text-zinc-900 dark:text-zinc-100 font-bold">google.com</span>. Next audit in 4 hours.</p>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-black/5 dark:bg-white/5 rounded-xl border border-black/5 dark:border-white/5">
                <span className="text-xs text-zinc-600 dark:text-zinc-400">Status</span>
                <span className="text-xs font-bold text-emerald-400 flex items-center gap-1">
                  <Activity className="w-3 h-3" /> Healthy
                </span>
              </div>
              <div className="flex items-center justify-between p-3 bg-white/5 rounded-xl border border-white/5">
                <span className="text-xs text-zinc-400">Notifications</span>
                <span className="text-xs font-bold text-blue-400 flex items-center gap-1">
                  <Bell className="w-3 h-3" /> Slack & Email
                </span>
              </div>
            </div>
            <button className="w-full mt-6 py-3 bg-blue-500 hover:bg-blue-600 text-white text-sm font-bold rounded-xl transition-all shadow-lg shadow-blue-500/20">
              Configure Alerts
            </button>
          </div>

          {/* Recent Audits List */}
          <div className="glass-card p-8 rounded-3xl">
            <h2 className="text-xl font-bold mb-6">Recent Audits</h2>
            <div className="space-y-6">
              {[ 
                { url: 'google.com', score: 88, date: 'Today' },
                { url: 'google.com', score: 84, date: 'Yesterday' },
                { url: 'apple.com', score: 92, date: '2 days ago' }
              ].map((audit, i) => (
                <div key={i} className="flex items-center justify-between p-4 bg-white/5 rounded-xl border border-white/5">
                  <div>
                    <p className="font-medium text-sm text-white">{audit.url}</p>
                    <p className="text-xs text-zinc-600 dark:text-zinc-400">{audit.date}</p>
                  </div>
                  <div className="text-right">
                    <p className={cn("font-bold text-sm", audit.score > 85 ? "text-emerald-500" : "text-amber-500")}>{audit.score}</p>
                    <p className="text-[10px] text-zinc-600 dark:text-zinc-400">SCORE</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

