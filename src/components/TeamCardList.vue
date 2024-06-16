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
          {{`队伍人数: ${team.hasJoinNum}/${team.maxNum}` }}
        </div>
        <div>
          {{'过期时间：' + team.expireTime}}
        </div>
        <div>
          {{'创建时间：' + team.createTime}}
        </div>
      </template>
      <template #footer>
        <van-button size="mini" type="primary" v-if="team.userId !== currentUser?.id && !team.hasJoin" plain
                    @click="preJoinTeam(team)">
          加入队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini" plain type="primary"
                    @click="doUpdateTeam(team.id)">更新队伍
        </van-button>
        <van-button v-if="team.userId !== currentUser?.id && team.hasJoin" size="mini" plain type="primary"
                    @click="doQuitTeam(team.id)">退出队伍
        </van-button>
        <van-button v-if="team.userId === currentUser?.id" size="mini" plain type="primary"
                    @click="doDeleteTeam(team.id)">解散队伍
        </van-button>
      </template>
    </van-card>
    <van-dialog v-model:show="showPasswordDialog" title="请输入密码" show-cancel-button @confirm="doJoinTeam" @cancel="doJoinCancel">
      <van-field v-model="password" placeholder="请输入密码"/>
    </van-dialog>
  </div>
</template>

<script setup lang="ts">
import {TeamType} from "../models/team";
import {teamStatusEnum} from "../constants/team";
import myAxios from "../plugins/myAxios";
import {showFailToast, showSuccessToast} from "vant";
import {useRouter} from "vue-router";
import {onMounted, ref} from "vue";
import {getCurrentUser} from "../services/user.ts";


const router = useRouter();

const showPasswordDialog = ref(false);
const password = ref('');
const joinTeamId = ref(0);
const currentUser = ref();


onMounted(async () => {
  currentUser.value = await getCurrentUser();
})

const preJoinTeam = (team: TeamType) => {
  joinTeamId.value = team.id;
  if (team.status === 0) {
    doJoinTeam();
  } else {
    showPasswordDialog.value = true;
  }
}

const doJoinCancel = () => {
  joinTeamId.value = 0;
  password.value = '';
}


interface TeamCardListProps{
  loading: boolean;
  teamList: TeamType[];
}
const props = withDefaults(defineProps<TeamCardListProps>(),{
  //@ts-ignore
  teamList: [] as TeamType[],
});

//队伍列表加入队伍
// const doJoinTeam = async(id: number) =>{
//   const res = await myAxios.post("/team/join",{
//     teamId : id
//   });
//   if (res?.code === 0){
//     showSuccessToast("加入成功")
//   }else {
//     showFailToast("加入失败");
//   }
// }
/**
 * 加入队伍
 */
const doJoinTeam = async () => {
  if (!joinTeamId.value) {
    return;
  }
  const res = await myAxios.post('/team/join', {
    teamId: joinTeamId.value,
    password: password.value
  });
  if (res?.code === 0) {
    showSuccessToast('加入成功');
    doJoinCancel();
  } else {
    showFailToast('加入失败');
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