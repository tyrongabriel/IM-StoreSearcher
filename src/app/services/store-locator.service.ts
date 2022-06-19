import { Injectable } from '@angular/core';
import data from '../../assets/data/stores.json';
import continentMap from '../../assets/data/countryCodeContinent.json';
import { IStoreLocation } from '../utils/types/storeLocation';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class StoreLocatorService {
  private _stores: Array<IStoreLocation> = data.stores;
  constructor() {}

  public getStores(searchText?: string): Array<IStoreLocation> {
    if (searchText) {
      return this._stores.filter((store) =>
        Object.values(store).join('').includes(searchText)
      );
    } else {
      return this._stores;
    }
  }
}
