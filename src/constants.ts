import { 
  KPIData, 
  DomainData, 
  StatusData, 
  RiskData, 
  ExecutionData, 
  AlertData, 
  ModelData, 
  BusinessDomainData, 
  BusinessDomainTreeNode, 
  BusinessDomainPermissionData, 
  IndicatorManagementData, 
  ModelSelectionData, 
  IndicatorLibraryData, 
  RegulatoryProblemData, 
  ModelVersionData,
  ModelTestData,
  IndicatorMaintenanceData
} from './types';

export const MODEL_CLASSIFICATION_TREE: BusinessDomainTreeNode[] = [
  {
    id: 'all',
    label: '全部',
    children: [
      {
        id: 'finance',
        label: '财务司库',
        children: [
          { id: 'debt', label: '过度负债' },
          { id: 'loss', label: '子企业亏损风险' },
          { id: 'expenditure', label: '违规支出' },
          { id: 'guarantee', label: '违规担保' },
          { id: 'lending', label: '违规资金拆借' },
          { id: 'accounting', label: '会计基础工作不规范' },
        ]
      },
      { id: 'property', label: '产权管理' },
      { id: 'hr', label: '人力薪酬' },
      { id: 'investment', label: '投资业务' },
      { id: 'overseas', label: '境外业务' },
      { id: 'finance-biz', label: '金融业务' },
      { id: 'legal', label: '法律纠纷案件' },
      { id: 'procurement', label: '采购业务' },
      {
        id: 'smart-supervision',
        label: '智慧监督',
        children: [
          {
            id: 'smart-lv2',
            label: '智慧监督二级4',
            children: [
              { id: 'smart-lv3', label: '智慧监督三级1' }
            ]
          }
        ]
      }
    ]
  }
];

export const MODEL_SELECTION_DATA: ModelSelectionData[] = [
  { id: '1', index: 1, code: 'cwsk-gdfz-xxfz001', name: '显性负债过高监管模型', version: 'V001' },
  { id: '2', index: 2, code: 'cwsk-gdfz-rzcb005', name: '融资成本管控模型', version: 'V001' },
  { id: '3', index: 3, code: '##', name: '##', version: 'V001' },
  { id: '4', index: 4, code: '##', name: '##', version: 'V001' },
  { id: '5', index: 5, code: '##', name: '##', version: 'V001' },
  { id: '6', index: 6, code: '##', name: '##', version: 'V001' },
  { id: '7', index: 7, code: '##', name: '##', version: 'V001' },
  { id: '8', index: 8, code: '##', name: '##', version: 'V001' },
  { id: '9', index: 9, code: '##', name: '##', version: 'V001' },
  { id: '10', index: 10, code: '##', name: '##', version: 'V001' },
];

export const INDICATOR_LIBRARY_DATA: IndicatorLibraryData[] = [
  { id: '1', index: 1, nameCn: '资产负债率', formula: '(负债总额/资产总额) × 100%', definition: '衡量企业总负债占总资产的比例，反映企业整体偿债能力和财务杠杆水平' },
  { id: '2', index: 2, nameCn: '有息负债率', formula: '有息负债/总资产× 100%', definition: '反映企业负债中有息负债的比重，占比过高可能增加财务风险' },
  { id: '3', index: 3, nameCn: '流动比率', formula: '流动资产总额/流动负债总额', definition: '衡量企业短期偿债能力，即“流动资产”对“流动负债”的覆盖程度' },
  { id: '4', index: 4, nameCn: '速动比率', formula: '速动资产总额/流动负债总额 (注：速动资产通常=流动资产-存货-预付账款等，或直接包括货币资金、交易性金融资产、应收票据、应收账款等)', definition: '比流动比率更严格的短期偿债能力指标，排除“变现能力弱的流动资产”（如存货、预付账款），仅用“速动资产”（现金、交易性金融资产、应收账款等可快速变现的资产）计算' },
  { id: '5', index: 5, nameCn: '现金流动负债比率', formula: '经营现金流净额/流动负债', definition: '企业经营现金净流量对流动负债的保障程度' },
  { id: '6', index: 6, nameCn: '利息保障倍数', formula: 'EBITDA/利息费用总额 (注：EBITDA=利润总额+利息费用+所得税+折旧+摊销)', definition: '衡量企业“息税折旧摊销前利润”（EBITDA）对“利息费用”的覆盖能力，反映企业用经营现金流偿还“有息负债利息”的能力' },
  { id: '7', index: 7, nameCn: '3个月内到期债务占比', formula: '3个月内到期债务/总有息负债', definition: '短期债务在总债务中的比重，反映近期偿债压力' },
  { id: '8', index: 8, nameCn: '经营活动现金流净额', formula: '-', definition: '企业主营业务产生现金的能力' },
  { id: '9', index: 9, nameCn: '##', formula: '##', definition: '##' },
  { id: '10', index: 10, nameCn: '##', formula: '##', definition: '##' },
  { id: '11', index: 11, nameCn: '##', formula: '##', definition: '##' },
];

