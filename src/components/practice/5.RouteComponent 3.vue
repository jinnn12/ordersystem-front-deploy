<template> 
  <div>라우트 화면 3, 변수를 사용할 땐 '작은 따옴표(')가 아닌' `빽틱(`)을 사용하자`</div>
</template>
<script>
import axios from 'axios';

  export default{
    data() {
      return {
        id : null
      }
    },
    created() {
      // 라우터에서 전달된 Id(param)값 꺼내기
      this.id = this.$route.params.postId;
      // 서버에 id값으로 데이터 요청
      const response = axios.get(`http://localhost:8080/posts/${this.id}`);
      console.log(response);
    },

    methods: {

    }
  }
</script>