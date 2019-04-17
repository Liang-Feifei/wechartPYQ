<template>
    <div class="index">
        <router-view></router-view>
        <app-tabbar :tabBar="tabBarData"></app-tabbar>
    </div>
</template>

<script>
import tabBar from "../common/tabBar";

export default {
    name: 'index',
    components: {
        'app-tabbar': tabBar
    },
    data() {
        return {
            tabBarData:[
                {title: '微信',icon: 'comment',path: '/chats'},
                {title: '通讯录',icon: 'address-book',path: '/contacts'},
                {title: '发现',icon: 'compass',path: '/discover'},
                {title: '我的',icon: 'user',path: '/me'},
            ]
        }
    }
}
</script>

<style scoped>
.index {
  width: 100%;
  height: 100%;
}
</style>
