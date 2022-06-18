import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AgmCoreModule } from '@agm/core';
import { AppComponent } from './app.component';
import { environment } from 'src/environments/environment'; // Environment Files are built during npm start (with npm config -- --environment=dev), so if they are missing, start the app

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AgmCoreModule.forRoot({
      apiKey: environment.GOOGLE_API_KEY,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
