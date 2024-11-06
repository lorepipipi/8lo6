import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePage } from './home.page';

const routes: Routes = [
  {
    path: '',
    component: HomePage,
  }, {
  path: '',
    loadChildren: () => import('./home.module').then(m => m.HomePageModule),
  },
  {
    path: 'edit-post/:id',
    loadChildren: () => import('src/managers/editPost').then(m => m.EditPostPageModule),
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})


export class HomePageRoutingModule {}