export const BUSINESS_DOMAIN_PERMISSION_DATA: BusinessDomainPermissionData[] = [
  {
    id: '1',
    index: 1,
    name: '测试人员1',
    department: '财务部',
    office: '资金处',
    contact: '138888880909',
    remark: '',
    creator: '系统管理员',
    createTime: '2026-01-06 16:00:34'
  },
  {
    id: '2',
    index: 2,
    name: '测试人员2',
    department: '财务部',
    office: '资金处',
    contact: '138888880909',
    remark: '',
    creator: '系统管理员',
    createTime: '2026-01-06 16:00:34'
  }
];

export const INDICATOR_MANAGEMENT_DATA: IndicatorManagementData[] = [
  {
    id: "1",
    index: 1,
    code: "FI00000001",
    nameCn: "资产负债率",
    nameEn: "-",
    definition: "衡量企业总负债占总资产的比例，反映企业整体偿债能力和财务杠杆水平",
    isQuantified: "是",
    formula: "(负债总额/资产总额) × 100%",
  },
  {
    id: "2",
    index: 2,
    code: "FI00000002",
    nameCn: "有息负债率",
    nameEn: "-",
    definition: "反映企业负债中有息负债的比重，占比过高可能增加财务风险",
    isQuantified: "是",
    formula: "有息负债/总资产 × 100%",
  },
  {
    id: "3",
    index: 3,
    code: "FI00000003",
    nameCn: "流动比率",
    nameEn: "-",
    definition: "衡量企业短期偿债能力，即“流动资产”对“流动负债”的覆盖程度",
    isQuantified: "是",
    formula: "流动资产总额/流动负债总额",
  },
  {
    id: "4",
    index: 4,
    code: "FI00000004",
    nameCn: "速动比率",
    nameEn: "-",
    definition: "比流动比率更严格的短期偿债能力指标，排除“变现能力弱的流动资产”（如存货、预付款款），仅用“速动资产”对“流动负债”的覆盖程度",
    isQuantified: "是",
    formula: "速动资产总额/流动负债总额 (注：速动资产通常=流动资产-存货-预付账款等，或直接包括货币资金、交易性金融资产、应收票据、应收账款等)",
  },
  {
    id: "5",
    index: 5,
    code: "FI00000005",
    nameCn: "现金流动负债比率",
    nameEn: "-",
    definition: "企业经营现金净流量对流动负债的保障程度",
    isQuantified: "是",
    formula: "经营现金流净额/流动负债",
  },
  {
    id: "6",
    index: 6,
    code: "FI00000006",
    nameCn: "利息保障倍数",
    nameEn: "-",
    definition: "衡量企业“息税折旧摊销前利润”（EBITDA）对“利息费用”的覆盖能力，反映企业用经营现金流偿还“有息负债利息”的能力",
    isQuantified: "是",
    formula: "EBITDA/利息费用总额 (注：EBITDA=利润总额+利息费用+所得税+折旧+摊销)",
  },
  {
    id: "7",
    index: 7,
    code: "FI00000007",
    nameCn: "3个月内到期债务占比",
    nameEn: "-",
    definition: "短期债务在总债务中的比重，反映近期偿债压力",
    isQuantified: "是",
    formula: "3个月内到期债务/总有息负债",
  },
  {
    id: "8",
    index: 8,
    code: "FI00000008",
    nameCn: "经营活动现金流净额",
    nameEn: "-",
    definition: "企业主营业务产生现金的能力",
    isQuantified: "是",
    formula: "-",
  },
];

