<template>
  <v-container>
    <v-row class="d-flex-justify-content-between mt-1">
      <v-col>
        <v-form>
          <v-row>
            <v-col cols="auto">
              <v-select
              v-model="searchType"
              :items="searchOptions"
              item-title="text"
              item-value="value"
              />
            </v-col>
            <v-col>
              <v-text-field 
              placeholder="검색어를 입력하세요" 
              v-model="searchValue"
              label="search"
              @keyup.enter="searchProduct"
              />
            </v-col>
            <v-col cols="auto">
              <v-btn @click="searchProduct()">검색</v-btn>
            </v-col>
          </v-row>
        </v-form>
      </v-col>
      <v-col cols="auto" v-if="!isAdmin">
        <v-btn @click="addCart()" color="secondary">장바구니</v-btn>
        <v-btn @click="createdOrder()" color="red">주문하기</v-btn>
      </v-col>
      <v-col cols="auto" v-if="isAdmin">
        <v-btn :to="'/product/create'" color="secondary">상품등록</v-btn>
      </v-col>
    </v-row>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-h5 text-center">
            {{ pageTitle }}
          </v-card-title>

          <v-card-text>
            <v-table>
              <thead>
                <tr>
                  <th>제품사진</th>
                  <th>제품명</th>
                  <th>가격</th>
                  <th>재고수량</th>
                  <th v-if="!isAdmin">주문수량</th>
                  <th v-if="!isAdmin">주문선택</th>
                  <th v-if="isAdmin">action</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="product in productList" :key="product.id">
                  <td><v-img :src="product.imagePath"></v-img></td>
                  <td>{{ product.name }}</td>
                  <td>{{ product.price }}</td>
                  <td>{{ product.stockQuantity }}</td>
                
                  <td>
                    <!-- input 박스(v text field)는 화면에서 숫자처럼 보여도, 실제로는 문자열임 -->
                    <v-text-field v-model.number="product.productCount" type="number" style="width: 65px;" v-if="!isAdmin" />
                  </td>
                  <td>
                    <input type="checkbox" v-model="product.selected" v-if="!isAdmin">
                  </td>
                  <td v-if="isAdmin">
                    <v-btn color="red">상품 삭제</v-btn>
                  </td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import axios from 'axios';
export default {
  props:["isAdmin", "pageTitle"],
  data() {
    return {
      productList: [],
      pageSize: 7,
      currentPage: 0,
      isLoading: false,
      isLastPage: false,
      searchType: "productName",
      searchValue: "",
      searchOptions: [{text: "상품명", value:"productName"}, {text:"카테고리", value:"category"}]
    }
  },
  async created() {
    this.loadData();
    window.addEventListener('scroll', this.scrollPaging)
  },

  methods: {
    searchProduct() {
      this.productList = [];
      this.currentPage = 0;
      this.isLastPage = false;
      this.isLoading = false;
      this.loadData();
    },

    scrollPaging() {
      // 현재 화면 높이 + 스크롤로 이동한 거리 > 전체 화면 높이 - n(내가 원하는 길이)가 성립되면 추가 데이터 로드
      const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200
      // 로딩중이고, 라스트페이지에 바텀이라면 loadData
      if(isBottom && !this.isLoading && !this.isLastPage) {
        this.loadData()
      }
    },

    addCart() {
      // let totalQuantity = 0;
      const orderProductList = this.productList
          .filter(p => p.selected && p.productCount > 0)
          .map(p => ({ productId: p.id, name: p.name, productCount: p.productCount }))
      // for(let i = 0; i < orderProductList.length; i++) {
      //   totalQuantity += orderProductList[i].productCount;
      // }
      orderProductList.forEach(p=> this.$store.dispatch("addCart", p))
      // this.$store.dispatch("addCart", orderProductList) // /store/cart.js에서 정의된 함수, this.$store.dispatch() 약속된 패턴, 무엇을 장바구니에 넣었는지 이 요소의 객체를 넣음
    },

    async loadData() {
      this.isLoading = true;
      // 문자열로 직접 ?size=xx&page=yy&productName=xx&&category=zz 형태로도 조립 가능하지만, 'params'라는 객체를 사용하면 파라미터형식으로 url 조립
      let params = {
        size: this.pageSize,
        page: this.currentPage,
      }
      if(this.searchType == "productName") {
        params.productName = this.searchValue;
      }
      if(this.searchType == "category") {
        params.category = this.searchValue;
      }
      const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product/list`, {params});
      const additionalData = response.data.result.content.map(p => ({ ...p, productCount: 0, selected: false }));
      if(additionalData.length == 0) {
        this.isLastPage = true;
      }
      this.productList = [...this.productList, ...additionalData]
      this.currentPage++;
      this.isLoading = false;
    },

    async createdOrder() {
      try {
        const orderProductList = this.productList
          .filter(p => p.selected && p.productCount > 0)
          .map(p => ({ productId: p.id, productCount: p.productCount }))
        if (orderProductList.length > 0) {
          await axios.post(`${process.env.VUE_APP_API_BASE_URL}/ordering/create`, orderProductList)
          alert("주문이 정상 완료되었습니다.")
          window.location.reload();
          console.log(orderProductList)
        }
      } catch (e) {
        console.log(e)
        alert("주문이 실패하였습니다.")
      }
    }
  },

}
</script>