

const user = {
    namespaced: true,
    state: {
        navigationList: [], //导航展示数组
        navigationListSiyid: [], //导航展示数据数组
        defaultSiyid:'6d92eff4c1a04dcfb6582a8e63dd520b',//默认死数据
    },
    getters: {

    },
    mutations: {
      
        navigationListpush(state) {
            state.navigationList=state.navigationList.push(state)
        },
        navigationListpop(state) {
            state.navigationList.pop()
        },
        navigationListSiyidpush(state) {
            state.navigationListSiyid=state.navigationListSiyid.push(state)
        },
        navigationListSiyidpop(state) {
            state.navigationListSiyid.pop()
        },
        defaultSiyidChanges(state,value){
            state.defaultSiyid=value
        }
    },
    actions: {

    }
}

export default user
