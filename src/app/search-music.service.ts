import { Injectable } from '@angular/core';
import {SearchData} from './searchResult';
import {HttpClient} from '@angular/common/http';
import 'rxjs/add/operator/map';
import {Observable} from 'rxjs/Observable';



@Injectable()

export class SearchMusicService {

  constructor(private http: HttpClient) { }

  private clientId =  'ggX0UomnLs0VmW7qZnCzw';
  private httprowsummary: string;

  getPost(value: string): Observable<SearchData> {
    return this.http.get(this.makeSearchUrl(value)).map((res: any) => {
      const searchdataMap = new SearchData();
       res.collection.map(function (collection: any, next_: any) {
         searchdataMap.searchResultName.push(collection.title);
         searchdataMap.searchResultImage.push(collection.artwork_url);
         searchdataMap.searchResultURI.push(collection.uri);
       });
      searchdataMap.searchResultContinue = res.next_href;
       return searchdataMap;
    });
  }


  makeSearchUrl(value: string): string {
    this.httprowsummary = `http://api.soundcloud.com/tracks?linked_partitioning=1&client_id=${this.clientId}&q=${value}&limit=6`;
    return this.httprowsummary;
  }
}
