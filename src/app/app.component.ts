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
  selectedStoreLocation$: Observable<IStoreLocation>;
  selectedStoreLocation: IStoreLocation;
  focusLat = 51.678418;
  focusLong = 7.809007;
  zoom = 8;

  constructor(private storeLocatorFacade: StoreLocatorFacade) {
    this.stores$ = storeLocatorFacade.storeLocator$.pipe(
      map((storeLocator: IStoreLocator) => storeLocator.storeLocations)
    );
    this.selectedStoreLocation$ = storeLocatorFacade.storeLocator$.pipe(
      map((storeLocator: IStoreLocator) => storeLocator.selectedStore)
    );

    this.selectedStoreLocation$.subscribe((storeLocation) => {
      // Only get Long/Lat if the store actually exists and not try to access prop of null(for example if we select none)
      if (storeLocation) {
        this.focusLat = storeLocation.lat;
        this.focusLong = storeLocation.long;
        console.log(this.zoom);

        this.zoom = this.zoom + 10 - this.zoom;
      }
      this.selectedStoreLocation = storeLocation;
    });
  }

  onStoreLocationSelected(storeLocation: IStoreLocation) {
    // If this item is already selected, select none, if not, select the other
    this.storeLocatorFacade.changeSelectedStore(
      storeLocation == this.selectedStoreLocation ? null : storeLocation
    );
  }
}
