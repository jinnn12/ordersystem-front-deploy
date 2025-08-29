<template>
    <h1>Hook 실습</h1>
    <button @click="moveScreen()">다른 화면으로 화면이동</button>
    <h1>{{ count1 }}</h1>
    <button @click="incrementCount()">count1 1씩 증가</button>
    <!-- coumputed를 통해 계산된 함수의 결괏값은 함수명을 변수처럼 사용 가능 -->
    <h1>computed된 값 : {{ doubleCount }}</h1> <!-- 함수명을 변수처럼 사용할 수 있음, 약속된 패턴 -->

</template>
<script>
  export default{ 
      data() {
        return {
          count1: 0,
        }
      },
      // 화면이 열리기 전(vue 인스턴스가 생성되기 전) 실행되는 함수
      // 예시) 목록조회, 상세조회
      // created() {
      //   alert("Hook함수 'created' 테스트");
      // },

      // 컴포넌트가 화면 상에서 제거될 때 실행되는 함수 (라우트 이동 시 실행되는 함수)
      // 예시) 채팅화면을 벗어나 다른화면으로 이동 시, 실시간 연결 종료 시 alert 띄워주며 
      beforeUnmount() {
        alert("goodbye");
      },

      // 종속된 데이터가 변경될 때 함수를 다시 실행하여 값을 계산해서 리턴하는 함수
      // this.count1이 변경되면 doubleCount가 다시 계산됨 (변경되면 *2를 하겠다)
      computed:{
        // this.count1을 바라보고 있다가 변경되면 doubleCount값이 변하는 로직
        // 예시) 장바구니 수량 보여줄 때 주로 사용
        doubleCount() {
          return this.count1 * 2;
        }
      },

      // 특정 변숫값의 변경사항을 인지하여 함수를 실행하는 hook 함수
      // 예시) 검색어 입력시 자동 api(함수) 호출
      // watch: {
      //   // 인지하는 것과 바라보는 것, 변숫값과 일치되는 함수명 사용해야 된다
      //   count1() {
      //     alert("watch함수 실행");
      //   }
      // },

      // 특정 변수의 변경사항이 아닌 화면 전체의 변경사항을 인지하는 hook 함수
      updated() {
        alert("updated hook 함수 호출")
      },

      
      methods: {
        moveScreen() {
          this.$router.push("/practice/vuetify");
        },
        incrementCount() {
          this.count1++;
        }
      }
  }

</script>