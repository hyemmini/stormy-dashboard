import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import { Factory } from 'lucide-react';

const Layout: React.FC = () => {
  const userId = `user_${Math.random().toString(36).substring(2, 11)}`;

  return (
    <div className="min-h-screen bg-gray-50 font-inter text-gray-800 flex flex-col">
      <header className="bg-white shadow-sm p-4 flex items-center justify-between sticky top-0 z-10">
        <Link to="/" className="flex items-center">
          <Factory className="w-8 h-8 text-blue-600 mr-2" />
          <h1 className="text-2xl font-bold text-gray-900">
            제조 KPI 대시보드
          </h1>
        </Link>
        <div className="text-sm text-gray-600">
          사용자 ID: <span className="font-medium text-blue-700">{userId}</span>
        </div>
      </header>

      <main className="flex-1">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
