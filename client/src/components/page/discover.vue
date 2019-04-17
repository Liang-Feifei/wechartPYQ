<template>
    <div class="find">
        <app-header title="发现"></app-header>
        <div class="content">
            <app-ceil :title="ceilData.title" :src="ceilData.src" :path="ceilData.path"></app-ceil>
        </div>
    </div>
</template>

<script>
import AppHeader from "../common/Header";
import Ceil from "../common/Ceil";

export default {
    name: 'discover',
    components: {
        'app-header': AppHeader,
        'app-ceil': Ceil,
    },
    data() {
        return {
            ceilData: {
                title: "朋友圈",
                src: "pyq.jpg",
                path: "/moments"
            }
        }
    }
}
</script>

<style scoped>
.find {
  width: 100%;
  height: calc(100% - 55px);
  position: relative;
  box-sizing: border-box;
}
.content {
  width: 100%;
  height: calc(100% - 50px);
  margin-top: 50px;
}
</style>
