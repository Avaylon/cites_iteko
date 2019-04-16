import {api} from "../../utils/utils";

export default {
    getList: ({commit}) => {
        api("/list/", {method: 'GET'}).then(async res => {
            const json = await res.json();

            commit('LIST_UPDATE', json)

        });
    },
    setCurrProduct: ({commit, dispatch}, data) => {
        commit('SET_CURRENT_PRODUCT', data)

    },
    purchase: ({commit}, id) => {
        api("/add/", {method: 'POST', data: id}).then(async res => {
            const json = await res.text();

            commit('ADD_PRODUCT', id)
        });
    }
}