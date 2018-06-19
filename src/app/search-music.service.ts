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
  private fakeImage = 'https://i1.sndcdn.com/artworks-000059522031-nwy1v0-large.jpg';

  getPost(value: string): Observable<SearchData> {
 const fakeImage = 'https://i1.sndcdn.com/artworks-000059522031-nwy1v0-large.jpg';
    return this.http.get(this.makeSearchUrl(value)).map((res: any) => {
      const searchdataMap = new SearchData();
       res.collection.map(function (collection: any, next_: any) {
         searchdataMap.searchResultName.push(collection.title);
         if (collection.artwork_url) {
           searchdataMap.searchResultImage.push(collection.artwork_url);
           } else {
           console.log('null value')
           searchdataMap.searchResultImage.push(fakeImage);
           }
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
