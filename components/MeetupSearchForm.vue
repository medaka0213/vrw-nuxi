<template lang="pug">
.p-4.my-3.bg-white.text-left
  h4 検索フォーム
  p 注意: 日本語未対応です。英名・国際標準時で検索してください。
  .my-3
    VRWSearchInput(v-model:queryValue="state.type" title="集会タイプ (live / archive)" :stringKey="true")
  .my-3
    VRWSearchInput(
        v-model:queryValue="state.datetime" title="開場時刻 (YYYY-MM-DD HH:MM:SS)" 
        :stringKey="true", :isDateTime="true"
      )
  .my-3
    VRWSearchInput(v-model:queryValue="state.user" title="JOIN先" :stringKey="true")
  .my-3
    label.mr-2(for="search-limit") 検索数の上限
    InputNumber(id="search-limit" v-model="state.limit")
  .my-3
    Button(type="submit" v-on:click="search_items")
      | Search
</template>

<script>
import { defineComponent, reactive  } from "vue";
import VRWSearchInput from "@/components/common/VRWSearchInput";
import { useRoute, useRouter } from "vue-router";
export default defineComponent({
  components: {
    VRWSearchInput
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
      const url = `/meetup?${query}`
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

