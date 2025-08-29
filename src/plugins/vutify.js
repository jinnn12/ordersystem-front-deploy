import { createVuetify } from "vuetify";
import 'vuetify/styles';
// components는 vuetify의 모든 컴포넌트를 가져옵니다. UI 컴포넌트를 의미
import * as components from 'vuetify/components';
// directives는 vuetify가 제공하는 추가 디자인 요소. ??UI 컴포넌트의 동작을 의미?? 
import * as directives from 'vuetify/directives';
import { mdi } from 'vuetify/iconsets/mdi'; // Material Design Icons 세트, mdi는 폰트를 사용하기 위한 설정입니다.



export default createVuetify({
  components, directives,
  icons: {defaultSet: 'mdi', sets: {mdi}}, 
})