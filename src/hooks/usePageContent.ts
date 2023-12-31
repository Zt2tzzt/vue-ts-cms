import type PageModal from '@/components/page-modal/PageModal.vue'
import { ref } from 'vue'
import type { ItemType, CreateFormDataType, EditFormDataType } from '@/types'

type NewCallbackType = () => void
type EditCallbackType = (itemData: any) => void

const usePageContent = (editCallback?: EditCallbackType, newCallback?: NewCallbackType) => {
  const modalRef = ref<InstanceType<typeof PageModal>>()

  const handleNewClick = () => {
    modalRef.value?.setModalVisible<never, CreateFormDataType>({ isNew: true })
    if (newCallback) newCallback()
  }

  const handleEditClick = (itemData: ItemType) => {
    modalRef.value?.setModalVisible<ItemType, EditFormDataType>({ isNew: false, itemData })
    if (editCallback && ('menuList' in itemData || 'parentId' in itemData)) editCallback(itemData) // 用于处理 role 的 menuList
  }

  return [modalRef, handleNewClick, handleEditClick]
}

export default usePageContent
