import { Injector, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { ViewPageComponent } from './components/view-page/view-page.component';
import { UsersTableComponent } from './components/users-table/users-table.component';
import { UserFormComponent } from './components/user-form/user-form.component';
import {
  MatIconModule,
} from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomValidationDirective } from './directives/custom-validation.directive';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { AuthInterceptor } from './components/auth-interceptor';
import { UnauthorizedUserComponent } from './components/unauthorized-user/unauthorized-user.component';

@NgModule({
  declarations: [
    AppComponent,
    ViewPageComponent,
    UsersTableComponent,
    UserFormComponent,
    CustomValidationDirective,
    PageNotFoundComponent,
    UnauthorizedUserComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    MatIconModule,
    ReactiveFormsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
