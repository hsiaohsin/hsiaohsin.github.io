<!--
  历史记录组件
-->
<template>
    <div>
        <a-modal wrapClassName="full-modal" v-model="history.show" title="历史选择记录" >
                <p style="flex: 1">
                    <a-empty description="暂无数据" v-if="history.records.length == 0" />
                    <!--<a  style="font-size: 1.2em" :key="index" v-for="(item,index) in history.records">
                        <span >{{item}}</span>
                        <span v-if="index<history.records.length-1" style="color: black"> | </span>
                    </a>-->
                    <a-button class="history-record-button" :key="index" v-for="(item,index) in history.records" disabled>
                        {{item}}
                    </a-button>
                </p>
                <div style="text-align: right;color: rgba(0,0,0,.6);font-size: 0.9em;">
                    提示：最多保存50条记录
                </div>
            <template slot="footer">
                <a-button key="clear" :disabled = "history.records.length == 0" @click="clearHandle">清空</a-button>
                <a-button key="enter" type="primary" @click="history.close()">关闭</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
    import history from "../store/history"
    export default {
        name: "History",
        data() {
            return {
                history
            }
        },
        created(){
            // Ctrl+H也可以打开历史记录
            document.documentElement.addEventListener('keydown',e=>{
                e = e || window.event || arguments.callee.caller.arguments[0]
                if(e){
                    if( e.ctrlKey && e.key.toUpperCase() === "H"){
                        e.preventDefault() // 抑制浏览器本身的行为
                        history.open()
                    }
                }
            })
        },
        methods:{
            clearHandle(){
                this.$confirm({
                    title: '清空',
                    content: '你确认要清空所有选择历史选择记录吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                        return await new Promise(resolve => {
                            setTimeout(() => {
                                history.clear()
                                this.$message.success('历史选择记录已清空');
                                resolve()
                            }, 1000);
                        });
                    },
                });
            }
        }
    }
</script>

<style   lang="less">
    .full-modal {
        .ant-modal-body {
            max-height: 50vh;
            overflow-y: auto;
            padding-bottom: 12px;
            min-height: 32vh;
            display: flex;
            flex-direction: column;
        }
    }
    .history-record-button{
        margin: 3px;
        color: black !important;
        cursor: pointer !important;
    }
    .history-record-button:hover{
        /*border-color: #1890ff !important;*/
        box-shadow: 0 0 1px 1px  #d9d9d9 !important;
    }
</style>
