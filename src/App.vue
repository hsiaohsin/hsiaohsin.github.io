<template>
  <div id="app" >
    <a-back-top />
    <a-layout >
      <a-layout-content id="main" >
        <keep-alive>
          <router-view/>
        </keep-alive>
      </a-layout-content>
      <a-layout-footer id="footer">
        <my-footer/>
      </a-layout-footer>
    </a-layout>
    <history/>
  </div>
</template>

<script>
  import {isIE} from './unit/BrowserUtils'
  import History from  "./component/History"
  import MyFooter from "./component/MyFooter"
  export default {
    name: 'App',
    components: {History,MyFooter},
    data:function() {
      return {

      }
    },
    created(){
      // 直接排除IE浏览器
      if(isIE()){
          confirm("为了更好的使用体验，请不要使用已经被时代抛弃的IE浏览器")
         window.opener=null
         // window.open('','_self')
         window.close();
      }
    },
  }

</script>
<style lang="less">

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background-color: #f0f2f5 ;
  min-height: 100vh;
  display:flex;
}
#main{
  flex:1
}
#footer{
  color: #969696;
  text-align: center;
  padding-top: 10px;
  padding-bottom: 15px
}
</style>
