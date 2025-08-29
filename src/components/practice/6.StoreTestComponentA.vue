<template>
  <h1>storeComponentA</h1>
  <p>지역변숫값 count : {{ count }}</p>
  <v-btn @click="incrementCount()">count값 증가</v-btn>
  <p>전역 store 변숫값 count : {{ getStoreCount }}</p>
  <v-btn @click="incrementStoreCount()">전역 store count값 증가</v-btn>
  <br><br><br>
</template>

<script>
export default {
    data() {
      return {
        count:0,
      }
    },

    computed: {
      getStoreCount() {
        return this.$store.getters.getCount;
      }
    },

    methods: {
      incrementCount() {
        this.count++;
      },
      incrementStoreCount() {
        // store의 actions를 호출할 때는 dispatch 함수 사용
        this.$store.dispatch("incrementCount")
      }
    }
  }
</script>