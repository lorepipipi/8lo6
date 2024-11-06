import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { PostService } from 'src/managers/addPostService';

const routes: Routes = [
  {
    path: '',
    component: PostService
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PostServiceRoutingModule {}
