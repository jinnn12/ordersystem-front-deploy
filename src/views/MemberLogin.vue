<template>
<v-container>
  <v-row justify="center">
    <v-col cols="6">
      <v-card>
        <v-card-title class="text-h5 text-center">
          로그인
        </v-card-title>
        <v-card-text>
          <v-form>
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
                <v-btn color="secondary" block @click="memberLogin()" > 
                  로그인
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
import { getErrorMessage, getResultData } from '@/utils/commonDataHandler';
import axios from 'axios';
export default {
  
  data() {
    return {
      email: "",
      password: ""
    }
  },
  methods: {
    async memberLogin() {
      try {
        console.log("hello world");
        const data= {email: this.email, password: this.password};
        const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/doLogin`, data);
        const result = getResultData(response);
        console.log(result);
        const accessToken = response.data.result.accessToken;
        const refreshToken = response.data.result.refreshToken;
        localStorage.setItem("accessToken", accessToken);
        localStorage.setItem("refreshToken", refreshToken);

        console.log(response);
        console.log("hello world");
        // this.$router.push("/");  // 이는 헤더가 created가 호출이 되지 않으므로, 일반 라우팅 방식으로 가야함
        window.location.href = "/"; // 로그인 성공 후 메인 페이지로 이동

        alert("로그인이 완료되었습니다.");
        } catch (e) {
          console.error(e);
          alert(getErrorMessage(e));
        }
    } 
  }
}
  

</script>
