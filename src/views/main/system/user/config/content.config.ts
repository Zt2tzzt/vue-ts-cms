import { USER } from '@/global/constance'
import type { IContentConfig } from '@/types'

const contentConfig: IContentConfig = {
  pageName: USER,
  header: {
    title: '用户列表',
    btnLabel: '新建用户'
  },
  propList: [
    { type: 'selection', label: '选择', width: '50' },
    { type: 'index', label: '序号', width: '60' },
    { label: '用户名', prop: 'name', width: '200' },
    { label: '真实姓名', prop: 'realname', width: '200' },
    { label: '手机号码', prop: 'cellphone', width: '250' },
    { gener: 'custom', slotname: 'state', label: '状态', prop: 'enable', width: '250' },
    { gener: 'timer', label: '创建时间', prop: 'createAt' },
    { gener: 'timer', label: '修改时间', prop: 'updateAt' },
    { gener: 'handler', label: '操作', width: '250' }
  ]
}

export default contentConfig
