import { createReducer, on } from '@ngrx/store';
import { IStoreLocation } from '../../types/storeLocation';
import { changeSearch, changeSelectedStore } from './store-locator.actions';

import data from '../../../../assets/data/stores.json';

export interface IStoreLocator {
  loading: boolean;
  searchText: string;
  storeLocations: Array<IStoreLocation>;
  selectedStore?: IStoreLocation;
}

let initialValue: IStoreLocator = {
  loading: false,
  searchText: '',
  storeLocations: data.stores,
  selectedStore: null,
};

const _storeLocatorReducer = createReducer(
  initialValue,
  on(changeSearch, (state, { searchText, storeLocations }) => ({
    ...state,
    loading: false,
    searchText: searchText,
    storeLocations: storeLocations,
  })),
  on(changeSelectedStore, (state, { selectedStore }) => ({
    ...state,
    selectedStore: selectedStore,
  }))
);

export function storeLocatorReducer(state: any, action: any) {
  return _storeLocatorReducer(state, action);
}
