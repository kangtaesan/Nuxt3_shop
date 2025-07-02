import { defineStore } from 'pinia'
import { fetchCartItems } from '~/api'
interface Product {
    id: number
    name: string
    price: string
    imageUrl: string
  }
interface CartState {
    cartItems: Product[]
}
const useCartStore = defineStore('addCart', {
    state: (): CartState => ({
        cartItems: [],
    }),
    getters: {

    },
    actions: {
        addCartItem(cartItem:Product | null) {
            if(cartItem) {
                this.cartItems.push(cartItem)
            }
        },
        async FETCH_CART_ITEMS() {
            const response = await fetchCartItems()
            //this.cartItems = response.data as Product[]
            this.cartItems = (response.data as Product[]).map(item => ({
                ...item,
                imageUrl: (item.imageUrl ?? '')
                    .trim() // 앞 뒤 공백 교정
                    .replace('https: //', 'https://') // 프로토콜 중간 공백만 교정
              }))
            return response
        }
    }
})

export { useCartStore }