<template lang="pug">
span
    | {{state.time}}
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from 'vue'
import { format_countdown } from '@/actions/time'

//カウントダウンタイマー
export default defineComponent({
    props: ["datetime"],
    setup(props){
        let state = reactive({
            time: {},
            loaded: false,
        })
        const getTime = () => {
            const time = format_countdown(props.datetime)
            state.time = time
            state.loaded = true
        }
        onMounted(() => {
            getTime()
            setInterval(() => {
                getTime()
            }, 1000)
        })
        return {
            state,
        }
    }
})
</script>