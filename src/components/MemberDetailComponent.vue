<template>
  <v-container>
    <v-row>
      <v-col>
        <v-card>
          <v-card-title class="text-h5 text-center">
            {{ pageTitle }}
          </v-card-title>
          <v-card-text>
            <v-table>
              <tbody>
                <tr>
                  <td>ID : </td>
                  <td>{{ member.id }}</td>
                </tr>
                <tr>
                  <td>이름 : </td>
                  <td>{{ member.name }}</td>
                </tr>
                <tr>
                  <td>이메일 : </td>
                  <td>{{ member.email }}</td>
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
import axios from 'axios';
export default {
  // 화면간 매개변수를 넘길 때 사용하는 변숫값을 props라 칭함
  props: ['isMyPage', 'pageTitle'],
  data() {
    return {
      member: {},
    }
  },
  async created() {
    try {
      if(this.isMyPage) {
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/myinfo`);
        console.log("real", response)
        this.member = response.data.result;
      } else {
        this.memberId = this.$route.params.memberId;
        const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member/detail/${this.memberId}`);
        this.member = response.data.result;
      }
      
    } catch (e) {
      console.log(e)
    }
    
    
  }
}

</script>