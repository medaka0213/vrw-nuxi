import { MutationTree } from 'vuex';
import { ItemState } from '@/store/types';

//reduxでいうactionと同じように使う

const mutations: MutationTree<ItemState> = {
  set_received(state, payload: boolean) {
    state.isReceived = payload;
  },
  get_items: (state, payload: any) => {
    console.log('payload', payload)
    state[payload.type] = payload.Items
  },
  get_single_item: (state, payload: any) => {
    state[payload.type] = [payload.Item]
  }
};

export default mutations;