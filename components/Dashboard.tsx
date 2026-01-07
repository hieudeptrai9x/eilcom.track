
import React from 'react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  Legend,
  Cell
} from 'recharts';
import { TrendingUp, TrendingDown, DollarSign, Package, ShoppingCart, Clock } from 'lucide-react';
import { Order, DashboardStats } from '../types';
import { formatVND } from '../constants';

interface DashboardProps {
  stats: DashboardStats;
  orders: Order[];
}

export const Dashboard: React.FC<DashboardProps> = ({ stats, orders }) => {
  // Process chart data
  const chartData = orders.slice(-7).map(o => ({
    name: o.id,
    revenue: o.totalAmount,
    profit: o.profit,
  }));

  const cardData = [
    { label: 'Doanh thu (Revenue)', value: formatVND(stats.totalRevenue), icon: DollarSign, color: 'text-emerald-600', bg: 'bg-emerald-50' },
    { label: 'Lợi nhuận (Profit)', value: formatVND(stats.totalProfit), icon: TrendingUp, color: 'text-indigo-600', bg: 'bg-indigo-50' },
    { label: 'Tổng đơn (Total Orders)', value: stats.totalOrders.toString(), icon: Package, color: 'text-amber-600', bg: 'bg-amber-50' },
    { label: 'Đang xử lý (Pending)', value: stats.pendingOrders.toString(), icon: Clock, color: 'text-rose-600', bg: 'bg-rose-50' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-500">Welcome back. Here's what's happening today.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {cardData.map((card, i) => (
          <div key={i} className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-xl ${card.bg}`}>
                <card.icon className={`w-5 h-5 ${card.color}`} />
              </div>
              <span className="text-[10px] font-bold text-gray-400 uppercase tracking-tighter">Real-time</span>
            </div>
            <p className="text-xs font-medium text-gray-500 mb-1">{card.label}</p>
            <p className="text-xl font-bold text-gray-900">{card.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <div className="flex items-center justify-between mb-8">
            <h3 className="font-bold text-gray-900">Revenue vs. Profit Analysis</h3>
            <div className="flex gap-4">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-black" /> Revenue
              </div>
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <div className="w-2 h-2 rounded-full bg-gray-300" /> Profit
              </div>
            </div>
          </div>
          <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f3f4f6" />
                <XAxis 
                  dataKey="name" 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                />
                <YAxis 
                  axisLine={false} 
                  tickLine={false} 
                  tick={{ fontSize: 10, fill: '#9ca3af' }}
                  tickFormatter={(val) => `${val/1000000}M`}
                />
                <Tooltip 
                  cursor={{ fill: '#f9fafb' }}
                  contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)' }}
                />
                <Bar dataKey="revenue" fill="#111827" radius={[4, 4, 0, 0]} />
                <Bar dataKey="profit" fill="#d1d5db" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
          <h3 className="font-bold text-gray-900 mb-6">Top Sales Channels</h3>
          <div className="space-y-6">
            {Object.values(['Facebook', 'Instagram', 'Zalo', 'Website']).map((channel) => {
              const count = orders.filter(o => o.channel === channel).length;
              const percentage = Math.round((count / orders.length) * 100) || 0;
              return (
                <div key={channel}>
                  <div className="flex justify-between text-xs font-medium mb-2">
                    <span className="text-gray-600">{channel}</span>
                    <span className="text-gray-900 font-bold">{percentage}%</span>
                  </div>
                  <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-black rounded-full transition-all duration-1000" 
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};
