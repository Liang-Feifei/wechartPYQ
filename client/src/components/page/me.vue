<template>
    <div class="mine">
        <app-header title="我的"></app-header>
        <div class="container">
            <div class="cell-wrapper">
                <div class="cell-title" v-if="user">
                    <img :src="user.avatar" alt="头像" />
                    <span>{{ user.name }}</span>
                </div>
            </div>
            <div class="btn_wrapper">
                <app-ybutton @click="loginOut">退出登陆</app-ybutton>
            </div>
        </div>
    </div>
</template>

<script>
import AppHeader from "../common/Header";
import YButton from "../common/YButton";
import jwt from 'jwt-decode';

export default {
    name: 'me',
    components: {
        'app-header': AppHeader,
        'app-ybutton': YButton
    },
    computed: {
        user() {
            const token = localStorage.wxToken;
            //解析token
            const decode = jwt(token);
            console.log(decode);
            
            return decode;
        }
    },
    methods: {
        loginOut() {
            localStorage.removeItem('wxToken');
            this.$router.push('/login')
        }
    }
}
</script>

<style scoped>
.mine {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.container {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
}
.cell-wrapper {
  background-color: #fff;
  box-sizing: border-box;
  color: inherit;
  min-height: 80px;
  display: flex;
  font-size: 16px;
  line-height: 1;
  overflow: hidden;
  padding: 0 8px;
  width: 100%;
  line-height: 80px;
  border-top: 1px solid #d9d9d9;
  border-bottom: 1px solid #d9d9d9;
}
.cell-title {
  flex: 1;
}
.cell-title img {
  width: 4rem;
  height: 4rem;
  vertical-align: middle;
  margin-right: 0.6rem;
}
.cell-title span {
  display: inline-block;
  vertical-align: middle;
}
.btn_wrapper {
  box-sizing: border-box;
  padding: 20px;
}
</style>