// ... (existing exports)

export const BUSINESS_DOMAIN_DATA: BusinessDomainData[] = [
  { id: '1', index: 1, code: 'cwsk00001', name: '财务司库', description: '财务领域监管工作主要围绕中央企业财务状况、经营成果以及专项工作等财务情况开展。司库监管以构建现代化司库体系为抓手，围绕中央企业资金全生命周期与金...', enabled: '是', remark: '无', creator: '测试人员', createTime: '2026-01-06 16:00:34' },
  { id: '2', index: 2, code: 'cwsk00002', name: '产权管理', description: '产权管理领域监管工作主要围绕中央企业产权登记、资产评估、产权转让等产权情况开展。', enabled: '是', remark: '无', creator: '测试人员', createTime: '2026-01-06 16:00:34' },
  { id: '3', index: 3, code: 'cwsk00003', name: '人力薪酬', description: '人力薪酬领域监管工作主要围绕中央企业人力资源配置、薪酬分配、绩效考核等情况开展。', enabled: '是', remark: '无', creator: '测试人员', createTime: '2026-01-06 16:00:34' },
  { id: '4', index: 4, code: 'cwsk00004', name: '投资业务', description: '投资业务领域监管工作主要围绕中央企业投资计划、项目实施、投资收益等情况开展。', enabled: '是', remark: '无', creator: '测试人员', createTime: '2026-01-06 16:00:34' },
  { id: '5', index: 5, code: 'cwsk00005', name: '境外业务', description: '境外业务领域监管工作主要围绕中央企业境外资产、境外经营、境外风险等情况开展。', enabled: '是', remark: '无', creator: '测试人员', createTime: '2026-01-06 16:00:34' },
];

export const BUSINESS_DOMAIN_TREE: BusinessDomainTreeNode[] = [
  { id: '1', label: '财务司库' },
  { id: '2', label: '产权管理' },
  { id: '3', label: '人力薪酬' },
  { id: '4', label: '投资业务' },
  { id: '5', label: '境外业务' },
  { id: '6', label: '金融业务' },
  { id: '7', label: '法律纠纷案件' },
  { id: '8', label: '采购业务' },
  { id: '9', label: '智慧监督', children: [
    { id: '9-1', label: '智慧监督二级1' },
    { id: '9-2', label: '智慧监督二级2' },
    { id: '9-3', label: '智慧监督二级3' },
    { id: '9-4', label: '智慧监督二级4', children: [
      { id: '9-4-1', label: '智慧监督三级1' },
      { id: '9-4-2', label: '智慧监督三级2' },
    ]},
  ]},
  { id: '10', label: '军工军品' },
];

export const KPI_DATA: KPIData[] = [
  { label: '模型总数', value: 500, icon: 'BarChart3', color: 'text-primary', bgColor: 'bg-blue-50' },
  { label: '启用模型', value: 400, icon: 'PlayCircle', color: 'text-success', bgColor: 'bg-green-50' },
  { label: '模型任务', value: 420, icon: 'ClipboardList', color: 'text-indigo-500', bgColor: 'bg-indigo-50' },
  { label: '风险预警', value: 10, icon: 'AlertTriangle', color: 'text-error', bgColor: 'bg-red-50' },
  { label: '反馈率', value: '88.12%', icon: 'Percent', color: 'text-orange-500', bgColor: 'bg-orange-50' },
];

