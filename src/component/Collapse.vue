<!--
  折叠显示组件
  props:
        flag 显示标识（初始状态）
        duration 过渡时间，默认0.3
        timing 过渡时间曲线，默认ease
        enable 是否启用隐藏显示效果
  说明：如需额外操作，可以通过监听flag来完成,如下：
        return => show: { flag: false, text: '显示查询', icon: 'down' },
        watch => 'show.flag': function (val) {[this.show.text, this.show.icon] = val ? ['收起查询', 'up'] : ['显示查询', 'down']}
-->
<template>
    <div class="content" ref="content">
        <slot></slot>
    </div>
</template>

<script>
    export default {
        name: 'Collapse',
        props: {
            flag: {
                type: Boolean,
                required: true
            },
            duration: {
                type: [Number, String],
                default: 0.3
            },
            timing: {
                type: String,
                default: 'ease'
            },
            enable: {
                type: Boolean,
                default: true
            }
        },
        watch: {
            flag (val) {
                if (this.enable) {
                    this.$refs.content.style.height = val ? this.height : '0px'
                }
            }
        },
        data () {
            return {
                height: 0
            }
        },
        mounted () {
            this.$refs.content.style.transition = `height ${this.duration}s ${this.timing}`
            // 因为vue是异步队列加载，这样可以确保元素已经加载
            this.$nextTick(function () {
                this.height = this.$refs.content.offsetHeight + 'px'
                this.$refs.content.style.height = this.enable && !this.flag ? '0px' : this.height
            })
        }
    }
</script>

<style scoped>
    .content {
        overflow: hidden;
    }
</style>
