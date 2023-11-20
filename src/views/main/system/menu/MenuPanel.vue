<script setup lang="ts" name="menu">
import PageContent from '@/components/page-content/PageContent.vue'
import contentConfig from './config/content.config'
import PageModal from '@/components/page-modal/PageModal.vue'
import modalConfig, { menuRules } from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import type { HookFnType } from '@/types'
import useMainStore from '@/stores/main/main'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { deepCopy } from '@/utils/deepCopy'
import type { FormRules } from 'element-plus'
import type { IModalConfig } from '@/types'

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const modalConfigRef = ref(deepCopy(modalConfig) as IModalConfig)
const menuRulesRef = ref(deepCopy(menuRules) as FormRules)

const [modalRef, handleNewClick, handleEditClick] = usePageContent()

const restoreConfig = () => {
  menuRulesRef.value = menuRules
  modalConfigRef.value = modalConfig
}

const handleSelectChange = (prop: string, value: any) => {
  console.log('hh select prop:', prop, 'hh select value:', value)

  switch (prop) {
    case 'type':
      console.log('entireMenus:', entireMenus.value)
      switch (value) {
        case 1:
          restoreConfig()
          menuRulesRef.value.icon = [
            { required: true, message: '必须选择菜单图标~', trigger: 'blur' }
          ]
          menuRulesRef.value.url = [
            { required: true, message: '必须填写菜单路径~', trigger: 'blur' }
          ]
          modalConfigRef.value.formItems.find(item => item.prop === 'parentId').disabled = true
          modalConfigRef.value.formItems.find(item => item.prop === 'permission').disabled = true
          break
        case 2:
          restoreConfig()
          menuRulesRef.value.url = [
            { required: true, message: '必须填写菜单路径~', trigger: 'blur' }
          ]
          modalConfigRef.value.formItems.find(item => item.prop === 'permission').disabled = true
          modalConfigRef.value.formItems.find(item => item.prop === 'icon').disabled = true
          break
        default:
          break
      }
      break
    default:
      break
  }
}
</script>

<template>
  <div class="menu">
    <PageContent
      :content-config="contentConfig"
      @new-click="handleNewClick as HookFnType"
      @edit-click="handleEditClick as HookFnType"
    ></PageContent>
    <PageModal
      ref="modalRef"
      :modal-config="modalConfigRef"
      :rules="menuRulesRef"
      @selectChange="handleSelectChange"
      @modalHidde="restoreConfig"
    ></PageModal>
  </div>
</template>

<style scoped></style>
