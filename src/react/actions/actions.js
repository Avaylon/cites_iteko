import {api} from "../../utils/utils";

export const getList = (dispatch) => () => {
    api("/list/", { method: 'GET' } ).then( async res => {
        const json = await res.json();

        dispatch( { type: 'LIST_UPDATE', payload: json });
    });
};

export const setCurrProduct = (dispatch) => (data) => {

    dispatch( { type: 'SET_CURRENT_PRODUCT', payload: data })

};

export const purchase = (dispatch) => (data) => {


    api("/add/", { method: 'POST', data: data } ).then( async res => {
        const json = await res.text();

        dispatch( { type: 'ADD_PRODUCT', payload: json })
    });
};
