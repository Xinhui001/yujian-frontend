<template>
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field
          v-model="userAccount"
          name="userAccount"
          label="账户"
          placeholder="账户"
          :rules="[{ required: true, message: '请填写账户' }]"
      />
      <van-field
          v-model="userPassword"
          type="password"
          name="userPassword"
          label="密码"
          placeholder="密码"
          :rules="[{ required: true, message: '请填写密码' }]"
      />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        登录
      </van-button>
    </div>
    <div style="margin: 16px;">
      <van-button round block type="primary" @click="doRegister">
        注册
      </van-button>
    </div>
  </van-form>
</template>
<script setup lang="ts">

import {useRoute, useRouter} from "vue-router";
import {ref} from "vue";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const route = useRoute();

const userAccount = ref('');
const userPassword = ref('');

const doRegister = () =>{
  router.push({
    path: "/user/register"
  })
}


const onSubmit = async () => {
  const res = await myAxios.post('/user/login',{
    userAccount: userAccount.value,
    userPassword: userPassword.value,
  })
  console.log(res,'用户登录');
  if (res.code == 0 && res.data){
    showSuccessToast('登录成功');
    // await router.replace('/');
    //跳转之前的页面
    window.location.href = route.query?.redirect as string ?? '/';
  } else {
    showFailToast('登录失败')
  }
};

</script>

<style scoped>

</style>