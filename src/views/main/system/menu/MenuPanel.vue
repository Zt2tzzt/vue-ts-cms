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
import type { IMenu } from '@/types'

const mainStore = useMainStore()
const { entireMenus } = storeToRefs(mainStore)

const modalConfigRef = ref(deepCopy(modalConfig) as IModalConfig)
const menuRulesRef = ref(deepCopy(menuRules) as FormRules)

console.log('modalConfig0:', modalConfig)
console.log('menuRules0:', menuRules)

const restoreConfig = () => {
  menuRulesRef.value = deepCopy(menuRules)
  modalConfigRef.value = deepCopy(modalConfig)
}

const chageMenuRules = (itemData: IMenu) => {
  console.log('entireMenus:', entireMenus.value)
  console.log('itemData.type:', itemData.type)
  // 菜单级别变为 1 级
  switch (itemData.type) {
    case 1:
      restoreConfig()
      menuRulesRef.value.icon = [{ required: true, message: '必须填写菜单图标~', trigger: 'blur' }]
      menuRulesRef.value.url = [{ required: true, message: '必须填写菜单路径~', trigger: 'blur' }]

      modalConfigRef.value.formItems.find(item => item.prop === 'permission').disabled = true
      break

    // 菜单级别变为 2 级
    case 2:
      restoreConfig()
      menuRulesRef.value.parentId = [
        { required: true, message: '必须填写父级菜单~', trigger: 'blur' }
      ]
      menuRulesRef.value.url = [{ required: true, message: '必须填写菜单路径~', trigger: 'blur' }]

      modalConfigRef.value.formItems.find(item => item.prop === 'icon').disabled = true
      modalConfigRef.value.formItems.find(item => item.prop === 'permission').disabled = true
      break
    // 菜单级别变为 2 级
    case 3:
      restoreConfig()
      menuRulesRef.value.parentId = [
        { required: true, message: '必须填写父级菜单~', trigger: 'blur' }
      ]
      menuRulesRef.value.permission = [
        { required: true, message: '必须填写菜单权限~', trigger: 'blur' }
      ]

      modalConfigRef.value.formItems.find(item => item.prop === 'icon').disabled = true
      modalConfigRef.value.formItems.find(item => item.prop === 'url').disabled = true
      break
  }
}

const [modalRef, handleNewClick, handleEditClick] = usePageContent(chageMenuRules)
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
      @modalHidde="restoreConfig"
    ></PageModal>
  </div>
</template>

<style scoped></style>
