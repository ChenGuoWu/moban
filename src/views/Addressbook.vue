<template>
  <div class="addressbook">
    <div class="header">
      <van-icon name="arrow-left" class="headerback" @click="gotoback" />
      <div class="headercontent">通讯录</div>
    </div>
    <div class="sildesiber">

    <div class="siber" v-if="navigationList.length">
      <span v-for="(item, index) in navigationList" :key="index">
        >{{ item }}</span
      >
    </div>
    </div>
    <div class="addresbooksAll">
      <div
        class="addressbook-text"
        v-for="(item, index) in lists"
        :key="index"
        @click="gotodetail(item.sysId)"
      >
        <div class="addressbook-imguser">
          <div :class="randcolor[parseInt(Math.random()*4)]">
            {{ item.realName.substring(item.realName.length - 2) }}
          </div>
        </div>
        <div class="addressbook-name">
          <span>{{ item.realName }}</span> | {{ item.departName }}
        </div>
        <div class="addressbook-ico">
          <van-icon name="arrow" />
        </div>
      </div>
      <div
        class="addressbook-text"
        v-for="item in listsDepartment"
        :key="item.departId"
        @click="gotodetailLeval(item.sysId, item.departName)"
      >
        <div class="addressbook-img"></div>
        <div class="addressbook-name">{{ item.departName }}</div>
        <div class="addressbook-ico">
          <van-icon name="arrow" />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import { mapState,mapMutations } from "vuex";
// import Header from "@/components/Header.vue";
import { Icon } from "vant";
import { addressList } from "@/api/api";
import utils from "@/utils/index.js";
export default {
  components: {
    "van-icon": Icon,
    // headers: Header,
  },
  data() {
    return {
      lists: [], //个人信息
      listsDepartment: [], //部门信息
      randcolor:[
            "rand1",
            "rand2",
            "rand3",
            "rand4",
          ],
    };
  },
  computed: {
    ...mapState('addressbkks',['navigationList','navigationListSiyid','defaultSiyid'])
  },
  mounted() {
    //发送请求获取数据 起始数据是死的
    console.log(this.navigationList)
    console.log(this.navigationListSiyid)
    const params1 = {
      id: this.defaultSiyid
    };
    addressList({ params: params1 }).then((res) => {
      //解密
      console.log(res);
      console.log(JSON.parse(utils.urlResonponse(res.data)).data);
      this.lists = JSON.parse(utils.urlResonponse(res.data)).data.userList;
      this.listsDepartment = JSON.parse(
        utils.urlResonponse(res.data)
      ).data.departList;
    });
  },
  methods: {
    ...mapMutations("addressbkks",["navigationListpush",'navigationListpop','navigationListSiyidpush','navigationListSiyidpop']),
    gotodetail(value) {
      this.$router.push({
        name: "Details",
        params: {
          sysId: value,
        },
      });
    },
    //去二级展示
    gotodetailLeval(value, name) {
      //发送请求
      //记录两个数组
      this.navigationList.push(name);
      this.navigationListSiyid.push(value);
      console.log(this.navigationList);
      console.log(this.navigationListSiyid);
      const params = {
        id: value,
      };
      addressList({ params: params }).then((res) => {
        //解密
        console.log(res);
        console.log(JSON.parse(utils.urlResonponse(res.data)).data);
        this.lists = JSON.parse(utils.urlResonponse(res.data)).data.userList;
        this.listsDepartment = JSON.parse(
          utils.urlResonponse(res.data)
        ).data.departList;
      });
    },
    gotoback() {
      //如果存在就返回上一级
      if (this.navigationList.length) {
        //删除数组的最后一个数据并请求上一级的数据
        this.navigationListpop();


        if (this.navigationListSiyid.length == 1) {
          this.navigationListSiyidpop();//删除最后一位
          const params1 = {
            id: "6d92eff4c1a04dcfb6582a8e63dd520b",
          };
          addressList({ params: params1 }).then((res) => {
            //解密
            console.log(res);
            console.log(JSON.parse(utils.urlResonponse(res.data)).data);
            this.lists = JSON.parse(
              utils.urlResonponse(res.data)
            ).data.userList;
            this.listsDepartment = JSON.parse(
              utils.urlResonponse(res.data)
            ).data.departList;
          });
        } else {
          let sayid = this.navigationListSiyid[
            this.navigationListSiyid.length - 2
          ];
          this.navigationListSiyidpop();
          const params = {
            id: sayid,
          };
          addressList({ params: params }).then((res) => {
            //解密
            console.log(res);
            console.log(JSON.parse(utils.urlResonponse(res.data)).data);
            this.lists = JSON.parse(
              utils.urlResonponse(res.data)
            ).data.userList;
            this.listsDepartment = JSON.parse(
              utils.urlResonponse(res.data)
            ).data.departList;
          });
        }
      }else{
        //如果不存在跳转路由回通讯录
        this.$router.push({
        path: "/phone",
      });
      }
    },
  },
};
</script>
<style lang="scss" scoped>


@import "../assets/sass/addressbook.scss";
</style>
<style lang="scss" scoped>
@import "../assets/sass/header.scss";
</style>
<style lang="scss" scoped>
.rand1{
  background: #5bc067 !important;
}
.rand2{
  background: #4496fd !important;
}
.rand3{
  background: #b46ccc !important;
}
.rand4{
  background: #fd8144 !important;
}
</style>
