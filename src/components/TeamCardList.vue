<template>
  <div
      id="teamCardList"
  >
    <van-card
        v-for="team in props.teamList"
        :desc="team.description"
        thumb="https://ts1.cn.mm.bing.net/th?id=OIP-C.UBjdZXtfGC3VrnzyT8wTcQHaHa&w=176&h=185&c=8&rs=1&qlt=90&o=6&dpr=1.5&pid=3.1&rm=2"
        :title="`${team.name} `"
    >
      <template #tags>
        <van-tag plain type="danger" style="margin-right: 8px; margin-top: 8px" >
          {{
            teamStatusEnum[team.status]
          }}
        </van-tag>
      </template>
      <template #bottom>
        <div>
          {{'最大人数' + team.maxNum}}
        </div>
        <div>
          {{'过期时间' + team.expireTime}}
        </div>
        <div>
          {{'创建时间' + team.createTime}}
        </div>
      </template>
      <template #footer>
        <van-button size="mini" plain type="primary" @click="doJoinTeam(team.id)">加入队伍</van-button>
        <van-button size="mini" plain type="primary"
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <van-button size="mini" plain type="primary"
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button size="mini" plain type="primary"
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
      </template>
    </van-card>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {ref} from "vue";


const router = useRouter();

const currentUser = ref();


interface TeamCardListProps{
  loading: boolean;
  teamList: TeamType[];
}
const props = withDefaults(defineProps<TeamCardListProps>(),{
  //@ts-ignore
  teamList: [] as TeamType[],
});

//队伍列表加入队伍
const doJoinTeam = async(id: number) =>{
  const res = await myAxios.post("/team/join",{
    teamId : id
  });
  if (res?.code === 0){
    showSuccessToast("加入成功")
  }else {
    showFailToast("加入失败");
  }
}


const doQuitTeam = async(id: number) =>{
  const res = await myAxios.post("/team/quit",{
    teamId : id
  });
  if (res?.code === 0){
    showSuccessToast("退出成功")
  }else {
    showFailToast("退出失败");
  }
}


const doDeleteTeam = async(id: number) =>{
  const res = await myAxios.post("/team/delete",{
    id
  });
  if (res?.code === 0){
    showSuccessToast("解散成功")
  }else {
    showFailToast("解散失败");
  }
}

const doUpdateTeam = (id: number) => {
  router.push({
    path: '/team/update',
    query: {
      id,
    }
  })
}






</script>

<style scoped>
#teamCardList :deep(.van-image__img){
  //height: 128px;
  //object-fit: unset;
}
</style>