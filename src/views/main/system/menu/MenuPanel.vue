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

console.log('modalConfig0:', modalConfig)
console.log('menuRules0:', menuRules)

const restoreConfig = () => {
  menuRulesRef.value = deepCopy(menuRules)
  modalConfigRef.value = deepCopy(modalConfig)
}

const handleSelectChange = (prop: string, value: any) => {
  console.log('select prop:', prop, 'select value:', value)
  switch (prop) {
    // 菜单级别发生改变
    case 'type':
      console.log('entireMenus:', entireMenus.value)
      switch (value) {
        // 菜单级别变为 1 级
        case 1:
          restoreConfig()
          menuRulesRef.value.icon = [
            { required: true, message: '必须填写菜单图标~', trigger: 'blur' }
          ]
          menuRulesRef.value.url = [
            { required: true, message: '必须填写菜单路径~', trigger: 'blur' }
          ]
          ;(modalRef as any).value.formData.parentId = ''
          ;(modalRef as any).value.formData.permission = ''
          modalConfigRef.value.formItems.find(item => item.prop === 'parentId').disabled = true
          modalConfigRef.value.formItems.find(item => item.prop === 'permission').disabled = true
          break

        // 菜单级别变为 2 级
        case 2:
          restoreConfig()
          menuRulesRef.value.parentId = [
            { required: true, message: '必须填写父级菜单~', trigger: 'blur' }
          ]
          menuRulesRef.value.url = [
            { required: true, message: '必须填写菜单路径~', trigger: 'blur' }
          ]
          ;(modalRef as any).value.formData.icon = ''
          ;(modalRef as any).value.formData.permission = ''
          ;(modalRef as any).value.formData.parentId = ''
          modalConfigRef.value.formItems.find(item => item.prop === 'icon').disabled = true
          modalConfigRef.value.formItems.find(item => item.prop === 'permission').disabled = true
          // 获取 1 级菜单
          modalConfigRef.value.formItems.find(item => item.prop === 'parentId').options = [
            ...entireMenus.value
          ].map(item => ({ value: item.id, label: item.name }))
          break
        case 3:
          restoreConfig()
          menuRulesRef.value.parentId = [
            { required: true, message: '必须填写父级菜单~', trigger: 'blur' }
          ]
          menuRulesRef.value.permission = [
            { required: true, message: '必须填写菜单权限~', trigger: 'blur' }
          ]
          ;(modalRef as any).value.formData.icon = ''
          ;(modalRef as any).value.formData.url = ''
          ;(modalRef as any).value.formData.parentId = ''
          modalConfigRef.value.formItems.find(item => item.prop === 'icon').disabled = true
          modalConfigRef.value.formItems.find(item => item.prop === 'url').disabled = true
          // 获取 2 级菜单
          modalConfigRef.value.formItems.find(item => item.prop === 'parentId').options = [
            ...entireMenus.value
          ].reduce(
            (accumulate, currItem) =>
              (accumulate as any).concat(
                currItem.children?.map(item => ({ value: item.id, label: item.name })) || []
              ),
            []
          )
          break
      }
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
