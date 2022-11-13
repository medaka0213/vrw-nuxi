<template lang="pug">
.my-2
  input.form-check-input.mr-2(type="checkbox" :id="'checkbox_'+title" v-model="state.enable" :binary="true")
  label(:for="'checkbox_'+title") {{title}}
.my-2.row(v-if="state.enable")
  input.col.form-control.mr-2(
    type="datetime-local" 
    v-model="state.start" dateFormat="yy-mm-dd" hourFormat="hh:mm:ss" :showTime="true" :showSeconds="true"
    v-if="state.mode!=='DISABLED'"
  )
  input.col.form-control.mr-2(
    type="datetime-local"
    v-model="state.end" dateFormat="yy-mm-dd" hourFormat="hh:mm:ss" :showTime="true" :showSeconds="true"
    v-if="state.mode==='CUSTOM_BETWEEN'"
  )
  select.col.form-select.mr-2(v-model="state.mode" optionLabel="value" optionValue="key")
      option(v-for="option in timeRange" :value="option.key") {{option.value}}
.my-2.row(v-if="state.enable && ['WEEK_TEIKI', 'WEEK', 'MONTH', 'YEAR', 'QUARTER', 'CUSTOM_BETWEEN'].includes(state.mode)")
  .col.p-1.d-grid.gap-2
    button.btn.btn-outline-primary(type="button" v-on:click="onClickSearchPrev")
      b ◁ 前の{{state.mode==='WEEK_TEIKI' ? '週' : state.mode==='WEEK' ? '週' : state.mode==='MONTH' ? '月' : state.mode==='YEAR' ? '年' : state.mode==='QUARTER' ? '四半期' : '期間'}}
  .col.p-1.d-grid.gap-2
    button.btn.btn-outline-info(type="button" v-on:click="onClickSearchCurrent")
      b 現在の{{state.mode==='WEEK_TEIKI' ? '週' : state.mode==='WEEK' ? '週' : state.mode==='MONTH' ? '月' : state.mode==='YEAR' ? '年' : state.mode==='QUARTER' ? '四半期' : '期間'}}
  .col.p-1.d-grid.gap-2
    button.btn.btn-outline-danger(type="button" v-on:click="onClickSearchNext")
      b 次の{{state.mode==='WEEK_TEIKI' ? '週' : state.mode==='WEEK' ? '週' : state.mode==='MONTH' ? '月' : state.mode==='YEAR' ? '年' : state.mode==='QUARTER' ? '四半期' : '期間'}} ▷ 
</template>

<script lang="ts">
import { defineComponent, toRefs, watch, reactive, computed, onMounted } from 'vue'
import { searchValue2Params, param2SearchValue, modeDict } from '@/actions/vrwSearch'
import { SearchMode, TimeRange } from "@/libs/timeRange";

export default defineComponent({
  name: 'ChildInput',
  props: {
    queryValue: {
      type: String,
    },
    title: String,
    stringKey: {
      type: String,
      default: "datetime",
    },
    onClickSearchNext: Function,
    onClickSearchPrev: Function,
    onClickSearchCurrent: Function,
  },
  emits: ['update:queryValue'],
  setup(props, { emit }) {
    const { queryValue } = toRefs(props)
    const queryValueComputed = computed({
      get: () => queryValue.value,
      set: (value) => {
        emit('update:queryValue', value)
      },
    })

    let state = reactive(queryValueComputed.value? 
      TimeRange.fromString(queryValueComputed.value) : TimeRange.fromMode(new Date(), SearchMode.WEEK_TEIKI))
    if (!queryValueComputed.value) {
      state.enable = false
    }
    watch(() => state,
      (state, prevState) => {
        if (state.enable){
          state = TimeRange.fromMode(state.start, state.mode, state.end)
          queryValueComputed.value = state.toString()
        } else {
          queryValueComputed.value = null
        }
      },
      { deep: true }
    )

    return {
      state,
      queryValueComputed,
      modeDict,
      timeRange: [
        {
          key: SearchMode.WEEK_TEIKI,
          value: "を含む週 (定期集会用 月曜21時締め)",
        },
        {
          key: SearchMode.WEEK,
          value: "を含む週",
        },
        {
          key: SearchMode.MONTH,
          value: "を含む月",
        },
        {
          key: SearchMode.QUARTER,
          value: "を含む四半期",
        },
        {
          key: SearchMode.YEAR,
          value: "を含む年",
        },
        {
          key: SearchMode.CUSTOM_AFTER,
          value: "以後",
        },
        {
          key: SearchMode.CUSTOM_BEFORE,
          value: "以前",
        },
        {
          key: SearchMode.CUSTOM_BETWEEN,
          value: "の間",
        },
      ]
    }
  },
})
</script>