
import { Order, OrderStatus, SalesChannel } from './types';

export const MOCK_ORDERS: Order[] = [
  {
    id: '#DH1210',
    orderDate: '2024-03-10',
    shipDate: '2024-03-12',
    status: OrderStatus.COMPLETED,
    channel: SalesChannel.FACEBOOK,
    brand: 'Gentle Monster',
    productName: 'Lilit 01 Glasses',
    unitPrice: 5500000,
    quantity: 1,
    discount: 200000,
    shippingFee: 35000,
    totalAmount: 5335000,
    deposit: 500000,
    codAmount: 4835000,
    costPrice: 3800000,
    profit: 1335000,
    customerName: 'Nguyen Van A',
    phone: '0901234567',
    address: '123 Le Loi',
    city: 'Ho Chi Minh',
    region: 'South',
    carrier: 'GHTK',
    trackingCode: 'GHTK123456789'
  },
  {
    id: '#DH1211',
    orderDate: '2024-03-11',
    shipDate: '2024-03-13',
    status: OrderStatus.SHIPPING,
    channel: SalesChannel.INSTAGRAM,
    brand: 'Dior',
    productName: 'Lady Dior Mini Black',
    unitPrice: 125000000,
    quantity: 1,
    discount: 5000000,
    shippingFee: 150000,
    totalAmount: 120150000,
    deposit: 20000000,
    codAmount: 100150000,
    costPrice: 95000000,
    profit: 20150000,
    customerName: 'Tran Thi B',
    phone: '0912345678',
    address: '456 Phan Chau Trinh',
    city: 'Da Nang',
    region: 'South',
    carrier: 'Viettel Post',
    trackingCode: 'VT77889900'
  },
  {
    id: '#DH1212',
    orderDate: '2024-03-12',
    shipDate: '',
    status: OrderStatus.PENDING,
    channel: SalesChannel.ZALO,
    brand: 'Vivienne Westwood',
    productName: 'Mini Bas Relief Pendant',
    unitPrice: 4200000,
    quantity: 2,
    discount: 0,
    shippingFee: 30000,
    totalAmount: 8430000,
    deposit: 1000000,
    codAmount: 7430000,
    costPrice: 2800000,
    profit: 2830000,
    customerName: 'Le Hoang C',
    phone: '0987654321',
    address: '789 Hoang Hoa Tham',
    city: 'Hanoi',
    region: 'North',
    carrier: '',
    trackingCode: ''
  }
];

export const formatVND = (value: number) => {
  return new Intl.NumberFormat('vi-VN', {
    style: 'currency',
    currency: 'VND',
  }).format(value);
};
