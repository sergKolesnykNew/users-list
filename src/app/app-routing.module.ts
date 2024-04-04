import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { UnauthorizedUserComponent } from './components/unauthorized-user/unauthorized-user.component';
import { ViewPageComponent } from './components/view-page/view-page.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/users',
    pathMatch: 'full',
  },
  {
    path: 'users',
    component: ViewPageComponent,
  },
  {
    path: 'unauthorized',
    component: UnauthorizedUserComponent,
  },
  { path: '**', component: PageNotFoundComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
