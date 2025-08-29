function initState() {
  return {
    totalQuantity: localStorage.getItem("totalQuantity") || 0, // totalQuantity가 localStorage에 있다면 get해오고, 없다면 0으로 세팅하겠다
    productsInCart: JSON.parse(localStorage.getItem("productsInCart")) || [] // 문자를 배열로 만들어주기
  }
}

export const cart = {
  // 상태초기화
  state: initState,
  // 상태값을 변경하는 메서드
  mutations: {
    addCart(state, product) {
      // 전체 장바구니 수량
      state.totalQuantity = parseInt(state.totalQuantity) + product.productCount;
      localStorage.setItem("totalQuantity", state.totalQuantity) // "totalQuantity" : key / state.totalQuantity : value

      // 장바구니 안에 상품목록
      const existProduct = state.productsInCart.find(p => p.productId === product.productId);
      if (existProduct) {
        existProduct.productCount += product.productCount;
      } else {
        state.productsInCart.push(product)
      }

      localStorage.setItem("productsInCart", JSON.stringify(state.productsInCart))
    },
    clearCart(state) {
      state.productsInCart = [];
      state.totalQuantity = 0;
      localStorage.removeItem("productsInCart")
      localStorage.removeItem("totalQuantity")

    },
  },

  actions: {
    addCart(context, product) {
      context.commit("addCart", product)
    },
    clearCart(context) {
      context.commit("clearCart")
    }
  },

  // 상태값을 가져가기 위한 메서드
  getters: {
    getTotalQuantity: state => state.totalQuantity,
    getProductsInCart: state => state.productsInCart,
    getClearCart: state => state.clearCart
  }
}
