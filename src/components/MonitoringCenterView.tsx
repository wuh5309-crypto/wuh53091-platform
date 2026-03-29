import React from 'react';
import { 
  X, 
  Briefcase, 
  Target, 
  Box, 
  Play,
  Search,
  ChevronRight,
  ChevronDown,
  FileText,
  User,
  Clock,
  Settings,
  Menu,
  ChevronLeft,
  Plus,
  Upload,
  Trash2,
  Power,
  Download,
  Filter,
  RefreshCw,
  Eye,
  Edit3,
  Copy,
  MoreVertical,
  Circle,
  FolderTree,
  CheckCircle2,
  RotateCcw,
  GitBranch,
  Network
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '../lib/utils';
import { 
  MODEL_MANAGEMENT_DATA, 
  BUSINESS_DOMAIN_DATA, 
  BUSINESS_DOMAIN_TREE, 
  BUSINESS_DOMAIN_PERMISSION_DATA, 
  INDICATOR_MANAGEMENT_DATA, 
  MODEL_CLASSIFICATION_TREE, 
  MODEL_SELECTION_DATA, 
  INDICATOR_LIBRARY_DATA, 
  REGULATORY_PROBLEM_DATA, 
  MODEL_VERSION_DATA,
  MODEL_TEST_DATA,
  INDICATOR_MAINTENANCE_DATA
} from '../constants';
import { BusinessDomainTreeNode } from '../types';

interface MonitoringCenterViewProps {
  isOpen: boolean;
  onClose: () => void;
}

const SidebarItem = ({ icon: Icon, label, active, children, defaultExpanded = false, onClick }: { icon: any, label: string, active?: boolean, children?: React.ReactNode, defaultExpanded?: boolean, onClick?: () => void }) => {
  const [isExpanded, setIsExpanded] = React.useState(defaultExpanded || active);

  return (
    <div className="group">
      <div 
        onClick={() => {
          setIsExpanded(!isExpanded);
          if (onClick) onClick();
        }}
        className={cn(
          "flex items-center gap-4 px-7 py-5 cursor-pointer transition-all duration-200",
          active 
            ? "bg-primary/10 text-primary border-r-[4px] border-primary shadow-[inset_0_0_0_1px_rgba(var(--primary),0.05)]" 
            : "text-slate-600 hover:bg-slate-50 hover:text-slate-900"
        )}
      >
        <Icon size={22} className={cn(active ? "text-primary" : "text-slate-400 group-hover:text-slate-600")} />
        <span className="text-[16px] font-bold flex-1">{label}</span>
        {children && (
          <ChevronRight 
            size={18} 
            className={cn(
              "transition-transform duration-200", 
              isExpanded ? "rotate-90 text-primary" : "text-slate-300"
            )} 
          />
        )}
      </div>
      <AnimatePresence>
        {isExpanded && children && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="bg-slate-50/80 py-3 border-b border-slate-100 overflow-hidden"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

const SubItem = ({ label, active, onClick }: { label: string, active?: boolean, onClick?: () => void }) => (
  <div 
    onClick={onClick}
    className={cn(
      "pl-16 pr-4 py-4 text-[16px] cursor-pointer transition-all flex items-center gap-2",
      active 
        ? "text-primary font-bold bg-primary/5" 
        : "text-slate-500 hover:text-primary hover:bg-slate-100/50"
    )}
  >
    <Circle size={6} className={cn("shrink-0", active ? "fill-primary text-primary" : "text-slate-300")} />
    <span>{label}</span>
  </div>
);

interface TreeItemProps {
  node: BusinessDomainTreeNode;
  level?: number;
}

const TreeItem: React.FC<TreeItemProps> = ({ node, level = 0 }) => {
  const [isExpanded, setIsExpanded] = React.useState(true);
  const hasChildren = node.children && node.children.length > 0;

  return (
    <div className="select-none">
      <div 
        className={cn(
          "flex items-center gap-2 py-2 px-3 rounded-lg cursor-pointer transition-all group",
          node.id === '1' ? "bg-primary/5 text-primary font-bold" : "text-slate-600 hover:bg-slate-100"
        )}
        style={{ paddingLeft: `${level * 16 + 12}px` }}
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {hasChildren ? (
          isExpanded ? <ChevronDown size={14} className="text-slate-400" /> : <ChevronRight size={14} className="text-slate-400" />
        ) : (
          <div className="w-[14px]" />
        )}
        <FileText size={14} className={cn(node.id === '1' ? "text-primary" : "text-slate-400 group-hover:text-slate-500")} />
        <span className="text-sm">{node.label}</span>
      </div>
      {hasChildren && isExpanded && (
        <div>
          {node.children?.map(child => (
            <TreeItem key={child.id} node={child} level={level + 1} />
          ))}
        </div>
      )}
    </div>
  );
};

export const MonitoringCenterView = ({ isOpen, onClose }: MonitoringCenterViewProps) => {
  const [activeView, setActiveView] = React.useState<'model-management' | 'business-domain-config' | 'business-domain-permission' | 'indicator-management' | 'indicator-library' | 'regulatory-problem-classification' | 'model-version' | 'model-test'>('model-management');
  const [activeSubMenu, setActiveSubMenu] = React.useState('模型管理');
  const [includeSub, setIncludeSub] = React.useState(true);

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
          <div className="bg-primary px-8 py-4 flex items-center justify-between text-white shrink-0 shadow-lg z-50">
            <div className="flex items-center gap-6">
              <div className="bg-white p-1.5 rounded-lg shadow-inner">
                <div className="w-7 h-7 bg-primary rounded-md flex items-center justify-center text-[10px] font-black">穿透</div>
              </div>
              <h1 className="text-xl font-black tracking-[0.15em] drop-shadow-sm">穿透式监管平台</h1>
              <div className="h-5 w-[1px] bg-white/30 mx-2" />
              <p className="text-xl font-bold tracking-wider">监管中心</p>
            </div>
            <div className="flex items-center gap-8">
              <div className="relative group">
                <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-white/60 group-focus-within:text-white transition-colors" />
                <input 
                  type="text" 
                  placeholder="输入搜索关键词" 
                  className="bg-white/15 border-none rounded-full pl-12 pr-6 py-2 text-sm w-72 placeholder-white/50 focus:ring-2 focus:ring-white/30 outline-none transition-all backdrop-blur-md"
                />
              </div>
              <div className="flex items-center gap-3 cursor-pointer hover:bg-white/10 px-3 py-1.5 rounded-lg transition-all">
                <div className="w-9 h-9 bg-white/20 rounded-full flex items-center justify-center shadow-lg border border-white/10">
                  <User size={20} />
                </div>
                <div className="flex flex-col">
                  <span className="text-sm font-bold">系统管理员</span>
                  <span className="text-[10px] opacity-70 uppercase tracking-tighter">Administrator</span>
                </div>
                <ChevronDown size={16} className="opacity-70" />
              </div>
              <button onClick={onClose} className="hover:bg-white/20 p-2 rounded-xl transition-all hover:rotate-90 duration-300">
                <X size={24} />
              </button>
            </div>
          </div>

          <div className="flex-1 flex overflow-hidden">
            {/* Sidebar */}
            <div className="w-80 border-r border-slate-200 bg-white flex flex-col shrink-0 shadow-[4px_0_24px_rgba(0,0,0,0.02)] z-40">
              <div className="flex-1 overflow-y-auto custom-scrollbar py-4">
                <SidebarItem 
                  icon={Briefcase} 
                  label="业务域管理" 
                  active={activeSubMenu === '业务域配置' || activeSubMenu === '业务域权限'}
                >
                  <SubItem 
                    label="业务域配置" 
                    active={activeSubMenu === '业务域配置'} 
                    onClick={() => {
                      setActiveView('business-domain-config');
                      setActiveSubMenu('业务域配置');
                    }}
                  />
                  <SubItem 
                    label="业务域权限" 
                    active={activeSubMenu === '业务域权限'} 
                    onClick={() => {
                      setActiveView('business-domain-permission');
                      setActiveSubMenu('业务域权限');
                    }}
                  />
                </SidebarItem>
                <SidebarItem 
                  icon={Target} 
                  label="指标管理"
                  active={activeSubMenu === '指标管理' || activeSubMenu === '指标库'}
                >
                  <SubItem 
                    label="指标管理" 
                    active={activeSubMenu === '指标管理'} 
                    onClick={() => {
                      setActiveView('indicator-management');
                      setActiveSubMenu('指标管理');
                    }}
                  />
                  <SubItem 
                    label="指标库" 
                    active={activeSubMenu === '指标库'} 
                    onClick={() => {
                      setActiveView('indicator-library');
                      setActiveSubMenu('指标库');
                    }}
                  />
                </SidebarItem>
                <SidebarItem 
                  icon={Box} 
                  label="模型管理" 
                  active={activeSubMenu === '模型管理' || activeSubMenu === '监管问题分类' || activeSubMenu === '模型版本'}
                >
                  <SubItem 
                    label="监管问题分类" 
                    active={activeSubMenu === '监管问题分类'}
                    onClick={() => {
                      setActiveView('regulatory-problem-classification');
                      setActiveSubMenu('监管问题分类');
                    }}
                  />
                  <SubItem 
                    label="模型管理" 
                    active={activeSubMenu === '模型管理'} 
                    onClick={() => {
                      setActiveView('model-management');
                      setActiveSubMenu('模型管理');
                    }}
                  />
                  <SubItem 
                    label="模型版本" 
                    active={activeSubMenu === '模型版本'}
                    onClick={() => {
                      setActiveView('model-version');
                      setActiveSubMenu('模型版本');
                    }}
                  />
                  <SubItem 
                    label="模型测试" 
                    active={activeSubMenu === '模型测试'}
                    onClick={() => {
                      setActiveView('model-test');
                      setActiveSubMenu('模型测试');
                    }}
                  />
                  <SubItem label="模型库" />
                  <SubItem label="模型审核" />
                  <SubItem label="风险等级配置" />
                  <SubItem label="模型维度配置" />
                </SidebarItem>
                <SidebarItem icon={Play} label="模型执行">
                  <SubItem label="数据管理" />
                  <SubItem label="任务管理" />
                  <SubItem label="任务监控" />
                  <SubItem label="风险预警" />
                  <SubItem label="处置反馈" />
                </SidebarItem>
                <SidebarItem icon={Settings} label="系统配置" />
              </div>
            </div>

            {/* Main Content */}
            <div className="flex-1 bg-slate-50 flex flex-col overflow-hidden">
              {/* Breadcrumbs */}
              <div className="px-8 py-4 bg-white border-b border-slate-200 flex items-center gap-3 text-sm text-slate-500 shrink-0 shadow-sm z-30">
                <Menu size={18} className="text-slate-400" />
                <span className="hover:text-primary cursor-pointer transition-colors">
                  {activeView === 'model-management' || activeView === 'regulatory-problem-classification' || activeView === 'model-version' || activeView === 'model-test' ? '模型管理' : 
                   activeView === 'indicator-management' || activeView === 'indicator-library' ? '指标管理' : '业务域管理'}
                </span>
                <ChevronRight size={14} className="text-slate-300" />
                <span className="text-slate-900 font-bold">
                  {activeView === 'model-management' ? '模型管理列表' : 
                   activeView === 'regulatory-problem-classification' ? '重点监管问题' :
                   activeView === 'model-version' ? '模型版本' :
                   activeView === 'model-test' ? '模型测试' :
                   activeView === 'business-domain-config' ? '业务域配置' : 
                   activeView === 'business-domain-permission' ? '业务权限' : 
                   activeView === 'indicator-management' ? '指标管理' : '指标库'}
                </span>
              </div>

              <div className="p-8 flex-1 overflow-y-auto custom-scrollbar">
                {activeView === 'model-version' ? (
                  <div className="flex gap-8 h-full">
                    {/* Left Tree - Model Classification */}
                    <div className="w-72 bg-white rounded-2xl shadow-premium border border-slate-100 flex flex-col overflow-hidden shrink-0">
                      <div className="p-6 border-b border-slate-100 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-slate-800 flex items-center gap-2">
                            <Network size={18} className="text-primary" />
                            模型分类
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-xs text-slate-500">包含下级</span>
                            <button 
                              onClick={() => setIncludeSub(!includeSub)}
                              className={cn(
                                "w-10 h-5 rounded-full transition-all relative",
                                includeSub ? "bg-primary" : "bg-slate-200"
                              )}
                            >
                              <div className={cn(
                                "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                                includeSub ? "right-1" : "left-1"
                              )} />
                            </button>
                          </div>
                        </div>
                        <div className="relative">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="请输入关键词" 
                            className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                        {MODEL_CLASSIFICATION_TREE.map(node => (
                          <TreeItem key={node.id} node={node} />
                        ))}
                      </div>
                    </div>

                    {/* Right Content */}
                    <div className="flex-1 flex flex-col gap-6 overflow-hidden">
                      <div className="bg-white p-6 rounded-2xl shadow-premium border border-slate-100 flex items-center justify-between shrink-0">
                        <div className="flex items-center gap-4 flex-1 max-w-2xl">
                          <span className="text-sm font-bold text-slate-700 whitespace-nowrap">模型名称：</span>
                          <div className="relative flex-1">
                            <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm appearance-none focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50 font-medium">
                              <option>显性保管过度监管模型</option>
                              <option>隐性负债累积监管模型</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                        <button className="bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 flex items-center gap-2">
                          <Plus size={18} />
                          创建新版本
                        </button>
                      </div>

                      <div className="flex-1 overflow-y-auto custom-scrollbar pr-2 space-y-8 relative">
                        {/* Timeline Line */}
                        <div className="absolute left-[7px] top-4 bottom-4 w-[2px] bg-slate-200 z-0" />

                        {MODEL_VERSION_DATA.map((item) => (
                          <div key={item.id} className="relative pl-10">
                            {/* Timeline Dot */}
                            <div className="absolute left-0 top-1.5 w-4 h-4 rounded-full border-4 border-white bg-primary shadow-sm z-10" />
                            
                            <div className="space-y-3">
                              <div className="text-sm font-medium text-slate-500">发布时间：{item.publishTime}</div>
                              
                              <div className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden">
                                <div className="bg-slate-900 px-6 py-3 flex items-center justify-between">
                                  <div className={cn(
                                    "px-3 py-1 rounded text-[10px] font-bold uppercase tracking-wider",
                                    item.status === 'enabled' ? "bg-emerald-500/20 text-emerald-400" : "bg-red-500/20 text-red-400"
                                  )}>
                                    {item.status === 'enabled' ? '启用版本' : '失效版本'}
                                  </div>
                                  <div className="flex items-center gap-6 text-xs font-bold">
                                    <button className="text-white/70 hover:text-white transition-colors">详情</button>
                                    <button className="text-white/70 hover:text-white transition-colors">模型测试</button>
                                    <button className={cn(
                                      "transition-colors",
                                      item.status === 'enabled' ? "text-red-400 hover:text-red-300" : "text-emerald-400 hover:text-emerald-300"
                                    )}>
                                      {item.status === 'enabled' ? '失效' : '启用'}
                                    </button>
                                  </div>
                                </div>
                                
                                <div className="p-0">
                                  <table className="w-full text-left text-sm border-collapse">
                                    <thead className="bg-slate-50/50 text-slate-500 font-bold border-b border-slate-100">
                                      <tr>
                                        <th className="px-6 py-3 text-center w-32 border-r border-slate-100">创造人</th>
                                        <th className="px-6 py-3 text-center w-32 border-r border-slate-100">版本号</th>
                                        <th className="px-6 py-3 text-center w-48 border-r border-slate-100">创建时间</th>
                                        <th className="px-6 py-3 text-center">变更说明</th>
                                      </tr>
                                    </thead>
                                    <tbody>
                                      <tr className="divide-x divide-slate-100">
                                        <td className="px-6 py-8 text-center font-bold text-slate-800">{item.creator}</td>
                                        <td className="px-6 py-8 text-center font-mono text-slate-600">{item.version}</td>
                                        <td className="px-6 py-8 text-center font-mono text-slate-600">{item.createTime}</td>
                                        <td className="px-6 py-8 text-slate-500">{item.changeDescription || '-'}</td>
                                      </tr>
                                    </tbody>
                                  </table>
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                ) : activeView === 'model-test' ? (
                  <div className="flex gap-6 h-full overflow-hidden">
                    {/* Left: Model Classification Tree */}
                    <div className="w-64 bg-white rounded-2xl shadow-premium border border-slate-100 flex flex-col overflow-hidden shrink-0">
                      <div className="p-5 border-b border-slate-100 space-y-4">
                        <div className="flex items-center justify-between">
                          <h3 className="font-bold text-slate-800 flex items-center gap-2 text-sm">
                            <Network size={16} className="text-primary" />
                            模型分类
                          </h3>
                          <div className="flex items-center gap-2">
                            <span className="text-[10px] text-slate-500">包含下级</span>
                            <button 
                              onClick={() => setIncludeSub(!includeSub)}
                              className={cn(
                                "w-8 h-4 rounded-full transition-all relative",
                                includeSub ? "bg-primary" : "bg-slate-200"
                              )}
                            >
                              <div className={cn(
                                "absolute top-0.5 w-3 h-3 bg-white rounded-full transition-all shadow-sm",
                                includeSub ? "right-0.5" : "left-0.5"
                              )} />
                            </button>
                          </div>
                        </div>
                        <div className="relative">
                          <Search size={12} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="请输入" 
                            className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-8 pr-3 py-1.5 text-[11px] focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                          />
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto p-3 custom-scrollbar">
                        {MODEL_CLASSIFICATION_TREE.map(node => (
                          <TreeItem key={node.id} node={node} />
                        ))}
                      </div>
                    </div>

                    {/* Middle: Model Selection Table */}
                    <div className="flex-1 bg-white rounded-2xl shadow-premium border border-slate-100 flex flex-col overflow-hidden">
                      <div className="p-5 border-b border-slate-100 bg-slate-50/30">
                        <h3 className="font-bold text-slate-800 text-sm">模型选择：</h3>
                      </div>
                      <div className="p-4 border-b border-slate-100">
                        <div className="relative max-w-sm">
                          <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                          <input 
                            type="text" 
                            placeholder="请输入模型编号/模型名称" 
                            className="w-full border border-slate-200 rounded-xl pl-9 pr-4 py-2 text-xs focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50"
                          />
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100 sticky top-0 z-10">
                            <tr>
                              <th className="px-4 py-3 w-12 text-center">序号</th>
                              <th className="px-4 py-4">模型编码</th>
                              <th className="px-4 py-4">模型名称</th>
                              <th className="px-4 py-4">版本号</th>
                              <th className="px-4 py-4">最近维护时间</th>
                              <th className="px-4 py-4">维护人</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {MODEL_TEST_DATA.map((row, idx) => (
                              <tr key={row.id} className={cn(
                                "hover:bg-blue-50/40 transition-all group cursor-pointer",
                                idx === 0 ? "bg-blue-50/60" : ""
                              )}>
                                <td className={cn(
                                  "px-4 py-4 text-center font-medium",
                                  idx === 0 ? "bg-primary text-white" : "text-slate-400"
                                )}>{row.index}</td>
                                <td className="px-4 py-4 font-mono text-slate-600">{row.code}</td>
                                <td className="px-4 py-4 text-slate-800 font-bold">{row.name}</td>
                                <td className="px-4 py-4 text-slate-600">{row.version}</td>
                                <td className="px-4 py-4 text-slate-500">{row.lastMaintenanceTime}</td>
                                <td className="px-4 py-4 text-slate-600">{row.maintainer}</td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                      {/* Pagination */}
                      <div className="px-4 py-3 bg-slate-50/30 border-t border-slate-100 flex items-center justify-center gap-4 text-[11px]">
                        <div className="flex items-center gap-1">
                          <button className="p-1 hover:bg-slate-200 rounded text-slate-400"><ChevronLeft size={16} /></button>
                          <button className="w-6 h-6 bg-primary text-white rounded font-bold">1</button>
                          <button className="w-6 h-6 hover:bg-slate-200 rounded transition-all font-medium text-slate-600">2</button>
                          <button className="w-6 h-6 hover:bg-slate-200 rounded transition-all font-medium text-slate-600">3</button>
                          <button className="p-1 hover:bg-slate-200 rounded text-slate-400 rotate-180"><ChevronRight size={16} /></button>
                        </div>
                        <div className="flex items-center gap-2 border border-slate-200 rounded px-2 py-1 bg-white cursor-pointer hover:border-primary transition-all">
                          <span className="text-slate-600">10条/页</span>
                          <ChevronDown size={12} className="text-slate-400" />
                        </div>
                        <div className="flex items-center gap-2">
                          <span className="text-slate-500">跳至</span>
                          <input type="text" className="w-8 border border-slate-200 rounded px-1 py-1 text-center font-bold focus:border-primary outline-none transition-all" defaultValue="1" />
                          <span className="text-slate-500">页</span>
                        </div>
                      </div>
                    </div>

                    {/* Right: Indicator Value Maintenance */}
                    <div className="flex-1 bg-white rounded-2xl shadow-premium border border-slate-100 flex flex-col overflow-hidden">
                      <div className="p-5 border-b border-slate-100 bg-slate-50/30 flex items-center justify-between">
                        <h3 className="font-bold text-slate-800 text-sm">指标值维护：</h3>
                        <div className="flex items-center gap-3">
                          <button className="bg-primary text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20">保存</button>
                          <button className="bg-primary text-white px-5 py-2 rounded-xl text-xs font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20">开始执行试算</button>
                          <button className="bg-white border border-slate-200 text-slate-600 px-5 py-2 rounded-xl text-xs font-bold hover:bg-slate-50 transition-all">清空</button>
                        </div>
                      </div>
                      <div className="flex-1 overflow-y-auto custom-scrollbar">
                        <table className="w-full text-left text-xs border-collapse">
                          <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100 sticky top-0 z-10">
                            <tr>
                              <th className="px-4 py-3 w-12 text-center">序号</th>
                              <th className="px-4 py-4">指标中文名称</th>
                              <th className="px-4 py-4">计算公式</th>
                              <th className="px-4 py-4">计量单位</th>
                              <th className="px-4 py-4 w-32">维护值</th>
                            </tr>
                          </thead>
                          <tbody className="divide-y divide-slate-50">
                            {INDICATOR_MAINTENANCE_DATA.map((row) => (
                              <tr key={row.id} className="hover:bg-blue-50/40 transition-all group">
                                <td className="px-4 py-4 text-center text-slate-400">{row.index}</td>
                                <td className="px-4 py-4 text-slate-800 font-bold">{row.name}</td>
                                <td className="px-4 py-4 text-slate-500 leading-relaxed text-[11px] max-w-xs" title={row.formula}>{row.formula}</td>
                                <td className="px-4 py-4 text-slate-600">{row.unit}</td>
                                <td className="px-4 py-4">
                                  <input 
                                    type="text" 
                                    placeholder="请输入" 
                                    className="w-full border border-slate-200 rounded-lg px-3 py-1.5 text-xs focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/30"
                                  />
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                ) : activeView === 'model-management' ? (
                  <div className="space-y-8">
                    {/* Model Management View Content (Existing) */}
                    <div className="bg-white p-8 rounded-2xl shadow-premium border border-slate-100">
                      <div className="flex items-center gap-3 mb-6">
                        <Filter size={18} className="text-primary" />
                        <h3 className="text-lg font-bold text-slate-800 tracking-tight">筛选查询</h3>
                      </div>
                      <div className="grid grid-cols-4 gap-8">
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <div className="w-1 h-3 bg-primary rounded-full" />
                            模型编码
                          </label>
                          <input type="text" placeholder="请输入编码" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <div className="w-1 h-3 bg-primary rounded-full" />
                            模型名称
                          </label>
                          <input type="text" placeholder="请输入名称" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                            <div className="w-1 h-3 bg-primary rounded-full" />
                            模型状态
                          </label>
                          <div className="relative">
                            <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm appearance-none focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50">
                              <option>全部状态</option>
                              <option>草稿</option>
                              <option>审核中</option>
                              <option>发布启用</option>
                              <option>停用</option>
                            </select>
                            <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                          </div>
                        </div>
                        <div className="flex items-end gap-4">
                          <button className="flex-1 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                            <Search size={16} />
                            查询
                          </button>
                          <button className="flex-1 bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                            <RefreshCw size={16} />
                            重置
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/10 flex items-center gap-2">
                          <Plus size={18} />
                          新建内部模型
                        </button>
                        <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                          <Upload size={18} className="text-slate-400" />
                          提交审核
                        </button>
                        <button className="bg-error/5 text-error border border-error/20 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-error/10 transition-all flex items-center gap-2">
                          <Trash2 size={18} />
                          批量删除
                        </button>
                        <button className="bg-warning/5 text-warning border border-warning/20 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-warning/10 transition-all flex items-center gap-2">
                          <Power size={18} />
                          批量停用
                        </button>
                      </div>
                      <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                        <Download size={18} className="text-slate-400" />
                        导出数据
                      </button>
                    </div>

                    <div className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden">
                      <table className="w-full text-left text-sm border-collapse">
                        <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
                          <tr>
                            <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></th>
                            <th className="px-6 py-4 w-16">序号</th>
                            <th className="px-6 py-4">模型编码</th>
                            <th className="px-6 py-4">模型名称</th>
                            <th className="px-6 py-4 w-1/4">模型说明</th>
                            <th className="px-6 py-4">版本号</th>
                            <th className="px-6 py-4">当前状态</th>
                            <th className="px-6 py-4">创建人</th>
                            <th className="px-6 py-4">发布时间</th>
                            <th className="px-6 py-4 text-center">操作</th>
                          </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-50">
                          {MODEL_MANAGEMENT_DATA.map((model) => (
                            <tr key={model.id} className="hover:bg-blue-50/40 transition-all group">
                              <td className="px-6 py-5"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></td>
                              <td className="px-6 py-5 text-slate-400">{model.index}</td>
                              <td className="px-6 py-5 font-mono text-slate-600 text-xs">{model.code}</td>
                              <td className="px-6 py-5 text-slate-800">{model.name}</td>
                              <td className="px-6 py-5 text-slate-500 leading-relaxed line-clamp-2 text-xs">{model.description}</td>
                              <td className="px-6 py-5 font-mono text-xs bg-slate-50/50 text-center rounded-md">{model.version}</td>
                              <td className="px-6 py-5">
                                <span className={cn(
                                  "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm",
                                  model.status === '草稿' ? "bg-slate-100 text-slate-600" :
                                  model.status === '审核中' ? "bg-orange-100 text-warning" :
                                  model.status === '发布启用' ? "bg-green-100 text-success" :
                                  "bg-red-100 text-error"
                                )}>
                                  {model.status}
                                </span>
                              </td>
                              <td className="px-6 py-5 text-slate-600">{model.creator}</td>
                              <td className="px-6 py-5 text-slate-400 font-mono text-xs">{model.publishTime}</td>
                              <td className="px-6 py-5">
                                <div className="flex items-center justify-center gap-4">
                                  <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="详情">
                                    <Eye size={18} />
                                  </button>
                                  <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="编辑">
                                    <Edit3 size={18} />
                                  </button>
                                  <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all" title="复制">
                                    <Copy size={18} />
                                  </button>
                                  <button className="p-2 text-slate-400 hover:bg-slate-100 rounded-lg transition-all">
                                    <MoreVertical size={18} />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>

                      <div className="px-8 py-6 bg-white border-t border-slate-100 flex items-center justify-end gap-6 text-sm">
                        <div className="flex items-center gap-2">
                          <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-primary"><ChevronLeft size={20} /></button>
                          <button className="w-10 h-10 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">1</button>
                          <button className="w-10 h-10 hover:bg-slate-100 rounded-xl transition-all font-medium text-slate-600">2</button>
                          <button className="w-10 h-10 hover:bg-slate-100 rounded-xl transition-all font-medium text-slate-600">3</button>
                          <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-primary rotate-180"><ChevronRight size={20} /></button>
                        </div>
                        <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 cursor-pointer hover:border-primary transition-all">
                          <span className="text-slate-600 font-medium">10条/页</span>
                          <ChevronDown size={14} className="text-slate-400" />
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-slate-500">跳至</span>
                          <input type="text" className="w-12 border border-slate-200 rounded-xl px-2 py-2 text-center font-bold focus:border-primary outline-none transition-all" defaultValue="1" />
                          <span className="text-slate-500">页</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="flex gap-8 h-full">
                    {/* Left Tree - Business Domain (Hidden for Indicator Library) */}
                    {activeView !== 'indicator-library' && (
                      <div className="w-72 bg-white rounded-2xl shadow-premium border border-slate-100 flex flex-col overflow-hidden shrink-0">
                        <div className="p-6 border-b border-slate-100 space-y-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-bold text-slate-800 flex items-center gap-2">
                              <FolderTree size={18} className="text-primary" />
                              业务领域
                            </h3>
                            <div className="flex items-center gap-2">
                              <span className="text-xs text-slate-500">包含下级</span>
                              <button 
                                onClick={() => setIncludeSub(!includeSub)}
                                className={cn(
                                  "w-10 h-5 rounded-full transition-all relative",
                                  includeSub ? "bg-primary" : "bg-slate-200"
                                )}
                              >
                                <div className={cn(
                                  "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                                  includeSub ? "right-1" : "left-1"
                                )} />
                              </button>
                            </div>
                          </div>
                          <div className="relative">
                            <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                            <input 
                              type="text" 
                              placeholder="请输入关键词" 
                              className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                            />
                          </div>
                        </div>
                        <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                          {BUSINESS_DOMAIN_TREE.map(node => (
                            <TreeItem key={node.id} node={node} />
                          ))}
                        </div>
                      </div>
                    )}

                    {/* Right Content */}
                    <div className="flex-1 space-y-8 overflow-y-auto custom-scrollbar pr-2">
                      {activeView === 'regulatory-problem-classification' ? (
                        <>
                          {/* Regulatory Problem Classification View */}
                          {/* Filters */}
                          <div className="bg-white p-8 rounded-2xl shadow-premium border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                              <Filter size={18} className="text-primary" />
                              <h3 className="text-lg font-bold text-slate-800 tracking-tight">筛选查询</h3>
                            </div>
                            <div className="grid grid-cols-4 gap-8">
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                  <div className="w-1 h-3 bg-primary rounded-full" />
                                  重点监管问题编号：
                                </label>
                                <input type="text" placeholder="请输入编号" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                  <div className="w-1 h-3 bg-primary rounded-full" />
                                  重点监管问题：
                                </label>
                                <input type="text" placeholder="请输入问题" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                  <div className="w-1 h-3 bg-primary rounded-full" />
                                  是否启用：
                                </label>
                                <div className="relative">
                                  <select className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm appearance-none focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50">
                                    <option>全部</option>
                                    <option>是</option>
                                    <option>否</option>
                                  </select>
                                  <ChevronDown size={16} className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 pointer-events-none" />
                                </div>
                              </div>
                              <div className="flex items-end gap-4">
                                <button className="flex-1 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                  <Search size={16} />
                                  查询
                                </button>
                                <button className="flex-1 bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                  <RefreshCw size={16} />
                                  重置
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-4">
                              <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/10 flex items-center gap-2">
                                <Plus size={18} />
                                新建
                              </button>
                              <button className="bg-error/5 text-error border border-error/20 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-error/10 transition-all flex items-center gap-2">
                                <Trash2 size={18} />
                                批量删除
                              </button>
                            </div>
                            <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                              <Download size={18} className="text-slate-400" />
                              导出数据
                            </button>
                          </div>

                          {/* Table */}
                          <div className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden">
                            <table className="w-full text-left text-sm border-collapse">
                              <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
                                <tr>
                                  <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></th>
                                  <th className="px-6 py-4 w-16">序号</th>
                                  <th className="px-6 py-4">重点监管问题</th>
                                  <th className="px-6 py-4">重点监管问题编码</th>
                                  <th className="px-6 py-4 w-1/4">重点监管问题说明</th>
                                  <th className="px-6 py-4">备注</th>
                                  <th className="px-6 py-4">是否启用</th>
                                  <th className="px-6 py-4">创建人</th>
                                  <th className="px-6 py-4">创建时间</th>
                                  <th className="px-6 py-4 text-center">操作</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {REGULATORY_PROBLEM_DATA.map((item) => (
                                  <tr key={item.id} className="hover:bg-blue-50/40 transition-all group">
                                    <td className="px-6 py-5"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></td>
                                    <td className="px-6 py-5 text-slate-400">{item.index}</td>
                                    <td className="px-6 py-5 text-slate-800">{item.problem}</td>
                                    <td className="px-6 py-5 font-mono text-slate-600 text-xs">{item.code}</td>
                                    <td className="px-6 py-5 text-slate-500 leading-relaxed line-clamp-2 text-xs">{item.description}</td>
                                    <td className="px-6 py-5 text-slate-500 text-xs">{item.remark}</td>
                                    <td className="px-6 py-5 text-slate-600">{item.enabled}</td>
                                    <td className="px-6 py-5 text-slate-600">{item.creator}</td>
                                    <td className="px-6 py-5 text-slate-400 font-mono text-xs">{item.createTime}</td>
                                    <td className="px-6 py-5">
                                      <div className="flex items-center justify-center gap-3 text-xs">
                                        <button className="text-primary hover:underline">详情</button>
                                        <button className="text-primary hover:underline">编辑</button>
                                        <button className="text-red-500 hover:underline">删除</button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="px-8 py-6 bg-white border-t border-slate-100 flex items-center justify-end gap-6 text-sm">
                              <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-primary"><ChevronLeft size={20} /></button>
                                <button className="w-10 h-10 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">1</button>
                                <button className="w-10 h-10 hover:bg-slate-100 rounded-xl transition-all font-medium text-slate-600">2</button>
                                <button className="w-10 h-10 hover:bg-slate-100 rounded-xl transition-all font-medium text-slate-600">3</button>
                                <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-primary rotate-180"><ChevronRight size={20} /></button>
                              </div>
                              <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 cursor-pointer hover:border-primary transition-all">
                                <span className="text-slate-600 font-medium">10条/页</span>
                                <ChevronDown size={14} className="text-slate-400" />
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-slate-500">跳至</span>
                                <input type="text" className="w-12 border border-slate-200 rounded-xl px-2 py-2 text-center font-bold focus:border-primary outline-none transition-all" defaultValue="1" />
                                <span className="text-slate-500">页</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : activeView === 'indicator-library' ? (
                        <div className="flex gap-8 h-full">
                          {/* Left Tree - Model Classification */}
                          <div className="w-72 bg-white rounded-2xl shadow-premium border border-slate-100 flex flex-col overflow-hidden shrink-0">
                            <div className="p-6 border-b border-slate-100 space-y-4">
                              <div className="flex items-center justify-between">
                                <h3 className="font-bold text-slate-800 flex items-center gap-2">
                                  <Network size={18} className="text-primary" />
                                  模型分类
                                </h3>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-slate-500">包含下级</span>
                                  <button 
                                    onClick={() => setIncludeSub(!includeSub)}
                                    className={cn(
                                      "w-10 h-5 rounded-full transition-all relative",
                                      includeSub ? "bg-primary" : "bg-slate-200"
                                    )}
                                  >
                                    <div className={cn(
                                      "absolute top-1 w-3 h-3 bg-white rounded-full transition-all",
                                      includeSub ? "right-1" : "left-1"
                                    )} />
                                  </button>
                                </div>
                              </div>
                              <div className="relative">
                                <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                <input 
                                  type="text" 
                                  placeholder="请输入关键词" 
                                  className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                />
                              </div>
                            </div>
                            <div className="flex-1 overflow-y-auto p-4 custom-scrollbar">
                              {MODEL_CLASSIFICATION_TREE.map(node => (
                                <TreeItem key={node.id} node={node} />
                              ))}
                            </div>
                          </div>

                          {/* Middle Content - Model Selection */}
                          <div className="flex-1 bg-white rounded-2xl shadow-premium border border-slate-100 flex flex-col overflow-hidden">
                            <div className="p-6 border-b border-slate-100 space-y-4">
                              <h3 className="font-bold text-slate-800">模型选择：</h3>
                              <div className="flex items-center gap-4">
                                <div className="relative flex-1">
                                  <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                                  <input 
                                    type="text" 
                                    placeholder="请输入模型编号/模型名称" 
                                    className="w-full bg-slate-50 border border-slate-100 rounded-lg pl-9 pr-4 py-2 text-xs focus:ring-2 focus:ring-primary/20 outline-none transition-all"
                                  />
                                </div>
                                <div className="flex items-center gap-2">
                                  <span className="text-xs text-slate-500 whitespace-nowrap">包含所有启用版本</span>
                                  <button className="w-10 h-5 bg-slate-200 rounded-full transition-all relative">
                                    <div className="absolute top-1 left-1 w-3 h-3 bg-white rounded-full transition-all" />
                                  </button>
                                  <span className="text-xs text-slate-500">否</span>
                                </div>
                              </div>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100 sticky top-0">
                                  <tr>
                                    <th className="px-4 py-3 w-12 text-center">序号</th>
                                    <th className="px-4 py-3">模型编码</th>
                                    <th className="px-4 py-3">模型名称</th>
                                    <th className="px-4 py-3 w-20">版本号</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                  {MODEL_SELECTION_DATA.map((item) => (
                                    <tr key={item.id} className={cn(
                                      "hover:bg-blue-50/40 transition-all cursor-pointer",
                                      item.id === '1' ? "bg-primary text-white hover:bg-primary/90" : ""
                                    )}>
                                      <td className="px-4 py-3 text-center">{item.index}</td>
                                      <td className="px-4 py-3 font-mono">{item.code}</td>
                                      <td className="px-4 py-3">{item.name}</td>
                                      <td className="px-4 py-3 font-mono">{item.version}</td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                            {/* Small Pagination for Middle Table */}
                            <div className="px-4 py-3 border-t border-slate-100 flex items-center justify-center gap-2 text-[10px]">
                              <button className="p-1 hover:bg-slate-100 rounded border border-slate-200"><ChevronLeft size={12} /></button>
                              <button className="w-6 h-6 bg-primary text-white rounded font-bold">1</button>
                              <button className="w-6 h-6 hover:bg-slate-100 rounded font-medium text-slate-600">2</button>
                              <button className="w-6 h-6 hover:bg-slate-100 rounded font-medium text-slate-600">3</button>
                              <button className="p-1 hover:bg-slate-100 rounded border border-slate-200 rotate-180"><ChevronLeft size={12} /></button>
                              <div className="flex items-center gap-1 border border-slate-200 rounded px-2 py-1 bg-slate-50/50">
                                <span>10条/页</span>
                                <ChevronDown size={10} />
                              </div>
                              <span>跳至</span>
                              <input type="text" className="w-8 border border-slate-200 rounded px-1 py-1 text-center outline-none" defaultValue="1" />
                              <span>页</span>
                            </div>
                          </div>

                          {/* Right Content - Corresponding Indicators */}
                          <div className="flex-[1.5] bg-white rounded-2xl shadow-premium border border-slate-100 flex flex-col overflow-hidden">
                            <div className="p-6 border-b border-slate-100">
                              <h3 className="font-bold text-slate-800">模型对应指标：</h3>
                            </div>
                            <div className="flex-1 overflow-y-auto custom-scrollbar">
                              <table className="w-full text-left text-xs border-collapse">
                                <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100 sticky top-0">
                                  <tr>
                                    <th className="px-4 py-3 w-12 text-center">序号</th>
                                    <th className="px-4 py-3 w-32">指标中文名称</th>
                                    <th className="px-4 py-3 w-48">计算公式</th>
                                    <th className="px-4 py-3">指标定义</th>
                                    <th className="px-4 py-3 w-16 text-center">操作</th>
                                  </tr>
                                </thead>
                                <tbody className="divide-y divide-slate-50">
                                  {INDICATOR_LIBRARY_DATA.map((item) => (
                                    <tr key={item.id} className="hover:bg-blue-50/40 transition-all">
                                      <td className="px-4 py-4 text-center text-slate-400">{item.index}</td>
                                      <td className="px-4 py-4 text-slate-800 font-medium">{item.nameCn}</td>
                                      <td className="px-4 py-4 text-slate-500 leading-relaxed">{item.formula}</td>
                                      <td className="px-4 py-4 text-slate-500 leading-relaxed text-[11px]">{item.definition}</td>
                                      <td className="px-4 py-4 text-center">
                                        <button className="text-primary hover:underline font-bold">详情</button>
                                      </td>
                                    </tr>
                                  ))}
                                </tbody>
                              </table>
                            </div>
                          </div>
                        </div>
                      ) : activeView === 'indicator-management' ? (
                        <>
                          {/* Indicator Management View */}
                          {/* Filters */}
                          <div className="bg-white p-8 rounded-2xl shadow-premium border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                              <Filter size={18} className="text-primary" />
                              <h3 className="text-lg font-bold text-slate-800 tracking-tight">筛选查询</h3>
                            </div>
                            <div className="grid grid-cols-3 gap-8">
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                  <div className="w-1 h-3 bg-primary rounded-full" />
                                  指标标准编码
                                </label>
                                <input type="text" placeholder="请输入编码" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                  <div className="w-1 h-3 bg-primary rounded-full" />
                                  指标中文名称
                                </label>
                                <input type="text" placeholder="请输入名称" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50" />
                              </div>
                              <div className="flex items-end gap-4">
                                <button className="flex-1 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                  <Search size={16} />
                                  查询
                                </button>
                                <button className="flex-1 bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                  <RotateCcw size={16} />
                                  重置
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-4">
                            <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/10 flex items-center gap-2">
                              <Plus size={18} />
                              新建
                            </button>
                            <button className="bg-error/5 text-error border border-error/20 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-error/10 transition-all flex items-center gap-2">
                              <Trash2 size={18} />
                              删除
                            </button>
                            <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                              <Download size={18} className="text-slate-400" />
                              导出
                            </button>
                          </div>

                          {/* Table */}
                          <div className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden">
                            <table className="w-full text-left text-sm border-collapse">
                              <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
                                <tr>
                                  <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></th>
                                  <th className="px-6 py-4 w-16">序号</th>
                                  <th className="px-6 py-4">指标标准编码</th>
                                  <th className="px-6 py-4">指标中文名称</th>
                                  <th className="px-6 py-4">指标英文名称</th>
                                  <th className="px-6 py-4 w-1/4">指标定义</th>
                                  <th className="px-6 py-4">是否量化指标</th>
                                  <th className="px-6 py-4">计算公式</th>
                                  <th className="px-6 py-4 text-center">操作</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {INDICATOR_MANAGEMENT_DATA.map((item) => (
                                  <tr key={item.id} className="hover:bg-blue-50/40 transition-all group">
                                    <td className="px-6 py-5"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></td>
                                    <td className="px-6 py-5 text-slate-400">{item.index}</td>
                                    <td className="px-6 py-5 font-mono text-slate-600 text-xs">{item.code}</td>
                                    <td className="px-6 py-5 text-slate-800">{item.nameCn}</td>
                                    <td className="px-6 py-5 text-slate-500">{item.nameEn}</td>
                                    <td className="px-6 py-5 text-slate-500 leading-relaxed line-clamp-2 text-xs">{item.definition}</td>
                                    <td className="px-6 py-5">
                                      <span className={cn(
                                        "px-3 py-1 rounded-full text-[11px] font-bold uppercase tracking-wider shadow-sm",
                                        item.isQuantified === '是' ? "bg-green-100 text-success" : "bg-slate-100 text-slate-600"
                                      )}>
                                        {item.isQuantified}
                                      </span>
                                    </td>
                                    <td className="px-6 py-5 text-slate-500 font-mono text-xs line-clamp-2">{item.formula}</td>
                                    <td className="px-6 py-5">
                                      <div className="flex items-center justify-center gap-4">
                                        <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="详情">
                                          <Eye size={18} />
                                        </button>
                                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="编辑">
                                          <Edit3 size={18} />
                                        </button>
                                        <button className="p-2 text-error hover:bg-error/10 rounded-lg transition-all" title="删除">
                                          <Trash2 size={18} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="px-8 py-6 bg-white border-t border-slate-100 flex items-center justify-end gap-6 text-sm">
                              <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-primary"><ChevronLeft size={20} /></button>
                                <button className="w-10 h-10 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">1</button>
                                <button className="w-10 h-10 hover:bg-slate-100 rounded-xl transition-all font-medium text-slate-600">2</button>
                                <button className="w-10 h-10 hover:bg-slate-100 rounded-xl transition-all font-medium text-slate-600">3</button>
                                <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-primary rotate-180"><ChevronRight size={20} /></button>
                              </div>
                              <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 cursor-pointer hover:border-primary transition-all">
                                <span className="text-slate-600 font-medium">10条/页</span>
                                <ChevronDown size={14} className="text-slate-400" />
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-slate-500">跳至</span>
                                <input type="text" className="w-12 border border-slate-200 rounded-xl px-2 py-2 text-center font-bold focus:border-primary outline-none transition-all" defaultValue="1" />
                                <span className="text-slate-500">页</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : activeView === 'business-domain-config' ? (
                        <>
                          {/* Filters */}
                          <div className="bg-white p-8 rounded-2xl shadow-premium border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                              <Filter size={18} className="text-primary" />
                              <h3 className="text-lg font-bold text-slate-800 tracking-tight">筛选查询</h3>
                            </div>
                            <div className="grid grid-cols-3 gap-8">
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                  <div className="w-1 h-3 bg-primary rounded-full" />
                                  领域编码
                                </label>
                                <input type="text" placeholder="请输入编码" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                  <div className="w-1 h-3 bg-primary rounded-full" />
                                  领域名称
                                </label>
                                <input type="text" placeholder="请输入名称" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50" />
                              </div>
                              <div className="flex items-end gap-4">
                                <button className="flex-1 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                  <Search size={16} />
                                  查询
                                </button>
                                <button className="flex-1 bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                  <RefreshCw size={16} />
                                  重置
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-4">
                            <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/10 flex items-center gap-2">
                              <Plus size={18} />
                              新建业务领域
                            </button>
                            <button className="bg-error/5 text-error border border-error/20 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-error/10 transition-all flex items-center gap-2">
                              <Trash2 size={18} />
                              批量删除
                            </button>
                            <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                              <Download size={18} className="text-slate-400" />
                              导出数据
                            </button>
                          </div>

                          {/* Table */}
                          <div className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden">
                            <table className="w-full text-left text-sm border-collapse">
                              <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
                                <tr>
                                  <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></th>
                                  <th className="px-6 py-4 w-16">序号</th>
                                  <th className="px-6 py-4">领域编码</th>
                                  <th className="px-6 py-4">领域名称</th>
                                  <th className="px-6 py-4 w-1/3">领域描述</th>
                                  <th className="px-6 py-4">是否启用</th>
                                  <th className="px-6 py-4">备注</th>
                                  <th className="px-6 py-4">创建人</th>
                                  <th className="px-6 py-4">创建时间</th>
                                  <th className="px-6 py-4 text-center">操作</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {BUSINESS_DOMAIN_DATA.map((item) => (
                                  <tr key={item.id} className="hover:bg-blue-50/40 transition-all group">
                                    <td className="px-6 py-5"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></td>
                                    <td className="px-6 py-5 text-slate-400">{item.index}</td>
                                    <td className="px-6 py-5 font-mono text-slate-600 text-xs">{item.code}</td>
                                    <td className="px-6 py-5 text-slate-800">{item.name}</td>
                                    <td className="px-6 py-5 text-slate-500 leading-relaxed line-clamp-2 text-xs">{item.description}</td>
                                    <td className="px-6 py-5">
                                      <span className="flex items-center gap-1.5 text-success font-bold">
                                        <CheckCircle2 size={14} />
                                        {item.enabled}
                                      </span>
                                    </td>
                                    <td className="px-6 py-5 text-slate-500">{item.remark}</td>
                                    <td className="px-6 py-5 text-slate-600">{item.creator}</td>
                                    <td className="px-6 py-5 text-slate-400 font-mono text-xs">{item.createTime}</td>
                                    <td className="px-6 py-5">
                                      <div className="flex items-center justify-center gap-4">
                                        <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="详情">
                                          <Eye size={18} />
                                        </button>
                                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="编辑">
                                          <Edit3 size={18} />
                                        </button>
                                        <button className="p-2 text-error hover:bg-error/10 rounded-lg transition-all" title="删除">
                                          <Trash2 size={18} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="px-8 py-6 bg-white border-t border-slate-100 flex items-center justify-end gap-6 text-sm">
                              <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-primary"><ChevronLeft size={20} /></button>
                                <button className="w-10 h-10 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">1</button>
                                <button className="w-10 h-10 hover:bg-slate-100 rounded-xl transition-all font-medium text-slate-600">2</button>
                                <button className="w-10 h-10 hover:bg-slate-100 rounded-xl transition-all font-medium text-slate-600">3</button>
                                <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-primary rotate-180"><ChevronRight size={20} /></button>
                              </div>
                              <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 cursor-pointer hover:border-primary transition-all">
                                <span className="text-slate-600 font-medium">10条/页</span>
                                <ChevronDown size={14} className="text-slate-400" />
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-slate-500">跳至</span>
                                <input type="text" className="w-12 border border-slate-200 rounded-xl px-2 py-2 text-center font-bold focus:border-primary outline-none transition-all" defaultValue="1" />
                                <span className="text-slate-500">页</span>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <>
                          {/* Business Domain Permission View */}
                          {/* Filters */}
                          <div className="bg-white p-8 rounded-2xl shadow-premium border border-slate-100">
                            <div className="flex items-center gap-3 mb-6">
                              <Filter size={18} className="text-primary" />
                              <h3 className="text-lg font-bold text-slate-800 tracking-tight">筛选查询</h3>
                            </div>
                            <div className="grid grid-cols-3 gap-8">
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                  <div className="w-1 h-3 bg-primary rounded-full" />
                                  部门
                                </label>
                                <input type="text" placeholder="请输入部门" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50" />
                              </div>
                              <div className="space-y-2">
                                <label className="text-sm font-bold text-slate-700 flex items-center gap-2">
                                  <div className="w-1 h-3 bg-primary rounded-full" />
                                  姓名
                                </label>
                                <input type="text" placeholder="请输入姓名" className="w-full border border-slate-200 rounded-xl px-4 py-2.5 text-sm focus:border-primary focus:ring-4 focus:ring-primary/5 outline-none transition-all bg-slate-50/50" />
                              </div>
                              <div className="flex items-end gap-4">
                                <button className="flex-1 bg-primary text-white px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/20 flex items-center justify-center gap-2">
                                  <Search size={16} />
                                  查询
                                </button>
                                <button className="flex-1 bg-white border border-slate-200 text-slate-600 px-6 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                                  <RefreshCw size={16} />
                                  重置
                                </button>
                              </div>
                            </div>
                          </div>

                          {/* Actions */}
                          <div className="flex items-center gap-4">
                            <button className="bg-primary text-white px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-blue-600 transition-all shadow-lg shadow-primary/10 flex items-center gap-2">
                              <Plus size={18} />
                              添加
                            </button>
                            <button className="bg-error/5 text-error border border-error/20 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-error/10 transition-all flex items-center gap-2">
                              <Trash2 size={18} />
                              删除
                            </button>
                            <button className="bg-white border border-slate-200 text-slate-700 px-5 py-2.5 rounded-xl text-sm font-bold hover:bg-slate-50 transition-all flex items-center gap-2">
                              <Download size={18} className="text-slate-400" />
                              导出
                            </button>
                          </div>

                          {/* Table */}
                          <div className="bg-white rounded-2xl shadow-premium border border-slate-100 overflow-hidden">
                            <table className="w-full text-left text-sm border-collapse">
                              <thead className="bg-slate-50/80 text-slate-500 font-semibold border-b border-slate-100">
                                <tr>
                                  <th className="px-6 py-4 w-12"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></th>
                                  <th className="px-6 py-4 w-16">序号</th>
                                  <th className="px-6 py-4">姓名</th>
                                  <th className="px-6 py-4">部门</th>
                                  <th className="px-6 py-4">处室</th>
                                  <th className="px-6 py-4">联系方式</th>
                                  <th className="px-6 py-4">备注</th>
                                  <th className="px-6 py-4">创建人</th>
                                  <th className="px-6 py-4">创建时间</th>
                                  <th className="px-6 py-4 text-center">操作</th>
                                </tr>
                              </thead>
                              <tbody className="divide-y divide-slate-50">
                                {BUSINESS_DOMAIN_PERMISSION_DATA.map((item) => (
                                  <tr key={item.id} className="hover:bg-blue-50/40 transition-all group">
                                    <td className="px-6 py-5"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></td>
                                    <td className="px-6 py-5 text-slate-400">{item.index}</td>
                                    <td className="px-6 py-5 text-slate-800">{item.name}</td>
                                    <td className="px-6 py-5 text-slate-600">{item.department}</td>
                                    <td className="px-6 py-5 text-slate-600">{item.office}</td>
                                    <td className="px-6 py-5 text-slate-500 font-mono text-xs">{item.contact}</td>
                                    <td className="px-6 py-5 text-slate-500">{item.remark}</td>
                                    <td className="px-6 py-5 text-slate-600">{item.creator}</td>
                                    <td className="px-6 py-5 text-slate-400 font-mono text-xs">{item.createTime}</td>
                                    <td className="px-6 py-5">
                                      <div className="flex items-center justify-center gap-4">
                                        <button className="p-2 text-primary hover:bg-primary/10 rounded-lg transition-all" title="详情">
                                          <Eye size={18} />
                                        </button>
                                        <button className="p-2 text-indigo-600 hover:bg-indigo-50 rounded-lg transition-all" title="编辑">
                                          <Edit3 size={18} />
                                        </button>
                                        <button className="p-2 text-error hover:bg-error/10 rounded-lg transition-all" title="删除">
                                          <Trash2 size={18} />
                                        </button>
                                      </div>
                                    </td>
                                  </tr>
                                ))}
                                {/* Empty rows to match image */}
                                {[...Array(6)].map((_, i) => (
                                  <tr key={`empty-${i}`} className="h-[61px]">
                                    <td className="px-6 py-5"><input type="checkbox" className="rounded border-slate-300 text-primary focus:ring-primary" /></td>
                                    <td className="px-6 py-5"></td>
                                    <td className="px-6 py-5"></td>
                                    <td className="px-6 py-5"></td>
                                    <td className="px-6 py-5"></td>
                                    <td className="px-6 py-5"></td>
                                    <td className="px-6 py-5"></td>
                                    <td className="px-6 py-5"></td>
                                    <td className="px-6 py-5"></td>
                                    <td className="px-6 py-5"></td>
                                  </tr>
                                ))}
                              </tbody>
                            </table>

                            {/* Pagination */}
                            <div className="px-8 py-6 bg-white border-t border-slate-100 flex items-center justify-end gap-6 text-sm">
                              <div className="flex items-center gap-2">
                                <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-primary"><ChevronLeft size={20} /></button>
                                <button className="w-10 h-10 bg-primary text-white rounded-xl font-bold shadow-lg shadow-primary/20">1</button>
                                <button className="w-10 h-10 hover:bg-slate-100 rounded-xl transition-all font-medium text-slate-600">2</button>
                                <button className="w-10 h-10 hover:bg-slate-100 rounded-xl transition-all font-medium text-slate-600">3</button>
                                <button className="p-2 hover:bg-slate-100 rounded-xl transition-all text-slate-400 hover:text-primary rotate-180"><ChevronRight size={20} /></button>
                              </div>
                              <div className="flex items-center gap-3 border border-slate-200 rounded-xl px-4 py-2 bg-slate-50/50 cursor-pointer hover:border-primary transition-all">
                                <span className="text-slate-600 font-medium">10条/页</span>
                                <ChevronDown size={14} className="text-slate-400" />
                              </div>
                              <div className="flex items-center gap-3">
                                <span className="text-slate-500">跳至</span>
                                <input type="text" className="w-12 border border-slate-200 rounded-xl px-2 py-2 text-center font-bold focus:border-primary outline-none transition-all" defaultValue="1" />
                                <span className="text-slate-500">页</span>
                              </div>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </motion.div>
    </AnimatePresence>
  );
};
