<template>
  <h1>storeComponentB</h1>
  <p>지역변숫값 count : {{ count }}</p>
  <p>전역 store 변숫값 count : {{ getStoreCount }}</p>
</template>

<script>
export default {
  data() {
    return {
      count: 0,
    }
  },
  computed: {
      getStoreCount() {
        return this.$store.getters.getCount;
      }
    }
}
</script>