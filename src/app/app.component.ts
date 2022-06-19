import { Component, OnInit, ViewChild } from '@angular/core';
import { map, Observable } from 'rxjs';

import data from '../assets/data/stores.json';
import { StoreLocatorFacade } from './utils/states/store-locator/store-locator.service';
import { IStoreLocation } from './utils/types/storeLocation';
import { IStoreLocator } from './utils/states/store-locator/store-locator.reducer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'IM-StoreSearcher';
  stores$: Observable<Array<IStoreLocation>>;
  constructor(private storeLocatorFacade: StoreLocatorFacade) {
    this.stores$ = storeLocatorFacade.storeLocator$.pipe(
      map((storeLocator: IStoreLocator) => storeLocator.storeLocations)
    );
  }

  focusLat = 51.678418;
  focusLong = 7.809007;

  onStoreLocationSelected(storeLocation: IStoreLocation) {
    this.focusLat = storeLocation.lat;
    this.focusLong = storeLocation.long;
  }
}
