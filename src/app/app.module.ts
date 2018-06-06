import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {SearchMusicService} from './search-music.service';
import {HoverDirective} from './hover.directive';
import {ClickDirective} from './click.Directive';


@NgModule({
  declarations: [
    AppComponent,
    HoverDirective,
    ClickDirective
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule
  ],
  providers: [SearchMusicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
