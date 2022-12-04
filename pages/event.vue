<template lang="pug">
h1.pl-3.pt-3 その他イベント検索
MissionSearchForm(type="event", :initialQuery="query")
MissionListBlock(
  :items="store.state.item.launch",
  v-if="store.state.item.isReceived"
)
ProgressBar(mode="indeterminate" v-else style="height: .2em").mb-5
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
        limit: "1000",
        datetime: time_between("upcoming", 12).join("..."),
      }
    }
    async function getItems() {
      await store.commit("item/set_received", false);
      await store.dispatch("item/get_items", {
        type: "event", params: query
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
    const title = 'その他イベント検索'
    return {
      title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: title }
      ]
    };
  },
});
</script>
