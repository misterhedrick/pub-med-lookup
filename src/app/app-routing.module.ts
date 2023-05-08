import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupComponent } from './components/lookup/lookup.component';
import { AuthComponent } from './components/auth/auth.component';
import { AdminComponent } from './components/admin/admin.component';
import { AuthGuard } from './components/auth/auth-guard';
import { DetailsComponent } from './components/admin/details/details.component';

const routes: Routes = [
  { path: '', component: LookupComponent },
  { path: 'auth', component: AuthComponent },
  { path: 'admin', canActivate: [ AuthGuard ],
  children: [
    {
      path: '', 
      component: AdminComponent
    },
    {
      path: 'details', 
      component: DetailsComponent
    }
  ], },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
