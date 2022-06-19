import { createAction } from '@ngrx/store';
import { IStoreLocation } from '../../types/storeLocation';

export const changeSearch = createAction(
  '[Counter] Updated Search',
  (searchText: string, storeLocations: Array<IStoreLocation>) => ({
    searchText,
    storeLocations,
  })
);
