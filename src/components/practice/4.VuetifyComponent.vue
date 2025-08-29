<template>
    <v-container>
        <v-row>
            <!-- 한 row의 전체 cols는 12 -->
            <v-col cols="8">
                Hello vuetify
            </v-col>
            <v-col cols="4">
                Hello vuetify2
            </v-col>
        </v-row>
        <v-row>
            <v-card>
                <v-card-title>
                    회원가입
                </v-card-title>
                <v-card-text>
                    회원가입을 해주세요
                </v-card-text>
            </v-card>
        </v-row>
        <v-row>
            <v-simple-table>
                <thead>
                    <tr>
                        <th>이름</th><th>이메일</th>
                    </tr>
                </thead>
                <tbody>
                    <tr><td>김민정</td><td>winter@naver.com</td></tr>
                </tbody>
            </v-simple-table>
        </v-row>
    </v-container>

    <v-card>
        <v-card-title id="sign-up-title" style="font-size:50px">회원가입</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    label="Name"
                    type="text"
                />
                <v-text-field
                    label="Email"
                    type="email"
                />
                <v-text-field
                    label="Password"
                    type="password"
                />
                <v-btn color="secondary">제출</v-btn>
                <v-btn color="secondary" @click="cancel()">취소</v-btn>
            </v-form>
        </v-card-text>
    </v-card>

    <!-- 모달창(팝업)을 위한 v-dialog -->
    <!-- v-dialog는 내부적으로 true/false 값을 가지고 외부에 공개할 지 말 지 결정한다 -->
    
    <v-dialog v-model="trueOrFalse" max-width="50px">
        <v-card>
            <v-card-title>
                정말 취소하시겠습니까?
            </v-card-title>
            <v-card-actions>
                <v-btn color="secondary" @click="okBtn()">Yes</v-btn>
                <v-btn color="third" @click="noBtn()">No</v-btn>
            </v-card-actions>
        </v-card>
    </v-dialog>
</template>

<script>
export default {
    data() {
        return {
            trueOrFalse : false
        }
    },

    methods: {
        cancel() {
            this.trueOrFalse = true;
        },
        okBtn() {
            this.trueOrFalse = false;
            alert("회원가입을 취소합니다.");
        },
        noBtn() {
            this.trueOrFalse = false;
            alert("회원가입을 계속 진행합니다.");
        }
    }
}

</script>

<style>

#sign-up-title {
    color: sandybrown;
    text-align: center;
}
</style>
