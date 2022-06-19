import { Component, OnInit, ViewChild } from '@angular/core';

import data from '../assets/data/stores.json';
import { IStoreLocation } from './utils/types/storeLocation';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'IM-StoreSearcher';
  stores: Array<IStoreLocation> = data.stores;

  focusLat = 51.678418;
  focusLong = 7.809007;

  onStoreLocationSelected(storeLocation: IStoreLocation) {
    this.focusLat = storeLocation.lat;
    this.focusLong = storeLocation.long;
  }
}
