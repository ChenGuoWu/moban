<template>
    <div class="header">
        <van-icon name="arrow-left"  class="headerback" @click='gotoback'/>
       <div class="headercontent">通讯录</div>
    </div>
</template>
<script>
import { Icon } from 'vant';
export default {
    components:{
        'van-icon':Icon
    },
    methods:{
        gotoback(){
             this.$router.go(-1);
        }
    }
}
</script>
<style lang="scss" scoped>
@import "../assets/sass/header.scss";
</style>
