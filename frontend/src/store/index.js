import {createPinia, defineStore} from 'pinia';
import { createPersistedState } from 'pinia-plugin-persistedstate';

const store = createPinia();
store.use(createPersistedState());

export { store };

export const GlobalStore = defineStore('global', {
  state: () => ({
    theme:'dark',
  }),
  getters: {
    displayTheme: (state) => state.theme,
  },
  actions: {
    setTheme(theme) {
      this.theme = theme;
    },
  },
  persist: true,
});

export default store;
