import React from 'react';
import { 
  X, 
  User,
  ChevronDown,
  Search,
  LayoutDashboard,
  Box,
  Settings,
  Clock,
  AlertCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

interface ComingSoonViewProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
}

export const ComingSoonView = ({ isOpen, onClose, title }: ComingSoonViewProps) => {
  if (!isOpen) return null;

  return (
    <AnimatePresence>
      <motion.div 
        initial={{ opacity: 0, x: '100%' }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: '100%' }}
        transition={{ type: 'spring', damping: 25, stiffness: 200 }}
        className="fixed inset-0 z-[100] bg-white flex flex-col overflow-hidden"
      >
        {/* Top Header */}
        <div className="bg-primary px-8 py-5 flex items-center justify-between text-white shrink-0 shadow-lg z-50">
          <div className="flex items-center gap-6">
            <div className="bg-white p-2 rounded-lg shadow-inner">
              <div className="w-8 h-8 bg-primary rounded-md flex items-center justify-center text-[11px] font-black">穿透</div>
            </div>
            <h1 className="text-2xl font-black tracking-[0.15em] drop-shadow-sm">穿透式监管平台</h1>
            <div className="h-6 w-[1px] bg-white/30 mx-2" />
            <p className="text-2xl font-bold tracking-wider">{title}</p>
          </div>
          <div className="flex items-center gap-10">
            <div className="relative group">
              <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors" />
              <input 
                type="text" 
                placeholder="输入搜索关键词" 
                className="bg-white/15 border-none rounded-full pl-12 pr-6 py-2.5 text-base w-80 placeholder-white/50 focus:ring-2 focus:ring-white/30 outline-none transition-all backdrop-blur-md"
              />
            </div>
            <div className="flex items-center gap-4 cursor-pointer hover:bg-white/10 px-4 py-2 rounded-lg transition-all">
              <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center shadow-lg border border-white/10">
                <User size={22} />
              </div>
              <div className="flex flex-col">
                <span className="text-base font-bold">系统管理员</span>
                <span className="text-[11px] opacity-70 uppercase tracking-tighter">Administrator</span>
              </div>
              <ChevronDown size={18} className="opacity-70" />
            </div>
            <button onClick={onClose} className="hover:bg-white/20 p-2.5 rounded-xl transition-all hover:rotate-90 duration-300">
              <X size={28} />
            </button>
          </div>
        </div>

        <div className="flex-1 flex flex-col items-center justify-center bg-slate-50 relative overflow-hidden">
          {/* Background Decorative Elements */}
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none select-none overflow-hidden">
            <div className="absolute -top-24 -left-24 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="absolute -bottom-24 -right-24 w-96 h-96 bg-primary rounded-full blur-3xl" />
            <div className="w-full h-full" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }} />
          </div>

          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="relative z-10 flex flex-col items-center text-center"
          >
            <div className="w-40 h-40 bg-white rounded-3xl shadow-premium flex items-center justify-center mb-10 border border-slate-100">
              <Clock size={80} className="text-primary animate-pulse" />
            </div>
            <h2 className="text-6xl font-black text-slate-800 mb-6 tracking-tight">
              {title}
            </h2>
            <div className="flex items-center gap-4 text-slate-400 mb-16">
              <AlertCircle size={24} />
              <span className="text-2xl font-medium">功能正在全力开发中，敬请期待...</span>
            </div>
            
            <div className="flex gap-6">
              <button 
                onClick={onClose}
                className="bg-primary text-white px-12 py-5 rounded-2xl text-xl font-bold shadow-xl shadow-primary/20 hover:bg-blue-600 transition-all flex items-center gap-2"
              >
                返回首页
              </button>
              <button className="bg-white border border-slate-200 text-slate-600 px-12 py-5 rounded-2xl text-xl font-bold hover:bg-slate-50 transition-all">
                了解更多
              </button>
            </div>
          </motion.div>

          {/* Progress Bar Mockup */}
          <div className="absolute bottom-20 w-full max-w-md px-10">
            <div className="flex justify-between text-xs font-bold text-slate-400 mb-2 uppercase tracking-widest">
              <span>Development Progress</span>
              <span>85%</span>
            </div>
            <div className="h-2 w-full bg-slate-200 rounded-full overflow-hidden">
              <motion.div 
                initial={{ width: 0 }}
                animate={{ width: '85%' }}
                transition={{ duration: 1.5, ease: "easeOut", delay: 0.5 }}
                className="h-full bg-primary rounded-full shadow-[0_0_12px_rgba(var(--primary),0.5)]"
              />
            </div>
          </div>
        </div>
      </motion.div>
    </AnimatePresence>
  );
};
