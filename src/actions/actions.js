import {api} from "../utils/utils.js";
import {store} from "../store/configureStore.jsx";

export default dispatch => ({

    resetCity: () => {
        dispatch( {type: 'RESET_CITY', payload: {} });
    },

    removeCity: (data) => {
        api(`/city/${data.id}`, {method: 'DELETE', body: JSON.stringify(data) } ).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            dispatch( {type: 'DELETE_CITY', payload: {id: data.id} });
        });
    },
    addCity: (data) => {
        api("/city/", {method: 'POST', body: JSON.stringify(data) } ).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();
            dispatch( {type: 'ADD_CITY', payload: json });
        });
    },
    getCities: () => {
        api('/city', {method: 'GET'} ).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();
            dispatch( {type: 'GET_CITY_LIST', payload: json });

        });
    },
    getCurrentCity: (id, force) => {
        if ( store.getState().cities.currCity.id === id && !force ) return false;
        dispatch( {type: 'GET_CURRENT_CITY', payload: store.getState().cities.list.find( (currValue) => ( currValue.id === id  ) )    });
    },
    editCity: (data) => {

        api(`/city/${data.id}`, {method: 'PUT', body: JSON.stringify({ id: data.id, city: data.name, region: data.value }) } ).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();
            dispatch( {type: 'EDIT_CITY', payload: json });
        });
    },
    removeAttr: (data) => {
        api(`/attributes/${data.id}/`, {method: 'DELETE', body: JSON.stringify({ id: data.id, name: data.name, value: data.value }) } ).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();
            dispatch( {type: 'DELETE_ATTRS', payload: json });
        });
    },
    addAttr: (data) => {
        api("/attributes/", {method: 'POST', body: JSON.stringify(data) } ).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();
            dispatch( {type: 'ADD_ATTRS', payload: json });
        });

    },
    editAttr: (data) => {
        api(`/attributes/${data.id}/`, {method: 'PUT', body: JSON.stringify({ id: data.id, name: data.name, value: data.value }) } ).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();
            dispatch( {type: 'EDIT_ATTRS', payload: json });
        });

    },
    logout: () => {
        localStorage.removeItem('user_token');
        dispatch( {type: 'CLEAR_USER', payload: '' } );
    },
    getAllAttrs: () => {
        api("/attributes/", {method: 'GET' } ).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();
            dispatch( {type: 'GET_ATTRS_ALL', payload: json });
        });
    },
    getAttrs: () => {
        const id = store.getState().cities.currCity.id;

        api(`/city/attributes/${id}`, {method: 'GET'} ).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();
            dispatch( {type: 'GET_ATTRS_LIST', payload: json });
        });
    },
    getDetail: () => {
        const id = store.getState().currCity.id;

        api(`/city/${id}`, {method: 'GET'} ).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();
            dispatch( {type: 'GET_CITY_DETAIL', payload: json });
        });

    },

    getRegions: () => {
        api("/regions/", {method: 'GET' } ).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();
            dispatch( {type: 'GET_REGIONS', payload: json });
        });

    },
    auth_token: () => {
        const token = localStorage.getItem('user_token')*1;

        api('add', {headers: {"X-Auth-Token": token} });
        api('/auth_token', {method: 'POST', body: JSON.stringify({}) }).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();
            dispatch( {type: 'SET_USER', payload: json });
        });
    },
    auth: (data) => {
        if (!data.login || !data.password) return false;

        api('/auth', {method: 'POST', body: JSON.stringify({login: data.login, password: data.password }) }).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();

            api('add', {headers: {"X-Auth-Token": json.token } });
            localStorage.setItem('user_token', json.token);

            const userData = {name: data.login, region: json.region, id: json.id, token: json.token, role: json.role };
            dispatch( {type: 'SET_USER', payload: userData });
        });
    },
    registr: (data) => {
        if (!data.login || !data.password || !data.region ) return false;

        api('/registr', {method: 'POST', body: JSON.stringify(data) }).then( async res => {
            if (res.status < 200 || res.status > 299) return false;

            const json = await res.json();

            api('add', {headers: {"X-Auth-Token": json.token} });
            localStorage.setItem('user_token', json.token);

            const userData = {name: data.login, region: data.region, id: json.id, token: json.token, role: json.role };
            dispatch( {type: 'SET_USER', payload: userData });
        });

    }
})