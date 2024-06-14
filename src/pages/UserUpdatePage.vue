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
  const router = useRouter();

  onMounted(async () =>{
    const res = await myAxios.get('/user/current');
    if (res.code === 0){
      user.value = res.data;
      showSuccessToast('获取用户信息成功');
    } else {
      showFailToast('获取用户信息失败')
    }
  })
  const toEdit = (editKey: string,editName: string,currentValue: string) =>{
    router.push({
      path: '/user/edit',
      query:{
        editKey,
        editName,
        currentValue,
      }
    })
  }
</script>

<template>
  <template v-if="user">
    <van-cell title="昵称" is-link to="/user/edit" :value="user.username" @click="toEdit('username','昵称',user.username)"/>
    <van-cell title="账户" :value="user.userAccount" />
    <van-cell title="头像" is-link to="/user/edit" >
      <img style="height: 48px" :src="user.avatarUrl" alt="">
    </van-cell>
    <van-cell title="性别" is-link to="/user/edit" :value="user.gender" @click="toEdit('gender','性别',user.gender)"/>
    <van-cell title="电话" is-link to="/user/edit" :value="user.phone" @click="toEdit('phone','电话',user.phone)"/>
    <van-cell title="邮箱" is-link to="/user/edit" :value="user.email" @click="toEdit('email','邮箱',user.email)"/>
  </template>
</template>

<style scoped>

</style>