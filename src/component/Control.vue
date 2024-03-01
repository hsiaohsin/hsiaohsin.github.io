<!--
  控制参数组件
  props:
        label 唯一标签，用于参数的存取，必填
        items 选择的列表数据
        clock 选取时长，默认1600
        count 选取间隔，默认200
        repeatCheck 是否重复选择，默认是
-->
<template>
    <div>
        <a-row style="margin-top: 10px" type="flex" align="middle">
            <a-col :xs="6" :xl="5" :xxl="4" >单次时间：</a-col>
            <a-col :xs="18" :xl="19" :xxl="20">
                <a-input style="width: 100%;" step="100" type="number" v-model.number="innerClock"  allow-clear size="large" placeholder="请输入单次时间" >
                    <a-icon slot="prefix" type="clock-circle" />
                    <span slot="addonAfter">ms(毫秒)</span>
                </a-input>
            </a-col>
        </a-row>
        <a-row style="margin-top: 10px" type="flex" align="middle">
            <a-col :xs="6" :xl="5" :xxl="4">时间间隔：</a-col>
            <a-col :xs="18" :xl="19" :xxl="20">
                <a-input  style="width: 100%;" step="100"  type="number" v-model.number="innerInterval"  allow-clear size="large" placeholder="请输入时间间隔" >
                    <a-icon slot="prefix" type="stock" />
                    <span slot="addonAfter">ms(毫秒)</span>
                </a-input>
            </a-col>
        </a-row>
        <a-row style="margin-top: 10px" type="flex" align="middle">
            <a-col :xs="6" :xl="5" :xxl="4">选择个数：</a-col>
            <a-col :xs="12" :xl="13" :xxl="14">
                <a-slider v-model="innerCount" :min="1" :max="items.length" />
            </a-col>
            <a-col :xs="6" :xl="6">
                <a-input-number type="number" v-model="innerCount" :min="1" :max="items.length === 0 ? 1:items.length" style="width: 100%" />
            </a-col>
        </a-row>
        <a-row style="margin-top: 10px;" type="flex" align="middle">
            <a-col :xs="6" :xl="5" :xxl="4">重复选择：</a-col>
            <a-col ><a-switch v-model="innerRepeatCheck" default-checked  /></a-col>
            <a-col :flex="1" style="text-align: right">
                <a title="Ctrl+H快速打开历史记录" @click="history.open()"> <a-icon type="history" />
                    历史选择记录
                </a></a-col>
        </a-row>
        <a-modal :footer="null" v-model="resultVisible" title="选择结果">
            <a-result >
                <template #icon>
                    <a-icon type="smile" theme="twoTone" />
                </template>
                <h1  style="text-align: center">{{resultText}}</h1>
            </a-result>
        </a-modal>
    </div>
</template>
<script>
    import  {isEmpty} from "../unit/Check"
    import  {randomForArr} from "../unit/Number"
    import ACol from "ant-design-vue/es/grid/Col";
    import ARow from "ant-design-vue/es/grid/Row";
    import history from "../store/history"
    export default {
        name: "Control",
        components: {ARow, ACol},
        props:{
            label:{
                type:String,
                required:true
            },
            items:{
                type:Array,
                required:true
            },
            clock:{
                type:Number,
                default:1600
            },
            interval:{
                type:Number,
                default:200
            },
            count:{
                type:Number,
                default:1
            },
            repeatCheck:{
                type:Boolean,
                default:true
            },
        },
        data() {
            return {
                innerClock:this.clock,
                innerInterval:this.interval,
                innerCount:this.count,
                innerRepeatCheck:this.repeatCheck,
                resultVisible:false,
                resultText:undefined,
                history
            }
        },
        watch:{
            innerRepeatCheck(val){
                this.$local.set(this.label+"_repeat",val)
                this.dataChange()

            },
            innerCount(val){
                this.$local.set(this.label+"_count",val)
                this.dataChange()
            }
        },
        created(){
            this.innerInterval = this.$local.get(this.label+"_interval",this.innerInterval)
            this.innerRepeatCheck = this.$local.get(this.label+"_repeat",this.innerRepeatCheck)
            this.innerClock = this.$local.get(this.label+"_clock",this.innerClock)
            this.$nextTick(()=>{
                this.innerCount = this.$local.get(this.label+"_count",this.innerCount)}
            )
        },
        methods:{
            // 参数发生改变
            dataChange(){
                this.$emit('change',{
                    clock:this.innerClock,
                    interval:this.innerInterval,
                    count:this.innerCount,
                    repeatCheck:this.innerRepeatCheck,
                })
            },
            // 校验时间
            clockCheck(){
                if(isEmpty(this.innerInterval)){
                    this.$message.error('时间间隔不能为空');
                }else if(this.innerInterval < 100){
                    this.$message.error('时间间隔不能<100ms');
                }else if(isEmpty(this.innerClock)){
                    this.$message.error('单次时间不能为空');
                }else if(this.innerClock < 1000){
                    this.$message.error('单次时间不能<1000ms');
                }else if(this.innerInterval >this.innerClock) {
                    this.$message.error('时间间隔不能大于单次时间');
                }else if(this.innerClock<this.innerInterval*2) {
                    this.$message.error('单次时间至少是时间间隔的两倍');
                }else{
                    this.$local.set(this.label+'_interval',this.innerInterval);
                    this.$local.set(this.label+'_clock',this.innerClock);
                    this.dataChange()
                    return true
                }
            },
            // 随机选择数据，origin代表调用来源
            selectHandle(origin){
                if(!this.clockCheck()){ // 时间校验不通过
                    return;
                }
                    // 如果需要选择的大于剩余可选择的
                if(this.innerCount>origin.items.length-origin.selectDisable.length){
                    this.$message.error(`你要选择的数量【${this.innerCount}】大于可选择的数量
                  【${origin.items.length-origin.selectDisable.length}】，请调整【选择个数】或者单击【重选】`);
                    return;
                }
                origin.selectLoading = true;
                // 格式化item，去除禁止选择的
                let formatItems = [];
                if(origin.selectDisable.length === 0){
                    formatItems =  origin.items.map((value,index)=>{return {index,value}})
                }else{
                    origin.items.forEach((value,index)=>{
                        if(!origin.selectDisable.includes(index)) formatItems.push({value,index})
                    })
                }
                let init = 0;
                let timer = setInterval(()=>{
                    if(init>=this.innerClock){
                        clearInterval(timer) // 消除定时任务，但本次仍会执行
                        origin.selectLoading = false;
                        this.$nextTick(()=>{ // 保证本次事件循环执行完成之后执行，以确保可以获取最终的值
                            if(!this.innerRepeatCheck){
                                origin.selectDisable = origin.selectDisable.concat(origin.selectIndex)
                            }
                            this.resultVisible = true
                            this.resultText = origin.selectResult.join("、")
                            history.add(this.resultText) // 添加到历史记录
                            this.$session.set(this.label+'_select_index',origin.selectIndex);
                            this.$session.set(this.label+'_select_disable',origin.selectDisable);
                        })
                    }
                    let res = randomForArr(formatItems,this.innerCount) // 从数组中随机抽取元素
                    origin.selectResult = res.map(i=>i.value)
                    origin.selectIndex = res.map(i=>i.index)
                    init += this.innerInterval;
                },this.innerInterval)
            },
        }
    }
</script>

<style   lang="less">
    .full-modal {
        .ant-modal-body {
            max-height: 50vh;
            overflow-y: auto;
        }
    }
</style>
