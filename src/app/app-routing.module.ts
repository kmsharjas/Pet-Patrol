import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AboutComponent } from './components/about/about.component';
import { AccountComponent } from './components/account/account.component';
import { BlogComponent } from './components/blog/blog.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { CancellationComponent } from './components/cancellation/cancellation.component';
import { CareerComponent } from './components/career/career.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { ContactComponent } from './components/contact/contact.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { MyordersComponent } from './components/myorders/myorders.component';
import { OffersComponent } from './components/offers/offers.component';
import { OrderResponseComponent } from './components/order-response/order-response.component';
import { PrivacyComponent } from './components/privacy/privacy.component';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';
import { TermsComponent } from './components/terms/terms.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { CheckoutGuard } from './guards/checkout.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'home', component: HomeComponent },
  { path: 'about', component: AboutComponent },
  { path: 'contact', component: ContactComponent },
  { path: 'offers', component: OffersComponent },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'products', component: ProductListComponent },
  { path: 'product', component: ProductDetailComponent },
  { path: 'products/:id', component: ProductDetailComponent },
  { path: 'cart', component: CartComponent },
  { path: 'account', component: AccountComponent },
  {
    path: 'checkout',
    canActivate: [CheckoutGuard],
    component: CheckoutComponent,
  },
  { path: 'orderResponse', component: OrderResponseComponent },
  { path: 'career', component: CareerComponent },
  { path: 'blogs', component: BlogsComponent },
  { path: 'blog', component: BlogComponent },
  { path: 'orders', component: MyordersComponent },
  { path: 'wishlist', component: WishlistComponent },
  { path: 'privacy', component: PrivacyComponent },
  { path: 'terms', component: TermsComponent },
  { path: 'cancellation', component: CancellationComponent },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      scrollPositionRestoration: 'enabled',
      onSameUrlNavigation: 'reload',
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
