import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { TacosListComponent } from './tacos-list.component';
import { TacoDetailComponent } from './taco-detail/taco-detail.component';
import { TacoFormComponent } from './taco-form/taco-form.component';

const routes = [
  {
    path: 'tacos',
    children: [
      { path: '', component: TacosListComponent },
      { path: ':id', component: TacoDetailComponent },
      { path: 'edit/:id', component: TacoFormComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class TacosListRoutingModule {}
