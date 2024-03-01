<template>
    <div>
        <div id="footer-switch">
            ©2022
            <span  v-if="this.$route.path === '/'">数字版</span>
            <router-link  v-else :to="{path:'/'}">数字版</router-link>
            /
            <span  v-if="this.$route.path === '/name'">姓名版</span>
            <router-link  v-else :to="{path:'/name'}">姓名版</router-link>
        </div>
        <div id="footer-other">
          <span>
            <!--备案/许可证号:--><a href="https://beian.miit.gov.cn" target="_blank">
            皖ICP备 19019264号-1</a> |
          </span>
            <span>
              <img src="https://www.iaisx.xyz/image/gongan.png" target="_blank"><!--皖公安网备:-->
            <a href="http://www.beian.gov.cn/portal/registerSystemInfo?recordcode=34040302000302" target="_blank">
              34040302000302号</a> |
           </span>
            <span>
            <router-link :to="{path:'/about'}"  > 开发者 </router-link>
          </span> |
            <span>
            版本号:<router-link :to="{path:'/version'}"  > V3.3 </router-link>
          </span>
        </div>
    </div>

</template>

<script>
    export default {
        name: "MyFooter",
        data() {
            return {}
        }
    }
</script>

<style scoped>
    #footer-switch{
        padding-bottom: 5px
    }
</style>
