<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-h5 text-center">
            회원 목록
          </v-card-title>
          <v-card-text>
            <v-table>
              <thead>
                <tr><th>ID</th><th>이름</th><th>이메일</th><th>상세보기</th></tr>
              </thead>
              <tbody>
                <tr v-for="member in memberList" :key="member.id">
                  <td>{{ member.id }}</td>
                  <td>{{ member.name }}</td>
                  <td>{{ member.email }}</td>
                  <td><v-btn :to="`/member/detail/${member.id}`">상세보기</v-btn></td>
                </tr>
              </tbody>
            </v-table>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { getResultData } from '@/utils/commonDataHandler';
import axios from 'axios';
 
  export default {
    data() {
      return {
        memberList: [],
      }
      
    },
    async created() {
      try {
        // const accessToken = localStorage.getItem("accessToken");
        // const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`, {
        //   headers: { Authorization: `Bearer ${accessToken}` }
        // });
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/list`); // 위에도 됨, 아래는 토큰
        this.memberList = getResultData(response); // 원래는 아래와 같지만, getResultData 함수를 사용하여 에러 처리와 데이터 추출을 일관되게 처리
        // this.memberList = response.data.result;
      } catch (e) {
        console.log(e);
        
      }        
    }
  }
</script>