import Vue from 'vue';
import Vuex from 'vuex';
import findIndex from 'lodash/findIndex';
import isNil from 'lodash/isNil';

Vue.use(Vuex);

export const store = new Vuex.Store({
  strict: process.env.VUE_APP_STRICT,
  state: {
    longUrl: '',
    shortUrl: '',
    urls: isNil(localStorage.getItem('urls'))
      ? []
      : JSON.parse(localStorage.getItem('urls'))
  },
  mutations: {
    longUrl(state, longUrl) {
      state.longUrl = longUrl;
    },
    shortUrl(state, shortUrl) {
      state.shortUrl = shortUrl;
    },
    addUrl(state, url) {
      state.urls.push(url);
    },
    updateTitle(state, url) {
      const index = findIndex(
        state.urls,
        u => u.short === url.short && u.long === url.long
      );
      state.urls = [
        ...state.urls.slice(0, index),
        url,
        ...state.urls.slice(index + 1)
      ];
    }
  },
  actions: {
    longUrl({ commit }, longUrl) {
      commit('longUrl', longUrl);
    },
    shortUrl({ commit }, shortUrl) {
      commit('shortUrl', shortUrl);
    },
    addUrl({ commit }, url) {
      commit('addUrl', url);
    },
    updateTitle({ commit }, url) {
      commit('updateTitle', url);
    }
  },
  getters: {
    longUrl: state => state.longUrl,
    shortUrl: state => state.shortUrl,
    urls: state => state.urls
  }
});
