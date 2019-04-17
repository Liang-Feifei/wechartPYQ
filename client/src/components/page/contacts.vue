<template>
    <div class="contacts">
        <app-header title="通讯录" btn_icon="user-plus"></app-header>
    </div>
</template>

<script>
import AppHeader from "../common/Header";

export default {
    name: 'contacts',
    components: {
        'app-header': AppHeader
    }
}
</script>

<style scoped>

</style>
