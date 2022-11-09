<template lang="pug">
.card(v-if ="props.mode==='t-minus'")
  DataTable.p-datatable-sm(:value="t_minus_values" responsiveLayout="scroll")
    Column(field="td" header="T-")
    Column(field="desc_jp" header="") 
.card(v-else)
  DataTable.p-datatable-sm(:value="t_plus_values" responsiveLayout="scroll")
    Column(field="td" header="T+")
    Column(field="desc_jp" header="")    
</template>

<script>
import { defineComponent, computed } from 'vue'
export default defineComponent({
  props: ["item", "mode"] ,
  setup(props) {
    const t_plus_values = computed(() => {
      const {t_plus = [] } = props.item
      return t_plus.map(i => {
        return {
          td: `${i.hours || "00"}:${i.minutes || "00"}:${i.seconds || "00"}`,
          desc_jp: i.desc_jp,
        }
      })
    })
    const t_minus_values = computed(() => {
      const {t_minus = [] } = props.item
      return t_minus.map(i => {
        return {
          td: `${i.hours || "00"}:${i.minutes || "00"}:${i.seconds || "00"}`,
          desc_jp: i.desc_jp,
        }
      })
    })
    return {
      props,
      t_plus_values,
      t_minus_values
    }
  }
})
</script>