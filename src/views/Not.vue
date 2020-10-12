<template>
  <div class="nofind">
    404
    <div v-for="(item, index) in activeUsers" :key="index">
      {{ item.name }}
    </div>
    <van-divider>文字</van-divider>
  </div>
</template>
<script>
import { Divider } from 'vant';
export default {
  components:{
    "van-divider":Divider,
  },
  data() {
    return {
      list: [
        { name: "cgw1", active: true },
        { name: "cgw2", active: true },
        { name: "cgw3", active: false },
        { name: "cgw4", active: true },
      ],
    };
  },
  computed: {
    activeUsers() {
      return this.list.filter(function(user) {
        return user.active;
      });
    }
  },
  created(){
    this.$Toast('我成功了')
  },
};
</script>
<style lang="sass" scoped></style>
