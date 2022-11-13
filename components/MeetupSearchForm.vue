<template lang="pug">
.p-4.my-3.bg-white.text-left
  h4 検索フォーム
  p 注意: 日本語未対応です。英名・国際標準時で検索してください。
  .my-3
    VRWSearchInput(v-model:queryValue="state.type" title="集会タイプ (live / archive)" :stringKey="true")
    VRWSearchInput(v-model:queryValue="state.user" title="JOIN先" :stringKey="true")
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


<script>
import { defineComponent, reactive  } from "vue";
import VRWSearchInput from "@/components/common/VRWSearchInput";
import VRWSearchInputTime from "@/components/common/VRWSearchInputTime"

import { useRoute, useRouter } from "vue-router";

import { SearchMode, TimeRange } from "@/libs/timeRange";

export default defineComponent({
  components: {
    VRWSearchInput,
    VRWSearchInputTime,
  },

  props: [
    "initialQuery"
  ],
  setup(props) {
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
      const url = `/meetup/?${query}`
      console.log("search_items", url);
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

