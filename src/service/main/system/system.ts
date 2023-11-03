import type { IResponse } from '@/types'
import ztRequest from '@/service'

// 通用的封装
export const postPageList = <T, R>(pageName: string, queryParam: T) =>
  ztRequest.post<IResponse<R>>({
    url: `/${pageName}/list`,
    data: queryParam
  })

export const deletePageById = <R>(pageName: string, id: number) =>
  ztRequest.delete<IResponse<R>>({
    url: `/${pageName}/${id}`
  })

export const postNewPageRecord = <T, R>(pageName: string, record: T) =>
  ztRequest.post<IResponse<R>>({
    url: `/${pageName}`,
    data: record
  })

export const pathEditPageRecordById = <T, R>(pageName: string, id: number, record: T) =>
  ztRequest.patch<IResponse<R>>({
    url: `/${pageName}/${id}`,
    data: record
  })
