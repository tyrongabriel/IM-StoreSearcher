import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment';
import { SearchFieldComponent } from './components/search-field/search-field.component'; // Environment Files are built during npm start (with npm config -- --environment=dev), so if they are missing, start the app

import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { StoreModule } from '@ngrx/store';
import { StoreLocationItemComponent } from './components/store-location-item/store-location-item.component';

@NgModule({
  declarations: [AppComponent, SearchFieldComponent, StoreLocationItemComponent],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_API_KEY,
    }),
    StoreModule.forRoot({
      //storeLocator: StoreLocatorReducer,
    }),
    StoreDevtoolsModule.instrument({
      autoPause: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
