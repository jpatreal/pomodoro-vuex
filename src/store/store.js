import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export const store = new Vuex.Store({
  state:{
     timer: null,
     totaltime: (null * 60)
  }, 
  mutations:{
    /*startTimer: (state, context) => {
      state.timer = setInterval(() => context.commit('countDown'),
      1000)
    },*/
    setTimer (state, timer) {
      state.timer = timer
    },
    setTime(state, payload){
      state.totaltime = (payload * 60)
    },
    countDown: state => {
      if(state.totaltime >= 1){
        state.totaltime--
      }else{
        state.totaltime = 0
      }
    },
    stopTimer: state => {
      clearInterval(state.timer)
      state.timer = null
    },
    resetTimer: state => {
      state.totaltime = (null * 60)
      clearInterval(state.timer)
    }
  },
  getters:{
      minutes: state => {
        const minutes = Math.floor(state.totaltime / 60);
        return minutes;
      },
      seconds: (state, getters) => {
        const seconds = state.totaltime - (getters.minutes * 60);
        return seconds;
      }
  },
  actions:{
    startTimer ({ commit }) {
      commit('setTimer', setInterval(() => {
        commit('countDown')
      }, 1000))
    },
    setTimer ({ commit }, payload) {
      commit('setTime' , payload)
    }
  }
})