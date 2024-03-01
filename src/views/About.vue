<template>
  <div style="height: 100%;background-color: white" class="about">
    <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="控制台" @back="backHandle"/>
    <a-row type="flex" justify="center" style="padding-top: 20px;" >
      <a-col  :md="24" :lg="16"  >
          <h1 style="font-size: 1.5rem">关于开发者</h1>
          <p style="font-weight: bold">你好，我叫王凤龙，现在是一名教高中信息的的人民教师 <span style="color: red"> <a-icon theme="filled" type="star"/></span></p>
          <p><b>个人爱好</b>：下棋、文学小说、王者荣耀【星耀】等</p>
          <p><b>所在地址</b>：安徽宿州</p>
          <p><b>出生日期</b>：2000-06</p>
          <p><b>联系方式</b>：<a href="tel://17355476130">17355476130</a></p>
          <p><b>微 信 号</b>：<a>i-aisx</a></p>
          <p><b>QQ邮箱</b>：<a href="http://wpa.qq.com/msgrd?v=3&uin=2430684870&site=qq&menu=yes" >2430684870</a>@qq.com</p>
          <p><b>我  的</b>：<a :href="CSDN_ADDRESS" target="_blank">CSDN </a> |
            <!--<a :href="ZHIHU_ADDRESS" target="_blank">知乎 </a> |-->
            <a :href="GITEE_MY_ADDRESS" target="_blank">Gitee </a>
          </p>
          <p><b>人生格言</b>：<span style="font-family: 黑体">路漫漫其修远兮，吾将上下而求索</span></p>
      </a-col>
      <a-col style="margin-bottom:15px ;" :span="24" >
          <img  width="150vh" alt="wfl" src="@/assets/weixin.jpg">
          <div>你的激励是我最大的动力</div>
      </a-col>
        <p style="font-size: 0.8rem"><b>声明</b>：本网站及源代码已取得
            <a href="https://www.iaisx.xyz/image/right.jpg">软件著作权</a>,
            未经本人允许禁止商用</p>
    </a-row>

  </div>
</template>
<script>
    import  {GITEE_MY_ADDRESS,ZHIHU_ADDRESS,CSDN_ADDRESS} from "../unit/Constant"
  export default {
    data() {
      return {
          GITEE_MY_ADDRESS,
          ZHIHU_ADDRESS,
          CSDN_ADDRESS
      };
    },
    created(){
        // 只出现一次
        // if(!sessionStorage.getItem("notify_flag")){
        //     this.$notification.open({
        //         message: '欢迎你',
        //         description:WELCOME,
        //         duration:4,
        //         placement:'bottomRight',
        //         icon: <a-icon type="smile" style="color: red" />
        // })
        //     sessionStorage.setItem("notify_flag","1")
        // }
    },
    methods: {
      backHandle(){
        this.$router.push('/')
      }
    },
  };
</script>
<style></style>
