<template>
    <div class="loading">
        <van-loading type="spinner" color="#1989fa" size="30px"/>
    </div>
</template>
<script>
import { Loading } from 'vant';
export default {
    components:{
        'van-loading':Loading
    },
    name:'loading',
    data(){        
        return{
        }
    }
}
</script>
<style scoped>
    .loading{
        height: 90%;
        width: 100%;
        position: fixed;
        display: flex;
        justify-content: center;
        align-items: center;
        z-index: 1000000;
    }
</style>