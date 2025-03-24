'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '../utils/superbase/serve';
import {
  HiOutlineHome,
  HiOutlineDocumentText,
  HiOutlineClipboardList,
  HiOutlineCog,
  HiOutlineLogout,
} from 'react-icons/hi';

const Sidebar = () => {
  const router = useRouter();

  const handleLogout = async (e: React.MouseEvent) => {
    e.preventDefault();
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Error logging out:", error.message);
    } else {
      router.push('/');
    }
  };

  // Menu items for the sidebar.
  // The Logout item now includes an onClick handler.
  const menuItems = [
    {
      icon: <HiOutlineHome size={24} />,
      label: 'Dashboard',
      href: '/dashboard',
    },
    {
      icon: <HiOutlineDocumentText size={24} />,
      label: 'Documents',
      href: '/dashboard/documents',
    },
    {
      icon: <HiOutlineClipboardList size={24} />,
      label: 'Templates',
      href: '/dashboard/templates',
    },
    {
      icon: <HiOutlineCog size={24} />,
      label: 'Settings',
      href: '/dashboard/settings',
    },
    {
      icon: <HiOutlineLogout size={24} />,
      label: 'Logout',
      href: '/logout',
      onClick: handleLogout,
    },
  ];

  return (
    <div className="bg-gray-800 text-white h-[90vh] my-4 ml-3 transition-all duration-300 w-16 hover:w-56 rounded-3xl shadow-xl">
      <ul className="flex flex-col items-center py-4 space-y-2">
        {menuItems.map((item, index) => (
          <li key={index} className="w-full group">
            {item.onClick ? (
              <button
                onClick={item.onClick}
                className="flex items-center p-4 w-full hover:bg-gray-700 transition-colors"
              >
                <div>{item.icon}</div>
                <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              </button>
            ) : (
              <a
                href={item.href}
                className="flex items-center p-4 hover:bg-gray-700 transition-colors"
              >
                <div>{item.icon}</div>
                <span className="ml-4 whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  {item.label}
                </span>
              </a>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Sidebar;
