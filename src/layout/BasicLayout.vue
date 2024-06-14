<script setup lang="ts">
import {ref} from 'vue';
import {showToast} from 'vant';
import {useRouter} from "vue-router";
import routes from "../config/route.ts";

const DEFAULT_TITLE = '遇见';
const title = ref(DEFAULT_TITLE);
const router = useRouter();

//根据页面切换标题
router.beforeEach((to,from) => {
  const toPath = to.path;
  const route = routes.find((route) => {
    return toPath === route.path;
  })
  title.value = route?.title ?? DEFAULT_TITLE;
})



const onClickLeft = () => {
  router.back();
};
const onClickRight = () => {
  router.push('/search');
};

// const active = ref("index");
const onChange = (index) => showToast(`标签 ${index}`);

showToast('提示内容');

</script>

<template>
  <van-nav-bar
      :title="title"
      left-arrow
      @click-left="onClickLeft"
      @click-right="onClickRight"
  >
    <template #right>
      <van-icon name="search" size="18"/>
    </template>
  </van-nav-bar>

  <div id="content">
    <router-view/>
  </div>

  <van-tabbar route @change="onChange">
    <van-tabbar-item to="/" icon="home-o" name="index">主页</van-tabbar-item>
    <van-tabbar-item to="/team" icon="search" name="team">队伍</van-tabbar-item>
    <van-tabbar-item to="/user" icon="friends-o" name="user">个人</van-tabbar-item>
  </van-tabbar>

</template>

<style scoped>
#content {
  padding-bottom: 50px;
}
</style>