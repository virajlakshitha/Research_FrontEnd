import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {HttpClientModule} from '@angular/common/http';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BuildForPriceComponent } from './build-for-price/build-for-price.component';
import { FooterComponent } from './footer/footer.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { SearchComponent } from './search/search.component';
import { MoreDetailsComponent } from './more-details/more-details.component';

@NgModule({
  declarations: [
    AppComponent,
    BuildForPriceComponent,
    FooterComponent,
    MenuBarComponent,
    SearchComponent,
    MoreDetailsComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
