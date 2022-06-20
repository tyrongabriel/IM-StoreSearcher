import { createAction } from '@ngrx/store';
import { IStoreLocation } from '../../types/storeLocation';

export const changeSearch = createAction(
  '[Counter] Changed Search',
  (searchText: string, storeLocations: Array<IStoreLocation>) => ({
    searchText,
    storeLocations,
  })
);

export const changeSelectedStore = createAction(
  '[Counter] Changed Selected Store',
  (selectedStore: IStoreLocation) => ({ selectedStore })
);
