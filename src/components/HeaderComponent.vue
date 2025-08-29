<template>
  <v-app-bar>
    <v-container>
      <v-row>
        <!-- justify-start : 왼쪽 기준 정렬 -->
        <v-col class="d-flex justify-start">
          <div v-if="userRole === 'ADMIN'">
            <v-btn :to="'/member/list'">회원관리</v-btn>
            <v-btn :to="'/product/manage'">상품관리</v-btn>
            <v-btn href="/order/list">실시간 주문 건수 {{ liveOrderCount }}</v-btn> <!-- 실시간주문건수 누르자마자 새로고침 되기 위해 href로! :to=""(X) -->
            <!-- <v-btn :to="'/practice/store'">스토어테스트</v-btn> -->
          </div>
        </v-col>

        <v-col class="text-center">
            <v-btn to:="'/'">0829한번바꿔본 shop</v-btn>
        </v-col>

        <v-col class="d-flex justify-start">
            <v-btn v-if="isLogined" :to="'/order/cart'">장바구니 {{ totalQuantity }}</v-btn>
            <v-btn :to="'/product/list'">상품목록</v-btn>
            <v-btn v-if="isLogined" :to="'/member/mypage'">마이페이지</v-btn>

            <v-btn v-if="!isLogined" :to="'/member/create'">회원가입</v-btn>
            <v-btn v-if="!isLogined" :to="'/member/login'">로그인</v-btn>
            <v-btn v-if="isLogined" @click="doLogout()">로그아웃</v-btn>
        </v-col>
      </v-row>
    </v-container>
  </v-app-bar>
</template>
<script>
import { EventSourcePolyfill } from 'event-source-polyfill';
import { jwtDecode } from 'jwt-decode';

export default{
  data() {
    return {
      userRole : null,
      isLogined : false,
      cartProductCount: 0,
      liveOrderCount: 0
    }
  },
  created(){
    const accessToken = localStorage.getItem("accessToken");
    if(accessToken) {
      const payload = jwtDecode(accessToken);
      this.userRole = payload.role;
      console.log(payload)
      this.isLogined = true;
    }
    // sse연결 및 메세지 수신, ADMIN 인 경우에만
    if(this.userRole === 'ADMIN') {
      // SSE연결을 위한 event-source-polyfill 라이브러리 사용, axios 요청이 아니므로 header 토큰 직접 세팅
      let sse = new EventSourcePolyfill(`${process.env.VUE_APP_API_BASE_URL}/sse/connect`, {
        headers: {
          Authorization: `Bearer ${accessToken}`
        }
      });

      sse.addEventListener('connect', (event) => {
        console.log(event)
      })
      sse.addEventListener('ORDERED', (event) => {
        console.log(event);
        this.liveOrderCount++;
      })
    }
  },

  computed: {
    totalQuantity() {
      return this.$store.getters.getTotalQuantity // 이거는 cart.js의 getter에 있는 함수명
    }
    
  },

  methods: {
    doLogout() {
      localStorage.clear();
      this.isLogined = false;
      this.userRole = null;
      this.$router.push("/") // 페이지 새로고침, 로그아웃 했을 때 refreshToken이 남아있으면 안되므로 서버에 삭제요청 (redis 삭제)
      // this.isLogined = false;
      // window.location.reload(); // 페이지 새로고침
    }
  }
}

</script>