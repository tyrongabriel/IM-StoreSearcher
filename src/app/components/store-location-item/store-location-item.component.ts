import {
  AfterViewInit,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { map, Observable, tap } from 'rxjs';
import { IStoreLocator } from 'src/app/utils/states/store-locator/store-locator.reducer';
import { StoreLocatorFacade } from 'src/app/utils/states/store-locator/store-locator.service';
import { IStoreLocation } from 'src/app/utils/types/storeLocation';

@Component({
  selector: 'app-store-location-item',
  templateUrl: './store-location-item.component.html',
  styleUrls: ['./store-location-item.component.scss'],
})
export class StoreLocationItemComponent implements AfterViewInit {
  selectedStore$: Observable<IStoreLocation>;
  isSelected: boolean = false;
  constructor(public storeLocatorFacade: StoreLocatorFacade) {
    this.selectedStore$ = this.storeLocatorFacade.storeLocator$.pipe(
      map((storeLocator: IStoreLocator) => storeLocator.selectedStore)
    );
  }

  @Input() storeLocation: IStoreLocation;

  ngAfterViewInit() {
    // Subscribe to Selected Store, to see if this item is Selected
    this.selectedStore$.subscribe((selectedStore) => {
      selectedStore == this.storeLocation
        ? (this.isSelected = true)
        : (this.isSelected = false);
      //console.log(selectedStore, this.storeLocation, this.isSelected);
    });
  }

  onStoreLocationSelected() {
    // If this item is already selected, select none, if not, select the other

    //console.log('selected', this.isSelected);
    this.storeLocatorFacade.changeSelectedStore(
      this.isSelected ? null : this.storeLocation
    );
    //console.log('selected', this.isSelected);
  }
}
