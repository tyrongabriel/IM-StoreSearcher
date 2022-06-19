import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { IStoreLocation } from 'src/app/utils/types/storeLocation';
import data from '../../../assets/data/stores.json';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements OnInit {
  stores: Array<IStoreLocation> = data.stores;
  selectedStoreLocation: IStoreLocation = null;
  constructor() {
    console.log(this.stores);
  }

  @Output() storeLocationSelected = new EventEmitter<IStoreLocation>();

  onStoreLocationSelected(storeLocation: IStoreLocation) {
    this.storeLocationSelected.emit(storeLocation);
    this.selectedStoreLocation =
      this.selectedStoreLocation == storeLocation ? null : storeLocation;
  }

  ngOnInit(): void {}
}
