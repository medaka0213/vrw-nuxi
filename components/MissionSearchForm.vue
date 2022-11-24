<template lang="pug">
.p-4.my-3.bg-white.text-left
  p 注意: 日本語未対応です。英名・国際標準時で検索してください。
  .my-3
    VRWSearchInput(v-model:queryValue="state.name" title="ミッション名")
  .my-3
    VRWSearchInput(v-model:queryValue="state.rocket" title="ロケット")
  .my-3
    VRWSearchInput(v-model:queryValue="state.site" title="発射場")
  .my-3
    VRWSearchInputTime(v-model:queryValue="state.datetime" 
      title="時刻" :stringKey="true" :isDateTime="true"
      :onClickSearchNext="search_next" :onClickSearchPrev="search_prev"
      :onClickSearchCurrent="search_current"
    )
  .my-3.row
    .col.p-1.d-grid.gap-2
      button.btn.btn-primary(type="button" v-on:click="search_items")
        | 検索する
  .my-3.row
    label.col-sm-3.col-form-label(for="search-limit") 検索数の上限
    input.col.form-control(id="search-limit" v-model="state.limit")
</template>

<script lang="ts">
import { defineComponent, reactive  } from "vue";

import VRWSearchInput from "@/components/common/VRWSearchInput";
import VRWSearchInputTime from "@/components/common/VRWSearchInputTime"

import { SearchMode, TimeRange } from "@/libs/timeRange";

import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  props: [
    "type",
    "initialQuery"
  ],
  components: {
    VRWSearchInput,
    VRWSearchInputTime,
  },

  setup(props, { emit }) {
    const route = useRoute()
    let state = reactive(route.query)
    state = {
      ...props.initialQuery,
      ...state
    }
    const search_items = () => {
      let keys = Object.keys(state)
      
      //limitを末尾にする
      keys = keys.filter((key) => key !== "limit")
      keys.push("limit")
      
      let query = keys.filter(key => state[key] || "" !== "").map(key => {
        return `${key}=${state[key]}`
      }).join("&")
      const url = `/${props.type}/?${query}`
      window.location.href = url
    };
    const search_next = () => {
      let datetime = TimeRange.fromString(state.datetime).next()
      state.datetime = datetime.toString()
      search_items()
    };
    const search_prev = () => {
      let datetime = TimeRange.fromString(state.datetime).prev()
      state.datetime = datetime.toString()
      search_items()
    };
    const search_current = () => {
      let datetime = TimeRange.fromString(state.datetime).now()
      state.datetime = datetime.toString()
      search_items()
    };
    return {
      search_items,
      search_next,
      search_prev,
      search_current,
      state,
    }
  },
});
</script>

