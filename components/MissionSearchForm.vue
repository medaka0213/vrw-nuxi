<template lang="pug">
.p-4.my-3.bg-white.text-left
  h4 検索フォーム
  p 注意: 日本語未対応です。英名・国際標準時で検索してください。
  .my-3
    VRWSearchInput(v-model:queryValue="state.name" title="ミッション名")
  .my-3
    VRWSearchInput(v-model:queryValue="state.rocket" title="ロケット")
  .my-3
    VRWSearchInput(v-model:queryValue="state.site" title="発射場")
  .my-3
    VRWSearchInput(v-model:queryValue="state.datetime" 
      title="時刻 (YYYY-MM-DD HH:MM:SS)"  :stringKey="true" :isDateTime="true"
    )
  .my-3
    label.mr-2(for="search-limit") 検索数の上限
    InputNumber(id="search-limit" v-model="state.limit")
  .my-3
    Button(type="submit" v-on:click="search_items")
      | Search
</template>

<script lang="ts">
import { defineComponent, reactive  } from "vue";
import VRWSearchInput from "@/components/common/VRWSearchInput";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  props: [
    "type",
    "initialQuery"
  ],
  components: {
    VRWSearchInput
  },
  setup(props) {
    const route = useRoute()
    let state = reactive(route.query)
    state = {
      ...props.initialQuery,
      ...state
    }
    const search_items = () => {
      let query = Object.keys(state).filter(key => state[key] || "" !== "").map(key => {
        return `${key}=${state[key]}`
      }).join("&")
      const url = `/${props.type}?${query}`
      console.log("search_items", url);
      window.location.href = url
    };

    return {
      search_items,
      state,
    }
  },
});
</script>

