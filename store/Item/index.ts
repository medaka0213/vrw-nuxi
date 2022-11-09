import { Module } from 'vuex'
import { ItemState, RootState } from '@/store/types';
import actions from '@/store/Item/actions'
import mutations from '@/store/Item/mutation'

const state: ItemState = {
  isReceived: false,
};

export const item: Module<ItemState, RootState> = {
  namespaced: true,
  state,
  actions,
  mutations,
};
