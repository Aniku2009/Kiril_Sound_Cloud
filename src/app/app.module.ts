import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';

import { AppComponent } from './app.component';
import {SearchMusicService} from './search-music.service';
import {HoverDirective} from './hover.directive';
import {ClickDirective} from './click.Directive';
import { WellcomePageComponent } from './search-page/wellcome-page.component';
import {RouterModule, Routes} from '@angular/router';
import { HomeComponent } from './home/home.component';



const routes: Routes = [
  {path: '', component: HomeComponent},
  {path: 'search', component: WellcomePageComponent}
];

@NgModule({
  declarations: [
    AppComponent,
    HoverDirective,
    ClickDirective,
    WellcomePageComponent,
    HomeComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule, RouterModule.forRoot(routes)
  ],
  providers: [SearchMusicService],
  bootstrap: [AppComponent]
})
export class AppModule { }
