export interface KPIData {
  label: string;
  value: string | number;
  icon: string;
  color: string;
  bgColor: string;
  trend?: string;
}

export interface DomainData {
  name: string;
  problem: number;
  model: number;
}

export interface StatusData {
  name: string;
  value: number;
  color: string;
}

export interface RiskData {
  name: string;
  count: number;
  trend: number;
}

export interface ExecutionData {
  date: string;
  executions: number;
  risks: number;
}

export interface AlertData {
  id: string;
  modelName: string;
  type: string;
  level: 'high' | 'medium' | 'low';
  time: string;
  status: string;
}

export interface ModelData {
  id: string;
  index: number;
  code: string;
  name: string;
  description: string;
  version: string;
  status: string;
  creator: string;
  publishTime: string;
}

export interface BusinessDomainData {
  id: string;
  index: number;
  code: string;
  name: string;
  description: string;
  enabled: string;
  remark: string;
  creator: string;
  createTime: string;
}

export interface BusinessDomainPermissionData {
  id: string;
  index: number;
  name: string;
  department: string;
  office: string;
  contact: string;
  remark: string;
  creator: string;
  createTime: string;
}

export interface IndicatorManagementData {
  id: string;
  index: number;
  code: string;
  nameCn: string;
  nameEn: string;
  definition: string;
  isQuantified: string;
  formula: string;
}

export interface ModelSelectionData {
  id: string;
  index: number;
  code: string;
  name: string;
  version: string;
}

export interface IndicatorLibraryData {
  id: string;
  index: number;
  nameCn: string;
  formula: string;
  definition: string;
}

export interface BusinessDomainTreeNode {
  id: string;
  label: string;
  children?: BusinessDomainTreeNode[];
}

export interface RegulatoryProblemData {
  id: string;
  index: number;
  problem: string;
  code: string;
  description: string;
  remark: string;
  enabled: string;
  creator: string;
  createTime: string;
}

export interface ModelVersionData {
  id: string;
  publishTime: string;
  status: 'enabled' | 'disabled';
  creator: string;
  version: string;
  createTime: string;
  changeDescription: string;
}

export interface ModelTestData {
  id: string;
  index: number;
  code: string;
  name: string;
  version: string;
  lastMaintenanceTime: string;
  maintainer: string;
}

export interface IndicatorMaintenanceData {
  id: string;
  index: number;
  name: string;
  formula: string;
  unit: string;
  value: string;
}
