import { Injectable } from '@angular/core';
import data from '../../assets/data/stores.json';
import continentMap from '../../assets/data/countryCodeContinent.json';
import countries from '../../assets/data/countries.json';
import { IStoreLocation } from '../utils/types/storeLocation';
import { Observable } from 'rxjs';

export interface ICountry {
  name: string;
  code: string;
}

export interface ICentral {
  continent: string;
  store: IStoreLocation;
}

@Injectable({
  providedIn: 'root',
})
export class StoreLocatorService {
  private _stores: Array<IStoreLocation> = data.stores.concat(
    data.centrals.map((central) => central.store)
  );
  private _countries: Array<ICountry> = countries;
  private _continentMap = continentMap;
  private _centrals: Array<ICentral> = data.centrals;
  constructor() {
    console.log(this._stores);
  }

  public getStores(searchText?: string): Array<IStoreLocation> {
    searchText = searchText.trim().toLowerCase();
    let searchedCountries: Array<ICountry>;
    let filteredStores: Array<IStoreLocation>;
    let continents: Array<string>;

    // Return defaul if nothing is being Searched
    if (!searchText) {
      return this._stores;
    }

    // Get the List of countries, which we find in the search text
    searchedCountries = this._countries.filter((country) =>
      searchText
        .split(' ')
        .some((word) => country.name.toLowerCase().includes(word.toLowerCase()))
    );

    // If there are Countries, we start filtering the stores
    if (searchedCountries.length > 0) {
      console.log('Countries:', searchedCountries);

      // Get the list of Stores, which are in the searched countries
      filteredStores = this._stores
        .filter((storeLocation: IStoreLocation) =>
          searchedCountries.some(
            (country) =>
              country.name.toLowerCase() == storeLocation.country.toLowerCase()
          )
        )
        // Sort the stores by how much they match the search text
        .sort((a, b) => {
          let aAccuracy = this.getMatchAccuracy(a, searchText),
            bAccuracy = this.getMatchAccuracy(b, searchText);

          return bAccuracy - aAccuracy;
        });

      // Return the searched for Stores, if they have been found
      if (filteredStores.length > 0) {
        return filteredStores;
      }
    } else {
      console.log("Couldn't find the location you are looking for");
      return filteredStores;
    }

    // If no stores were found, we start filtering the continents
    console.log('No Store Found, defaulting to Continent');
    continents = searchedCountries.map(
      (country) => this._continentMap[country.code]
    );

    console.log('Continents:', continents);

    // Get the list of centrals, which are in the searched continents
    let centrals = this._centrals.filter((central) =>
      continents.some(
        (continent) =>
          central.continent.toLowerCase() == continent.toLowerCase()
      )
    );

    // If centrals were found, return them, otherwise we dont have a central for that continent
    if (centrals.length > 0) {
      filteredStores = this._centrals
        .filter((central) =>
          continents.some(
            (continent) =>
              central.continent.toLowerCase() == continent.toLowerCase()
          )
        )
        .map((central) => central.store);
    } else {
      console.log('No central could be found');
    }

    return filteredStores;
  }

  // Judges the Accuracy of the found item, based on how many of its parameters match the search text
  private getMatchAccuracy(storeLocation: IStoreLocation, searchText: string) {
    let accuracy: number = 0.0;
    Object.values(storeLocation).forEach((value) => {
      if (String(value)) {
        searchText.split(' ').forEach((word) => {
          accuracy +=
            Number(String(value).toLowerCase().includes(word.toLowerCase())) *
            (String(value).length / searchText.toLowerCase().length);
        });
      }
    });
    console.log(storeLocation.name, accuracy);

    return accuracy;
  }
}
