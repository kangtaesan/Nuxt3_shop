<template>
    <div class="list-wrapper">
        <ul>
            <li v-for="cartItem in cartItems" :key="cartItem.id" class="list-item">
                <img class="thumbnail" :src="cartItem.imageUrl" :alt="cartItem.name">
                <div class="description">
                    <p>{{ cartItem.name }}</p>
                    <span>{{ cartItem.price }}</span>
                </div>
            </li>
        </ul>
    </div>
</template>

<script setup lang="ts">
import { useCartStore } from '@/store/index'

const cartStore = useCartStore()
// await useAsyncData('cartItems', async () => {
//     const res = await cartStore.FETCH_CART_ITEMS()
//     console.log('Nuxt SSR', res)  
// })
const cartItems = computed(() => cartStore.cartItems)
// computed로 FETCH_CART_ITEMS로 받아온 api, imageUrl을 cartItems에 반응형으로 연결
</script>

<style scoped>
.list-wrapper {
    margin: 0.4rem 0;
}

.list-item {
    display: flex;
}

.thumbnail {
    width: 100px;
    height: 100px;
}

.description {
    padding: 2rem 1rem;
}
</style>