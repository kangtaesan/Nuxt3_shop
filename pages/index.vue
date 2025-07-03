<template>
  <div class="app">
    <main>
      <SearchInput v-model:search-keyword="searchKeyword" @search="searchProducts" />
      <ProductList :products="products" />
      <div class="cart-wrapper">
        <button class="btn" @click="moveTocartPage">장바구니 바로가기</button>
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { fetchProductByKeyword } from '~/api';
// @component: ProductList.vue
// @component: SearchInput.vue

interface Product {
  id: number
  name: string
  price: string
  imageUrl: string
}
const config = useRuntimeConfig() //nuxt.config.ts의 runtimeConfig 사용
const products = ref<Product[]>([])
const { data: initialData, error } = await useAsyncData<Product[]>('products', () =>
  $fetch(`${config.public.baseURL}/products`)
  //runtimeConfig 속 정의 된 public 속 baseURL을 가져옴
)
if (initialData.value) {
  products.value = initialData.value
}
// 에러 확인 (콘솔 출력)
if (error.value) {
  console.error('Fetch 에러:', error.value)
}
// 중앙에서 관리할 검색어 상태
const searchKeyword = ref('')

const searchProducts = async () => {
  try {
    const response = await fetchProductByKeyword(searchKeyword.value)
    products.value = response.data
    console.log('✅ 필터링 결과:', response.data)
  } catch (error) {
    console.error('검색 실패:', error)
  }
}
/* async searchProducts = {
  const response = await fetchProductByKeyword(this.searchKeyword)
  console.log(response.data)
  this.product = response.data.map((item) => ({
    ...item,
    imgUrl: `${item.imageUrl}?random=${Math.random()}`,
  }))
} */

//카트 페이지로 이동
const router = useRouter()
function moveTocartPage() {
  router.push('/cart')
}

</script>

<style scoped>

.app {
  position: relative;
}

.cart-wrapper {
  position: sticky;
  float: right;
  bottom: 50px;
  right: 50px;
}

.cart-wrapper .btn {
  display: inline-block;
  height: 40px;
  font-size: 1rem;
  font-weight: 500;
}
</style>