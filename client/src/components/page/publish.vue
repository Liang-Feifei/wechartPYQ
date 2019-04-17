<template>
    <div class="publish">
        <app-loading :loading="loading"></app-loading>
        <div class="header">
            <button @click="$router.go(-1)">取消</button>
            <button @click="publish">发表</button>
        </div>
        
        <div class="content">
            <div class="text_wrap">
                <textarea placeholder="这一刻的想法..." v-model="text"></textarea>

                <!-- 文件上传 -->
                <app-upload @getImd="getImgs"></app-upload>
            </div>
        </div>
    </div>
</template>

<script>
import UpLoad from '../common/Upload'
import Loading from '../common/Loading'
import jwt from 'jwt-decode';

export default {
    name: "publish",
    components: {
        'app-upload': UpLoad,
        'app-loading': Loading
    },
    data() {
        return {
            text: '',
            imgs: [],
            loading: false
        }
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
        publish() {
            // console.log(this.imgs)
            this.loading = true;
            const postData = {
                name: this.user.name,
                img: this.user.avatar,
                text: this.text,
                imgs: this.imgs.join('|')
            }

            //请求
            this.$axios.post('/api/profiles/add',postData)
                .then(res => {
                    //发布成功，跳转
                    this.loading = false;
                    this.$router.push('/moments');
                })
        },
        getImgs(imgs) {
            //获取base64
            imgs.forEach(file => {
                this.uploadFile(file);
            })
        },
        uploadFile(file) {
            //文件读取器
            const _this = this;
            let reader = new FileReader();
            //不能使用箭头函数，因为需要使用的this是指向reader的
            reader.onload = function (e) {
                // console.log(e.target.result);
                _this.imgs.push(e.target.result)
            };

            //使用reader转化为base64(其实就是字符串)
            reader.readAsDataURL(file);
        }
    }
}
</script>

<style scoped>
.publish {
  width: 100%;
  height: 100%;
  position: relative;
  overflow: hidden;
}

.header {
  width: 100%;
  height: 50px;
  box-sizing: border-box;
  display: flex;
  padding: 0 10px;
  line-height: 50px;
  justify-content: space-between;
}
.header button {
  border: none;
  outline: none;
  background-color: transparent;
  font-size: 16px;
}
.header button:nth-child(2) {
  color: #20af0e;
}

.content {
  width: 100%;
  box-sizing: border-box;
  padding: 16px;
}
.text_wrap textarea {
  width: 100%;
  font-size: 14px;
  min-height: 60px;
  border: none;
  outline: none;
}
.text_wrap {
  margin-bottom: 16px;
}
</style>
