import type { IAccount, ILoginResData, IUserInfoResData, IMenuInRole, IResponse } from '@/types'
import ztRequest, { ltpBiRequest } from '..'

export const accountLoginRequest = (account: IAccount) =>
  ltpBiRequest.post<IResponse<ILoginResData>>({
    url: 'login',
    data: account
  })

export const getUserInfoById = (id: number) =>
  ztRequest.get<IResponse<IUserInfoResData>>({
    url: '/users/' + id
  })

export const getUserMenusByRoleId = (id: number) =>
  ztRequest.get<IResponse<IMenuInRole[]>>({
    url: `/role/${id}/menu`
  })
