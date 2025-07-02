<template>
    <div>
        <header class="title">
            <NuxtLink class="logo" to="/">Nuxt Shopping</NuxtLink>
        </header>
        <NuxtPage />
    </div>
</template>
<script>
    export default {
    }
</script>
<style scoped>
/* 헤더 스타일 */
header {
    height: 60px;
    display: flex;
    align-items: center;
    padding: 0 0.5rem;
}

.logo {
    font-weight: 900;
}

.logo:visited {
    color: inherit;
}
</style>