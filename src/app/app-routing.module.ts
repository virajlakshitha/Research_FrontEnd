import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

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
import { UserProfileComponent } from "./user-profile/user-profile.component";
import { CompatiblePcPartListComponent } from './build-for-requirements/compatible-pc-part-list/compatible-pc-part-list.component';
import { NotFoundComponent } from './not-found/not-found.component';

const routes: Routes = [
  {
    path: "login",
    component: LoginComponent
  },
  {
    path: "register/customer",
    component: RegisterCustomersComponent
  },
  {
    path: "register/vendor",
    component: RegisterComponent
  },
  {
    path: "",
    component: HomeComponent
  },
  {
    path: "browse/laptops",
    component: LaptopProductsComponent
  },
  {
    path: "browse/pcparts/:category/:name",
    component: SearchComponent
  },
  {
    path: "build_for_price",
    component: BuildForPriceComponent
  },
  {
    path: "build_for_gaming",
    component: BuildForRequirementsComponent
  },
  {
    path: "product_details/:category/:_id",
    component: MoreDetailsComponent
  },
  {
    path: "laptop_comparison",
    component: LaptopComparisonComponent
  },
  {
    path: "user_profile",
    component: UserProfileComponent
  },
  {
    path: "build_for_gaming/pc-part-list",
    component: CompatiblePcPartListComponent
  },
  {
    path: '**', 
    component: NotFoundComponent
  },
  {
    path: '404', 
    component: NotFoundComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
