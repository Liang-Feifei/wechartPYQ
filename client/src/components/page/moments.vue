<template>
    <div class="circle">
        <app-loading :loading="loading"></app-loading>
        <app-header title="朋友圈" btn_icon="camera" :isLeft="true" @rightClick="$router.push('/publish')"></app-header>
        <div class="container">
            <app-scroll ref="refresh" @pulldown="loadData" @pullup="loadMore">
                <div class="head_wrapper">
                    <div class="user_head">
                        <span>{{user.name}}</span>
                        <div class="user_img">
                        <img :src="user.avatar" alt="" class="head_img">
                        </div>
                    </div>
                </div>
                <div class="content_wrapper">
                    <app-ceilView v-for="(moment,index) in momentsList" :key="index" :momentsObj="moment"></app-ceilView>
                </div>
            </app-scroll>
        </div>
    </div>
</template>

<script>
import AppHeader from "../common/Header";
import ceilView from "../common/ceilView";
import Scroll from "../common/Scroll";
import Loading from '../common/Loading'
import jwt from 'jwt-decode';

export default {
    name: 'moments',
    components: {
        'app-header': AppHeader,
        'app-ceilView': ceilView,
        'app-scroll': Scroll,
        'app-loading': Loading
    },
    data() {
        return {
            momentsList: [],
            page: 2, //加载更多从2开始
            size: 4,   //每次请求3条数据
            loading: false
        }
    },
    computed: {
        user() {
            const token = localStorage.wxToken;
            //解析token
            const decode = jwt(token);
            // console.log(decode);
            
            return decode;
        }
    },
    created() {
        this.getLatestData();
    },
    methods: {
        getLatestData() {
            this.loading = true;
            this.$axios.get("/api/profiles/latest")
                .then(res => {
                    this.loading = false;
                    // console.log(res.data)
                    this.momentsList = [...res.data];

                    //注册事件 ，解决重置问题
                    this.$refs.refresh.$emit('refresh');
                })
                .catch(err => console.log(err))
        },
        loadData() {
            this.page = 2;
            this.getLatestData();
        },
        loadMore() {
            this.loading = true;
            this.$axios.get(`/api/profiles/${this.page}/${this.size}`)
                .then(res => {
                    this.loading = false;
                    // console.log(res.data)
                    const result = [...res.data];
                    

                    //遍历数组
                    if (result.length > 0) {
                        result.reverse();
                        result.forEach(item => {
                            this.momentsList.push(item);
                        })
                        //自增page
                        this.page++;
                    } else {
                        //数组为空，没有更多数据，page不在自增
                        this.$refs.refresh.$emit('loadDone')
                    }

                })
                .catch(err => console.log(err))
        }
    }
}
</script>

<style scoped>
.circle {
  width: 100%;
  height: 100%;
  box-sizing: border-box;
}

.container {
  width: 100%;
  height: calc(100% - 50px);
  padding-top: 50px;
  overflow: auto;
}
.head_wrapper {
  width: 100%;
  position: relative;
  height: 200px;
  background: url(../../assets/cricle_bg.png) no-repeat;
  background-size: 100% 100%;
}
.head_wrapper .user_head {
  position: absolute;
  bottom: -30px;
  right: 16px;
}
.user_img {
  width: 60px;
  height: 60px;
  padding: 3px;
  border: 1px solid #c5c5c5;
  box-sizing: border-box;
}
.user_head img {
  width: 100%;
  height: 100%;
}
.user_head span {
  line-height: 30px;
  position: absolute;
  right: 76px;
  width: 200px;
  text-align: right;
  color: white;
}
</style>
