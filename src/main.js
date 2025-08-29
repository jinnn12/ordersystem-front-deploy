// 중괄호가 쳐져 있으면 export 된 항목 중 하나만 선택하여 import
// 중괄호가 없으면 default(대표요소) 요소를 import, 기본값 사용을 위해 중괄호 X

import { createApp } from 'vue'
import App from './App.vue'
import router from './router';
import vutify from './plugins/vutify';
import '@mdi/font/css/materialdesignicons.css';
import axios from 'axios';
import store from './store';

createApp(App)

const app = createApp(App);

// axios의 모든 요청을 인터셉팅하여 모든 요청마다 accessToken을 자동으로 포함하게 하기 위한.. 매번 토큰 받아오기 귀찮으니 자동화를 하기 위함
axios.interceptors.request.use(
    config => {
        const accessToken = localStorage.getItem('accessToken');
        if(accessToken){
            config.headers['Authorization'] = `Bearer ${accessToken}`;
        }
        return config;
    },
    error => {
        // 에러가 발생시, 사용자의 본래요청의 화면으로 되돌아가야함
        return Promise.reject(error);
    }
)

// 401 1번, 모든 axios요청에서 401을 받을경우에 interceptor를 통해 rt를 통한 at 재발급
// 401 2번, rt마저 만료되었을때는 login창으로 이동
axios.interceptors.response.use(
    response => response,
    async error => {
        if(error.response && error.response.status === 401 ){
            try{
                console.log("heeer")
                const refreshToken = localStorage.getItem('refreshToken');
                const response =  await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/refresh-at`, {refreshToken});
                // const response =  await axios.post(`${process.env.VUE_APP_API_BASE_URL}/member/refresh-at`, {refreshToken:refreshToken});, 단축속성명 문법
                const accessToken = response.data.result.accessToken;
                localStorage.setItem("accessToken", accessToken);
                console.log("갱신성공")
                window.location.reload();
            }catch(e){
                console.log("갱신 실패", e);
                localStorage.clear();
                window.location.href = "/member/login";
                // 401이어서 토큰 만료됐다 생각하고 At 주려고 했는데, Rt마저 마무리 된 경우 /member/login으로 튕겨줌
            }
        }
        return Promise.reject(error);
    }
)

app.use(store)
app.use(vutify)
app.use(router);
app.mount('#app')