export const DOMAIN_DISTRIBUTION: DomainData[] = [
  { name: '财务司库', problem: 60, model: 70 },
  { name: '产权管理', problem: 40, model: 50 },
  { name: '人力薪酬', problem: 85, model: 20 },
  { name: '投资业务', problem: 55, model: 60 },
  { name: '境外业务', problem: 30, model: 85 },
  { name: '金融业务', problem: 70, model: 40 },
  { name: '法律纠纷', problem: 45, model: 55 },
  { name: '采购业务', problem: 65, model: 25 },
  { name: '智慧监督', problem: 50, model: 45 },
];

export const STATUS_DISTRIBUTION: StatusData[] = [
  { name: '已发布', value: 342, color: '#1890ff' },
  { name: '审核中', value: 45, color: '#faad14' },
  { name: '草稿箱', value: 98, color: '#94a3b8' },
  { name: '已失效', value: 15, color: '#ff4d4f' },
];

export const RISK_DISTRIBUTION: RiskData[] = [
  { name: '财务司库', count: 50, trend: 40 },
  { name: '产权管理', count: 75, trend: 30 },
  { name: '人力薪酬', count: 30, trend: 10 },
  { name: '投资业务', count: 90, trend: 20 },
  { name: '境外业务', count: 45, trend: 60 },
  { name: '金融业务', count: 60, trend: 75 },
  { name: '法律纠纷', count: 35, trend: 45 },
  { name: '采购业务', count: 80, trend: 30 },
  { name: '智慧监督', count: 20, trend: 30 },
];

export const RISK_LEVEL_DISTRIBUTION: StatusData[] = [
  { name: '高风险', value: 12, color: '#ff4d4f' },
  { name: '中风险', value: 28, color: '#faad14' },
  { name: '低风险', value: 55, color: '#1890ff' },
  { name: '其他', value: 5, color: '#cbd5e1' },
];

export const EXECUTION_TREND: ExecutionData[] = [
  { date: '05-09', executions: 160, risks: 190 },
  { date: '05-10', executions: 130, risks: 185 },
  { date: '05-11', executions: 145, risks: 188 },
  { date: '05-12', executions: 70, risks: 175 },
  { date: '05-13', executions: 105, risks: 180 },
  { date: '05-14', executions: 40, risks: 165 },
  { date: '05-15', executions: 65, risks: 170 },
  { date: '今天', executions: 30, risks: 160 },
];

export const LATEST_ALERTS: AlertData[] = [
  { id: '1', modelName: '显性负债过高模型', type: '境外资产异常变动', level: 'high', time: '2024-05-15 09:12', status: '待处理' },
  { id: '2', modelName: '隐性负债过高模型', type: '产权转让程序缺失', level: 'medium', time: '2024-05-14 16:45', status: '已分派' },
  { id: '3', modelName: '大额资金流动模型', type: '资金结算波动异常', level: 'low', time: '2024-05-14 14:02', status: '已处理' },
  { id: '4', modelName: '投资项目超期模型', type: '建设周期严重滞后', level: 'high', time: '2024-05-13 11:30', status: '待处理' },
  { id: '5', modelName: '人力薪酬异常模型', type: '绩效分配逻辑偏移', level: 'medium', time: '2024-05-13 09:15', status: '待处理' },
];

