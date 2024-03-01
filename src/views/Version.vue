<template>
    <div style="height: 100%;background-color: white" class="version">
        <a-page-header style="border: 1px solid rgb(235, 237, 240)" title="控制台" @back="backHandle"/>
        <a-row type="flex" justify="center" style="padding:10px;padding-top: 20px;" >
            <a-col :md="24" :lg="16"  >
                <h1 class="title">更新日志</h1>
                <div class="section">
                    <div class="label">功能</div>
                    <div class="explain">
                        <h3>【2021.10】<b>1.0：</b>使用<a target="_blank" :href="VUE_CLI_ADDRESS">Vue-Cli</a>构建项目，推出数字版；</h3>
                        <h3>【2021.10】<b>1.1：</b>推出姓名版；姓名版支持上传UTF-8的文本文件；IE浏览器使用警告；</h3>
                        <h3>【2021.10】<b>1.2：</b>删除去重、排序功能；支持自定义重复选择功能；</h3>
                        <h3>【2021.10】<b>1.3：</b>网站去自我化；标题改为"随机点名"；底部开发者删除姓名；删除页面进入提示。</h3>
                    </div>
                </div>
                <hr>
                <div class="section">
                    <div class="label">体积</div>
                    <div class="explain">
                        <h3>【2022.01】<b>2.0：</b>引入<a target="_blank" :href="WEBPACK_BUNDLE_ANALYZER">webpack-bundle-analyzer</a>进行体积分析；</h3>
                        <h3>【2022.01】<b>2.1：</b><a target="_blank" :href="ANT_DESIGN_VUE_ADDRESS">Ant Design Vue</a>配置按需引入；</h3>
                        <h3>【2022.01】<b>2.2：</b>删除<a target="_blank" :href="VUEX_ADDRESS" >vuex</a>模块；
                            减少<a target="_blank" :href="MOMENT_ADDRESS" >moment</a>体积，只保留中文；
                            代码公开上传至Gitee
                            <a target="_blank" :href="GITEE_CODE_ADDRESS"><a-icon type="link"  /></a>；
                        </h3>
                        <h3>【2022.01】<b>2.3：</b>Icon图标按需引入；开启Gzip压缩。</h3>
                    </div>
                </div>
                <hr>
                <div class="section">
                    <div class="label">优化</div>
                    <div class="explain">
                        <h3>【2022.01】<b>3.0：</b>引入<a target="_blank" :href="XLSX_ADDRESS">XLSX</a>支持导入Excel姓名列；</h3>
                        <h3>【2022.01】<b>3.1：</b>引入<a target="_blank" :href="JSCHARDET_ADDRESS">jschardet</a>自动判断文本文件编码，不要求必须UTF-8；
                        增加<a>Version</a>版本介绍页面；</h3>
                        <h3>【2022.01】<b>3.2：</b>新增双击数据选项区域可以全屏，再次双击退出全屏功能；
                            安装<a target="_blank" :href="BAIDU_SSL">SSL</a>证书，实现HTTPS安全访问；</h3>
                        <h3 >【2022.08】<b>3.3：</b>新增查看<a @click="history.open()">历史选择记录</a>功能，
                            可通过高级设置或按快捷键<a>Ctrl+H</a>打开历史选择记录。</h3>
                    </div>
                </div>
            </a-col>
        </a-row>

    </div>
</template>

<script>
    import  {GITEE_CODE_ADDRESS,ANT_DESIGN_VUE_ADDRESS,
        MOMENT_ADDRESS,VUEX_ADDRESS,VUE_CLI_ADDRESS,
        GITEE_MY_ADDRESS,XLSX_ADDRESS,JSCHARDET_ADDRESS} from "../unit/Constant"
    const BAIDU_SSL = "https://baike.baidu.com/item/ssl/320778"
    const WEBPACK_BUNDLE_ANALYZER = "https://github.com/webpack-contrib/webpack-bundle-analyzer"
    import history from "../store/history"
    export default {
        name: "Version",
        data() {
            return {
                GITEE_CODE_ADDRESS,
                ANT_DESIGN_VUE_ADDRESS,
                MOMENT_ADDRESS,
                VUEX_ADDRESS,
                VUE_CLI_ADDRESS,
                GITEE_MY_ADDRESS,
                XLSX_ADDRESS,
                JSCHARDET_ADDRESS,
                BAIDU_SSL,
                WEBPACK_BUNDLE_ANALYZER,
                history
            }
        },
        methods: {
            backHandle(){
                this.$router.push('/')
            }
        },
    }
</script>

<style scoped>
    .title{
        font-size: 1.5rem;
        text-align: left;
    }
    .section>.label{
        font-size: 1.3rem;
        text-align: left;
        padding-left: 2rem;
        margin-bottom: 5px;
    }
    .section>.explain{
        text-align: left;
        padding-left: 4rem
    }
</style>
