import React from 'react';
import { FiHome, FiPlus, FiSettings } from 'react-icons/fi';

const MobileBottomNav = ({ onAddTaskClick }) => {
  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-lg border-t border-gray-200/50 dark:bg-gray-900/90 dark:border-gray-800/50 z-50 px-6 py-2 pb-safe">
      <div className="flex justify-between items-center relative">
        <button className="flex flex-col items-center p-2 text-brand-600 dark:text-brand-400">
          <FiHome className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-bold">Home</span>
        </button>
        
        {/* Floating Add Button */}
        <button 
          onClick={onAddTaskClick}
          className="absolute left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center"
        >
          <div className="h-14 w-14 rounded-full bg-brand-500 shadow-xl shadow-brand-500/40 flex items-center justify-center text-white border-[6px] border-gray-50 dark:border-gray-950 transition-transform active:scale-95">
            <FiPlus className="h-6 w-6 stroke-[3]" />
          </div>
          <span className="text-[10px] font-medium text-gray-600 dark:text-gray-400 mt-1">Add Task</span>
        </button>
        
        <button className="flex flex-col items-center p-2 text-gray-400 dark:text-gray-500 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
          <FiSettings className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-medium">Settings</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;
