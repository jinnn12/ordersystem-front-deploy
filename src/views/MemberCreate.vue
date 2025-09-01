<template>
<v-container>
  <v-row justify="center">
    <v-col cols="6">
      <v-card>
        <v-card-title class="text-h5 text-center">
          회원가입
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label="name"
              type="text"
              v-model="name"
              variant="outlined"
              prepend-icon="mdi-account"
            />
            <v-text-field
              label="email"
              type="email"
              v-model="email"
              variant="outlined"
              prepend-icon="mdi-email"
            />
            <v-text-field
              label="password"
              type="password"
              v-model="password"
              variant="outlined"
              prepend-icon="mdi-lock"
            />
            <v-row>
              <v-col>
                <!-- block : 속한 row에서 너비를 꽉 채우는 옵션 -->
                <v-btn color="secondary" block @click="memberCreate()"> 
                  회원가입
                </v-btn>
              </v-col>
            </v-row>
          </v-form>
        </v-card-text>
      </v-card>
    </v-col>
  </v-row>
</v-container>
</template>
<script>
import axios from 'axios';
export default {
  
  data() {
    return {
      name: "",
      email: "",
      password: ""
    }
  },
  methods: {
    async memberCreate() {
      try {
        const data= {name: this.name, email: this.email, password: this.password};
        await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/create`, data);
        this.$router.push("/"); // 회원가입 성공 후 메인 페이지로 이동
        alert("회원가입이 완료되었습니다.");
        // 에러가 터지는 경우 e 변수 안에 서버에서 주는 error 메세지가 담겨있다
        } catch (e) {
          console.error(e);
          alert(e.response.data.statusMessage);
        }
    } 
  }
}
  

</script>
