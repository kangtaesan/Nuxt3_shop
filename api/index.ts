import axios from 'axios'

const instance = axios.create({
    baseURL: 'http://localhost:3000',
})

function fetchProductById(id: number) {
    return instance.get(`/products/${id}`)
}

function fetchProductByKeyword(keyword: string) {
    return instance.get(`/products/`, {
        params: {
            name_like: keyword,
        }
    })
}

interface cartItem {
    //json-server는 기본적으로 POST 요청을 통해 데이터를 추가할 때 id는 새로 자동 생성
    //id값을 넣으면 lodash-id 모듈이 중복이라고 판단하고 500 Internal Server Error를 낸다.
    name: string;
    price: string;
    imageUrl: string;
  }

function createCartItem(cartItem: cartItem) {
    return instance.post('/carts', cartItem)
}

function fetchCartItems() {
    return instance.get('/carts')
}

export { fetchProductById, fetchProductByKeyword, createCartItem, fetchCartItems }