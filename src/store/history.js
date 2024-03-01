import local from '../unit/Local'
// 选择记录(队列结构，头部插入，尾部删除，先进先出）

const History = {
    records: local.get("history",[]), //历史记录
    show:false, // 是否历史记录对话框
    // 新增
    add(select){
        // 历史记录最多保留50条
        if(this.records.length>=50){
            this.records.pop() // 尾部删除
        }
        this.records.unshift(select) // 头部新增
        local.set("history",this.records) // 保存到本地
    },
    // 打开记录对话框
    open(){
        this.show = true
    },
    // 关闭记录对话框
    close(){
        this.show = false
    },
    // 清空
    clear(){
        this.records = []
        local.set("history",[])
    }
}
export default History
