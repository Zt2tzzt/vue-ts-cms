import { DEPARTMENT } from '@/global/constance'
import type { IContentConfig } from '@/types'

const contentConfig: IContentConfig = {
  pageName: DEPARTMENT,
  header: {
    title: '部门列表',
    btnLabel: '新建部门'
  },
  propList: [
    // 较通用的列
    { type: 'selection', label: '选择', width: '50' },
    { type: 'index', label: '序号', width: '60' },
    { label: '部门名称', prop: 'name', width: '200' },
    { label: '部门领导', prop: 'leader', width: '200' },
    {
      gener: 'custom',
      slotname: 'parentDepartment',
      label: '上级部门',
      prop: 'parentId',
      width: '150'
    },
    // 很多页面都有的列
    // - el-table-column 组件中有 type 属性，所以这里将 type 改为 gener，避免覆盖。
    { gener: 'timer', label: '创建时间', prop: 'createAt' },
    { gener: 'timer', label: '修改时间', prop: 'updateAt' },
    { gener: 'handler', label: '操作', width: '250' }
  ]
}
export default contentConfig
