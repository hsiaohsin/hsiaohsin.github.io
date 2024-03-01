<template>
    <div class="name">
        <a-row type="flex" justify="center" align="middle">
            <a-col :xs="24" :md="20" :lg="16" :xl="8">
                <a-card title="控制台"  :body-style="{paddingTop:'30px'}" >
                    <a-spin tip="选择中..." :spinning="selectLoading">
                        <a-row  type="flex" justify="center" align="middle">
                            <a-col >
                                <div style="margin-top: 5px">
                                    <a @click="editVisible = true"> <a-icon type="form" /> 数据 &nbsp;</a>
                                    <a class="no-select" @click="controlOpen = !controlOpen" > <a-icon type="setting" /> {{controlOpen?"关闭":"高级"}} &nbsp;</a>
                                    <a class="no-select" @click="helpVisible=true" style=" white-space:nowrap;"> <a-icon type="question-circle" /> 帮助</a>
                                </div>
                            </a-col>
                        </a-row>
                        <collapse style="margin-bottom: 30px;padding-bottom: 10px" :flag="controlOpen" :duration="0.3">
                            <control label="name" :items="items" ref="control" @change="controlChange"/>
                        </collapse>
                        <a-row style="margin-top: 10px;"  type="flex" justify="center">
                            <a-col  style="display: flex;justify-content:space-around;width: 100%;">
                                <a-button @click="clearHandle" size="large" >清空</a-button>
                                <a-button  v-if="!repeatCheck" @click="repeatSelect" size="large" >重选</a-button>
                                <a-button @click="selectHandle" size="large" type="danger">
                                    开始</a-button>
                            </a-col>
                        </a-row>
                    </a-spin>
                </a-card>
            </a-col>
        </a-row>
        <a-row type="flex" @dblclick.native="sizeFlag = !sizeFlag" class="no-select" justify="center">
            <a-col :xs="24" :md="23">
                <a-card style="margin-top: 10px;">
                    <a-empty description="暂无数据" v-if="items.length === 0"/>
                    <a-row style="padding: 10px -10px;text-align: center" v-else>
                        <div style="display: inline-block;" v-for="(item,index) in items" :key="index">
                            <a-button v-html="itemHandle(item)" style="margin: 10px 5px" v-if="selectIndex.includes(index)"
                                      type="primary" size="large"/>
                            <a-button v-html="itemHandle(item)" style="margin: 10px 5px" v-else-if="selectDisable.includes(index)"
                                      disabled size="large" />
                            <a-button v-html="itemHandle(item)" style="margin: 10px 5px;" v-else size="large"/>
                        </div>
                    </a-row>
                </a-card>
                <div style="text-align: right;color: #969696" v-show="items.length > 0">
                    共{{items.length}}人
                    <span v-if="!repeatCheck && selectDisable.length>0">
                    已选{{selectDisable.length}} 剩余{{items.length - selectDisable.length}}
                    </span>
                </div>
            </a-col>
        </a-row>
        <a-modal style="position: relative" :maskClosable="false" v-model="editVisible" title="录入数据" @cancel="handleCancel">
            <a-textarea ref="text" v-model="contentText" placeholder='输入名字，以顿号/逗号分隔，例如"张三，李四"'
                    :auto-size="{ minRows: 6, maxRows: 15 }" allowClear/>
            <div style="display: flex;justify-content: space-between">
                <div>
                    <a-upload  accept=".txt,.xlsx,.xls" :showUploadList="false" :customRequest="customRequest" name="file">
                        <a-button type="dashed" :loading="fileLoading" style="text-align: left;margin-top: 15px" icon="folder-open">从文件中导入</a-button>
                    </a-upload>
                </div>
                <div style="color: #969696" v-if="contentList.length > 0">{{contentList.length}}人</div>
                <div v-else><a @click="contentText=TEST_NAME">测试</a></div>
            </div>
            <template slot="footer">
                <a-button @click="handleCancel">取消</a-button>
                <a-button type="primary" @click="handleOk">确定</a-button>
            </template>
        </a-modal>
        <a-modal  v-model="helpVisible" title="帮助" >
            <help type="name"/>
            <template slot="footer">
                <a-button type="primary" @click="()=>{this.helpVisible=false}">确定</a-button>
            </template>
        </a-modal>
        <a-modal :maskClosable="false" v-model="fileDataVisible" title="选择" >
            <p>
                检测到当前文本域 <b>已存在列表</b>（下用列表) ，请选择接下来的操作
            </p>
            <ul>
                <li>取消：不对【列表】进行任何改变</li>
                <li>追加：将当前文件的内容合并到【列表】后</li>
                <li>覆盖：删除【列表】，然后写入当前文件的内容</li>
            </ul>
            <template slot="footer">
                <a-button key="back" @click="fileDataVisible=false">取消</a-button>
                <a-button key="append" type="primary" @click="handleAppend">追加</a-button>
                <a-button key="cover" type="primary" @click="handleCover">覆盖</a-button>
            </template>
        </a-modal>
    </div>
