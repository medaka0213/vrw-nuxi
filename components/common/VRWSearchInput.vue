<template lang="pug">
.my-2
  input.form-check-input.mr-2(type="checkbox" :id="'checkbox_'+title" v-model="state.enable" :binary="true")
  label(:for="'checkbox_'+title") {{title}}
.my-2.row(v-if="state.enable")
  select.col.form-select.mr-2(v-model="state.mode" optionLabel="value" optionValue="key")
      option(v-for="option in modeDict" :value="option.key") {{option.value}}
  input.col.form-control.mr-2(type="text" v-model="state.value0" v-if="!isDateTime && state.mode!=='EX' && state.mode!=='N_EX'")
  input.col.form-control.mr-2(type="text" v-model="state.value1" v-if="!isDateTime && state.mode==='BETWEEN'")

  input.col.form-control.mr-2(
    type="datetime-local" 
    v-model="state.value0" dateFormat="yy-mm-dd" hourFormat="hh:mm:ss" :showTime="true" :showSeconds="true"
    v-if="isDateTime && state.mode!=='EX' && state.mode!=='N_EX'"
  )
  input.col.form-control.mr-2(
    type="datetime-local"
    v-model="state.value1" dateFormat="yy-mm-dd" hourFormat="hh:mm:ss" :showTime="true" :showSeconds="true"
    v-if="isDateTime && state.mode==='BETWEEN'"
  )
</template>

<script lang="ts">
import { defineComponent, toRefs, watch, reactive, computed, onMounted } from 'vue'
import { searchValue2Params, param2SearchValue, modeDict } from '@/actions/vrwSearch'

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
        if (state.enable){
          queryValueComputed.value = searchValue2Params(state.mode, state._value0 || state.value0, state._value1 || state.value1, props.stringKey)
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