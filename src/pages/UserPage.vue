<script setup lang="ts">
  import {useRouter} from "vue-router";
  import {onMounted, ref} from "vue";
  import myAxios from "../plugins/myAxios.ts";
  import {showFailToast, showSuccessToast} from "vant";

  // const user = {
  //   id : 123,
  //   username : 'jxh',
  //   userAccount : '22321',
  //   avatarUrl : 'https://ts1.cn.mm.bing.net/th?id=OIP-C.UBjdZXtfGC3VrnzyT8wTcQHaHa&w=176&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
  //   gender : '男',
  //   phone : '1111111',
  //   email : '2231113@qq.com',
  //   createTime : new Date(),
  // }

  const user =ref();

  onMounted(async () =>{
    const res = await myAxios.get('/user/current');
    if (res.code === 0){
      user.value = res.data;
      showSuccessToast('获取用户信息成功');
    } else {
      showFailToast('获取用户信息失败')
    }
  })
</script>

<template>
  <template v-if="user">
    <van-cell title="昵称" :value="user.username"/>
    <van-cell title="账户" :value="user.userAccount" />
    <van-cell title="头像" >
      <img style="height: 48px" :src="user.avatarUrl" alt="">
    </van-cell>
    <van-cell title="修改信息" is-link to="/user/update"/>
    <van-cell title="我创建的队伍" is-link to="/team/create"/>
    <van-cell title="我加入的队伍" is-link to="/team/join"/>
  </template>
</template>

<style scoped>

</style>