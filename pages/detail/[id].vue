<template>
  <div>
    <div v-if="product" class="container">
      <div class="main-panel">
        <img class="product-image" :src="product.imageUrl" :alt="product.name">
      </div>
      <div class="side-panel">
        <p class="name">{{ product.name }}</p>
        <p class="price">{{ product.price }}</p>
        <button type="button" @click="addTocart">카트에 담기</button>
        <!-- addTocart로 카트 페이지에 넘어가기 전 스토어 state에 데이터 값을 저장하고 -->
        <!-- state를 카트 페이지로 접근하는 형태로 작성 -->
      </div>
    </div>
    <div v-else>
      데이터를 불러오는 중입니다...
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute } from 'vue-router'
import { useAsyncData } from '#app'
import { createCartItem, fetchProductById } from '~/api'
import { useCartStore } from '@/store/index'

interface Product {
  id: number
  name: string
  price: string
  imageUrl: string
  // 필요한 프로퍼티 추가
}

const route = useRoute()

const { data: product, error } = await useAsyncData<Product>('product', () =>
  fetchProductById(Number(route.params.id)).then(response => response.data)
)


// ⭐ product.value가 로드된 뒤 meta 태그 설정
watchEffect(() => {
  if (product.value) {
    useHead({
      title: `${product.value.name} | 상품 상세`,
      meta: [
        { name: 'description', content: `${product.value.name}의 상세 정보입니다.` },
        { property: 'og:title', content: product.value.name },
        { property: 'og:description', content: `${product.value.name}의 상세 페이지입니다.` },
        { property: 'og:image', content: product.value.imageUrl },
        { property: 'og:url', content: `https://nuxtshopping.netlify.app/detail/${product.value.id}` },
      ]
    })
  }
})

// 에러 확인 (콘솔 출력)
if (error.value) {
  console.error('Fetch 에러:', error.value)
}

// 카트 페이지 이동
const router = useRouter()
const cartStore = useCartStore()

async function addTocart() {
  if (!product.value) {
    console.error('Product가 존재하지 않습니다.')
    return
  } // 타입 가드로 null 확인 후 로직 처리
  try {
    const cartItem = {
      //json-server는 기본적으로 POST 요청을 통해 데이터를 추가할 때 id는 새로 자동 생성
      //id값을 넣으면 lodash-id 모듈이 중복이라고 판단하고 500 Internal Server Error를 낸다.
      name: product.value.name,
      price: product.value.price,
      imageUrl: product.value.imageUrl,
    }
    const response = await createCartItem(cartItem)
    console.log(response)
    await router.push(`/cart`)
    cartStore.addCartItem(product.value)
    
  } catch (error) {
    console.log('카트 페이지로 이동 중 에러 발생:', error)
  }
}

</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  margin: 2rem 0;
}

.product-image {
  width: 500px;
  height: 375px;
}

.side-panel {
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 220px;
  text-align: center;
  padding: 0 1rem;
}
</style>