<template>
  <v-container>
    <v-row justify="center">
      <v-col class="text-center text-h5">
        장바구니 목록
      </v-col>
    </v-row>
    <v-row justify="space-between">
      <!-- cols=auto 알아서 정렬됨 -->
      <v-col cols="auto">
        <v-btn color="secondary" @click="clearCart()">장바구니 비우기</v-btn>
      </v-col>
      <v-col>
        <v-btn color="red" @click="orderCreate()">주문하기</v-btn>
      </v-col>
    </v-row>
    <v-col>
      <v-table>
        <thead>
          <tr>
            <th>제품 아이디</th>
            <th>제품명</th>
            <th>주문 수량</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="product in getProductsInCart" :key="product.productId">
            <td>{{ product.productId }}</td>
            <td>{{ product.name }}</td>
            <td>{{ product.productCount }}</td>
          </tr>
        </tbody>
      </v-table>
    </v-col>
    <v-row>

    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';

export default {
  computed: {
    getProductsInCart() {
      return this.$store.getters.getProductsInCart;
    }
  },
  methods: {
    clearCart() {
      return this.$store.dispatch("clearCart")
    },
    async orderCreate() {
      try {
        const orderData = this.getProductsInCart.map(p => { return { productId: p.productId, productCount: p.productCount } })
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/ordering/create`, orderData)
        this.clearCart();
        alert("주문 완료")
      } catch (e) {
        console.log(e)
      }
        
      }
  }
}
</script>