import type { ISearchParam, ISearchFormItem } from './global'

interface IUserFormDataBasic {
  name: string
  realname: string
  cellphone: number | ''
}

interface IUserRoleAndDepartment {
  roleId: number | ''
  departmentId: number | ''
}

export interface IUserCreateFormData extends IUserFormDataBasic, IUserRoleAndDepartment {
  password?: string
  enable: string
}

export type IUserEditFormData = Partial<IUserFormDataBasic & IUserRoleAndDepartment>

export interface IUserSearchFormData extends IUserFormDataBasic {
  enable: number
  createAt: string | string[]
}

type IUserSearchFormDataPartial = Partial<IUserSearchFormData>

// SearchFormData
export interface IUserSearchFormData {
  name: string
  realname: string
  cellphone: string
  enable: number
  createAt: string | string[]
}

type IUserSearchFormItem = ISearchFormItem<IUserSearchFormData>

export type IUserQueryParam = ISearchParam & IUserSearchFormDataPartial

// 返回结果
export interface IUser extends IUserRoleAndDepartment, IUserSearchFormData {
  id: number
  cellphone: number
  roleId: number
  departmentId: number
  createAt: string
  updateAt: string
}
