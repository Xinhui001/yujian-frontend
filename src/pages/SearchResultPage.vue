<script setup>
import {onMounted, ref} from "vue";
import {useRoute} from "vue-router";
import myAxios from "../plugins/myAxios";
import {Toast} from "vant";

const route = useRoute();
const {tags} = route.query;

onMounted(() =>{
  // 为给定 ID 的 user 创建请求
  myAxios.get('/user/search/tags',{
    params: {
      tagNameList: tags
    }
  })
      .then(function (response) {
        console.log('/user/search/tags successed',response);
        Toast.success('请求成功');
      })
      .catch(function (error) {
        console.log('/user/search/tags failed',error);
        Toast.fail('请求失败');
      });

})

const mockUser = ref(
    {
      id : 1235656,
      username : 'jxh254',
      userAccount : '22321222',
      avatarUrl : 'https://ts1.cn.mm.bing.net/th?id=OIP-C.UBjdZXtfGC3VrnzyT8wTcQHaHa&w=176&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2',
      gender : '男',
      phone : '1111111',
      email : '2231113@qq.com',
      profile : '啊吧啊吧啊吧啊吧',
      userRole : 0,
      tags: ['java','emo','打工仔','恋爱中'],
      createTime : new Date(),
    }
)

const userList = ref({mockUser})
</script>

<template>
  <van-card
      v-for="user in userList"
      :desc="user.profile"
      :title="user.username"
      :thumb="user.avatarUrl"
  >
    <template #tags>
      <van-tag plain type="danger" v-for="tag in tags" style="margin-right: 8px;margin-top: 8px">
        {{tag}}
      </van-tag>
    </template>
    <template #footer>
      <van-button size="mini">联系我</van-button>
    </template>
  </van-card>

</template>

<style scoped>

</style>