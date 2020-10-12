<template>
  <div id="app">
    <loading v-show="showloading" :key="key"></loading>
    <router-view/>  
  </div>
</template>
<script>
import loading from '@/components/loading.vue'
import {mapState} from 'vuex'
export default {
  name: 'App',
  components:{loading},
   computed:{
    ...mapState(['showloading']),    
    key() {
      
      return this.$route.name !== undefined? this.$route.name +new Date(): this.$route +new Date()
    }
  },
}
</script>
<style scoped>

</style>
