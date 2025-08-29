<!-- 양방향 바인딩 -->
<template>
  <!-- 일종의 단방향 바인딩, 새로고침 하지 않아도 값이 실시간으로 변경 -->
   <!-- 화면 내에서는 this를 붙일 필요가 없다 -->
  <h1>hello world {{ language }}</h1>
  <!-- v-model 문법을 사용하면 양방향 데이터 바인딩 -->
  <input type="text" v-model="value">
  <button @click="changeValue()">변수 변경</button>
  <button @click="showValue()">변수 확인</button>
</template>

<script>
  export default{
    // data()함수는 화면에서 사용할 변수를 선언하는 곳 / data() 함수는 약속됐으므로 data1, data2 등 다른 이름으로 사용 X
    data() {
      return {
        language: "java",
        value: "java"
      }
    },

    // 개발자가 정의하는 함수는 methods안에 정의
    methods: {
      changeValue() {
        // this의 의미는 현재 컴포넌트 객체 자신을 의미
        // this는 주로 컴포넌트 내부에 선언된 변수나 함수에 접근할 때 사용
        this.value = "C++";
      },
      showValue() {
        alert(this.value);
      }
    }
  }

</script>