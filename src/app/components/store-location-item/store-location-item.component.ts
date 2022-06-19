import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IStoreLocation } from 'src/app/utils/types/storeLocation';

@Component({
  selector: 'app-store-location-item',
  templateUrl: './store-location-item.component.html',
  styleUrls: ['./store-location-item.component.scss'],
})
export class StoreLocationItemComponent {
  constructor() {}
  @Input() storeLocation: IStoreLocation;
  @Output() storeLocationSelected = new EventEmitter<IStoreLocation>();

  onStoreLocationSelected() {
    this.storeLocationSelected.emit(this.storeLocation);
  }
}
