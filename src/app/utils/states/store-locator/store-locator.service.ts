import { Injectable } from '@angular/core';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { StoreLocatorService } from 'src/app/services/store-locator.service';
import { IStoreLocation } from '../../types/storeLocation';
import { changeSearch } from './store-locator.actions';
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
    let stores = this.storeLocatorService.getStores(searchString);
    this.store.dispatch(changeSearch(searchString, stores));
  }
}
