<script setup lang="ts">

import {useRouter} from "vue-router";
import TeamCardList from "../components/TeamCardList.vue";
import {onMounted, ref} from "vue";
import myAxios from "../plugins/myAxios.ts";
import {showFailToast, showSuccessToast} from "vant";

const router = useRouter();
const doJoinTeam = () =>{
  router.push({
    path: "/team/add"
  })
}

const teamList = ref([]);
//页面加载时触发一次 查询队伍
onMounted(async () =>{
  const res = await myAxios.get("/team/list");
  if (res?.code === 0) {
    teamList.value = res.data;
    showSuccessToast("队伍查询成功");
  }else {
    showFailToast("加载队伍失败");
  }
})
</script>

<template>
  <div id="teamPage">
    <van-button type="primary" @click="doJoinTeam" >创建队伍</van-button>
    <team-card-list :teamList="teamList"/>
  </div>
</template>

<style scoped>

</style>