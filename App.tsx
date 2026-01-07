
import React, { useState, useEffect, useMemo } from 'react';
import { Layout } from './components/Layout';
import { Dashboard } from './components/Dashboard';
import { OrderTable } from './components/OrderTable';
import { OrderForm } from './components/OrderForm';
import { AIChat } from './components/AIChat';
import { ImageAnalysis } from './components/ImageAnalysis';
import { Order, OrderStatus } from './types';
import { MOCK_ORDERS } from './constants';

export default function App() {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'ai-chat' | 'ai-vision'>('dashboard');
  const [orders, setOrders] = useState<Order[]>(() => {
    const saved = localStorage.getItem('luxetrack_orders');
    return saved ? JSON.parse(saved) : MOCK_ORDERS;
  });
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [editingOrder, setEditingOrder] = useState<Order | undefined>(undefined);

  useEffect(() => {
    localStorage.setItem('luxetrack_orders', JSON.stringify(orders));
  }, [orders]);

  const handleAddOrder = (order: Order) => {
    if (editingOrder) {
      setOrders(orders.map(o => o.id === order.id ? order : o));
    } else {
      setOrders([order, ...orders]);
    }
    setIsFormOpen(false);
    setEditingOrder(undefined);
  };

  const handleEdit = (order: Order) => {
    setEditingOrder(order);
    setIsFormOpen(true);
  };

  const handleDelete = (id: string) => {
    if (confirm('Are you sure you want to delete this order?')) {
      setOrders(orders.filter(o => o.id !== id));
    }
  };

  const stats = useMemo(() => {
    return {
      totalRevenue: orders.reduce((acc, o) => acc + o.totalAmount, 0),
      totalProfit: orders.reduce((acc, o) => acc + o.profit, 0),
      totalOrders: orders.length,
      pendingOrders: orders.filter(o => o.status === OrderStatus.PENDING).length
    };
  }, [orders]);

  return (
    <Layout activeTab={activeTab} onTabChange={setActiveTab}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {activeTab === 'dashboard' && (
          <Dashboard stats={stats} orders={orders} />
        )}
        
        {activeTab === 'orders' && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <div>
                <h1 className="text-2xl font-bold text-gray-900">Order Management</h1>
                <p className="text-gray-500">View and manage all your luxury sales.</p>
              </div>
              <button
                onClick={() => {
                  setEditingOrder(undefined);
                  setIsFormOpen(true);
                }}
                className="bg-black text-white px-4 py-2 rounded-lg font-medium hover:bg-gray-800 transition shadow-sm"
              >
                + New Order
              </button>
            </div>
            
            <OrderTable 
              orders={orders} 
              onEdit={handleEdit}
              onDelete={handleDelete}
            />
          </div>
        )}

        {activeTab === 'ai-chat' && <AIChat />}
        {activeTab === 'ai-vision' && <ImageAnalysis />}

        {isFormOpen && (
          <OrderForm 
            onClose={() => setIsFormOpen(false)} 
            onSubmit={handleAddOrder}
            initialData={editingOrder}
          />
        )}
      </div>
    </Layout>
  );
}