export const REGULATORY_PROBLEM_DATA: RegulatoryProblemData[] = [
  {
    id: '1',
    index: 1,
    problem: '过度负债',
    code: 'cwsk-gdfz001',
    description: '“过度负债”是指企业通过不合理融资行为（如高成本举债、短债长投、隐性担保等）导致债务规模远超偿债能力，引发流动性风险、信用风险甚至系统性风险的行为。其核心在于债务融资的规模、结构、成本与企业经营现金流及资产质量...',
    remark: '无',
    enabled: '是',
    creator: '测试人员',
    createTime: '2026-03-09 12:00'
  },
  { id: '2', index: 2, problem: '子企业亏损风险', code: '##', description: '##', remark: '', enabled: '', creator: '', createTime: '2026-03-09 12:00' },
  { id: '3', index: 3, problem: '违规支出', code: '##', description: '##', remark: '', enabled: '', creator: '', createTime: '2026-03-09 12:00' },
  { id: '4', index: 4, problem: '违规担保', code: '##', description: '##', remark: '', enabled: '', creator: '', createTime: '2026-03-09 12:00' },
  { id: '5', index: 5, problem: '违规资金拆借', code: '##', description: '##', remark: '', enabled: '', creator: '', createTime: '2026-03-09 12:00' },
  { id: '6', index: 6, problem: '会计基础工作不规范、会计信息“五假”、会计信息披露不真实', code: '##', description: '##', remark: '', enabled: '', creator: '', createTime: '2026-03-09 12:00' },
  { id: '8', index: 8, problem: '工程投资效率低下与有效资产滞后', code: '##', description: '##', remark: '', enabled: '', creator: '', createTime: '2026-03-09 12:00' },
  { id: '9', index: 9, problem: '利用折旧摊销人为调节利润', code: '##', description: '##', remark: '', enabled: '', creator: '', createTime: '2026-03-09 12:00' },
];

export const MODEL_VERSION_DATA: ModelVersionData[] = [
  {
    id: '1',
    publishTime: '2026-01-30 17:38:18',
    status: 'enabled',
    creator: '测试人员',
    version: 'V004',
    createTime: '2026-01-30 17:38:18',
    changeDescription: ''
  },
  {
    id: '2',
    publishTime: '2025-01-30 17:38:18',
    status: 'disabled',
    creator: '测试人员',
    version: 'V003',
    createTime: '2026-01-30 17:38:18',
    changeDescription: ''
  },
  {
    id: '3',
    publishTime: '2025-01-30 17:38:18',
    status: 'disabled',
    creator: '测试人员',
    version: 'V002',
    createTime: '2026-01-30 17:38:18',
    changeDescription: ''
  },
  {
    id: '4',
    publishTime: '2024-01-30 17:38:18',
    status: 'disabled',
    creator: '测试人员',
    version: 'V001',
    createTime: '2026-01-30 17:38:18',
    changeDescription: ''
  }
];

export const MODEL_MANAGEMENT_DATA: ModelData[] = [
  {
    id: '1',
    index: 1,
    code: 'cwsk-gdfz-xxfz001',
    name: '显性负债过高监管模型',
    description: '本模型的核心在于债务融资的规模、结构、成本与企业经营现金流及资产质量不匹配，通过穿透业务规模、结构及偿债能力，对企业负债活动...',
    version: 'V005',
    status: '草稿',
    creator: '系统管理员',
    publishTime: '2026-03-01',
  },
  {
    id: '2',
    index: 2,
    code: 'cwsk-gdfz-yxfz002',
    name: '隐性负债累积监管模型',
    description: '通过多维数据穿透，识别企业潜在的隐性债务风险，防止债务规模失控。',
    version: 'V001',
    status: '审核中',
    creator: '系统管理员',
    publishTime: '2026-03-01',
  },
  {
    id: '3',
    index: 3,
    code: 'cwsk-gdfz-rzcb003',
    name: '融资成本管控模型',
    description: '监控融资成本变动趋势，分析融资结构合理性，降低企业财务负担。',
    version: 'V001',
    status: '发布启用',
    creator: '系统管理员',
    publishTime: '2026-03-01',
  },
  {
    id: '4',
    index: 4,
    code: 'cwsk-gdfz-zjyy004',
    name: '资金运用合规性模型',
    description: '穿透资金流向，确保资金使用符合合规要求，防范资金挪用风险。',
    version: 'V002',
    status: '草稿',
    creator: '系统管理员',
    publishTime: '2026-03-01',
  },
  {
    id: '5',
    index: 5,
    code: 'cwsk-gdfz-zcgl005',
    name: '资产质量监测模型',
    description: '实时监测资产质量变化，识别不良资产风险，提升资产管理效率。',
    version: 'V001',
    status: '停用',
    creator: '系统管理员',
    publishTime: '2026-03-01',
  },
  {
    id: '6',
    index: 6,
    code: 'cwsk-gdfz-fxkz006',
    name: '全面风险控制模型',
    description: '集成多维风险指标，提供全方位的风险预警和控制建议。',
    version: 'V002',
    status: '退回',
    creator: '系统管理员',
    publishTime: '2026-03-01',
  },
];

