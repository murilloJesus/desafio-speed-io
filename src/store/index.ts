import apiService from "@/services/api.service";
import { createStore } from "vuex";
import { Factory, List, Storage } from "./interfaces";

export default createStore({
  state: {
    setoresCnaes: {
      itens: [{
        value: '',
        label: '',
        tags: '',
        subline: ''
      }],
      selected: new Storage().getSelected('selectedSetoresCnaes')
    },
    municipiosEstados: {
      itens: [{
        value: '',
        label: '',
        tags: '',
        subline: ''
      }],
      selected: new Storage().getSelected('selectedMunicipiosEstados')
    },
    searcher: ''
  },
  getters: {
    setoresCnaes: (state): List => {
      return state.setoresCnaes;
    },
    municipiosEstados: (state): List => {
      return state.municipiosEstados
    }
  },
  mutations: {
    requestAPI: (state): void =>{
      apiService.get('https://filters.app3.speedio.com.br/api/v3/filters.json')
        .then(res => {
          const setoresCnaes = res.filters.find((el: any) => el.groupTag == 'atividade')
                                .filters.find((el: any) => el.groupTag == 'setores e cnaes')
                                .filterOptions,

              municipios = res.filters.find((el: any) => el.groupTag == 'localização')
                              .filters.find((el: any) => el.groupTag == 'municipios')
                              .filterOptions,

              estados = res.filters.find((el: any) => el.groupTag == 'localização')
                              .filters.find((el: any) => el.groupTag == 'estados')
                              .filterOptions,

              municipiosEstados = municipios.concat(estados)
           
          state.setoresCnaes.itens = new Factory(setoresCnaes).search(state.searcher)
          state.municipiosEstados.itens = new Factory(municipiosEstados).search(state.searcher)

        })
    },
    search: (state, value): void => {
      state.searcher = value
    },
    select: (state, item): void => {
      if(state.setoresCnaes.itens.findIndex((el: any) => el === item) > -1){
        const index = state.setoresCnaes.selected.findIndex((el:any) => el === item.value)
        if(index > -1) state.setoresCnaes.selected.splice(index, 1)
        else state.setoresCnaes.selected.push(item.value)
      }else if(state.municipiosEstados.itens.findIndex((el: any) => el === item) > -1){
        const index = state.municipiosEstados.selected.findIndex((el:any) => el === item.value)
        if(index > -1) state.municipiosEstados.selected.splice(index, 1)
        else state.municipiosEstados.selected.push(item.value)
      }
    },
    updateStorage: (state): void => {
      localStorage.setItem('selectedSetoresCnaes', JSON.stringify(state.setoresCnaes.selected))
      localStorage.setItem('selectedMunicipiosEstados', JSON.stringify(state.municipiosEstados.selected))
    }
  },
  actions: {
    requestAPI: ({commit}): void => {
      commit('requestAPI')
    },
    search: ({commit}, value): void => {
      commit('search', value);
      commit('requestAPI')
    },
    select: ({commit}, item): void => {
      commit('select', item)
      commit('updateStorage')
    }
  }
});