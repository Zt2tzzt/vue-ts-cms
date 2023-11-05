<script setup lang="ts" name="menu">
import PageContent from '@/components/page-content/PageContent.vue'
import contentConfig from './config/content.config'
import PageModal from '@/components/page-modal/PageModal.vue'
import modalConfig from './config/modal.config'
import usePageContent from '@/hooks/usePageContent'
import type { HookFnType } from '@/types'

const [modalRef, handleNewClick, handleEditClick] = usePageContent()
</script>

<template>
  <div class="menu">
    <PageContent
      :content-config="contentConfig"
      @new-click="handleNewClick as HookFnType"
      @edit-click="handleEditClick as HookFnType"
    ></PageContent>
    <PageModal ref="modalRef" :modal-config="modalConfig"></PageModal>
  </div>
</template>

<style scoped></style>
