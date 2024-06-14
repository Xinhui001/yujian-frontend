<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="user.username"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in tags" style="margin-right: 8px; margin-top: 8px" >
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>
  <van-empty v-if="!userList || userList.length < 1" description="Loading..." />
</template>

<script setup >
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import {showFailToast, showSuccessToast} from "vant";

import myAxios from "../plugins/myAxios.ts";

import qs from 'qs'

const route = useRoute();
const {tags} = route.query;

const mockUser = ref({
  id: 931,
  username: '11111',
  userAccount: '111',
  profile: 'abababa',
  gender: 0,
  phone: '123456789101',
  email: '1212212@qq.com',
  avatarUrl: 'https://ts1.cn.mm.bing.net/th?id=OIP-C.UBjdZXtfGC3VrnzyT8wTcQHaHa&w=176&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
  tags: ['java', 'emo', '打工中', 'emo', '打工中'],
  createTime: new Date(),
})

const userList = ref([]);


onMounted( async () =>{
  // 为给定 ID 的 user 创建请求
  const userListData = await  myAxios.get('/user/recommend',{
    withCredentials: true,
    params: {
      // tagNameList: tags
      pageSize: 8,
      pageNum: 1,
    },

  })
      .then(function (response) {
        console.log('/user/recommend succeed',response);
        showSuccessToast('请求成功');
        return response?.data?.records;
      })
      .catch(function (error) {
        console.log('/user/recommend error',error);
        showFailToast('请求失败');
      });
  if (userListData){
    userListData.forEach(user =>{
      if (user.tags){
        // user.tags = JSON.parse(user.tags);
        try {
          user.tags = JSON.parse(user.tags);
        } catch (error) {
          console.error('Parsing error for user.tags:', error);
          // 可以选择设置默认值或者跳过这个用户的tags
          user.tags = [];
        }
      }
    })
    userList.value = userListData;
  }
})



</script>

<style scoped>

</style>