import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoreLocatorService } from 'src/app/services/store-locator.service';
import { IStoreLocation } from '../../types/storeLocation';
import { changeSearch, changeSelectedStore } from './store-locator.actions';
import { IStoreLocator } from './store-locator.reducer';

@Injectable({
  providedIn: 'root',
})
export class StoreLocatorFacade {
  storeLocator$: Observable<IStoreLocator>;

  constructor(
    private store: Store<{ storeLocator: IStoreLocator }>,
    private storeLocatorService: StoreLocatorService
  ) {
    this.storeLocator$ = this.store.select('storeLocator');
  }

  public changeSearchString(searchString: string) {
    // Get the fitting stores based onthe searchString
    let stores = this.storeLocatorService.getStores(searchString);

    // Change the Search to the new String and Stores
    this.store.dispatch(changeSearch(searchString, stores));
  }

  public changeSelectedStore(selectedStore: IStoreLocation) {
    // Change the Selected Store
    this.store.dispatch(changeSelectedStore(selectedStore));
  }
}
