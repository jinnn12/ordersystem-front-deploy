<template>
<v-container>
  <v-row justify="center">
    <v-col cols="6">
      <v-card>
        <v-card-title class="text-h5 text-center">
          상품등록
        </v-card-title>
        <v-card-text>
          <v-form>
            <v-text-field
              label="상품명"
              v-model="name"
            />
            <v-text-field
              label="카테고리"
              v-model="category"
            />
            <v-text-field
              label="가격"
              type="number"
              v-model="price"
            />
            <v-text-field
              label="재고수량"
              type="number"
              v-model="stcokQuantity"
            />
            <v-file-input
              label="상품이미지"
              accept="image/**"
              @change="fileUpload"
              multiple
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

export default{
    data(){
        return{
            name: "",
            category: "",
            price: null,
            stockQuantity: null,
            productImage: null,
        }
    },

    methods:{
        fileUpload(event){
            // 여러 개의 상품일 경우 for문을 실행하여 productImage에 값 할당
            this.productImage = event.target.files[0];  // files의 0번째 파일(단건)
        },
        async productCreate() {
            try{
                // multi-part-formdata 또는 url인코딩 방식인 경우, FormData클래스 사용하여 객체 조립
                let data = new FormData();
                data.append("name", this.name);
                data.append("category", this.category);
                data.append("price", this.price);
                data.append("stockQuantity", this.stockQuantity);
                data.append("productImage", this.productImage);
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/product/create`, data)
                this.$router.push("/product/manage");
            } catch(e){
                console.log(e);
            }
        }
    }
}
</script>