import type { ISearchConfig } from '@/types'
import { USER } from '@/global/constance'

const searchConfig: ISearchConfig = {
  pageName: USER,
  formItems: [
    {
      type: 'input',
      prop: 'name',
      label: '用户名',
      placeholder: '请输入查询的用户名',
      initialvalue: ''
    },
    {
      type: 'input',
      prop: 'realname',
      label: '真实姓名',
      placeholder: '请输入查询的真是姓名',
      initialvalue: ''
    },
    {
      type: 'input',
      prop: 'cellphone',
      label: '手机号码',
      placeholder: '请输入查询的手机号码',
      initialvalue: ''
    },
    {
      type: 'select',
      prop: 'enable',
      label: '状态',
      options: [
        { value: 1, label: '启用' },
        { value: 0, label: '禁用' }
      ],
      placeholder: '启用',
      initialvalue: 1
    },
    {
      type: 'date-picker',
      prop: 'createAt',
      label: '创建时间',
      initialvalue: ''
    }
  ]
}

export default searchConfig
