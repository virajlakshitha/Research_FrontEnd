import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { LaptopProductsComponent } from './laptop-products/laptop-products.component';
import { LaptopComparisonComponent } from './laptop-comparison/laptop-comparison.component';
import { FooterComponent } from './footer/footer.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    LaptopProductsComponent,
    LaptopComparisonComponent,
    FooterComponent,
    MenuBarComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
