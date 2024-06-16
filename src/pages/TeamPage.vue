<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";



const active = ref('public')
const router = useRouter();
const searchText = ref('');

/**
 * 切换查询状态
 * @param name
 */
const onTabChange = (name) => {
  // 查公开
  if (name === 'public') {
    listTeam(searchText.value, 0);
  } else {
    // 查加密
    listTeam(searchText.value, 2);
  }
}

const doJoinTeam = () =>{
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);

//队伍搜索方法
const listTeam = async (val = '', status = 0) => {
  const res = await myAxios.get("/team/list", {
    params: {
      searchText: val,
      pageNum: 1,
      status,
    },
  });
  if (res?.code === 0) {
    showSuccessToast('加载成功');
    teamList.value = res.data;
  } else {
    showFailToast('加载队伍失败，请刷新重试');
  }
}

//页面加载时触发一次 查询队伍
onMounted( () =>{
  listTeam();
})

//搜索
const onSearch = (val) => {
  listTeam(val)
}



</script>

<template>
  <div id="teamPage">
    <van-search v-model="searchText" placeholder="搜索队伍" @search="onSearch" />
    <van-tabs v-model:active="active" @change="onTabChange">
      <van-tab title="公开" name="public" />
      <van-tab title="加密" name="private" />
    </van-tabs>
    <div style="margin-bottom: 16px" />
    <van-button type="primary" @click="doJoinTeam" >创建队伍</van-button>
    <team-card-list :teamList="teamList" loading/>
    <van-empty v-if="teamList?.length < 1" description="数据为空"/>
  </div>
</template>

<style scoped>

</style>