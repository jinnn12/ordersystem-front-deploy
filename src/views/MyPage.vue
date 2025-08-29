<template>
  <!-- 내 정보 조회 -->
  <!-- 문자열로 props를 넘길 경우 변수명="값", 그 외에는 ':변수명' 형태로 전달 -->
  <MemberDetailComponent
  :isMyPage="true" pageTitle="내 회원 정보"
  />

  <!-- 내 주문 내역 조회 -->
   OrderList
  :isMyPage="true"
</template>
<script>
import MemberDetailComponent from '@/components/MemberDetailComponent.vue';

  export default{
    components:{
      MemberDetailComponent
    }
  }
</script>