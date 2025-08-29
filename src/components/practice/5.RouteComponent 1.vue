<template> 
  <v-btn href="/practice/route2">일반 라우팅</v-btn>
  <v-btn @click="hrefRouting()">일반 라우팅(함수)</v-btn>

  <v-btn :to="'/practice/route2'">SPA 경로기반 라우팅</v-btn>
  <v-btn @click="spaRouting1()">SPA 경로기반 라우팅 (함수)</v-btn>

  <v-btn :to="{name: 'RouteComponent2'}">SPA 이름기반 라우팅</v-btn>
  <v-btn @click="spaRouting2()">SPA 이름기반 라우팅 (함수)</v-btn>

  <v-btn :to="'/practice/route3/1'">1번 게시글 보기</v-btn>
  <v-btn @click="goToPost()">1번 게시글 보기</v-btn>

</template>
<script>
  export default{
    methods: {
      hrefRouting() {
        // 화면전체 새로고침이 발생하여 사용자 경험 저하 가능성
        // 화면 상 모든 컴포넌트가 새롭게 created
        window.location.href = "/practice/route2";
      },
      spaRouting1() {
      // spa : single page application의 약어 / 새로고침 없이 페이지 전환
      // 새롭게 라우트되는 컴포넌트만 createdr가 되고, 기존 컴포넌트는 created가 호출되지 않음
      // this.$router.push("/practice/route2")는 새로고침 없이 페이지 전환
      this.$router.push("/practice/route2")
      },
      spaRouting2() {
        // spa : single page application의 약어 / 새로고침 없이 페이지 전환, 이름 기반 라우팅 함수
        this.$router.push({name: 'RouteComponent2'})
      },
      goToPost(postId){
        this.$router.push(`/practice/route3/${postId}`)
      }
    }
      
  }
</script>