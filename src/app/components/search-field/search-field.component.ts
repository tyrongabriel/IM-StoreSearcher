import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Output,
  ViewChild,
} from '@angular/core';
import {
  fromEvent,
  Observable,
  debounceTime,
  last,
  map,
  exhaustMap,
  async,
} from 'rxjs';
import { IStoreLocator } from 'src/app/utils/states/store-locator/store-locator.reducer';
import { StoreLocatorFacade } from 'src/app/utils/states/store-locator/store-locator.service';
import { IStoreLocation } from 'src/app/utils/types/storeLocation';
import data from '../../../assets/data/stores.json';

@Component({
  selector: 'app-search-field',
  templateUrl: './search-field.component.html',
  styleUrls: ['./search-field.component.scss'],
})
export class SearchFieldComponent implements AfterViewInit {
  stores$: Observable<Array<IStoreLocation>>;
  selectedStoreLocation$: Observable<IStoreLocation>;
  searchText$: Observable<Event>;

  constructor(public storeLocatorFacade: StoreLocatorFacade) {
    this.stores$ = storeLocatorFacade.storeLocator$.pipe(
      map((storeLocator: IStoreLocator) => storeLocator.storeLocations)
    );
    this.selectedStoreLocation$ = storeLocatorFacade.storeLocator$.pipe(
      map((storeLocator: IStoreLocator) => storeLocator.selectedStore)
    );
  }

  @ViewChild('searchInput', { static: true }) searchInput: ElementRef;
  // @Output() storeLocationSelected = new EventEmitter<IStoreLocation>();

  ngAfterViewInit() {
    // Get the Input Element and add an observable, so im able to add Debounce Time to the input,
    // after which i call the facade to dispatch the action of changeSearch
    this.searchText$ = fromEvent(this.searchInput.nativeElement, 'input');
    this.searchText$.pipe(debounceTime(300)).subscribe((e: InputEvent) => {
      this.storeLocatorFacade.changeSearchString(
        (e.target as HTMLInputElement).value
      );
    });
  }
}
