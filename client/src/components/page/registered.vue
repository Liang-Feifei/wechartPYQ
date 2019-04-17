<template>
    <div class="register">
        <div class="header">
            <button @click="$router.go(-1)">取消</button>
        </div>
        <div class="container">
            <div class="title">注册账户</div>
            <div class="content">
                <!-- 表单 -->
                <form>
                    <app-input label="昵称" placeholder="请输入昵称" v-model="user.name"></app-input>
                    <app-input label="邮箱" placeholder="请输入邮箱" v-model="user.email"></app-input>
                    <app-input label="密码" placeholder="请输入密码" v-model="user.password" type="password"></app-input>
                    <app-input label="确认密码" placeholder="请确认密码" v-model="user.password_2" type="password"></app-input>
                </form>
                <div class="btn_wrap">
                    <app-button :disabled="isDisabled" @click="register">注册</app-button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import InputGroup from '../common/InputGroup';
import YButton from '../common/YButton';

export default {
    name: 'register',
    components: {
        'app-input': InputGroup,
        'app-button': YButton,
    },
    data() {
        return {
            user: {
                name: '',
                email: '',
                password: '',
                password_2: ''
            }
        }
    },
    computed: {
        isDisabled() {
            if (this.user.name && this.user.email && this.user.password && this.user.password_2) return false;
            else return true;
        }
    },
    methods: {
        register() {
            //验证
            var reg = /^([a-zA-Z0-9._-])+@([a-zA-Z0-9_-])+(\.[a-zA-Z0-9_-])+/;
            if (!reg.test(this.user.email)) {
                alert('请输入合法的邮箱地址！');
                return;
            }

            if (this.user.password !== this.user.password_2) {
                alert('两次输入密码不一致!');
                return;
            }

            this.$axios.post("/api/users/registered",this.user)
                .then(res => {
                    //注册成功
                    alert('注册成功');
                    this.$router.push('/login');

                })
        }
    }
}
</script>

<style scoped>
.register {
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.header {
    width: 100%;
    height: 50px;
    box-sizing: border-box;
    padding: 0 10px;
    line-height: 50px;
}
.header button {
    border: none;
    outline: none;
    background-color: transparent;
    font-size: 16px;
    color: #20af0e;
}
.container {
    width: 100%;
    padding: 16px;
    box-sizing: border-box;
}
.title {
    margin-top: 30px;
    font-size: 22px;
    text-align: center;
}
.content,
.btn_wrap {
  margin-top: 30px;
}
</style>
