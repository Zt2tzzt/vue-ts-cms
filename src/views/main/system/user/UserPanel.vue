<script setup lang="ts">
import PageSearch from '@/components/page-search/PageSearch.vue'
import PageContent from '@/components/page-content/PageContent.vue'
import PageModal from '@/components/page-modal/PageModal.vue'
import contentConfig from './config/content.config'
import searchConfig from './config/search.config'
import modalConfig, { accountRules } from './config/modal.config'
import usePageSearch from '@/hooks/usePageSearch'
import usePageContent from '@/hooks/usePageContent'
import type { HookFnType } from '@/types'
import { storeToRefs } from 'pinia'
import useMainStore from '@/stores/main/main'
import { computed } from 'vue'

const mainStore = useMainStore()
const { entireRoles, entireDepartments } = storeToRefs(mainStore)
const modalConfigRef = computed(() => {
  modalConfig.formItems.forEach(item => {
    if ('prop' in item) {
      switch (item.prop) {
        case 'roleId':
          item.options = entireRoles.value.map(ele => ({ value: ele.id, label: ele.name }))
          break
        case 'departmentId':
          item.options = entireDepartments.value.map(ele => ({ value: ele.id, label: ele.name }))
          break
      }
    }
  })
  return modalConfig
})

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
      <template #state="props">
        <el-button size="small" :type="props.row.enable ? 'primary' : 'danger'">
          {{ props.row.enable ? '启用' : '禁用' }}
        </el-button>
      </template>
    </PageContent>

    <PageModal ref="modalRef" :modal-config="modalConfigRef" :rules="accountRules"></PageModal>
  </div>
</template>

<style scoped>
.user {
  border-radius: 8px;
  overflow: hidden;
}
</style>
