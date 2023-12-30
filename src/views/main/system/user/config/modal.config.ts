import { USER } from '@/global/constance'
import type { IModalConfig, IUserModalFormData } from '@/types'
import type { FormRules } from 'element-plus'

const modalConfig: IModalConfig<IUserModalFormData> = {
  pageName: USER,
  header: {
    newBtnLabel: '新建用户',
    editBtnLabel: '编辑用户'
  },
  formItems: [
    { type: 'input', label: '用户名', prop: 'name', placeholder: '请输入用户名' },
    { type: 'input', label: '真实姓名', prop: 'realname', placeholder: '请输入真实姓名' },
    { type: 'input', label: '密码', prop: 'password', placeholder: '请输入密码', hidden: 'edit' },
    { type: 'input', label: '手机号码', prop: 'cellphone', placeholder: '请输入手机号码' },
    {
      type: 'select',
      label: '用户状态',
      prop: 'enable',
      placeholder: '请选择状态',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ],
      initialvalue: 1
    },
    {
      type: 'select',
      label: '选择角色',
      prop: 'roleId',
      placeholder: '请选择角色',
      options: []
    },
    {
      type: 'select',
      label: '选择部门',
      prop: 'departmentId',
      placeholder: '请选择部门',
      options: []
    }
  ]
}

// 校验规则
export const accountRules: FormRules = {
  name: [
    { required: true, message: '必须输入帐号信息~', trigger: 'blur' },
    {
      pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
      message: '必须是一个邮箱~',
      trigger: 'blur'
    }
  ],
  password: [
    { required: true, message: '必须输入密码信息~', trigger: 'blur' },
    {
      pattern: /^.{8,20}$/,
      message: '长度在8-20之间',
      trigger: 'blur'
    }
  ]
}

export default modalConfig
