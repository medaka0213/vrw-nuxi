import Vuex, { StoreOptions } from 'vuex';
import { RootState } from '@/store/types';
import { item }  from './Item';

const store: StoreOptions<RootState> = {
  state: {
    version: '1.0.0',
  },
  modules: {
    item,
  },
};

export default new Vuex.Store<RootState>(store);