</template>

<script>
    import {isEmpty} from "@/unit/Check";
    import {windowMaxMin} from '../unit/BrowserUtils'
    import  {TEST_NAME} from "../unit/Constant"
    import ACol from "ant-design-vue/es/grid/Col";
    import ARow from "ant-design-vue/es/grid/Row";
    import Collapse from "../component/Collapse";
    import Help from "../component/Help"
    import Control from  "../component/Control"
    import XLSX from "xlsx"
    import jschardet from 'jschardet'
    // import XLSX from "xlsx/dist/xlsx.core.min"
    export default {
        name: "Name",
        components: {ARow, ACol, Collapse,Help,Control},
        data() {
            return {
                items: [], // 显示集合
                selectResult: [], // 选择的集合结果
                selectIndex: [], // 选择的索引
                selectDisable:[],// 已经选择的选项
                selectLoading: false, // 选择等待
                controlOpen: false, // 打开高级
                helpVisible: false, // 帮助对话框
                repeatCheck: true, // 是否重复选择
                sizeFlag:false, // true代表最大化，false正常
                editVisible:false, // 录入数据对话框
                fileDataVisible: false, // 文件数据对话框
                fileLoading:false,// 文件上传等待
                contentText: undefined, // 文本内容
                contentList: [],// 文本列表，后期使用Computer
                contentTextUpdateFlag:true, // 文本内容更新标识
                readList:[] ,// 读取的文件名字列表
                TEST_NAME
            }
        },
        watch:{
            editVisible(val){
                this.$nextTick(()=>{
                    if(val) this.$refs.text.focus() // 录入数据获取焦点
                })
            },
            contentText(val){
                this.contentTextUpdateFlag = false
                this.contentList = isEmpty(val)? [] : val.split(/[,、 ，\n]/).filter(i=>!isEmpty(i))
            },
            items(val){
                this.$local.set("name_items",val)
            },
            sizeFlag(val){
                windowMaxMin(val)
            }
        },
        created(){
            this.items = this.$local.get("name_items",[]) // 从本地读取
            this.contentList = [...this.items] // 浅拷贝
            this.contentText = this.contentList.join("，")
            this.selectIndex = this.$session.get("name_select_index",this.selectIndex)  // 从会话中读取
            this.selectDisable = this.$session.get("name_select_disable",this.selectDisable)
        },
        methods: {
            // 输出项处理
            // 为保持样式统一，即常见姓名字数(<=4)统一按照最低3个字的长度(48px)处理，字数>=4原样输出
            itemHandle(item){
                if(!isEmpty(item)){
                    // 如果字数等于四个字的姓名，就缩小字体填充
                    if(item.length === 4){
                        return `<span style="min-width: 48px;font-size: 0.75em">${item}</span>`
                    }
                }
                return `<span style="min-width: 48px">${item}</span>`
            },
            // 控制参数改变
            controlChange(data){
                this.repeatCheck = data.repeatCheck
                if(this.repeatCheck) this.selectDisable =[]
            },
            // 重选
            repeatSelect(){
                this.selectDisable = []
                this.selectIndex = []
                this.selectResult = []
            },
            // 取消
            handleCancel(){
                this.editVisible = false
                this.contentList = [...this.items]
                this.contentText = this.contentList.join("，")
            },
            // 确定
            handleOk(){
                this.editVisible = false
                this.items = [...this.contentList]
                this.contentText = this.contentList.join("，")

            },
            // 追加
            handleAppend() {
                this.contentList = this.contentList.concat(this.readList)
                this.contentText = this.contentList.join("，")
                this.fileDataVisible = false
            },
            // 覆盖
            handleCover() {
                this.contentList = this.readList
                this.contentText = this.contentList.join("，")
                this.fileDataVisible = false
            },
            // 文件上传
            customRequest(data) {
                const file = data.file
                let txtFlag = file.name.endsWith(".txt") // 判断是文本文件还是excel数据
                let excelFlag = file.name.endsWith(".xlsx") || file.name.endsWith(".xls")
                if (!txtFlag && !excelFlag) {
                    this.$message.warning('只能上传Excel文件或txt文本文件');
                    return
                }
                this.fileLoading = true
                if(txtFlag){ // 如果是文本文件需要判断编码格式
                    const preReader = new FileReader(); // 预读取
                    preReader.readAsBinaryString(file)
                    preReader.onload = e => {
                        let file_data = e.target.result
                        const encodingResult = jschardet.detect(file_data) // 判断文件编码格式
                        const reader = new FileReader();
                        reader.readAsText(file, encodingResult.encoding)
                        this.readData(reader,true)
                    }
                }else{
                    // 读取excel
                    const reader = new FileReader();
                    reader.readAsBinaryString(file) // 以二进制流读取
                    this.readData(reader,false)
                }
            },
            // 读取文件数据
            readData(reader,txtFlag){
                reader.onload = e => {
                    let file_data = e.target.result // 读取文件内容
                    if (isEmpty(file_data)) {
                        this.$message.error('文件内容为空');
                    } else {
                        // 文本和excel读取方式不一样
                        let readList = txtFlag ? this.readText(file_data):this.readExcel(file_data)
                        if(!isEmpty(readList)){
                            this.readList = readList
                            this.$message.success('上传成功');
                            if (this.contentList.length !== 0) {
                                this.fileDataVisible = true
                            } else {
                                this.handleCover()
                            }
                        }
                    }
                    this.fileLoading = false
                }
            },
            // 读取文本文件
            readText(file_data){
                return file_data.split(/[,、， \n]/).filter(i=>!isEmpty(i)).map(i=>i.replace(/\s/,""))
            },
            // 读取excel文件
            readExcel(file_data){
                const workbook = XLSX.read(file_data, {type: "binary"});  /* 以字符编码的方式解析*/
                let excel_data = XLSX.utils.sheet_to_json(workbook.Sheets[workbook.SheetNames[0]]) // 读取第一张工作表数据
                if(excel_data.length>0){
                    let names = excel_data.map(i=>i["姓名"]).filter(i=>!isEmpty(i)) // 读取姓名列
                    if(names.length == 0){ // 尝试去表头读取
                        let first_row = excel_data[0] // 获取第一行判断姓名所在key
                        for(let key in first_row){
                            if(first_row[key] == "姓名"){
                                names = excel_data.map(i=>i[key]).filter(i=> i!="姓名" && !isEmpty(i))
                                break
                            }
                        }
                    }
                    if(names.length == 0) {
                        this.$message.error('【姓名】列不存在');
                    }
                    return names
                }else{
                    this.$message.error('excel数据为空');
                }
            },
            // 清空内容
            clearHandle(){
                this.$confirm({
                    title: '清空',
                    content: '你确认要清空下列选项数据吗？',
                    okText: '确认',
                    cancelText: '取消',
                    onOk: async () => {
                        return await new Promise(resolve => {
                            setTimeout(() => {
                                this.items = []
                                this.contentText = undefined
                                this.selectIndex = []
                                this.selectResult = []
                                this.$message.success('已清空');
                                resolve()
                            }, 1000);
                        });
                    },
                });
            },
            // 选择内容
            selectHandle(){
                if(this.items.length === 0){
                    this.$message.error('请录入数据后再开始');
                    return;
                }
                this.$refs.control.selectHandle(this) // 调用随机选择方法
            }
        }
    }
</script>

<style scoped>

</style>
