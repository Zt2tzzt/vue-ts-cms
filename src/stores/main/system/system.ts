import type { IUser, IResponseListData, ItemType } from '@/types'
import {
  postPageList,
  deletePageById,
  postNewPageRecord,
  pathEditPageRecordById
} from '@/service/main/system/system'
import { defineStore } from 'pinia'
import { DEPARTMENT, ROLE, MENU, USER_ID, USER } from '@/global/constance'
import useMainStore from '../main'
import useLoginStore from '@/stores/login/login'
import { localCache } from '@/utils/cache'

const fetchEntireData = (pageName: string) => {
  if ([DEPARTMENT, ROLE, MENU].includes(pageName)) {
    const mainStore = useMainStore()
    mainStore.fetchEntireDataAction()
  }
}

const fetchUsersAndMenusData = (pageName: string, userId: number) => {
  const id = localCache.getCache(USER_ID)
  if (userId === id && ![USER, MENU].includes(pageName)) {
    const loginStore = useLoginStore()
    loginStore.getUserInfoAndMenus(userId)
  }
}

interface ISystemStore {
  users: IUser[]
  usersTotalCount: number

  pageList: ItemType[]
  pageTotalCount: number
}

const useSystemStore = defineStore('system', {
  state: (): ISystemStore => ({
    users: [],
    usersTotalCount: 0,

    pageList: [],
    pageTotalCount: 0
  }),
  actions: {
    // 通用的封装
    postPageListAction<T>(pageName: string, queryParam: T) {
      console.log(pageName, 'queryParam:', queryParam)
      postPageList<T, IResponseListData>(pageName, queryParam).then(res => {
        console.log('pageName:', pageName, 'res:', res)
        this.pageList = res.data.list
        this.pageTotalCount = res.data.totalCount || 0
      })
    },
    deletePageByIdAction(pageName: string, id: number) {
      return deletePageById(pageName, id).then(res => {
        console.log('pageName:', pageName, 'delete res:', res)

        if (res.code < 0) return

        this.postPageListAction(pageName, { offset: 0, size: 10 })

        // 如果是部门，角色，菜单等基础数据发生增、删、改操作，要重新加载到缓存中。
        if ([DEPARTMENT, ROLE, MENU].includes(pageName)) {
          fetchEntireData(pageName)
        }
        fetchUsersAndMenusData(pageName, id)
        return res
      })
    },
    postNewPageRecordAction<T>(pageName: string, record: T) {
      return postNewPageRecord(pageName, record).then(res => {
        console.log('pageName:', pageName, 'add res:', res)

        if (res.code < 0) return

        this.postPageListAction(pageName, { offset: 0, size: 10 })

        // 如果是部门，角色，菜单等基础数据发生增、删、改操作，要重新加载到缓存中。
        if ([DEPARTMENT, ROLE, MENU].includes(pageName)) {
          fetchEntireData(pageName)
        }
        return res
      })
    },
    pathEditPageRecordByIdAction<T>(pageName: string, id: number, record: T) {
      return pathEditPageRecordById(pageName, id, record).then(res => {
        console.log('pageName:', pageName, 'edit res:', res)

        if (res.code < 0) return

        this.postPageListAction(pageName, { offset: 0, size: 10 })

        // 如果是部门，角色，菜单等基础数据发生增、删、改操作，要重新加载到缓存中。
        if ([DEPARTMENT, ROLE, MENU].includes(pageName)) {
          fetchEntireData(pageName)
        }
        fetchUsersAndMenusData(pageName, id)
        return res
      })
    }
  }
})

export default useSystemStore
