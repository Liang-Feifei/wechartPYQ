<template>
    <div class="index">
        <div class="title">用户登陆</div>
        <div class="content">
            <!-- 表单 -->
            <form>
                <app-input label="账号" placeholder="请输入账号" v-model="user.email"></app-input>
                <app-input label="密码" placeholder="请输入密码" v-model="user.password" type="password"></app-input>
            </form>
            <div class="btn_wrap">
                <app-button :disabled="isDisabled" @click="loginClick">登陆</app-button>
            </div>
        </div>
        <div class="footer_wrap">
            |<button class="register" @click="$router.push('/register')">立即注册</button>|
        </div>
    </div>
</template>

<script>
import InputGroup from '../common/InputGroup';
import YButton from '../common/YButton';

export default {
    name: 'login',
    components: {
        'app-input': InputGroup,
        'app-button': YButton,
    },
    data() {
        return {
            user: {
                email: '13158022413@163.com',
                password: '123456'
            }
        }
    },
    computed: {
        isDisabled() {
            if (this.user.email && this.user.password) return false;
            else return true;
        }
    },
    methods: {
        loginClick() {
            //验证
            var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            if (!reg.test(this.user.email)) {
                alert('请输入合法的邮箱地址！');
                return;
            }

            this.$axios.post("/api/users/login",this.user)
                .then(res => {
                    // console.log(res)
                    //存储token
                    const { token } =res.data;
                    //存储到local stroage
                    localStorage.setItem("wxToken",token);
                    alert('登陆成功!')

                    //跳转页面
                    this.$router.push("/")
                })
        }
    }
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
  overflow: hidden;
  padding: 16px;
  box-sizing: border-box;
}
.title {
    margin-top: 80px;
    text-align: center;
    font-size: 22px;
}
.footer_wrap {
    position: absolute;
    left: 0;
    bottom: 16px;
    text-align: center;
    width: 100%;
    color: #888;
}
.register {
    outline: none;
    font-size: 16px;
    border: none;
    background-color: transparent;
    color: #7b8ca9;
}
.content,
.btn_wrap {
  margin-top: 30px;
}
</style>
