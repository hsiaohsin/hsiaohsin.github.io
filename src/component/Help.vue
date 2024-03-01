<!--
  帮助内容
  props:
        type 帮助类型，数字班num，姓名版name
-->
<template>
    <div>
        <div v-if="type === 'num'">
            <p>1、当你输入有且仅有单个数字，例如50，则显示1至50的数字</p>
            <p>2、当你使用‘-’的范围数字，例如1-50，则显示1至50的数字</p>
            <p>3、当你输入负数，例如-50，则会从范围内删除该数字</p>
            <p>4、使用逗号‘,’可以进行上述1、2、3的连接操作,例如1-20,22,-18</p>
        </div>
        <div v-if="type === 'name'">
            <p>1、首先你单击【数据】录入数据，支持“手动录入”或者“文件导入”两种</p>
            <p>2、当是手动或者文本文件时，数据的格式应该使用逗号或顿号隔开</p>
            <p>3、当文件是Excel文件时，会读取【姓名】列不为空的数据导入</p>
            <p>4、自带浏览器存储功能，会自动保存录入的数据</p>
        </div>
        <div>
            <p>5、还有自定义时间、人数（默认为1）、是否允许重复选择功能哦！</p>
            <p>6、详情请查看 <a target="_blank" :href="HELP_ADDRESS">
                <a-icon type="link"  />帮助文档</a> </p>
        </div>
    </div>
</template>

<script>
    import  {HELP_ADDRESS} from "../unit/Constant"
    export default {
        name: "Help",
        props: {
            type:{
                type:String,
                required:true
            }
        },
        data() {
            return {
                HELP_ADDRESS
            }
        }
    }
</script>

<style scoped>

</style>
