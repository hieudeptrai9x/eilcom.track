
import React, { useState, useEffect } from 'react';
import { X, Save, AlertCircle } from 'lucide-react';
import { Order, OrderStatus, SalesChannel } from '../types';

interface OrderFormProps {
  onClose: () => void;
  onSubmit: (order: Order) => void;
  initialData?: Order;
}

export const OrderForm: React.FC<OrderFormProps> = ({ onClose, onSubmit, initialData }) => {
  const [formData, setFormData] = useState<Partial<Order>>(initialData || {
    id: `#DH${Math.floor(Math.random() * 9000) + 1000}`,
    orderDate: new Date().toISOString().split('T')[0],
    shipDate: '',
    status: OrderStatus.PENDING,
    channel: SalesChannel.FACEBOOK,
    brand: '',
    productName: '',
    unitPrice: 0,
    quantity: 1,
    discount: 0,
    shippingFee: 0,
    totalAmount: 0,
    deposit: 0,
    codAmount: 0,
    costPrice: 0,
    profit: 0,
    customerName: '',
    phone: '',
    address: '',
    city: '',
    region: 'South',
    carrier: '',
    trackingCode: ''
  });

  // Financial Auto-calculations
  useEffect(() => {
    const unitPrice = Number(formData.unitPrice || 0);
    const qty = Number(formData.quantity || 0);
    const discount = Number(formData.discount || 0);
    const shipping = Number(formData.shippingFee || 0);
    const deposit = Number(formData.deposit || 0);
    const costPrice = Number(formData.costPrice || 0);

    const total = (unitPrice * qty) - discount + shipping;
    const cod = total - deposit;
    const profit = (unitPrice - costPrice) * qty - discount;

    setFormData(prev => ({
      ...prev,
      totalAmount: total,
      codAmount: cod,
      profit: profit
    }));
  }, [formData.unitPrice, formData.quantity, formData.discount, formData.shippingFee, formData.deposit, formData.costPrice]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(formData as Order);
  };

  const handleInputChange = (field: keyof Order, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={onClose}
      />
      <div className="relative bg-white w-full max-w-4xl max-h-[90vh] overflow-hidden rounded-3xl shadow-2xl flex flex-col animate-in slide-in-from-bottom-8 duration-300">
        <header className="px-8 py-6 border-b border-gray-100 flex items-center justify-between">
          <div>
            <h2 className="text-xl font-bold text-gray-900">{initialData ? 'Edit Order' : 'Create New Order'}</h2>
            <p className="text-xs text-gray-500 font-medium">{formData.id}</p>
          </div>
          <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full transition">
            <X className="w-5 h-5" />
          </button>
        </header>

        <form onSubmit={handleSubmit} className="flex-1 overflow-y-auto p-8 space-y-12">
          {/* Customer Section */}
          <section className="space-y-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-black" /> Customer Info
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Full Name</label>
                <input required type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.customerName} onChange={(e) => handleInputChange('customerName', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Phone Number</label>
                <input required type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.phone} onChange={(e) => handleInputChange('phone', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Region</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.region} onChange={(e) => handleInputChange('region', e.target.value)}>
                  <option value="South">South (Miền Nam)</option>
                  <option value="North">North (Miền Bắc)</option>
                </select>
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-gray-600">Address</label>
                <input required type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.address} onChange={(e) => handleInputChange('address', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">City</label>
                <input required type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.city} onChange={(e) => handleInputChange('city', e.target.value)} />
              </div>
            </div>
          </section>

          {/* Product Section */}
          <section className="space-y-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-black" /> Product Details
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-gray-600">Product Name</label>
                <input required type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.productName} onChange={(e) => handleInputChange('productName', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Brand</label>
                <input required type="text" placeholder="e.g. Dior, GM" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.brand} onChange={(e) => handleInputChange('brand', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Channel</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.channel} onChange={(e) => handleInputChange('channel', e.target.value)}>
                  {Object.values(SalesChannel).map(c => <option key={c} value={c}>{c}</option>)}
                </select>
              </div>
            </div>
          </section>

          {/* Financials Section */}
          <section className="space-y-6">
            <div className="flex items-center justify-between">
              <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
                <div className="w-1.5 h-1.5 rounded-full bg-black" /> Financials
              </h3>
              <div className="flex gap-4">
                <div className="bg-emerald-50 px-3 py-1 rounded-full flex items-center gap-2">
                  <span className="text-[10px] font-bold text-emerald-600 uppercase">Profit:</span>
                  <span className="text-xs font-bold text-emerald-700">{new Intl.NumberFormat('vi-VN').format(formData.profit || 0)} ₫</span>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 bg-gray-50 p-6 rounded-2xl border border-gray-100">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Unit Price (Đơn giá)</label>
                <input type="number" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.unitPrice} onChange={(e) => handleInputChange('unitPrice', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Quantity (SL)</label>
                <input type="number" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.quantity} onChange={(e) => handleInputChange('quantity', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Cost Price (Giá vốn)</label>
                <input type="number" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.costPrice} onChange={(e) => handleInputChange('costPrice', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Discount</label>
                <input type="number" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.discount} onChange={(e) => handleInputChange('discount', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Shipping Fee</label>
                <input type="number" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.shippingFee} onChange={(e) => handleInputChange('shippingFee', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Deposit (Cọc)</label>
                <input type="number" className="w-full px-4 py-2.5 bg-white border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.deposit} onChange={(e) => handleInputChange('deposit', e.target.value)} />
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Total (Thành tiền)</label>
                <div className="px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl font-bold text-gray-900">{new Intl.NumberFormat('vi-VN').format(formData.totalAmount || 0)}</div>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Collect COD</label>
                <div className="px-4 py-2.5 bg-gray-100 border border-gray-200 rounded-xl font-bold text-rose-600">{new Intl.NumberFormat('vi-VN').format(formData.codAmount || 0)}</div>
              </div>
            </div>
          </section>

          {/* Logistics Section */}
          <section className="space-y-6">
            <h3 className="text-xs font-bold text-gray-400 uppercase tracking-widest flex items-center gap-2">
              <div className="w-1.5 h-1.5 rounded-full bg-black" /> Logistics
            </h3>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Status</label>
                <select className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.status} onChange={(e) => handleInputChange('status', e.target.value)}>
                  {Object.values(OrderStatus).map(s => <option key={s} value={s}>{s}</option>)}
                </select>
              </div>
              <div className="space-y-1">
                <label className="text-xs font-semibold text-gray-600">Carrier</label>
                <input type="text" placeholder="GHTK, Viettel Post" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.carrier} onChange={(e) => handleInputChange('carrier', e.target.value)} />
              </div>
              <div className="md:col-span-2 space-y-1">
                <label className="text-xs font-semibold text-gray-600">Tracking Code</label>
                <input type="text" className="w-full px-4 py-2.5 bg-gray-50 border border-gray-200 rounded-xl focus:ring-2 focus:ring-black outline-none" value={formData.trackingCode} onChange={(e) => handleInputChange('trackingCode', e.target.value)} />
              </div>
            </div>
          </section>
        </form>

        <footer className="px-8 py-6 border-t border-gray-100 bg-gray-50/50 flex justify-end gap-3">
          <button onClick={onClose} className="px-6 py-2.5 text-sm font-semibold text-gray-600 hover:bg-gray-100 rounded-xl transition">Cancel</button>
          <button onClick={handleSubmit} className="px-8 py-2.5 bg-black text-white text-sm font-bold rounded-xl hover:bg-gray-800 transition flex items-center gap-2 shadow-lg shadow-black/10">
            <Save className="w-4 h-4" /> Save Order
          </button>
        </footer>
      </div>
    </div>
  );
};
