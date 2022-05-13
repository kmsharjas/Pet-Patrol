import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { FeaturedProductsComponent } from './components/featured-products/featured-products.component';
import { FeaturedBlogsComponent } from './components/featured-blogs/featured-blogs.component';
import { HomeComponent } from './components/home/home.component';
import { BannerInnerPageComponent } from './components/banner-inner-page/banner-inner-page.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { RegisterComponent } from './components/register/register.component';
import { LoginComponent } from './components/login/login.component';
import { CartComponent } from './components/cart/cart.component';
import { CheckoutComponent } from './components/checkout/checkout.component';
import { AccountComponent } from './components/account/account.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ProductDetailComponent } from './components/product-detail/product-detail.component';
import { CareerComponent } from './components/career/career.component';
import { BlogsComponent } from './components/blogs/blogs.component';
import { BlogComponent } from './components/blog/blog.component';
import { AboutComponent } from './components/about/about.component';
import { ContactComponent } from './components/contact/contact.component';
import { TestimonialComponent } from './components/testimonial/testimonial.component';
import { AddressFormComponent } from './components/address-form/address-form.component';
import { OrderResponseComponent } from './components/order-response/order-response.component';
import { AddressComponent } from './components/address/address.component';
import { CarouselModule } from 'ngx-owl-carousel-o';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MyordersComponent } from './components/myorders/myorders.component';
import { OffersComponent } from './components/offers/offers.component';
import { WishlistComponent } from './components/wishlist/wishlist.component';
import { TermsComponent } from './components/terms/terms.component';
import { CancellationComponent } from './components/cancellation/cancellation.component';
import { PrivacyComponent } from './components/privacy/privacy.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FooterComponent,
    FeaturedProductsComponent,
    FeaturedBlogsComponent,
    HomeComponent,
    BannerInnerPageComponent,
    ProductListComponent,
    RegisterComponent,
    LoginComponent,
    CartComponent,
    CheckoutComponent,
    AccountComponent,
    ProductDetailComponent,
    CareerComponent,
    BlogsComponent,
    BlogComponent,
    AboutComponent,
    ContactComponent,
    TestimonialComponent,
    AddressFormComponent,
    OrderResponseComponent,
    AddressComponent,
    MyordersComponent,
    OffersComponent,
    WishlistComponent,
    TermsComponent,
    CancellationComponent,
    PrivacyComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule,
    BrowserModule,
    BrowserAnimationsModule,
    CarouselModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