export const MODEL_TEST_DATA: ModelTestData[] = [
  { id: '1', index: 1, code: 'cwsk-gdfz-xxfz001', name: '显性负债过高监管模型', version: 'V001', lastMaintenanceTime: '2026-03-09 12:00', maintainer: '测试人员' },
  { id: '2', index: 2, code: 'cwsk-gdfz-xxfz002', name: '显性负债过高监管模型', version: 'V002', lastMaintenanceTime: '2026-03-09 12:00', maintainer: '测试人员' },
  { id: '3', index: 3, code: 'cwsk-gdfz-xxfz003', name: '显性负债过高监管模型', version: 'V003', lastMaintenanceTime: '2026-03-09 12:00', maintainer: '测试人员' },
  { id: '4', index: 4, code: 'cwsk-gdfz-yxfz004', name: '隐性负债累积监管模型', version: 'V001', lastMaintenanceTime: '2026-03-09 12:00', maintainer: '测试人员' },
  { id: '5', index: 5, code: 'cwsk-gdfz-rzcb005', name: '融资成本管控模型', version: 'V001', lastMaintenanceTime: '-', maintainer: '-' },
  { id: '6', index: 6, code: 'cwsk-gdfz-rzcb006', name: '融资成本管控模型', version: 'V002', lastMaintenanceTime: '-', maintainer: '-' },
  { id: '7', index: 7, code: 'cwsk-gdfz-rzcb007', name: '融资成本管控模型', version: 'V003', lastMaintenanceTime: '-', maintainer: '-' },
  { id: '8', index: 8, code: 'cwsk-gdfz-rzcb008', name: '融资成本管控模型', version: 'V004', lastMaintenanceTime: '-', maintainer: '-' },
  { id: '9', index: 9, code: 'cwsk-gdfz-rzcb009', name: '融资成本管控模型', version: 'V005', lastMaintenanceTime: '-', maintainer: '-' },
  { id: '10', index: 10, code: 'cwsk-gdfz-rzcb010', name: '融资成本管控模型', version: 'V006', lastMaintenanceTime: '-', maintainer: '-' },
];

export const INDICATOR_MAINTENANCE_DATA: IndicatorMaintenanceData[] = [
  { id: '1', index: 1, name: '资产负债率', formula: '(负债总额/资产总额) × 100%', unit: '百分比', value: '' },
  { id: '2', index: 2, name: '有息负债率', formula: '有息负债/总资产× 100%', unit: '百分比', value: '' },
  { id: '3', index: 3, name: '流动比率', formula: '流动资产总额/流动负债总额', unit: '数值', value: '' },
  { id: '4', index: 4, name: '速动比率', formula: '速动资产总额/流动负债总额 (注: 速动资产通常=流动资产-存货-预付账款等，或直接包括货币资金、交易性金融资产、应收票据、应收账款等)', unit: '数值', value: '' },
  { id: '5', index: 5, name: '现金流动负债比率', formula: '经营现金流净额/流动负债', unit: '数值', value: '' },
  { id: '6', index: 6, name: '利息保障倍数', formula: 'EBITDA/利息费用总额 (注: EBITDA=利润总额+利息费用+所得税+折旧+摊销)', unit: '数值', value: '' },
  { id: '7', index: 7, name: '3个月内到期债务占比', formula: '3个月内到期债务/总有息负债', unit: '百分比', value: '' },
  { id: '8', index: 8, name: '经营活动现金流净额', formula: '-', unit: '数值', value: '' },
  { id: '9', index: 9, name: '##', formula: '##', unit: '数值', value: '' },
  { id: '10', index: 10, name: '##', formula: '##', unit: '数值', value: '' },
  { id: '11', index: 11, name: '##', formula: '##', unit: '百分比', value: '' },
];
