<template>
  <div  class="home">
    <a-row  type="flex" align="middle" justify="center">
      <a-col :xs="24" :md="20" :lg="16"  :xl="8">
        <a-card title="控制台"  >
          <a-spin tip="选择中..." :spinning="selectLoading">
          <a-row type="flex" align="middle">
            <a-col :xs="6" :xl="5" :xxl="4">数字范围：</a-col>
            <a-col :xs="18" :xl="19" :xxl="20">
              <a-input  ref="text" v-model="num" @pressEnter="textParse" allow-clear size="large" placeholder="请输入数字范围" >
                <a-icon slot="prefix" type="edit" />
              </a-input>
            </a-col>
          </a-row>
          <a-row>
            <a-col :span="20" :offset="4">
              <div  style="text-align: left;margin-top: 5px">
                可以输入<b>数字、逗号和减号</b>&nbsp;&nbsp;
                <a class="no-select" @click="controlOpen = !controlOpen"> <a-icon type="setting" /> {{controlOpen?"关闭":"高级"}} &nbsp;</a>
                <a class="no-select" @click="helpVisible=true" style="white-space:nowrap;"> <a-icon type="question-circle" /> 帮助</a>
              </div>
            </a-col>
          </a-row>
          <collapse style="padding-bottom: 10px" :flag="controlOpen" :duration="0.3">
            <control  label="num" :items="items" ref="control" @change="controlChange"/>
          </collapse>
          <a-row style="margin-top: 20px;"  type="flex" justify="center">
            <a-col  style="display: flex;justify-content:space-around;width: 100%;">
              <a-button @click="textParse" size="large" type="primary" >确定</a-button>
              <a-button @click="clearHandle" size="large">清空</a-button>
              <a-button v-if="!repeatCheck" @click="repeatSelect" size="large" >重选</a-button>
              <a-button @click="selectHandle" size="large" type="danger">
                开始</a-button>
            </a-col>
          </a-row>
          </a-spin>
        </a-card>
      </a-col>
    </a-row>
    <a-row @dblclick.native="sizeFlag = !sizeFlag" class="no-select" type="flex" justify="center" >
      <a-col :xs="24" :md="23">
        <a-card style="margin-top: 10px;">
          <a-empty description="暂无数据" v-if="items.length === 0" />
          <a-row v-else :gutter="[0,16]">
            <a-col v-for="(item,index) in items" :key="index" :xs="4" :sm="3" :md="2" :xxl="1" >
              <a-button v-if="selectIndex.includes(index)" type="primary" size="large" >{{item}}</a-button>
              <a-button v-else-if="selectDisable.includes(index)" disabled size="large" >{{item}}</a-button>
              <a-button v-else  size="large" >{{item}}</a-button>
            </a-col>
          </a-row>
        </a-card>
        <div style="text-align: right;color: #969696" v-show="items.length > 0">
          共{{items.length}}个
          <span v-if="!repeatCheck && selectDisable.length>0">
            已选{{selectDisable.length}} 剩余{{items.length - selectDisable.length}}
          </span>
        </div>
      </a-col>
    </a-row>
    <a-modal  v-model="helpVisible" title="帮助" >
      <help type="num"/>
      <template slot="footer">
        <a-button type="primary" @click="()=>{this.helpVisible=false}">确定</a-button>
      </template>
    </a-modal>
  </div>
</template>


<script>


import  {range,rangeStr} from "../unit/Number"
import  {isEmpty} from "../unit/Check"
import {windowMaxMin} from '../unit/BrowserUtils'
import ACol from "ant-design-vue/es/grid/Col";
import ARow from "ant-design-vue/es/grid/Row";
import Collapse from "../component/Collapse";
import Help from "../component/Help"
import Control from  "../component/Control"
export default {
  name: 'Home',
  components: {Control, ARow, ACol, Collapse,Help},
  data:function() {
    return {
        items: range(1,50), // 显示集合
        num:"50", // 文本框内容
        selectResult:[], // 选择的集合结果
        selectIndex:[], // 选择的索引,
        selectDisable:[],// 已经选择的选项
        selectLoading:false, // 选择等待
        controlOpen:false, // 打开高级
        helpVisible:false, // 帮助对话框
        updateFlag:false, // 更新flag，用于用户跳过【确定】直接【开始】的情况
        repeatCheck:true, // 是否重复选择,
        sizeFlag:false // true代表最大化，false正常
    };
  },
  watch:{
    num(val) {
      if(!isEmpty(val)){
        let matchResult = [...val.toString().matchAll(/[\D]*(\d+)\D*/g)]
        if(matchResult.some(i=>parseInt(i)>1000)){ // 有一个超过1000就提示
          this.$message.warning('不推荐输入超过1000的数字');
        }
      }
      this.updateFlag = true
    },
    sizeFlag(val){
        windowMaxMin(val)
    }
  },
  created(){
    this.num = this.$local.get("num",this.num) // 从本地读取
    this.items = this.$local.get("num_items",this.items)
    this.selectIndex = this.$session.get("num_select_index",this.selectIndex)  // 从会话中读取
    this.selectDisable = this.$session.get("num_select_disable",this.selectDisable)
  },
  methods:{
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
    // 校验num
    numCheck(){
      if(isEmpty(this.num)){
        this.$message.error('请输入范围并单击确定后再开始');
      }else if(!(/^[\d-,，a-zA-z]+$/.test(this.num))){
        this.$message.error('只能输入数字、逗号和减号'); //隐藏输入字母
      }else {
        return true
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
                  this.num = undefined
                  this.items = []
                  this.$local.set("num",this.num)
                  this.$local.set("num_items",this.items)
                  this.selectIndex = []
                  this.selectResult = []
                  this.selectDisable = []
                  this.$refs.text.focus()
                  this.$message.success('已清空');
                  resolve()
                }, 1000);
              });
            },
        });
    },
    // 选择内容
    selectHandle(){
      if(!this.numCheck()){
        return;
      }else if(this.updateFlag){
        this.updateFlag=false
        this.textParse()
      }
      this.$refs.control.selectHandle(this) // 调用随机选择方法
    },
    // 解析输入的数字范围
    textParse(){
      this.selectIndex = []
      this.selectResult = []
      this.selectDisable = []
      let includeItems = []
      let excludeItems = []
      if(!this.numCheck()){
        return
      }else{
        let result = this.num.split(/[,，]/)
        // 只有单个字符且不是范围文本时,num -> 1-num
        if(result.length === 1 && this.num.indexOf("-") === -1){
          includeItems =  this.rangeHandle("1-"+this.num)
        }else{
          result.forEach(i=>{
            // 负数处理
            if(/^-[\da-zA-z]+$/.test(i)){
                excludeItems.push(i.replace("-","")) // 数字、字母减去
            }else{
              includeItems = includeItems.concat(this.rangeHandle(i));
            }
          })
        }
      }
      this.items = includeItems.filter(i=>!excludeItems.includes(i.toString()));
      this.$local.set("num",this.num)
      this.$local.set("num_items",this.items)
    },
    /**
     * 范围处理
     * @param value
     * @returns {Array|*}
     */
    rangeHandle(value){
      if(isEmpty(value)) return []
      if(value.indexOf("-") === -1){ // 单个数字
        return [parseInt(value)]
      }else{
        let tempArr = value.split("-")
        if(/\d/.test(value)){
          return range(parseInt(tempArr[0]),parseInt(tempArr[1])) // 范围数字
        }else {
          return rangeStr(tempArr[0],tempArr[1]) // 范围字母(隐藏)
        }
      }
    }
  }
}
</script>
<style>
  .home{
    text-align:center
  }
</style>
