<template lang="pug">
h1.pl-3.pt-3 集会検索
MeetupSearchForm(type="meetup", :initialQuery="query")
MeetupListBlock(
  :items="store.state.item.meetup || []",
  v-if="store.state.item.isReceived"
)
ProgressBar(mode="indeterminate" v-else style="height: .2em").mb-5
</template>

<script>
import { defineComponent, reactive, computed, onMounted } from "vue";
import { useRoute, useRouter } from "vue-router";

import MeetupListBlock from "@/components/MeetupListBlock";
import MeetupSearchForm from "@/components/MeetupSearchForm";
import store from "@/store";
import { SearchMode, TimeRange } from "@/libs/timeRange";

export default defineComponent({
  components: {
    MeetupListBlock,
    MeetupSearchForm,
  },
  setup() {
    const route = useRoute();
    let query = route.query
    if (!Object.keys(query).length) {
      query = {
        limit: "1000",
        datetime: TimeRange.fromMode(new Date(), SearchMode.WEEK_TEIKI).toString(),
      }
    }
    async function getItems() {
      await store.commit("item/set_received", false);
      await store.dispatch("item/get_items", {
        type: "meetup", params: query
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
    const title = '集会を検索する'
    return {
      title,
      meta: [
        { hid: 'og:title', property: 'og:title', content: title }
      ]
    };
  },
});
</script>
