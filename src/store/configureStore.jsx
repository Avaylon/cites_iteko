import { createStore } from 'redux'
import { rootReducer } from '../reducers'

export const storeAlias = store => (
    {
        currCity: store.cities.currCity, user: store.user,
        cities: store.cities.list, detail: store.detail,
        attrs: store.attrs, regions: store.regions,
        allAttrs: store.allAttrs
    }
);

export const store = createStore(rootReducer, {});


