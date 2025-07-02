<template>
    <div class="input-wrapper flex">
        <input type="text" class="search-input" :value="keyword" @input="onInput" @keyup.enter.exact="search">
        <button type="button" class="btn" @click="search">search</button>
    </div>
</template>

<script setup lang="ts">
//타입 지정
interface Props {
    searchKeyword?: string
}
//default값에 빈배열 선언
const props = withDefaults(defineProps<Props>(), {
    searchKeyword: '',
})

const emit = defineEmits<{
    (e: 'update:searchKeyword', value: string): void
    (e: 'search'): void
}>()

const keyword = ref(props.searchKeyword)

watch(() => props.searchKeyword, (newVal) => {
    keyword.value = newVal
})

const onInput = (e: Event) => {
    const value = (e.target as HTMLInputElement).value
    keyword.value = value
    emit('update:searchKeyword', value)
}

const search = () => {
    emit('search')
}
</script>

<style scoped>
.input-wrapper {
    height: 40px;
    margin: 1rem 0;
}

.search-input {
    width: 200px;
    font-size: 1.2rem;
    font-weight: 500;
}

.btn {
    font-size: 1.2rem;
    font-weight: 500;
}
</style>