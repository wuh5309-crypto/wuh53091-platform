import React, { useState, useEffect } from 'react';
import { 
  Search, 
  ChevronDown, 
  BarChart3, 
  PlayCircle, 
  ClipboardList, 
  AlertTriangle, 
  Percent,
  ChevronRight,
  Plus
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer, 
  LineChart, 
  Line, 
  PieChart, 
  Pie, 
  Cell,
  AreaChart,
  Area,
  ComposedChart
} from 'recharts';
import { motion } from 'motion/react';
import { cn } from './lib/utils';
import { 
  KPI_DATA, 
  DOMAIN_DISTRIBUTION, 
  STATUS_DISTRIBUTION, 
  RISK_DISTRIBUTION, 
  RISK_LEVEL_DISTRIBUTION, 
  EXECUTION_TREND, 
  LATEST_ALERTS 
} from './constants';
import { MonitoringCenterView } from './components/MonitoringCenterView';
import { ComingSoonView } from './components/ComingSoonView';

export default function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  const [isMonitoringOpen, setIsMonitoringOpen] = useState(false);
  const [isComingSoonOpen, setIsComingSoonOpen] = useState(false);
  const [comingSoonTitle, setComingSoonTitle] = useState('');

  useEffect(() => {
    const timer = setInterval(() => setCurrentTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const formatDate = (date: Date) => {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    const h = String(date.getHours()).padStart(2, '0');
    const min = String(date.getMinutes()).padStart(2, '0');
    const s = String(date.getSeconds()).padStart(2, '0');
    return `${y}-${m}-${d} ${h}:${min}:${s}`;
  };

  return (
    <div className="min-h-screen flex flex-col bg-surface">
      {/* Hero Section */}
      <section className="hero-gradient h-[280px] relative flex flex-col items-center justify-center text-white">
        <div className="absolute inset-0 opacity-10 pointer-events-none" 
             style={{ backgroundImage: 'radial-gradient(#fff 1px, transparent 1px)', backgroundSize: '32px 32px' }} />
        
        <div className="absolute top-6 left-1/2 -translate-x-1/2 w-full max-w-[1638px] px-6 flex items-center justify-end gap-6 text-sm z-20">
          <div className="flex flex-col items-end opacity-90">
            <span className="font-mono">{formatDate(currentTime)}</span>
          </div>
          <div className="h-6 w-[1px] bg-white/20" />
          <div className="flex items-center gap-3 bg-white/10 px-3 py-1.5 rounded-full backdrop-blur-sm cursor-pointer hover:bg-white/20 transition-all">
            <div className="w-7 h-7 bg-primary rounded-full flex items-center justify-center font-bold text-[10px] shadow-lg">ZF</div>
            <span className="font-medium">管理员</span>
            <ChevronDown size={14} />
          </div>
        </div>

        <div className="relative z-10 text-center w-full max-w-[1638px] px-6">
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-7xl font-black mb-10 tracking-[0.25em] drop-shadow-lg"
          >
            穿透式监管平台
          </motion.h2>
          <div className="w-full max-w-[800px] mx-auto">
            <div className="bg-white/15 backdrop-blur-xl rounded-2xl border border-white/30 flex items-center p-3 shadow-2xl">
              <Search className="text-white/70 ml-4" size={28} />
              <input 
                className="flex-1 bg-transparent border-none text-white placeholder-white/50 px-5 py-3.5 focus:ring-0 text-2xl outline-none font-bold" 
                placeholder="请输入模型名称或业务领域关键词..." 
                type="text"
              />
              <button className="bg-primary hover:bg-blue-400 text-white px-12 py-3.5 rounded-xl transition-all font-black text-xl flex items-center gap-3 shadow-lg group">
                <span>搜索</span>
                <Search size={24} className="group-hover:scale-110 transition-transform" />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Main Navigation */}
      <div className="bg-primary-container h-16 flex items-center sticky top-0 z-30 shadow-xl">
        <div className="w-full max-w-[1638px] mx-auto px-6 h-full flex justify-center">
          <nav className="flex h-full">
            {['首页', '数据专区', '监测中心', '预警中心', '数据采集', '集成中心', '处置中心', '系统管理'].map((item, idx) => (
              <a 
                key={item}
                onClick={(e) => {
                  e.preventDefault();
                  if (item === '监测中心') {
                    setIsMonitoringOpen(true);
                  } else if (item !== '首页') {
                    setComingSoonTitle(item);
                    setIsComingSoonOpen(true);
                  }
                }}
                className={cn(
                  "px-8 h-full flex items-center text-white/70 hover:text-white hover:bg-white/5 transition-colors text-lg font-bold cursor-pointer",
                  idx === 0 && "text-white border-b-4 border-primary bg-white/5"
                )} 
                href="#"
              >
                {item}
              </a>
            ))}
          </nav>
        </div>
      </div>

      {/* Dashboard Content */}
      <main className="flex-1 py-8 w-full max-w-[1638px] mx-auto px-6">
        {/* KPI Cards */}
        <div className="grid grid-cols-5 gap-6 mb-8">
          {KPI_DATA.map((kpi, idx) => (
            <motion.div 
              key={kpi.label}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface-container-lowest p-8 rounded-2xl flex items-center justify-between shadow-card hover:shadow-premium transition-all group border border-slate-50"
            >
              <div>
                <p className="text-base text-slate-500 font-bold mb-2">{kpi.label}</p>
                <h3 className={cn("text-4xl font-black", kpi.label === '风险预警' ? 'text-error' : 'text-slate-800')}>
                  {kpi.value}
                </h3>
              </div>
              <div className={cn("w-16 h-16 rounded-2xl flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform", kpi.bgColor, kpi.color)}>
                {kpi.icon === 'BarChart3' && <BarChart3 size={36} />}
                {kpi.icon === 'PlayCircle' && <PlayCircle size={36} />}
                {kpi.icon === 'ClipboardList' && <ClipboardList size={36} />}
                {kpi.icon === 'AlertTriangle' && <AlertTriangle size={36} />}
                {kpi.icon === 'Percent' && <Percent size={36} />}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Charts Grid 1 */}
        <div className="grid grid-cols-12 gap-8 mb-8">
          {/* Business Domain Model Distribution */}
          <div className="col-span-8 bg-surface-container-lowest rounded-xl shadow-card">
            <div className="flex items-center justify-between px-8 py-5 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-5 bg-primary rounded-full" />
                <h4 className="text-lg font-black text-slate-800">业务域模型分布</h4>
              </div>
              <div className="flex items-center gap-6 text-sm font-bold text-slate-500">
                <div className="flex items-center gap-2"><span className="w-4 h-4 bg-primary/40 rounded-sm" />监管问题</div>
                <div className="flex items-center gap-2"><span className="w-5 h-[2px] bg-warning" />监管模型</div>
              </div>
            </div>
            <div className="p-6 h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={DOMAIN_DISTRIBUTION}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip 
                    contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 12px rgba(0,0,0,0.1)' }}
                  />
                  <Bar dataKey="problem" name="监管问题" fill="#1890ff" fillOpacity={0.4} radius={[4, 4, 0, 0]} barSize={40} />
                  <Line type="monotone" dataKey="model" name="监管模型" stroke="#faad14" strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: '#faad14', strokeWidth: 2 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Model Status Distribution */}
          <div className="col-span-4 bg-surface-container-lowest rounded-xl shadow-card">
            <div className="flex items-center gap-3 px-8 py-5 border-b border-slate-50">
              <div className="w-1.5 h-5 bg-primary rounded-full" />
              <h4 className="text-lg font-black text-slate-800">模型状态分布</h4>
            </div>
            <div className="p-8 h-[340px] flex items-center">
              <div className="w-1/2 h-full">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={STATUS_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={80}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {STATUS_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="w-1/2 space-y-5 pr-4">
                {STATUS_DISTRIBUTION.map((item) => (
                  <div key={item.name} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-4 h-4 rounded-full" style={{ backgroundColor: item.color }} />
                      <span className="text-base font-bold text-slate-600">{item.name}</span>
                    </div>
                    <span className="text-base font-black text-slate-800">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Charts Grid 2 */}
        <div className="grid grid-cols-12 gap-8 mb-8">
          {/* Business Domain Risk Distribution */}
          <div className="col-span-8 bg-surface-container-lowest rounded-xl shadow-card">
            <div className="flex items-center justify-between px-8 py-5 border-b border-slate-50">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-5 bg-primary rounded-full" />
                <h4 className="text-lg font-black text-slate-800">业务领域风险分布</h4>
              </div>
              <div className="flex items-center gap-6 text-sm font-bold text-slate-500">
                <div className="flex items-center gap-2"><span className="w-4 h-4 bg-indigo-500/20 rounded-sm" />风险数量</div>
                <div className="flex items-center gap-2"><span className="w-5 h-[2px] bg-error" />风险趋势</div>
              </div>
            </div>
            <div className="p-6 h-[340px]">
              <ResponsiveContainer width="100%" height="100%">
                <ComposedChart data={RISK_DISTRIBUTION}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                  <Tooltip />
                  <Bar dataKey="count" name="风险数量" fill="#6366f1" fillOpacity={0.2} radius={[4, 4, 0, 0]} barSize={40} />
                  <Line type="monotone" dataKey="trend" name="风险趋势" stroke="#ff4d4f" strokeWidth={2} dot={{ r: 4, fill: '#fff', stroke: '#ff4d4f', strokeWidth: 2 }} />
                </ComposedChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Risk Level Distribution */}
          <div className="col-span-4 bg-surface-container-lowest rounded-xl shadow-card">
            <div className="flex items-center gap-3 px-8 py-5 border-b border-slate-50">
              <div className="w-1.5 h-5 bg-primary rounded-full" />
              <h4 className="text-lg font-black text-slate-800">风险等级分布</h4>
            </div>
            <div className="p-8 h-[340px] flex items-center justify-around">
              <div className="relative w-48 h-48">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={RISK_LEVEL_DISTRIBUTION}
                      cx="50%"
                      cy="50%"
                      innerRadius={70}
                      outerRadius={90}
                      paddingAngle={2}
                      dataKey="value"
                    >
                      {RISK_LEVEL_DISTRIBUTION.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
                  <span className="text-sm font-bold text-slate-400">风险总数</span>
                  <span className="text-3xl font-black text-slate-800">1,248</span>
                </div>
              </div>
              <div className="space-y-4">
                {RISK_LEVEL_DISTRIBUTION.map((item) => (
                  <div key={item.name} className="flex items-center gap-5">
                    <div className="w-3.5 h-3.5 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-base font-bold text-slate-600 w-20">{item.name}</span>
                    <span className="text-base font-black" style={{ color: item.color }}>{item.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Model Execution Trend */}
        <div className="bg-surface-container-lowest rounded-xl shadow-card mb-8">
          <div className="flex items-center justify-between px-8 py-5 border-b border-slate-50">
            <div className="flex items-center gap-3">
              <div className="w-1.5 h-5 bg-primary rounded-full" />
              <h4 className="text-lg font-black text-slate-800">模型执行趋势</h4>
            </div>
            <div className="flex items-center gap-8">
              <div className="flex items-center gap-6 text-sm font-bold text-slate-500">
                <div className="flex items-center gap-2"><span className="w-5 h-[2px] bg-primary" />执行次数</div>
                <div className="flex items-center gap-2"><span className="w-5 h-[2px] bg-warning border-dashed" />触发风险</div>
              </div>
              <div className="flex bg-slate-100 p-1.5 rounded-xl text-sm">
                <button className="px-6 py-2 bg-white shadow-sm rounded-lg font-black text-primary">近7日</button>
                <button className="px-6 py-2 text-slate-500 hover:text-primary transition-colors font-bold">近半年</button>
                <button className="px-6 py-2 text-slate-500 hover:text-primary transition-colors font-bold">近1年</button>
              </div>
            </div>
          </div>
          <div className="p-6 h-[360px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={EXECUTION_TREND}>
                <defs>
                  <linearGradient id="colorExec" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#1890ff" stopOpacity={0.3}/>
                    <stop offset="95%" stopColor="#1890ff" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f1f5f9" />
                <XAxis dataKey="date" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: '#64748b' }} />
                <Tooltip />
                <Area type="monotone" dataKey="executions" name="执行次数" stroke="#1890ff" strokeWidth={2} fillOpacity={1} fill="url(#colorExec)" />
                <Line type="monotone" dataKey="risks" name="触发风险" stroke="#faad14" strokeDasharray="5 5" strokeWidth={1.5} dot={false} />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Bottom Row */}
        <div className="grid grid-cols-12 gap-8 mb-8 items-stretch">
          {/* Feedback Rate Monitoring */}
          <div className="col-span-3 bg-surface-container-lowest rounded-xl shadow-card flex flex-col">
            <div className="px-8 py-5 border-b border-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-5 bg-primary rounded-full" />
                <h4 className="text-lg font-black text-slate-800">反馈率监控</h4>
              </div>
            </div>
            <div className="p-8 flex-1 flex flex-col justify-around">
              {[
                { label: '综合反馈率', value: 88.1, color: 'bg-primary', textColor: 'text-primary' },
                { label: '高风险反馈率', value: 95.0, color: 'bg-error', textColor: 'text-error' },
                { label: '中风险反馈率', value: 82.4, color: 'bg-warning', textColor: 'text-warning' },
                { label: '低风险反馈率', value: 76.8, color: 'bg-slate-400', textColor: 'text-slate-400' },
                { label: '例外处理率', value: 100, color: 'bg-success', textColor: 'text-success' },
              ].map((item) => (
                <div key={item.label} className="space-y-2.5">
                  <div className="flex justify-between items-center text-sm">
                    <span className="font-black text-slate-700">{item.label}</span>
                    <span className={cn("font-black", item.textColor)}>{item.value}%</span>
                  </div>
                  <div className="h-3 w-full bg-slate-100 rounded-full overflow-hidden">
                    <motion.div 
                      initial={{ width: 0 }}
                      animate={{ width: `${item.value}%` }}
                      transition={{ duration: 1, ease: "easeOut" }}
                      className={cn("h-full rounded-full", item.color)} 
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Latest Alerts List */}
          <div className="col-span-9 bg-surface-container-lowest rounded-xl shadow-card flex flex-col">
            <div className="flex items-center justify-between px-8 py-5 border-b border-slate-50 shrink-0">
              <div className="flex items-center gap-3">
                <div className="w-1.5 h-5 bg-primary rounded-full" />
                <h4 className="text-lg font-black text-slate-800">最新预警列表</h4>
              </div>
              <button className="text-sm text-primary font-black hover:underline flex items-center gap-1">
                查看全部 <ChevronRight size={18} />
              </button>
            </div>
            <div className="flex-1 overflow-hidden">
              <div className="h-full custom-scrollbar overflow-y-auto">
                <table className="w-full text-left text-base border-collapse">
                  <thead className="bg-slate-50 text-slate-700 font-black border-b border-slate-100 sticky top-0 z-20">
                    <tr>
                      <th className="px-10 py-5 whitespace-nowrap">模型名称</th>
                      <th className="px-8 py-5 whitespace-nowrap">异常类型</th>
                      <th className="px-8 py-5 whitespace-nowrap">风险等级</th>
                      <th className="px-8 py-5 whitespace-nowrap">发生时间</th>
                      <th className="px-10 py-5 text-center whitespace-nowrap">状态</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-slate-50">
                    {LATEST_ALERTS.map((alert) => (
                      <tr key={alert.id} className="hover:bg-blue-50/30 transition-colors">
                        <td className="px-10 py-5 font-bold text-slate-800">{alert.modelName}</td>
                        <td className="px-8 py-5 text-slate-600 font-medium">{alert.type}</td>
                        <td className="px-8 py-5">
                          <span className={cn(
                            "inline-flex items-center px-4 py-1.5 rounded-full text-sm font-black border",
                            alert.level === 'high' ? "bg-red-50 text-error border-red-100" :
                            alert.level === 'medium' ? "bg-orange-50 text-warning border-orange-100" :
                            "bg-blue-50 text-primary border-blue-100"
                          )}>
                            <span className={cn(
                              "w-2 h-2 rounded-full mr-2.5",
                              alert.level === 'high' ? "bg-error" :
                              alert.level === 'medium' ? "bg-warning" :
                              "bg-primary"
                            )} />
                            {alert.level === 'high' ? '高风险' : alert.level === 'medium' ? '中风险' : '低风险'}
                          </span>
                        </td>
                        <td className="px-8 py-5 text-slate-500 font-mono text-sm">{alert.time}</td>
                        <td className="px-10 py-5 text-center">
                          <span className={cn(
                            "font-black cursor-pointer hover:underline text-base",
                            alert.status === '待处理' ? "text-primary" : 
                            alert.status === '已处理' ? "text-success" : "text-slate-400"
                          )}>
                            {alert.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-slate-200 py-10 mt-auto">
        <div className="w-full max-w-[1638px] mx-auto px-6 flex flex-col items-center gap-2">
          <p className="text-sm text-slate-600 font-semibold tracking-wide uppercase">穿透式监管平台</p>
          <p className="text-xs text-slate-400 font-medium">© 2024 穿透式监管平台 版权所有 | 系统版本 v2.4.0</p>
        </div>
      </footer>

      {/* Floating Action Button */}
      <button className="fixed bottom-10 right-10 w-16 h-16 bg-primary text-white rounded-full shadow-2xl hover:shadow-primary/40 hover:-translate-y-1 transition-all flex items-center justify-center z-50 group">
        <Plus size={32} className="transition-transform group-hover:rotate-90" />
        <span className="absolute right-20 bg-slate-800 text-white px-3 py-1.5 rounded text-xs opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap">
          新建监管模型
        </span>
      </button>
      {/* Monitoring Center View */}
      <MonitoringCenterView 
        isOpen={isMonitoringOpen} 
        onClose={() => setIsMonitoringOpen(false)} 
      />
      {/* Coming Soon View */}
      <ComingSoonView 
        isOpen={isComingSoonOpen} 
        onClose={() => setIsComingSoonOpen(false)} 
        title={comingSoonTitle}
      />
    </div>
  );
}
