
import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  ShoppingBag, 
  MessageSquare, 
  Scan, 
  Menu, 
  X,
  Package,
  Users,
  Settings
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: any) => void;
}

export const Layout: React.FC<LayoutProps> = ({ children, activeTab, onTabChange }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'orders', label: 'Orders', icon: ShoppingBag },
    { id: 'ai-chat', label: 'AI Assistant', icon: MessageSquare },
    { id: 'ai-vision', label: 'AI Analyzer', icon: Scan },
  ];

  const secondaryItems = [
    { id: 'products', label: 'Products', icon: Package },
    { id: 'customers', label: 'Customers', icon: Users },
    { id: 'settings', label: 'Settings', icon: Settings },
  ];

  return (
    <div className="min-h-screen flex bg-gray-50">
      {/* Sidebar for Desktop */}
      <aside className={`
        fixed inset-y-0 left-0 z-50 w-64 bg-white border-r border-gray-200 transform transition-transform duration-200 ease-in-out
        md:relative md:translate-x-0
        ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
      `}>
        <div className="h-full flex flex-col">
          <div className="px-6 py-8">
            <h2 className="text-xl font-bold tracking-tight text-gray-900 flex items-center gap-2">
              <div className="w-8 h-8 bg-black rounded flex items-center justify-center text-white text-xs font-bold">LT</div>
              LuxeTrack <span className="text-xs font-normal text-gray-400 bg-gray-100 px-1.5 py-0.5 rounded">OMS</span>
            </h2>
          </div>

          <nav className="flex-1 px-4 space-y-1">
            {navItems.map((item) => (
              <button
                key={item.id}
                onClick={() => {
                  onTabChange(item.id);
                  setIsSidebarOpen(false);
                }}
                className={`
                  w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors
                  ${activeTab === item.id 
                    ? 'bg-black text-white' 
                    : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'}
                `}
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}

            <div className="pt-8 pb-2 px-4 text-[10px] font-bold text-gray-400 uppercase tracking-widest">
              Management
            </div>
            
            {secondaryItems.map((item) => (
              <button
                key={item.id}
                disabled
                className="w-full flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium text-gray-400 cursor-not-allowed opacity-60"
              >
                <item.icon className="w-4 h-4" />
                {item.label}
              </button>
            ))}
          </nav>

          <div className="p-4 border-t border-gray-100">
            <div className="flex items-center gap-3 px-2 py-2">
              <img src="https://picsum.photos/40/40" className="w-8 h-8 rounded-full border border-gray-200" alt="User" />
              <div className="flex-1 overflow-hidden">
                <p className="text-xs font-semibold text-gray-900 truncate">Luxury Admin</p>
                <p className="text-[10px] text-gray-500 truncate">admin@luxetrack.com</p>
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-black/20 z-40 md:hidden backdrop-blur-sm"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Main Content Area */}
      <main className="flex-1 overflow-auto relative">
        <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 h-16 flex items-center justify-between md:hidden">
          <button onClick={() => setIsSidebarOpen(true)} className="p-2 -ml-2 text-gray-600 hover:text-gray-900">
            <Menu className="w-6 h-6" />
          </button>
          <h2 className="text-sm font-bold tracking-tight">LuxeTrack</h2>
          <div className="w-6 h-6" /> {/* Spacer */}
        </header>

        {children}
      </main>
    </div>
  );
};
