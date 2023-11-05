import { DEPARTMENT } from '@/global/constance'
import type { IModalConfig } from '@/types'
import type { FormRules } from 'element-plus'

const modalConfig: IModalConfig = {
  pageName: DEPARTMENT,
  header: {
    newBtnLabel: '新建部门',
    editBtnLabel: '编辑部门'
  },
  formItems: [
    { type: 'input', label: '部门名称', prop: 'name', placeholder: '请输入部门名称' },
    { type: 'input', label: '部门领导', prop: 'leader', placeholder: '请输入部门领导' },
    {
      type: 'select',
      label: '上级部门',
      prop: 'parentId',
      placeholder: '请选择上级部门',
      options: []
    }
  ]
}

// 校验规则
export const deparmentRules: FormRules = {
  name: [{ required: true, message: '必须输入部门名称~', trigger: 'blur' }]
}

export default modalConfig
