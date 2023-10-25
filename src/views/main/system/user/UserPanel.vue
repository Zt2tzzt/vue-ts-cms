<script setup lang="ts">
import PageSearch from '@/components/page-search/PageSearch.vue'
import PageContent from '@/components/page-content/PageContent.vue'
import contentConfig from './config/content.config'
import searchConfig from './config/search.config'
import UserModal from './cpns/UserModal.vue'
import usePageSearch from '@/hooks/usePageSearch'
import usePageContent from '@/hooks/usePageContent'
import type { IUser, HookFnType } from '@/types'

// const modalRef = ref<InstanceType<typeof UserModal>>()
/* const handleNewClick = () => {
  modalRef.value?.setModalVisible({ isNew: true })
}
const handleEditClick = (itemData: IUser) => {
  modalRef.value?.setModalVisible({ isNew: false, itemData })
} */

const [contentRef, handleQueryClick, handleResetClick] = usePageSearch()
const [modalRef, handleNewClick, handleEditClick] = usePageContent()
</script>

<template>
  <div class="user">
    <PageSearch
      :search-config="searchConfig"
      @query-click="handleQueryClick as HookFnType"
      @reset-click="handleResetClick as HookFnType"
    ></PageSearch>
    <PageContent
      ref="contentRef"
      :content-config="contentConfig"
      @new-click="handleNewClick as HookFnType"
      @edit-click="handleEditClick as HookFnType"
    >
      <template #row="row">
        <el-button size="small" :type="(row as any).enable ? 'primary' : 'danger'">
          {{ (row as any).enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </PageContent>

    <UserModal ref="modalRef"></UserModal>
  </div>
</template>

<style scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
