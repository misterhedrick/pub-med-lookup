import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LookupComponent } from './components/lookup/lookup.component';

const routes: Routes = [
  { path: '', component: LookupComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
