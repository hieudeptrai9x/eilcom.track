
import React, { useState, useMemo } from 'react';
import { Edit2, Trash2, Search, Filter, MoreHorizontal, ChevronDown, CheckCircle, Clock, Truck, RotateCcw } from 'lucide-react';
import { Order, OrderStatus } from '../types';
import { formatVND } from '../constants';

interface OrderTableProps {
  orders: Order[];
  onEdit: (order: Order) => void;
  onDelete: (id: string) => void;
}

export const OrderTable: React.FC<OrderTableProps> = ({ orders, onEdit, onDelete }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('All');
  const [brandFilter, setBrandFilter] = useState<string>('All');

  const brands = useMemo(() => Array.from(new Set(orders.map(o => o.brand))), [orders]);

  const filteredOrders = useMemo(() => {
    return orders.filter(order => {
      const matchesSearch = 
        order.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        order.phone.includes(searchTerm);
      
      const matchesStatus = statusFilter === 'All' || order.status === statusFilter;
      const matchesBrand = brandFilter === 'All' || order.brand === brandFilter;

      return matchesSearch && matchesStatus && matchesBrand;
    });
  }, [orders, searchTerm, statusFilter, brandFilter]);

  const getStatusBadge = (status: OrderStatus) => {
    switch (status) {
      case OrderStatus.COMPLETED:
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-700 uppercase tracking-tight"><CheckCircle className="w-3 h-3" /> Hoàn tất</span>;
      case OrderStatus.PENDING:
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-amber-100 text-amber-700 uppercase tracking-tight"><Clock className="w-3 h-3" /> Đang chờ</span>;
      case OrderStatus.SHIPPING:
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-blue-100 text-blue-700 uppercase tracking-tight"><Truck className="w-3 h-3" /> Đang chuyển</span>;
      case OrderStatus.RETURNED:
        return <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-rose-100 text-rose-700 uppercase tracking-tight"><RotateCcw className="w-3 h-3" /> Đã trả</span>;
    }
  };

  return (
    <div className="space-y-4">
      {/* Controls */}
      <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between">
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input 
            type="text" 
            placeholder="Search by ID, Customer, Phone..."
            className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black focus:bg-white transition"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        <div className="flex gap-2 w-full md:w-auto">
          <select 
            className="flex-1 md:flex-none px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
          >
            <option value="All">All Statuses</option>
            {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          
          <select 
            className="flex-1 md:flex-none px-4 py-2 bg-gray-50 border border-gray-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            value={brandFilter}
            onChange={(e) => setBrandFilter(e.target.value)}
          >
            <option value="All">All Brands</option>
            {brands.map(b => <option key={b} value={b}>{b}</option>)}
          </select>
        </div>
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block overflow-x-auto bg-white border border-gray-100 rounded-xl shadow-sm">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="bg-gray-50/50 border-b border-gray-100">
              <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest">Order ID</th>
              <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest">Date</th>
              <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest">Product</th>
              <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest">Status</th>
              <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest text-right">Total</th>
              <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest text-right">Profit</th>
              <th className="px-6 py-4 font-bold text-gray-500 uppercase text-[10px] tracking-widest text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            {filteredOrders.length > 0 ? filteredOrders.map((order) => (
              <tr key={order.id} className="hover:bg-gray-50 transition group">
                <td className="px-6 py-4">
                  <span className="font-bold text-gray-900">{order.id}</span>
                  <div className="text-[10px] text-gray-400 mt-1 uppercase font-medium">{order.channel}</div>
                </td>
                <td className="px-6 py-4 text-gray-600">
                  {order.orderDate}
                </td>
                <td className="px-6 py-4">
                  <div className="font-medium text-gray-900">{order.productName}</div>
                  <div className="text-xs text-gray-500">{order.brand}</div>
                </td>
                <td className="px-6 py-4">
                  {getStatusBadge(order.status)}
                </td>
                <td className="px-6 py-4 text-right font-bold text-gray-900">
                  {formatVND(order.totalAmount)}
                </td>
                <td className="px-6 py-4 text-right font-bold text-emerald-600">
                  {formatVND(order.profit)}
                </td>
                <td className="px-6 py-4 text-right">
                  <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition">
                    <button 
                      onClick={() => onEdit(order)}
                      className="p-1.5 hover:bg-black hover:text-white rounded-md text-gray-400 transition"
                    >
                      <Edit2 className="w-3.5 h-3.5" />
                    </button>
                    <button 
                      onClick={() => onDelete(order.id)}
                      className="p-1.5 hover:bg-rose-500 hover:text-white rounded-md text-gray-400 transition"
                    >
                      <Trash2 className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={7} className="px-6 py-12 text-center text-gray-500 italic">No orders found matching criteria.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Cards */}
      <div className="md:hidden space-y-4">
        {filteredOrders.map((order) => (
          <div key={order.id} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm space-y-4">
            <div className="flex justify-between items-start">
              <div>
                <span className="font-bold text-gray-900">{order.id}</span>
                <p className="text-xs text-gray-500">{order.orderDate}</p>
              </div>
              {getStatusBadge(order.status)}
            </div>
            
            <div className="border-t border-b border-gray-50 py-3">
              <p className="text-sm font-bold text-gray-900">{order.productName}</p>
              <p className="text-xs text-gray-500">{order.brand}</p>
              <div className="flex justify-between mt-2">
                <span className="text-xs text-gray-400">Customer</span>
                <span className="text-xs font-medium text-gray-700">{order.customerName}</span>
              </div>
            </div>

            <div className="flex justify-between items-center">
              <div>
                <p className="text-[10px] text-gray-400 uppercase font-bold tracking-tighter">Total Amount</p>
                <p className="text-sm font-bold text-gray-900">{formatVND(order.totalAmount)}</p>
              </div>
              <div className="flex gap-2">
                <button 
                  onClick={() => onEdit(order)}
                  className="p-2.5 bg-gray-50 text-gray-600 rounded-xl hover:bg-black hover:text-white transition"
                >
                  <Edit2 className="w-4 h-4" />
                </button>
                <button 
                  onClick={() => onDelete(order.id)}
                  className="p-2.5 bg-gray-50 text-rose-500 rounded-xl hover:bg-rose-500 hover:text-white transition"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
