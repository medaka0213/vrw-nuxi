<template lang="pug">
h1.pl-3.pt-3 ミッション検索
MissionSearchForm(type="mission", :initialQuery="query")
MissionListBlock(
  :items="store.state.item.launch",
  v-if="store.state.item.isReceived"
)
span(v-else) loading...
</template>

<script lang="ts">
import { defineComponent, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import MissionListBlock from "@/components/MissionListBlock";
import MissionSearchForm from "@/components/MissionSearchForm";
import store from "@/store";
import { time_between}  from "@/actions/time";

export default defineComponent({
  components: {
    MissionListBlock,
    MissionSearchForm,
  },
  setup() {
    const route = useRoute();
    let query = route.query
    if (!Object.keys(query).length) {
      query = {
        limit: "100",
        datetime: time_between("upcoming", 12).join("..."),
      }
    }
    async function getItems() {
      await store.commit("item/set_received", false);
      await store.dispatch("item/get_items", {
        type: "mission", params: query
      });
      await store.commit("item/set_received", true);
    }
    onMounted(() => {
      getItems();
    });
    return {
      query,
      store,
      getItems,
    };
  },
  head() {
    const title = 'ミッションを検索する'
    return {
      title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: title }
      ]
    };
  },
});
</script>
