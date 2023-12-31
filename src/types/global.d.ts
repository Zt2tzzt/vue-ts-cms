import type {
  IDepartment,
  IDepartmentSearchFormData,
  IDepartmentCreateFormData,
  IDepartmentSearchFormItem
} from './department'
import type {
  IRole,
  IRoleSearchFormData,
  IRoleCreateFormData,
  IRoleEditFormData,
  IRoleSearchFormItem
} from './role'
import type {
  IUser,
  IUserSearchFormData,
  IUserSearchFormItem,
  IUserCreateFormData,
  IUserEditFormData
} from './user'
import { IMenu } from './menu'

// 查询
export interface ISearchParam {
  offset: number
  size: number
}

// 返回
export interface IResponseListData<T = any> {
  list: Array<T>
  totalCount: number
}
export interface IResponse<T = any> {
  code: number
  msg: string
  data: T
}

// itemType, CreateFormDataType, EditFormDataType
export type ItemType = IUser | IDepartment | IRole | IMenu
export type CreateFormDataType = IUserCreateFormData &
  IDepartmentCreateFormData &
  IRoleCreateFormData
export type EditFormDataType = IDepartmentEditFormData & IRoleEditFormData & IUserEditFormData
export type SearchFormDataType = IUserSearchFormData &
  IDepartmentSearchFormData &
  IRoleSearchFormData
export type SearchFormItemType =
  | IRoleSearchFormItem
  | IDepartmentSearchFormItem
  | IUserSearchFormItem

// PageSearch 配置文件
export interface ISearchFormItem<T> {
  type: 'input' | 'date-picker' | 'select'
  prop: keyof T
  label: string
  placeholder?: string
  initialvalue: T[keyof T]
  options?: any[]
}

export interface ISearchConfig {
  pageName: string
  labelWidth?: string
  formItems: SearchFormItemType[]
}

// PageContent 配置文件
export interface IContentProp {
  label: string
  width?: string
  prop?: string
  type?: 'selection' | 'index'
  gener?: 'handler' | 'timer' | 'custom'
  slotname?: string
}

export interface IContentConfig {
  pageName: string
  header: {
    title: string
    btnLabel: string
  }
  propList: Array<IContentProp>
  // 子树
  childrenTree?: {
    rowKey: string
    treeProps: {
      children: string
    }
  }
}

// PageModal 配置文件
export interface IModalFormItemGeneral<T = any> {
  type: string
  label: string
  prop: keyof CreateFormDataType
  placeholder: string
  options?: Array<{ label: string; value: number }>
  hidden?: 'none' | 'add' | 'edit'
  initialvalue?: T[keyof T]
}

export interface IModalFormItemCustom {
  type: 'custom'
  slotname?: string
  hidden?: 'none' | 'add' | 'edit'
}

export type IModalFormItem<T> = IModalFormItemGeneral<T> | IModalFormItemCustom

export interface IModalConfig<T = any> {
  pageName: string
  header: {
    newBtnLabel: string
    editBtnLabel: string
  }
  formItems: IModalFormIte<T>[]
}

// HookFnType
export type HookFnType = (...args: any[]) => any
