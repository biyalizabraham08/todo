import React, { useContext } from 'react';
import { FiHome, FiPlus, FiLogOut } from 'react-icons/fi';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

const MobileBottomNav = ({ onAddTaskClick }) => {
  const navigate = useNavigate();
  const { logout } = useContext(AuthContext);

  return (
    <div className="md:hidden fixed bottom-0 inset-x-0 bg-white/90 backdrop-blur-lg border-t border-slate-200/50 dark:bg-slate-900/90 dark:border-slate-800/50 z-50 px-6 py-2 pb-safe shadow-[0_-4px_20px_rgba(0,0,0,0.05)] dark:shadow-[0_-4px_20px_rgba(0,0,0,0.2)]">
      <div className="flex justify-between items-center relative">
        <button 
          onClick={() => navigate('/landing')}
          className="flex flex-col items-center p-2 text-slate-400 hover:text-brand-600 dark:text-slate-500 dark:hover:text-brand-400 transition-colors"
        >
          <FiHome className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-bold">Landing</span>
        </button>
        
        {/* Floating Add Button */}
        <button 
          onClick={onAddTaskClick}
          className="absolute left-1/2 -translate-x-1/2 -top-8 flex flex-col items-center"
        >
          <div className="h-14 w-14 rounded-full bg-gradient-to-br from-brand-500 to-brand-600 shadow-xl shadow-brand-500/40 flex items-center justify-center text-white border-[6px] border-[#f8f9fa] dark:border-slate-950 transition-transform active:scale-95">
            <FiPlus className="h-6 w-6 stroke-[3]" />
          </div>
          <span className="text-[10px] font-bold text-slate-500 dark:text-slate-400 mt-1 tracking-wide">Add Task</span>
        </button>
        
        <button 
          onClick={logout}
          className="flex flex-col items-center p-2 text-slate-400 hover:text-red-500 dark:text-slate-500 dark:hover:text-red-400 transition-colors"
        >
          <FiLogOut className="h-5 w-5 mb-1" />
          <span className="text-[10px] font-bold">Logout</span>
        </button>
      </div>
    </div>
  );
};

export default MobileBottomNav;
