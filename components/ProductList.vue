<template>
    <div>
        <ul v-if="products">
            <li v-for="product in products" :key="product.id" class="item flex" @click="moveToDetailPage(product.id)">
                <img class="product-image" :src="product.imageUrl" :alt="product.name">
                <p>상품명: {{ product.name }}</p>
                <span>가격: ${{ product.price }}</span>
            </li>
        </ul>

        <div v-else>
            데이터를 불러오는 중입니다...
        </div>
    </div>
</template>

<script setup lang="ts">

interface Product {
    id: number
    name: string
    price: string
    imageUrl: string
}

const props = defineProps<{ products: Product[] }>()
const products = computed(() => props.products)

//페이지 이동
const router = useRouter()

function moveToDetailPage(id:number) {
    console.log(id)
    router.push(`/detail/${id}`)
}

</script>

<style>
.flex {
    display: flex;
    justify-content: center;
}

.item {
    display: inline-block;
    width: 400px;
    height: 300px;
    text-align: center;
    margin: 0 0.5rem;
    cursor: pointer;
}

.product-image {
    width: 400px;
    height: 250px;
}
</style>