import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AgmCoreModule } from '@agm/core';
// import { RangeSliderModule } from 'ngx-rangeslider-component';
import { SweetAlert2Module } from '@sweetalert2/ngx-sweetalert2';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { FooterComponent } from './footer/footer.component';
import { LaptopProductsComponent } from './laptop-products/laptop-products.component';
import { RegisterComponent } from './register/register.component';
import { RegisterCustomersComponent } from './register-customers/register-customers.component';
import { SearchComponent } from './search/search.component';
import { BuildForPriceComponent } from './build-for-price/build-for-price.component';
import { BuildForRequirementsComponent } from './build-for-requirements/build-for-requirements.component';
import { MoreDetailsComponent } from './more-details/more-details.component';
import { LoginComponent } from './login/login.component';
import { LaptopComparisonComponent } from './laptop-comparison/laptop-comparison.component';
import { CompatiblePcPartListComponent } from './build-for-requirements/compatible-pc-part-list/compatible-pc-part-list.component';
import { UserProfileComponent } from './user-profile/user-profile.component';
import {NgxPaginationModule} from 'ngx-pagination';
import { NotFoundComponent } from './not-found/not-found.component';
import { LoadingComponent } from './loading/loading.component';
import {LaptopStore} from './laptop-products/laptop.store';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MenuBarComponent,
    FooterComponent,
    LaptopProductsComponent,
    RegisterComponent,
    RegisterCustomersComponent,
    SearchComponent,
    BuildForPriceComponent,
    BuildForRequirementsComponent,
    MoreDetailsComponent,
    LoginComponent,
    LaptopComparisonComponent,
    CompatiblePcPartListComponent,
    UserProfileComponent,
    NotFoundComponent,
    LoadingComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxPaginationModule,
    SweetAlert2Module.forRoot({
      buttonsStyling: false,
      customClass: 'modal-content',
      confirmButtonClass: 'btn btn-primary',
      cancelButtonClass: 'btn'
    }),
    AgmCoreModule.forRoot({
      apiKey: 'AIzaSyDHRyL4DvYGHgH_7a3sDKtBEy8KfMPI6aw'
    })
  ],
  providers: [LaptopStore],
  bootstrap: [AppComponent]
})
export class AppModule { }
