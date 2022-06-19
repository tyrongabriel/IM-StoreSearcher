import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { StoreLocatorFacade } from 'src/app/utils/states/store-locator/store-locator.service';
import { IStoreLocation } from 'src/app/utils/types/storeLocation';

@Component({
  selector: 'app-store-location-item',
  templateUrl: './store-location-item.component.html',
  styleUrls: ['./store-location-item.component.scss'],
})
export class StoreLocationItemComponent {
  constructor(public storeLocatorFacade: StoreLocatorFacade) {}
  @Input() storeLocation: IStoreLocation;
  @Output() storeLocationSelected = new EventEmitter<IStoreLocation>();

  onStoreLocationSelected() {
    this.storeLocationSelected.emit(this.storeLocation);
  }
}
