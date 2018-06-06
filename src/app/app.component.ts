import {Component, OnInit, ViewChild} from '@angular/core';
import {SearchMusicService} from './search-music.service';
import {SearchData} from './searchResult';
import {Input} from '@angular/compiler/src/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})

export class AppComponent implements OnInit {
  searchResultfromComponent: SearchData;
  searchInput = 'Sting';
  searchImage = 'https://i1.sndcdn.com/artworks-000059522031-nwy1v0-large.jpg';
  searchhistory = new Array();
  SC = require('soundcloud');
  searchNext = '';
  indexForPlayTrack = 0;
  track_url = '';
  playerOb;
  isPlaying = true;



  constructor(private searchServicefromComponent: SearchMusicService) {
    this.searchResultfromComponent = new SearchData ();
    // this.searchResultfromComponent.searchResultName.push('Please, enter search data');
    //this.searchResultfromComponent.searchResultImage.push('https://i1.sndcdn.com/artworks-000059522031-nwy1v0-large.jpg');
    this.SC.initialize({client_id: 'ggX0UomnLs0VmW7qZnCzw'});
  }

  ngOnInit() {
    this.searchServicefromComponent.getPost(this.searchInput).subscribe(posts => {
      console.log(posts);
      this.searchResultfromComponent = posts;
      this.arrayPush();
    });
  }

  arrayPush() {
    if (this.searchhistory.length <= 5) {
        this.searchhistory.push(this.searchInput);
    } else {
        this.searchhistory.shift();
        this.searchhistory.push(this.searchInput);
    }
  }

  setImageUrl(n: number) {
    this.searchImage = this.searchResultfromComponent.searchResultImage[n];
    this.indexForPlayTrack = n;
   // this.searchResultfromComponent.trArray[n] = true;
  }

  playTrack (n: number) {
    this.track_url = this.searchResultfromComponent.searchResultURI[n];
    const track = '/tracks/';
    const trackID = this.takeTrackID();
    const tracksum = track.concat(trackID);
    console.log(tracksum);
    this.SC.stream(tracksum).then(player => {
     this.playerOb = player;
      console.log(player);
      this.playerOb.play();
    });
  }

  pauseTrack() {
    if (this.isPlaying) {
      this.playerOb.pause();
      this.isPlaying = false;
      } else {
      this.playerOb.play();
      this.isPlaying = true;
    }
  }

  nextList () {
   this.searchNext = this.searchResultfromComponent.searchResultContinue;
   this.searchServicefromComponent.getPost(this.searchNext).subscribe(posts => {
      console.log(posts);
      this.searchResultfromComponent = posts;
    });
  }

  takeTrackID (): string {
    const rowForDevide = this.track_url;
    const resultOfDivide = rowForDevide.split('/', 5);
    console.log('array from url', resultOfDivide);
    return resultOfDivide[4];
  }
}
