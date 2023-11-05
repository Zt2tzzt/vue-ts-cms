<script setup lang="ts" name="Department">
import PageContent from '@/components/page-content/PageContent.vue'
import PageModal from '@/components/page-modal/PageModal.vue'
import PageSearch from '@/components/page-search/PageSearch.vue'
import { ref } from 'vue'
import searchConfig from './config/search.config'
import contentConfig from './config/content.config'
import modalConfig, { deparmentRules } from './config/modal.config'
import useMainStore from '@/stores/main/main'
import usePageSearch from '@/hooks/usePageSearch'
import usePageContent from '@/hooks/usePageContent'
import type { HookFnType, IDepartment } from '@/types'

// 获取 roles / departments 数据
const mainStore = useMainStore()

const modalConfigRef = ref(modalConfig)

const newCallback = () => {
  const selectFormItem = modalConfigRef.value.formItems.find(
    item => item.type === 'select' && item.prop === 'parentId' && 'options' in item
  )

  if (selectFormItem && 'options' in selectFormItem) {
    selectFormItem.options = mainStore.entireDepartments.map(item => ({
      label: item.name,
      value: item.id
    }))
  }
}

const editCallback = (itemData: IDepartment) => {
  const selectFormItem = modalConfigRef.value.formItems.find(
    item => item.type === 'select' && item.prop === 'parentId' && 'options' in item
  )

  if (selectFormItem && 'options' in selectFormItem) {
    selectFormItem.options = mainStore.entireDepartments
      .filter(item => item.id !== itemData.id)
      .map(item => ({
        label: item.name,
        value: item.id
      }))
  }
}

const [contentRef, handleQueryClick, handleResetClick] = usePageSearch()
const [modalRef, handleNewClick, handleEditClick] = usePageContent(editCallback, newCallback)

const formatParentId2ParentName = (parentId: number) =>
  mainStore.entireDepartments.find(item => item.id === parentId)?.name

const handleModalHidde = () => {
  modalConfigRef.value = modalConfig
}
</script>

<template>
  <div class="department">
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
      <template #parentDepartment="props">
        {{ formatParentId2ParentName(props.row.parentId) }}
      </template>
    </PageContent>
    <PageModal
      :modal-config="modalConfigRef"
      ref="modalRef"
      :rules="deparmentRules"
      @modal-hidde="handleModalHidde"
    ></PageModal>
  </div>
</template>

<style scoped>
.department {
  border-radius: 8px;
  overflow: hidden;
}
</style>
