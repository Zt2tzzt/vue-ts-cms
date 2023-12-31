import type { IModalConfig } from '@/types'
import { MENU } from '@/global/constance'
import type { FormRules } from 'element-plus'

const modalConfig: IModalConfig = {
  pageName: MENU,
  header: {
    newBtnLabel: '新建菜单',
    editBtnLabel: '编辑菜单'
  },
  formItems: [
    { type: 'input', label: '菜单名称', prop: 'name', placeholder: '请输入菜单名' },
    {
      type: 'select',
      label: '菜单级别',
      prop: 'type',
      placeholder: '请选择菜单级别',
      options: [
        { value: 1, label: '1级' },
        { value: 2, label: '2级' },
        { value: 3, label: '3级' }
      ],
      disabled: true
    },
    { type: 'input', label: '菜单图标', prop: 'icon', placeholder: '请输入菜单图标' },
    {
      type: 'select',
      label: '父级菜单',
      prop: 'parentId',
      placeholder: '请选择父级菜单',
      options: [],
      disabled: true
    },
    { type: 'input', label: '菜单路径', prop: 'url', placeholder: '请输入菜单路径' },
    { type: 'input', label: '菜单权限', prop: 'permission', placeholder: '请输入菜单权限' },
    { type: 'input', label: '优先级', prop: 'sort', placeholder: '请输入菜单优先级' }
  ]
}

// 校验规则
export const menuRules: FormRules = {
  name: [{ required: true, message: '必须填写菜单名称~', trigger: 'blur' }],
  type: [{ required: true, message: '必须填写菜单级别~', trigger: 'blur' }],
  sort: [{ required: true, message: '必须填写优先级~', trigger: 'blur' }]
}

export default modalConfig
