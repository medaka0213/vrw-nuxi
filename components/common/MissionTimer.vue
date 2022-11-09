<template lang="pug">
.card {{content}}
</template>

<script>
import moment from 'moment';
import { defineComponent, computed } from 'vue'

export default {
  props: ["item"],
  setup(props){
    const content = computed(()=>{
      const format = "YYYY-MM-DD HH:mm:ss";
      const now = moment();
      const target = moment(props.item.datetime, format);
      const diff =  moment.duration(target.diff(now))
      console.log(diff)
      console.log(diff._data.seconds)

      const years = ("00" + Math.abs(diff._data.years)).slice(-2);
      const months = ("00" + Math.abs(diff._data.months)).slice(-2);
      const days = ("00" + Math.abs(diff._data.days)).slice(-2);
      const hours = ("00" + Math.abs(diff._data.hours)).slice(-2);
      const minutes = ("00" + Math.abs(diff._data.minutes)).slice(-2);
      const seconds = ("00" + Math.abs(diff._data.seconds)).slice(-2);

      let res = `${years}y ${months}m ${days}d ${hours}:${minutes}:${seconds}`
      if (now > target){
        return `T+ ${res}`
      } else {
        return `T- ${res}`
      }
    })
    return {
      props,
      content
    }
  }
}
</script>
