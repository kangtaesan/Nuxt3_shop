import { useCartStore } from '@/store/index'
// 서버 사이드 렌더링 시 호출되어 앱 전역 상태 초기화
export default defineNuxtPlugin(async () => {
    const cartStore = useCartStore()
    await cartStore.FETCH_CART_ITEMS()
  })