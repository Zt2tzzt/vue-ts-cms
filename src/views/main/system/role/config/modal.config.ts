import { ROLE } from '@/global/constance'
import type { IModalConfig } from '@/types'
import type { FormRules } from 'element-plus'

const modalConfig: IModalConfig = {
  pageName: ROLE,
  header: {
    newBtnLabel: '新建角色',
    editBtnLabel: '编辑角色'
  },
  formItems: [
    { type: 'input', label: '角色名称', prop: 'name', placeholder: '请输入角色名称' },
    { type: 'input', label: '权限介绍', prop: 'intro', placeholder: '请输入权限介绍' },
    { type: 'custom', slotname: 'menulist' }
  ]
}

// 校验规则
export const roleRules: FormRules = {
  name: [{ required: true, message: '必须输入角色名称~', trigger: 'blur' }]
}

export default modalConfig
