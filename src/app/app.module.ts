import { BrowserModule } from "@angular/platform-browser";
import * as $ from "jquery";

import { NgModule } from "@angular/core";
import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { MainPageComponent } from "./modules/main-page/main-page.component";
import { NavBarComponent } from "./modules/nav-bar/nav-bar.component";
import { UserComponent } from "./modules/main-page/user/user.component";
import { LoginComponent } from "./modules/login/login.component";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { HttpClientModule } from "@angular/common/http";
import { ServicesPageComponent } from "./modules/services-page/services-page.component";
import { ServiceComponent } from "./modules/services-page/service/service.component";
import { BlocksPageComponent } from "./modules/blocks-page/blocks-page.component";
import { BlockComponent } from "./modules/blocks-page/block/block.component";
import { SidebarComponent } from "./modules/shared/sidebar/sidebar.component";
import { TokenInterceptor } from "./core/token.interceptor";
import { HTTP_INTERCEPTORS } from "@angular/common/http";
import { GraphQLModule } from "./graphql.module";

import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import {
  CommonModule,
  LocationStrategy,
  PathLocationStrategy
} from "@angular/common";
import { NgbModule } from "@ng-bootstrap/ng-bootstrap";
import { NavigationComponent } from "./modules/shared/header-navigation/navigation.component";
import { BreadcrumbComponent } from "./modules/shared/breadcrumb/breadcrumb.component";
import {
  PerfectScrollbarModule,
  PERFECT_SCROLLBAR_CONFIG,
  PerfectScrollbarConfigInterface
} from "ngx-perfect-scrollbar";
const DEFAULT_PERFECT_SCROLLBAR_CONFIG: PerfectScrollbarConfigInterface = {
  suppressScrollX: true,
  wheelSpeed: 2,
  wheelPropagation: true
};

@NgModule({
  declarations: [
    AppComponent,
    MainPageComponent,
    NavBarComponent,
    UserComponent,
    LoginComponent,
    ServicesPageComponent,
    ServiceComponent,
    BlocksPageComponent,
    BlockComponent,
    SidebarComponent,
    NavigationComponent,
    BreadcrumbComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    HttpClientModule,
    GraphQLModule,
    BrowserAnimationsModule,
    NgbModule.forRoot(),
    PerfectScrollbarModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    },
    {
      provide: PERFECT_SCROLLBAR_CONFIG,
      useValue: DEFAULT_PERFECT_SCROLLBAR_CONFIG
    },
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
