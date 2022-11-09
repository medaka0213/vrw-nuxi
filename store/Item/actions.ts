import { ActionTree } from 'vuex';
import { ItemState, RootState } from '@/store/types';

import {get_items, get_missions, get_single_item, get_item_relation, get_item_reference} from '@/actions/webapi'

//reduxでいうsagaと同じように使う

const actions: ActionTree<ItemState, RootState> = {
  get_items: async ({ commit }, payload:any) => {
    console.log('payload', payload)
    const result: any[] = await get_items(payload.type, payload.params)
    Object.keys(result).forEach((key:string) => {
      commit('get_items', {
        type: key,
        Items: result[key as keyof typeof result]
      })
    })
  },

  get_missions: async ({ commit }, payload:any) => {
    console.log('payload', payload)
    const result: any[] = await get_missions(payload.params)

    commit('get_items', {
      type: "mission",
      Items: result
    })
  },

  get_single_item: async ({ commit }, payload:any) => {
    console.log('payload', payload)
    const result: any = await get_single_item(payload.type, payload.pk)
    commit('get_single_item', {
      type: payload.type,
      Item: result
    })
  },

  get_item_relation: async ({ commit }, payload:any) => {
    console.log('payload', payload)
    const result: any[] = await get_item_relation(payload.type, payload.pk)
    Object.keys(result).forEach((key:string) => {
      commit('get_items', {
        type: key,
        Items: result[key as keyof typeof result]
      })
    })
  },

  get_item_reference: async ({ commit }, payload:any) => {
    console.log('payload', payload)
    const result: any[] = await get_item_reference(payload.type, payload.pk)
    Object.keys(result).forEach((key:string) => {
      commit('get_items', {
        type: key,
        Items: result[key as keyof typeof result]
      })
    })
  },
};

export default actions;