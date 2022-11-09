<template lang="pug">
.my-2
  Checkbox.mr-2(:id="'checkbox_'+title" v-model="state.enable" :binary="true")
  label(:for="'checkbox_'+title") {{title}}
.my-2(v-if="state.enable")
  Dropdown.mr-2(v-model="state.mode" :options="modeDict" optionLabel="value" optionValue="key")

  AutoComplete.mr-2(v-model="state.value0" v-if="!isDateTime && state.mode!=='EX' && state.mode!=='N_EX'")
  AutoComplete.mr-2(v-model="state.value1" v-if="!isDateTime && state.mode==='BETWEEN'")

  Calendar.mr-2(
    v-model="state.value0" dateFormat="yy-mm-dd" hourFormat="hh:mm:ss" :showTime="true" :showSeconds="true"
    v-if="isDateTime && state.mode!=='EX' && state.mode!=='N_EX'"
  )
  Calendar.mr-2(
    v-model="state.value1" dateFormat="yy-mm-dd" hourFormat="hh:mm:ss" :showTime="true" :showSeconds="true"
    v-if="isDateTime && state.mode==='BETWEEN'"
  )
</template>

<script lang="ts">
import { defineComponent, toRefs, watch, reactive, computed, onMounted } from 'vue'
import { searchValue2Params, param2SearchValue, modeDict } from '@/actions/vrwSearch'
import moment from 'moment-timezone'

export default defineComponent({
  name: 'ChildInput',
  props: {
    queryValue: String,
    title: String,
    stringKey: Boolean,
    isDateTime: Boolean,
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

    const state =  reactive(param2SearchValue(queryValueComputed.value, props.stringKey))
    watch(() => state,
      (state, prevState) => {
        if (props.isDateTime) {
          state.value0 = moment(state.value0).format('YYYY-MM-DDTHH:mm:ss')
          state.value1 = moment(state.value1).format('YYYY-MM-DDTHH:mm:ss')
        }
        if (state.enable){
          queryValueComputed.value = searchValue2Params(state.mode, state.value0, state.value1, props.stringKey)
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
    }
  },
})
</script>