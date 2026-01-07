
export enum OrderStatus {
  PENDING = 'Pending',
  SHIPPING = 'Shipping',
  COMPLETED = 'Completed',
  RETURNED = 'Returned'
}

export enum SalesChannel {
  FACEBOOK = 'Facebook',
  INSTAGRAM = 'Instagram',
  ZALO = 'Zalo',
  WEBSITE = 'Website'
}

export interface Order {
  id: string;
  orderDate: string;
  shipDate: string;
  status: OrderStatus;
  channel: SalesChannel;
  brand: string;
  productName: string;
  unitPrice: number;
  quantity: number;
  discount: number;
  shippingFee: number;
  totalAmount: number;
  deposit: number;
  codAmount: number;
  costPrice: number;
  profit: number;
  customerName: string;
  phone: string;
  address: string;
  city: string;
  region: 'North' | 'South';
  carrier: string;
  trackingCode: string;
}

export interface DashboardStats {
  totalRevenue: number;
  totalProfit: number;
  totalOrders: number;
  pendingOrders: number;
}
